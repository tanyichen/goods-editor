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
                        <input type="number" disabled=true :value="price" placeholder="无须输入" style="background: #f3f3f3;padding: 5px;flex: 1;" />
                    </view>
                </view>
                <view class="li">
                    <view class="uni-row uni-flex" style="justify-content: space-between;background: #fff;padding: 10px;">

                        <view class="uni-flex" style="align-self: center;width: 160upx;">
                            库存数量
                        </view>
                        <input type="number" disabled :value="stock" placeholder="无须输入" style="background: #f3f3f3;padding: 5px;flex: 1;" />
                    </view>
                </view>
                <view class="li">
                    <view class="uni-row uni-flex" style="justify-content: space-between;background: #fff;padding: 10px;">

                        <view class="uni-flex" style="align-self: center;width: 160upx;">
                            地区
                        </view>
                        <input :class="form.category_id?'':'red'" type="text" disabled="true" :value="address"
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

            <view class="list uni-row uni-flex">

                <view class="li uni-flex-item" style="">

                    <view class="uni-flex uni-flex-item uni-column" style="align-self: center;">
                        <view class="list uni-column uni-flex">


                            <view v-for="(compose,idx) in form.compose" :key="compose.id?compose.id: compose.name">
                                <view class="li uni-flex uni-flex-item uni-row" style="background: #EEEEEE;">


                                    <view class="uni-flex uni-column color-nav" style="">
                                        <view class="">
                                            套
                                        </view>
                                        <view class="">
                                            系
                                        </view>
                                        <view>
                                            {{idx+1}}
                                        </view>
                                    </view>
                                    <view class="uni-flex-item">
                                        <view class="uni-row uni-flex" style="justify-content: space-between;background: #fff;">
                                            <view class="uni-column uni-flex-item" style="padding: 5px 0;">
                                                <view class="uni-flex" style="padding: 1px;">
                                                    <view class="uni-flex uni-row" style="justify-content:flex-end;width: 70px;align-items: center;padding-right: 5px;box-sizing: border-box;">
                                                        图片
                                                    </view>

                                                    <view :class="compose.image?'':'red'" @tap="addImage(idx)" class="uni-flex-item uni-flex uni-column"
                                                        style="box-sizing: border-box; background: #f3f3f3;padding: 5px;flex: 1;font-size: 50px;justify-content: center;align-items: center;">
                                                        <!-- <choose :count="1" :imgList="item.image" @changes="fileChange"></choose> -->
                                                        <image v-if="compose.image" style="max-width: 30vw;max-height:30vw;width: 100%;"
                                                            :src="compose.image" mode="aspectFill"></image>
                                                        <text v-else>+</text>
                                                    </view>
                                                </view>
                                                <view class="uni-flex" style="padding: 1px;">
                                                    <view class="uni-flex uni-row" style="justify-content:flex-end;width: 70px;align-items: center;padding-right: 5px;box-sizing: border-box;">
                                                        名称
                                                    </view>

                                                    <input :class="compose.name?'':'red'" class="uni-flex-item" type="text"
                                                        v-model="compose.name" placeholder="请输入套系名" style="background: #f3f3f3;padding: 5px;flex: 1;" />
                                                </view>
                                                <view class="uni-flex" style="padding: 1px;">
                                                    <view class="uni-flex uni-row" style="justify-content:flex-end;width: 70px;align-items: center;padding-right: 5px;box-sizing: border-box;">
                                                        价格￥
                                                    </view>
                                                    <input  :class="compose.price?'':'red'" class="uni-flex-item" type="digit"
                                                        v-model="compose.price" placeholder="价格" style="background: #f3f3f3;padding: 5px;flex: 1;" />
                                                </view>
                                                <view class="uni-flex" style="padding: 1px;">
                                                    <view class="uni-flex uni-row" style="justify-content:flex-end;width: 70px;align-items: center;padding-right: 5px;box-sizing: border-box;">
                                                        数量
                                                    </view>
                                                    <input :class="compose.stock?'':'red'" class="uni-flex-item" type="number"
                                                        v-model="compose.stock" placeholder="库存数量" style="background: #f3f3f3;padding: 5px;flex: 1;" />
                                                </view>
                                            </view>

                                            <view class="uni-flex iconfont" style="align-self: center;padding: 3px;font-size: 1.3em;"
                                                @tap="delTable('compose',idx)">
                                                ✕
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view class="uni-row uni-flex" @tap="addTable('compose')" style="background: #EEEEEE;color: #fff;padding-top: 5px;">
                                <view class="uni-flex uni-row color-nav" style="">
                                    +
                                </view>
                                <view class="li uni-flex-item">
                                    <view class="uni-row uni-flex" style="justify-content: center;background: #fff;padding: 10px;color: #333333;">
                                        添加套系
                                    </view>
                                </view>
                            </view>

                        </view>
                    </view>


                </view>

            </view>


            <view class="list uni-row uni-flex">
                <view class="uni-flex uni-flex-item" style="padding: 5px 0;">
                    <view class="uni-flex  color-nav" style="writing-mode:tb-rl;">
                        内容
                    </view>
                    <view class="uni-flex uni-column" style="width: 100%;box-sizing: border-box;">
                        <text-image :formData="textImageData" @changes="changesTextImage"></text-image>
                        <view class=" uni-flex-item" @tap="addTable('content')">
                            <view class="uni-row uni-flex" style="justify-content: center;background: #fff;padding: 10px;">
                                添加内容
                            </view>
                        </view>
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
                    content: [{
                        text: '商品内容',
                        type: 'text'
                    }],
                    image: [{
                        id: '',
                        src: 'http://img3.imgtn.bdimg.com/it/u=1258271286,1804708623&fm=26&gp=0.jpg'
                    }],
                    compose: [{
                        id: 12323,
                        name: '型号1',
                        image: 'http://img3.imgtn.bdimg.com/it/u=1258271286,1804708623&fm=26&gp=0.jpg',
                        price: '12.00',
                        stock: '10'
                    }, {
                        id: 12322,
                        name: '尺寸',
                        text: '大号',
                        image: 'http://img3.imgtn.bdimg.com/it/u=1258271286,1804708623&fm=26&gp=0.jpg',
                        price: '12.00',
                        stock: '10'
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
            form: {
                handler(val) {
                    if (val.compose) {
                        var stock = 0;
                        var price = 0;
                        val.compose.filter(e => {
                            // if(e.stock!=parseInt(e.stock)){
                            //     e.stock=parseInt(e.stock);
                            // }
                            if (e.stock) {
                                stock += parseInt(e.stock);
                            }

                            if (!price && e.price) {
                                price = e.price
                            } else if (e.price < price) {
                                price = e.price
                            }
                        })
                        this.stock = stock;
                        this.price = price
                    }
                    // console.log(JSON.stringify(val)==JSON.stringify(old))

                },
                deep: true
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
            changesTextImage(e) {
                // this.form.content=e
                var formData = e.data;
                var form = this.form;
                var idx = e.index;
                // console.log(e)
                if (e.tap == 'button') {

                    uni.showActionSheet({
                        itemList: ['删除', '上移', '下移'],
                        success: (ea) => {
                            // console.log(ea)
                            switch (ea.tapIndex) {
                                case 0:


                                    var has = 0;
                                    for (var i = 0; i < formData.length; i++) {
                                        if (formData[i].type == 'text') {
                                            has++
                                        }
                                    }
                                    if (has == 1 && e.type == 'text') {
                                        uni.showModal({
                                            title: '提示',
                                            content: '就这一个文本框了，不能再删了'
                                        })
                                        return;
                                    }
                                    form.content = formData.filter((e, i) => {
                                        if (i != idx) {
                                            return e;
                                        }

                                    })
                                    this.form = form;
                                    break;
                                case 1:

                                    if (idx == 0) {
                                        uni.showModal({
                                            title: '提示',
                                            content: '你已经在最顶上啦'
                                        })
                                        return;
                                    }


                                    var item = formData[idx - 1];
                                    formData[idx - 1] = formData[idx];
                                    formData[idx] = item;
                                    form.content = form.content.slice(idx, 1);
                                    // console.log(form)

                                    // console.log(form)
                                    this.form = form;
                                    setTimeout(() => {
                                        form.content = formData
                                        this.form = form;
                                    })

                                    break;
                                case 2:

                                    if (idx == formData.length - 1) {
                                        uni.showModal({
                                            title: '提示',
                                            content: '你已经在到底啦'
                                        })
                                        return;
                                    }
                                    var item = formData[idx + 1];
                                    formData[idx + 1] = formData[idx];
                                    formData[idx] = item;
                                    form.content = form.content.slice(idx, 1);
                                    // console.log(form)
                                    this.form = form;
                                    setTimeout(() => {
                                        form.content = formData
                                        this.form = form;
                                    })

                                    break;
                                default:
                                    break;
                            }
                        }
                    })
                } else if (e.tap == 'addImage') {

                    this.$refs.compress.yasuoImg([e.data[e.index].text]).then(
                        imgs => {

                            YCImg.imgsToBase64(imgs).then(
                                base64All => {
                                    // console.log(base64All)
                                    e.data[e.index].text = base64All[0];
                                    // this.form.content = null;
                                    this.form.content = e.data;

                                })

                        })
                }

            },
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
                console.log(e)
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
                form.stock = this.stock;
                form.price = this.price;
                var version = form.version; //版本
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



                var compose = form.compose; //套餐
                for (var ci = 0; ci < compose.length; ci++) {
                    var item = compose[ci];
                    for (var k in item) {
                        if (!item[k]) {
                            err.ok = false;
                            err.msg =
                                "套餐信息输入有误\n错误位置:版本" +
                                (i + 1) +
                                "套系" + (ci + 1) +
                                "。"
                            break;
                        }
                    }
                    if (!err.ok) {
                        break;
                    }
                    // console.log(item)
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
                } else if (this.imgList.length < 1) {
                    err.ok = false;
                    err.msg = "至少添加一张图片";

                } else if (form.content.length < 1) {
                    err.ok = false;
                    err.msg = "内容不能为空";
                } else if (form.content.length > 0) {
                    var content = form.content
                    var hasText = false;
                    for (var i = 0; i < content.length; i++) {
                        switch (content[i].type) {
                            case 'image':
                                if (content[i].text.length < 1) {
                                    err.ok = false;
                                    err.msg = '图片不能为空';
                                }
                                break;
                            case 'text':
                                if (content[i].text.length < 1) {
                                    err.ok = false;
                                    err.msg = '内容不能为空';
                                }
                                hasText = true;
                                break;
                            default:

                                break;
                        }
                    }
                    if (!hasText) {
                        err.ok = false;
                        err.msg = '内容不能为空';
                    }
                }
                if (form.compose.length < 1) {
                    err.ok = false;
                    err.msg = '套系不能为空';
                } else if (form.compose.length > 0) {
                    var compose = form.compose
                    for (var i = 0; i < compose.length; i++) {
                        if (compose[i].name == '') {
                            err.ok = false;
                            err.msg = '请输入套系名称';
                        } else if (compose[i].image == '') {
                            err.ok = false;
                            err.msg = '请输入套系图片';
                        } else if (compose[i].price == '' || compose[i].price == 0) {
                            err.ok = false;
                            err.msg = '请输入套系价格';
                        } else if (compose[i].stock == '' || compose[i].stock == 0) {
                            err.ok = false;
                            err.msg = '请输入套系库存';
                        }
                    }

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
                var compose1 = JSON.parse(JSON.stringify(rawData.compose));
                var compose2 = JSON.parse(JSON.stringify(form.compose));

                var upVersion = [];
                var addVersion = [];

                var upCompose = [];
                var addCompose = [];
                var isUp1 = false;
                var isAdd1 = false;
                // 数据有变化
                for (let ic = 0; ic < compose2.length; ic++) {

                    var up2 = {};
                    var add2 = {};
                    var isUp1b = false;
                    var isAdd1b = true;
                    for (var ic2 = 0; ic2 < compose1.length; ic2++) {

                        if (compose1[ic2].id ==
                            compose2[ic].id) {
                            isAdd1b = false;
                            // 匹配出有更新变化的数据

                            if (JSON.stringify(compose1[ic2]) != JSON.stringify(
                                    compose2[
                                        ic])) {
                                for (let ick in compose2[ic]) {
                                    if (compose1[ic2][ick] != compose2[
                                            ic][
                                            ick
                                        ]) {
                                        isUp1b = true;

                                        if (ick == 'image') {

                                            // 图片处理
                                        }
                                        up2[ick] = compose2[ic][ick];
                                    }
                                }
                            }
                        }

                    }
                    if (isAdd1b) {
                        isAdd1 = true;

                        addCompose.push(compose2[ic]);
                    }
                    if (isUp1b) {
                        isUp1 = true;
                        up2.id = compose2[ic].id;
                        upCompose.push(up2);
                    }



                }


                var delCompose = [];
                // form表单与源数据匹配找出被删除的数据
                compose1.filter(e => {
                    var isHas = false;

                    for (let i = 0; i < compose2.length; i++) {
                        if (compose2[i].id == e.id) {
                            isHas = true;
                        }

                    }
                    if (!isHas) {

                        delCompose.push(e.id)
                    }
                })

                var content1 = rawData.content;
                var content2 = form.content;
                var upContent = [];
                var addContent = [];
                var delContent = [];

                content2.filter(e => {

                    var type = 0;
                    for (let i = 0; i < content1.length; i++) {
                        if (e.id == content1[i].id) {
                            type = 1;
                            if (content1[i].text != e.text) {
                                type = 2;
                            }
                            break;
                        }

                    }
                    switch (type) {
                        case 0:
                            delete e.id;
                            addContent.push(e)
                            break;
                        case 2:
                            upContent.push(e)
                            break;
                        default:
                            break;

                    }

                })
                content1.filter(e => {
                    var type = 0;
                    for (let i = 0; i < content2.length; i++) {
                        if (e.id == content2[i].id) {
                            type = 1;
                            break;
                        }

                    }
                    if (type == 0) {
                        delContent.push(e.id)
                    }
                })
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
                    "更新的": upCompose,
                    "新增的": addCompose,
                    "删除的": delCompose,
                    "更新的": upContent,
                    "新增的": addContent,
                    "删除的": delContent,
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
                    },
                    version: {
                        update: upCompose,
                        delete: delCompose,
                        add: addCompose
                    },
                    content: {
                        update: upContent,
                        delete: delContent,
                        add: addContent
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
