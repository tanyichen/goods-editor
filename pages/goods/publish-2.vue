<template>
    <view class="uni-page-body" style="box-sizing: border-box;">

        <city-picker ref="classifyPicker" :dataList="classifyPickerData" :value="'id'" @onConfirm="onConfirmClass"></city-picker>
        <scroll-view class="" scroll-y="true" :style="'height:'+scrollHeight+'px;'">

            <view class="swiper-list" style="padding-top: 5px;height: auto;">
                <choose :count="count" :imgList="imgList" @changes="fileChange"></choose>
            </view>
            <compress ref="compress" :maxwh="maxwh" :quality="quality"> </compress>

            <view class="list">
                <view class="li">
                    <view class="uni-row uni-flex" style="justify-content: space-between;background: #fff;padding: 10px;">

                        <view class="uni-flex" style="align-self: center;width: 160upx;">
                            标题
                        </view>
                        <input :class="form.title?'':'red'" type="text" v-model="form.title" placeholder="请输入" style="background: #f3f3f3;padding: 5px;flex: 1;" />
                    </view>
                </view>
                <view class="li">
                    <view class="uni-row uni-flex" style="justify-content: space-between;background: #fff;padding: 10px;">

                        <view class="uni-flex" style="align-self: center;width: 160upx;">
                            分类
                        </view>
                        <input :class="form.category_id?'':'red'" type="text" disabled="true" :value="classify"
                            placeholder="请选择" style="background: #f3f3f3;padding: 5px;flex: 1;" @tap="classifyTap" />
                    </view>
                </view>
                <view class="li">
                    <view class="uni-row uni-flex" style="justify-content: space-between;background: #fff;padding: 10px;">
                
                        <view class="uni-flex" style="align-self: center;width: 160upx;">
                            默认价格￥
                        </view>
                        <input :class="form.price?'':'red'" type="number" v-model="form.price" placeholder="请输入价格"
                            style="background: #f3f3f3;padding: 5px;flex: 1;" />
                    </view>
                </view>
                <view class="li">
                    <view class="uni-row uni-flex" style="justify-content: space-between;background: #fff;padding: 10px;">
                
                        <view class="uni-flex" style="align-self: center;width: 160upx;">
                            库存数量
                        </view>
                        <input :class="form.stock?'':'red'" type="number" v-model="form.stock" placeholder="请输入库存数量"
                            style="background: #f3f3f3;padding: 5px;flex: 1;" />
                    </view>
                </view>
                <view class="li">
                    <view class="uni-row uni-flex" style="justify-content: space-between;background: #fff;padding: 10px;">

                        <view class="uni-flex" style="align-self: center;width: 160upx;">
                            地区
                        </view>
                        <input :class="form.area_id?'':'red'" type="text" disabled="true" :value="address"
                            placeholder="请选择" style="background: #f3f3f3;padding: 5px;flex: 1;" @click="showMulLinkageThreePicker" />
                    </view>
                </view>
                <city-picker ref="cityPicker" :dataList="cityPickerData" :label="'label'" @onConfirm="onConfirmCity"></city-picker>
            </view>

            <view class="list uni-row uni-flex">
                <view class="uni-flex uni-flex-item" style="padding: 5px 0;">
                    <view class="uni-flex uni-row color-nav" style="writing-mode:tb-rl">
                        属性
                    </view>

                    <view class="uni-flex-item">
                        <view class="li uni-flex-item" v-for="(item,i) in form.attribute" :key="item.id">
                            <view class="uni-row uni-flex" style="justify-content: space-between;background: #fff;padding: 10px;">
                                <view class="uni-flex" style="align-self: center;padding-right: 5px;">
                                    <input :class="item.name?'':'red'" class="uni-flex-item" type="text" v-model="item.name"
                                        placeholder="请输入属性名" style="background: #f3f3f3;padding: 5px;flex: 1;" />
                                </view>
                                <view class="uni-flex" style="align-self: center;">
                                    <input :class="item.text?'':'red'" class="uni-flex-item" type="text" v-model="item.text"
                                        placeholder="请输入属性内容" style="background: #f3f3f3;padding: 5px;flex: 1;" />
                                </view>
                                <view class="uni-flex iconfont" style="align-self: center;" @tap="delTable('attribute',i)">
                                    ✕
                                </view>
                            </view>
                        </view>
                        <view class="li uni-flex-item" @tap="addTable('attribute')">
                            <view class="uni-row uni-flex" style="justify-content: center;background: #fff;padding: 10px;">
                                添加
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <view class="list uni-row uni-flex" style="background: #FFFFFF;">

                <view class="uni-flex  color-nav" style="writing-mode:tb-rl;">
                    内容
                </view>
                <view class="uni-flex uni-flex-item" style="padding: 5px;">
                    <view class="uni-flex uni-column" style="width: 100%;box-sizing: border-box;background: #f5f5f5;">
                        <textarea v-model="form.text" placeholder="请输入内容" style="padding: 10px;width: 100%;box-sizing: border-box;" />
                        </view>
                </view>
            </view>
        </scroll-view>
        <button type="default" style="width: 100%;" @tap="send">提交</button>
    </view>
</template>

<script>
    import choose from "@/components/template/image/choose.vue"
    import compress from "@/components/template/image/compress.vue"
    import textImage from "@/components/template/editor/textImage.vue"

    // import Request from "@/request/index.js"
    import cityPicker from "@/components/picker/cityPicker.vue"
    import provinceData from '@/components/picker/city-data/province.js';
    import cityData from '@/components/picker/city-data/city.js';

    import {
        Img
    } from "@/common/yc_js/index.js";
    var YCImg = Img

    var classifyDefault = [
        [{
            id: 'bianju',
            label: '主食'
        }, {
            id: 'daoyan',
            label: '炒菜'
        }, {
            id: 'cehua',
            label: '甜点'
        }]
    ]

    export default {
        name: 'newsPublish',
        components: {
            cityPicker,
            choose,
            compress,
            // maskCommon,
            textImage
        },
        data() {
            return {
                rawData: {
                    id: 123,
                    title: '服务器的数据',
                    price: '',
                    stock: '',
                    category_id: 0,
                    categoryName: '',
                    text:'',
                    image: [{
                        id: '',
                        src: 'http://img3.imgtn.bdimg.com/it/u=1258271286,1804708623&fm=26&gp=0.jpg'
                    }],
                    attribute: [{
                        name: '重量',
                        text: '250g'
                    }, {
                        name: '尺寸',
                        text: '大号'
                    }]

                },

                scrollHeight: 1280,
                classifyPickerData: classifyDefault,
                // attribute: [],
                // compose: [],
                // version: [],
                banner: '',
                name: '',
                isYasuo: true,
                count: 6,
                maxwh: 720,
                quality: 1,

                stars: [1, 2, 3, 4, 5],
                imgList: [],
                classify: '',
                stock: '',
                price: '',
                form: {
                    title: '',
                    price: '',
                    stock: '',
                    category_id: 0,
                    content: [{
                        text: '',
                        type: 'text'
                    }],
                },
                cityPickerData: [],
                provinceData: provinceData,
                cityData: cityData,
                address: ''
            }
        },
        watch: {
           'form.stock': {
               handler(e,old) {
                   var val=parseInt(e);
                   // console.log([e==val,e,val])
                   if(val!=e){
                   val=''+val;
                   var stock=parseInt(val.substr(0,6)) || '';
                   console.log(stock)
                   setTimeout(()=>{
                   this.$set(this.form,'stock',stock);
                   },10)
                   }
               },
               immediate: true
           },'form.price': {
               handler(e,old) {
                   var val=Math.round(e*100)/100;
                   // console.log({e,val})
                   if(val!=e){
                       val =''+val;
                       var price=val.substr(0,6);
                       price=Math.round(price*100)/100;
                       // console.log(price)
                       setTimeout(()=>{
                           this.$set(this.form,'price',price);
                       },10)
                   }
           
               },
               immediate: true
           }
        },
        computed: {
            hasLogin() {
                return this.$store.getters.hasLogin
            },
            textImageData() {
                // console.log(this.form.content)
                return this.form.content;
            }
        },
        onShow() {

        },
        onLoad(event) {
            this.cityPickerData = [this.provinceData, this.cityData];
            // console.log(this.cityPickerData)
            var systeminfo = uni.getSystemInfoSync();
            this.systeminfo = systeminfo;
            // console.log(systeminfo.windowHeight)
            this.scrollHeight = systeminfo.windowHeight - systeminfo.statusBarHeight - 46;
            // 目前在某些平台参数会被主动 decode，暂时这样处理。
            if (event.query) {
                try {
                    this.banner = JSON.parse(decodeURIComponent(event.query));
                } catch (error) {
                    this.banner = JSON.parse(event.query);
                }
                var title = this.banner.name || '';
                uni.setNavigationBarTitle({
                    title: "发布[" + title + "]"
                });
                this.classify = title;
                this.form.category_id = this.banner.id;
            }

            var rawData = Object.assign({}, this.rawData);


            var imageList = rawData.image;
            var imgList = [];
            for (var i = 0; i < imageList.length; i++) {
                imgList.push(imageList[i].src)
            }
            this.form = JSON.parse(JSON.stringify(rawData));
            this.imgList = imgList;
            console.log(imgList)
            // Request('NewsCategory_list', {
            //     data: {
            //         quality: 2
            //     },

            // }).then(result => {

            //     uni.hideLoading();

            //     if (result.statusCode == 200) {
            //         var newsList = result.data.data;

            //         newsList.sort(function(a, b) {
            //             if (a.ranking < b.ranking) {
            //                 return -1;
            //             } else if (a.ranking > b.ranking) {
            //                 return 1;
            //             } else {
            //                 return 0;
            //             }
            //         })


            //         this.classifyPickerData = [newsList.map(e => {
            //             // console.log(e)
            //             // e.label=e.name;
            //             return {
            //                 id: e.id,
            //                 label: e.name
            //             }
            //         })]

            //         // Storage.Sync.set('newsList', this.newsList, 84000)
            //         // console.log(this.classifyPickerData)
            //         // this.getList(0);
            //     }
            // })
            // console.log(this.banner)
        },
        methods: {
           
            // 三级联动选择
            showMulLinkageThreePicker() {
                this.$refs.cityPicker.showPickerView(true);
                // this.$refs.cityPicker.show()
            },
            onConfirmCity(e) {

                // cityConfirm(e) {
                // console.log(e)
                this.address = e.label;
                this.form.area_id = e.data[1].value * 100;

            },
            addImage(idx) {

                uni.chooseImage({
                    count: 6, //默认9
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], //从相册选择
                    success: (res) => {
                        var compose = this.form.compose;
                        this.$refs.compress.yasuoImg([res.tempFilePaths[0]]).then(
                            imgs => {

                                YCImg.imgsToBase64(imgs).then(
                                    base64All => {
                                        // console.log(base64All)
                                        compose[idx].image = base64All[0];
                                        // this.form.compose= null;
                                        this.form.compose = compose;

                                    })

                            })
                    }
                });
            },
            addTable(e, idx) {
                // console.log(e)
                switch (e) {
                    case 'attribute':
                        // console.log(e)
                        // var attribute=this.attribute[i];
                        this.form.attribute.push({
                            id: 'name@' + Date.now(),
                            name: '',
                            value: ''
                        })
                        break;
                    case 'compose':
                        // console.log([e, idx])
                        var compose = this.form.compose || [];

                        compose.push({
                            id: 'name@' + Date.now(),
                            name: '',
                            text: '',
                            image: '',
                            price: '',
                            stock: ''
                        })
                        // this.form.compose = null;
                        this.form.compose = compose;
                        // console.log(this.version)
                        break;
                    case 'content':
                        uni.showActionSheet({
                            itemList: ['添加图片', '添加文本'],
                            success: (e) => {
                                var form = this.form;
                                var content = form.content;
                                var idxT = 0;
                                var idxI = 0;
                                form.content.filter(e => {
                                    if (e.type == 'text') {
                                        idxT++;
                                    } else {
                                        idxI++;
                                    }
                                })
                                // console.log(form.content)
                                switch (e.tapIndex) {
                                    case 0:
                                        if (idxI < 8) {
                                            content.push({
                                                id: 'name@' + Date.now(),
                                                type: 'image',
                                                text: ''
                                            })

                                            this.form = form;
                                            // this.tapContentImg(content.length - 1)
                                        } else {
                                            uni.showModal({
                                                title: '提示',
                                                content: '不能添加太多图片了'
                                            })
                                        }
                                        break;
                                    case 1:

                                        if (idxT < 5) {
                                            content.push({
                                                id: 'name@' + Date.now(),
                                                type: 'text',
                                                text: ''
                                            })
                                            this.form = form;
                                        } else {
                                            uni.showModal({
                                                title: '提示',
                                                content: '不能添加太多内容了'
                                            })
                                        }
                                        break;
                                    default:
                                        break;
                                }

                                // console.log(e)

                            }
                        })
                        break;
                    default:
                        break;
                }
            },

            delTable(e, idx) {

                switch (e) {
                    case 'attribute':
                        // console.log(e)
                        this.form.attribute = this.form.attribute.filter((
                            item, i) => {
                            // console.log([item, i, idx])
                            if (i != idx) {
                                return e
                            }
                        })
                        break;
                    case 'compose':
                        console.log(e)
                        var compose = this.form.compose;

                        this.form.compose = compose.filter((item, i) => {
                            // console.log([item, i, idx])
                            if (idx != i) {
                                return e
                            }
                        })
                        // this.form = form;

                        break;
                    default:
                        break;
                }
            },
            onConfirmClass(e) {


                this.classify = e.label
                this.form.category_id = e.data[0].id

                uni.setNavigationBarTitle({
                    title: "发布[" + this.classify + "]"
                });
                // console.log(this.form)  
            },
            classifyTap() {
                this.$refs.classifyPicker.showPickerView(true);
            },
            // 是否压缩图片反选
            changeIndicatorDots(e) {
                this.isYasuo = !this.isYasuo
            },
            // 返回的图片列表
            fileChange(e) {
                console.log(e)
                this.imgList = e;

            },

            previewImage() { //预览图片
                uni.previewImage({
                    urls: this.imgList
                });
            },
            send() {

                // console.log((this.imgList))
                var form = this.form;
                var attribute = form.attribute; //属性


                // 表单验证
                var err = {
                    msg: '',
                    ok: true
                }
                for (var i = 0; i < attribute.length; i++) {
                    if (!attribute[i].name) {
                        err.ok = false;
                        err.msg = "属性名称输入有误\n错误位置:属性" + (i + 1) +
                            "。"
                        break;
                    }
                    if (!attribute[i].text) {
                        err.ok = false;
                        err.msg = "属性值输入有误\n错误位置:属性" + (i + 1) +
                            "。"
                        break;
                    }
                }


                if (form.title.length < 2) {
                    err.ok = false;
                    err.msg = "标题不足2个字";

                } else if (!form.category_id) {
                    err.ok = false;
                    err.msg = "请选择分类";

                } else if (!(parseFloat(form.price) > 0)) {
                    err.ok = false;
                    err.msg = "价格输入有误";
                } else if (!parseInt(form.stock) > 0) {
                    err.ok = false;
                    err.msg = "库存输入有误";
                }else if(!form.area_id){
                    err.ok=false;
                    err.msg="地址不能为空"
                } else if (this.imgList.length < 1) {
                    err.ok = false;
                    err.msg = "至少添加一张图片";

                } else if (form.text.length < 1) {
                    err.ok = false;
                    err.msg = "内容不能为空";
                }

                if (!err.ok) {
                    uni.showModal({
                        title: '提示',
                        content: err.msg
                    })
                    return;
                }
                uni.showLoading({
                    title: '数据处理中'
                });
                setTimeout(function() {
                    uni.hideLoading();
                }, 5000);
                var rawData = this.rawData
                


                var img1 = rawData.image; //旧数据
                var img2 = this.imgList; //新数据

                var addImage = [];
                var delImage = [];
                var upImage = [];
                // console.log(img1)
                img2.filter((e, idx) => {
                    // console.log(idx)
                    var type = 0;
                    for (let i = 0; i < img1.length; i++) {
                        if (i != idx && e == img1[i].src) {
                            upImage.push({
                                index: idx,
                                item: e,
                                oldIndex: i
                            })
                        }
                        if (e == img1[i].src) {
                            type = 1;
                            break;
                        }

                    }
                    if (type == 0) {
                        addImage.push({
                            index: idx,
                            img: e
                        })
                    }
                })
                img1.filter((e, idx) => {
                    var type = 0;
                    for (let i = 0; i < img2.length; i++) {
                        if (e.src == img2[i]) {
                            type = 1;
                            break;
                        }

                    }
                    if (type == 0) {
                        delImage.push(idx)
                    }
                })
                console.log({
                    form,


                    "改变排序的图片索引": upImage,
                    "新增图片": addImage,
                    "删除的图片索引": delImage
                })

                var formTo = {
                    ...form,
                    image: {
                        update: upImage,
                        delete: delImage,
                        add: addImage
                    }
                }
                // console.log(formTo)

                function requst(data) {
                    uni.hideLoading();
                    console.log(data)
                    return;
                    // console.log(JSON.stringify([imgs,data]));
                    Request('UserNews_add', {
                        data: {
                            form: data
                        }
                    }).then(res => {
                        if (res.statusCode === 200) {
                            uni.showToast({
                                title: "发布成功!"
                            });
                            uni.navigateBack();
                        } else {
                            uni.showToast({
                                title: "发布失败!" +
                                    res.data.message,
                                icon: 'none'
                            });
                        }
                    }).catch(e => {
                        console.log(e)
                    })

                }
                var imgList = addImage.map((e) => {
                    return e.img
                })
                if (this.isYasuo) {

                    // console.log(imglist)
                    // return
                    this.$refs.compress.yasuoImg(imgList).then(
                        imgs => {

                            YCImg.imgsToBase64(imgs).then(
                                (base64All) => {

                                    base64All = base64All.map((e, i) => {
                                        return {
                                            base64: e,
                                            index: addImage[i].index || 0
                                        }
                                    })
                                    formTo.image.add = base64All;
                                    requst(formTo)
                                })
                        })

                } else {
                    YCImg.imgsToBase64(imgList).then(base64All => {
                        // console.log(['转成base64',base64All])
                        base64All = base64All.map((e, i) => {
                            return {
                                base64: e,
                                index: addImage[i].index || 0
                            }
                        })
                        formTo.image.add = base64All;
                        requst(formTo)
                    })

                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .uni-page-body {
        background: rgb(240, 240, 240);
    }

    .color-nav {
        flex-direction: column;
        box-sizing: border-box;
        width: 0px;
        padding: 5px 12px;
        justify-content: center;
        align-items: center;
        // writing-mode: tb-rl;
    }

    .red {
        border: 1px solid #DD524D;
    }

    .list {
        background: rgb(240, 240, 240);
        padding: 5px 0;
        box-sizing: border-box;

        .li {
            padding: 1px 0;
            box-sizing: border-box;
        }
    }
</style>
