<template>

    <view class="image-body" style="">
        <view style="position: relative;" :style="'width:'+screenW+'px;height:'+screenH+'px;background:#000'"
            @touchstart.stop="screenTouchstart" @touchmove.stop="screenTouchmove" @touchend.stop="screenTouchend">
            <view class="" style="position: absolute;z-index: 1;width: 100%;height: 100%;">
                <view class="uni-flex" style="width: 100%;height: 100%;justify-content: center;align-items: center;">
                    <view id="crop-area" class="crop-area" :style="'width:'+width+'px;height:'+height+'px;'">
                        <view style="display: flex;align-items: center;justify-content: center;font-size:2em;font-weight: 500; width:100%;position: absolute;height: 100%;">
                            <text style="color: rgba(205,205,205,0.2);">✣</text>
                        </view>

                        <view class="crop-area-border crop-tr">

                        </view>
                        <view class="crop-area-border crop-tl">

                        </view>
                        <view class="crop-area-border crop-bl">

                        </view>
                        <view class="crop-area-border crop-br">

                        </view>
                        <view class="" @touchstart.stop="touchstart" @touchmove.stop="touchmove" @touchend.stop="touchend"
                            style="position: absolute;z-index: 3; right: 10px;bottom: 10px;transform:rotate(45deg);">
                            <text style="color: rgba(205,205,205,0.5);line-height: 30px; width: 50px;font-size:35px;font-weight: 600;">⇌</text>
                        </view>
                    </view>
                </view>
            </view>
            <image id="image" @load="imageLoad" :src="imageSrc" :style="'width:'+imageW+'px;height:'+imageH+'px;left:'+imageL+'px;top:'+imageT+'px;'"
                style="position: absolute;z-index: 0;"></image>
            <view class="uni-cropper-view-box">
                <view class="uni-cropper-point point-rb" data-drag="rightBottom"></view>
            </view>

        </view>

        <view style="width: 100%;height: 55px;display: flex;width: 100%;justify-content: space-between;align-items: center;"
            :style="'height:'+tabHeight+'px'">

            <button type="primary reverse" size="mini" @click="getImage" style='width: 100%;'> 选择图片 </button>
            <button @click="submit(true)" size="mini" style='width: 100%;'>确认 </button>
            <button @click="submit(false)" size="mini" style='width: 100%;'>取消 </button>

        </view>
        <canvas canvas-id="avatar-canvas" :style="'opacity:0.4;right:9999px;position:absolute; z-index:1;background: rgba(200,200,200,0.2);width:'+imageInfo.width+'px;height:'+imageInfo.height+'px;'">

        </canvas>

    </view>
</template>

<script>
    export default {
        props: {
            imgSrc: {
                type: String,
                default: 'https://img-cdn-qiniu.dcloud.net.cn/demo_crop.jpg'
            },
            // 裁剪框宽度
            width: {
                type: Number,
                default: 280
            },
            // 拆剪框高度
            height: {
                type: Number,
                default: 280
            },
            quality: {
                type: Number,
                default: 1
            },
            supportType: {
                type: Object,
                default: function(){
                    return {
                        png: 'png',
                        jpeg: 'jpeg',
                        jpg: 'jpeg',
                        bmp: 'jpeg'
                    }

                }
            }
        },
        /**
         * 页面的初始数据
         */
        data() {
            return {
                sysInfo: '',
                tabHeight: 44,
                screenW: 0, //宽
                screenH: 0, //高
                imageSrc: '', //图片连接
                suffix: 'jpeg',
                imageInfo: {}, //原始图片信息
                ratioW_H: 1, //原始图片宽高比
                cropInfo: {}, //裁剪区域信息


                moveClientX: 0, //触摸点坐标 动态
                moveClientY: 0, //触摸点坐标 动态
                imageW: 0, //图片宽度 动态
                imageH: 0, //图片高度 动态
                imageL: 0, //图片左边与窗口的距离 动态
                imageT: 0, //图片顶部与窗口的距离 动态
            }
        },
        mounted(e) {
            let sysInfo = uni.getSystemInfoSync();
            this.sysInfo = sysInfo;
            // console.log(sysInfo)
            this.screenH = sysInfo.screenHeight - this.tabHeight - sysInfo.windowTop - sysInfo.statusBarHeight;
            this.screenW = sysInfo.screenWidth;
            this.imageSrc = this.imgSrc;

        },

        watch: {

        },
        methods: {
            imageLoad(e) {
                // console.log(e)
                var suffix = this.imageSrc.substring(this.imageSrc.lastIndexOf('.') + 1) || 'jpeg';
                if (this.supportType[suffix]) {
                    this.suffix = this.supportType[suffix];
                    // console.log(this.suffix)
                } else {
                    this.suffix = 'jpeg';
                }

                const query = uni.createSelectorQuery().in(this);
                query.select('#crop-area').boundingClientRect(data => {
                    // 画布的原始坐标信息
                    // console.log(data)
                    data.widthMargin = data.width + data.left;
                    data.heightMargin = data.height + data.top;
                    // console.log(this.sysInfo)

                    this.imageT = data.top;
                    this.imageL = data.left;
                    this.cropInfo = data;
                }).exec();
                this.ctxCanvas = uni.createCanvasContext('avatar-canvas', this);

                uni.getImageInfo({
                    src: this.imageSrc,
                    success: (res) => {
                        this.ratioW_H = res.width / res.height
                        var OK = false;
                        var imageW = res.width;
                        var imageH = res.height;
                        if (res.width < this.imageH) {
                            imageW = this.cropInfo.width;
                            imageH = this.cropInfo.width / this.ratioW_H;

                        } else {
                            imageH = this.cropInfo.height;
                            imageW = this.cropInfo.height * this.ratioW_H;
                        }

                        this.imageW = imageW;
                        this.imageH = this.imageW / this.ratioW_H;
                        this.imageInfo = res;

                        this.imageT = (this.screenH - this.imageH) / 2;
                        this.imageL = (this.screenW - this.imageW) / 2;

                    }
                })
            },
            touchstart(e) {
                // console.log(e)
                this.moveClientX = e.changedTouches[0].clientX;
                this.moveClientY = e.changedTouches[0].clientY;
            },
            touchmove(e) {
                // console.log(e)
                // 放大缩小图片
                var touche = e.changedTouches[0];
                var moveClientX = this.moveClientX;
                var moveClientY = this.moveClientY;
                // console.log(moveClientX)
                var clientX = touche.clientX;
                var clientY = touche.clientY;

                if (!moveClientX) {
                    this.moveClientX = clientX;
                    this.moveClientY = clientY;
                } else {


                    if (clientX > moveClientX && clientY >= moveClientY) {
                        // console.log('dada')
                        this.imageH = this.imageH + clientX - moveClientX;
                        this.imageW = this.ratioW_H * this.imageH;


                    } else if (clientX < moveClientX && clientY < moveClientY) {
                        // console.log('xiaoxiao')


                        var imageH = this.imageH - (moveClientX - clientX);
                        if (imageH < this.cropInfo.height) {

                        } else {
                            this.imageH = imageH;
                        }
                        // console.log(imageH)

                        this.imageW = this.ratioW_H * this.imageH
                    }

                    this.screenTouchmove(e)
                    // this.moveClientX = clientX;
                    // this.moveClientY = clientY;
                }

            },
            touchend(e) {

            },
            screenTouchstart(e) {

                this.moveClientX = e.changedTouches[0].clientX;
                this.moveClientY = e.changedTouches[0].clientY;
            },
            screenTouchend(e) {},
            screenTouchmove(e) {

                // 移动图片位置
                var touche = e.changedTouches[0];
                var moveClientX = this.moveClientX;
                var moveClientY = this.moveClientY;
                var clientX = touche.clientX;
                var clientY = touche.clientY;

                // var clientX = touche.x;
                // var clientY = touche.y;

                if (!moveClientX) {
                    this.moveClientX = clientX;
                    this.moveClientY = clientY;
                } else {

                    // 防止两端溢出
                    var imageL = this.imageL - (moveClientX - clientX)

                    // var imageInfo = this.imageInfo;
                    var R = this.imageW + imageL;
                    var cropInfo = this.cropInfo;

                    if (imageL >= cropInfo.left) {

                        this.imageL = cropInfo.left;
                        return;
                    } else if (R <= cropInfo.right) {
                        this.imageL = cropInfo.right - this.imageW
                    } else {
                        this.imageL = imageL;
                        this.moveClientX = clientX;
                    }

                    // 防止垂直溢出
                    var moveY = moveClientY - clientY;
                    var imageT = this.imageT - moveY;

                    var T = this.imageH + imageT;

                    if (imageT >= cropInfo.top) {
                        this.imageT = cropInfo.top
                        return;
                    } else if (T <= cropInfo.heightMargin) {
                        this.imageT = cropInfo.heightMargin - this.imageH;
                    } else {
                        this.imageT = imageT;
                    }
                    this.moveClientX = clientX;
                    this.moveClientY = clientY;
                }
                // console.log(e)
            },
            dragMove() {

            },
            getImage() {
                // var count = this.num;
                uni.chooseImage({
                    count: 1,
                    success: (res) => {
                        this.imageSrc = res.tempFilePaths[0];
                        // this.loadImage();
                    },
                })
            },
            submit(state) {
                if (!state) {
                    this.$emit("changes", false);
                    return;
                }
                // const query = uni.createSelectorQuery().in(this);
                // query.select('#image').boundingClientRect(data => {
                //     console.log("得到布局位置信息" + JSON.stringify(data));
                //     console.log("节点离页面顶部的距离为" + data.top);
                // }).exec();

                var img = {
                    W: this.imageW,
                    H: this.imageH,
                    L: this.imageL,
                    T: this.imageT,
                    cropInfo: this.cropInfo
                }
                var width = this.width;
                var height = this.height;
                var x = 0;
                var y = 0;
                var expWidth = width;
                var expHeight = height;
                // var quality = 1;

                // let tm_now = Date.now();
                // if(tm_now - this.drawTm < 20) return;
                // this.drawTm = tm_now;
                // let ctxCanvas = this.ctxCanvas;
                // ctxCanvas.fillRect(0, 0, this.screenW, this.screenH);
                // ctxCanvas.translate(this.posWidth + this.useWidth / 2, this.posHeight + this.useHeight / 2);
                // ctxCanvas.scale(this.scaleSize, this.scaleSize);
                // ctxCanvas.rotate(this.rotateDeg * Math.PI / 180);
                // ctxCanvas.drawImage(this.imageSrc, -this.useWidth / 2, -this.useHeight / 2, this.useWidth, this.useHeight);
                // ctxCanvas.fillRect(0, 0, this.screenW, this.screenH);
                // ctxCanvas.translate(this.posWidth + this.useWidth / 2, this.posHeight + this.useHeight / 2);//画布启动坐标原点位置变更
                // ctxCanvas.scale(this.scaleSize, this.scaleSize);//缩放
                // ctxCanvas.rotate(this.rotateDeg * Math.PI / 180);//旋转

                var scale = this.imageH / this.imageInfo.height; //缩放比例
                // imageH/imgHeight*scale

                var cropInfo = this.cropInfo;
                var top = this.imageT / scale - cropInfo.top / scale;
                var left = this.imageL / scale - cropInfo.left / scale;
                var imageInfo = this.imageInfo

                const ctx = uni.createCanvasContext('avatar-canvas');

                ctx.drawImage(this.imageSrc, -left, -top, this.cropInfo.width / scale, this.cropInfo.height /
                    scale, 0, 0, this.cropInfo.width, this.cropInfo.height);
                //                 // ctx.rotate(45 * Math.PI / 180);//旋转

                ctx.draw(true, e => {
                    // console.log(e)
                    uni.canvasToTempFilePath({
                        x: x,
                        y: y,
                        width: width,
                        height: height,
                        destWidth: expWidth,
                        destHeight: expHeight,
                        canvasId: 'avatar-canvas',
                        fileType: this.suffix,
                        quality: this.quality,
                        success: (r) => {
                            // console.log(r)
                            // r = r.tempFilePath;
                            // this.imageSrc = r.tempFilePath
                            this.$emit("changes", r);
                        }
                    })
                })

            }
        }
    }
</script>

<style scoped>
    .image-body {
        /* top: 0; */
        /* bottom: 0; */
        left: 0;
        right: 0;
        position: fixed;
        z-index: 1;
        height: 100%;
        width: 100%;
        background: #f1f1f1;
    }


    /* 裁剪区域样式 */
    .crop-area {
        opacity: 0.4;
        /* border: 1px; */
        position: relative;
        background: rgba(200, 200, 200, 0.2);
        border: 1px solid #00d3e7;
    }

    .crop-area-border {
        /* background: #007AFF; */
        /* width: 20px; */
        padding: 11px;
        position: absolute;

        /* border: 1px; */
    }

    .crop-tr {
        border-top: 3px solid #00d3e7;
        border-right: 3px solid #00d3e7;
        top: -2px;
        right: -2px;
    }

    .crop-tl {
        border-top: 3px solid #00d3e7;
        border-left: 3px solid #00d3e7;
        left: -2px;
        top: -2px;
    }

    .crop-bl {
        border-bottom: 3px solid #00d3e7;
        border-left: 3px solid #00d3e7;
        bottom: -2px;
        left: -2px;
    }

    .crop-br {
        border-bottom: 3px solid #00d3e7;
        border-right: 3px solid #00d3e7;
        right: -2px;
        bottom: -2px;
    }



    .button {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;

    }
</style>
