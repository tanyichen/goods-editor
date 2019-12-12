<template>
    <view class="uni-body">
        <view class="content">
            <view class="list" v-for="li in listData" :key="li.name">
                <view class="list-nav">
                    {{li.title}}
                </view>
                <view @tap="tapLi(item)" class="box" v-for="item in li.data" :key="item.rute">
                    <view class="list-item">
                        <view class="" style="flex-direction: row;display: flex;justify-content: space-between;">
                            <view class="">
                                {{item.name}}
                            </view>
                            <view class="list-item-text">
                                rute: {{item.rute}}

                            </view>


                        </view>
                        <view class="list-item-text">
                            text: {{item.text}}
                        </view>
                    </view>
                </view>
            </view>

        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                list: [{
                    type: 'duo',
                    name: '1对多套系-多版本+多套系',
                    rute: 'publish-duo',
                    text: '多图+自定义属性+多版本+多套系+多图文内容'
                }, {
                    type: 'duo',
                    name: '1对多套系-多套系',
                    rute: 'publish-duo1',
                    text: '多图+自定义属性+多套系+多图文内容'
                }, {
                    type: 'duo',
                    name: '1对多套系2-多套系-自动价格/库存',
                    rute: 'publish-duo2',
                    text: '多图+自定义属性+多套系+多图文内容+自动价格库存'
                }, {
                    type: 'duo',
                    name: '1对多套系3-单内容',
                    rute: 'publish-duo3',
                    text: '多图+自定义属性+多套系+文本内容+自动价格库存'
                }, {
                    type: 'duo',
                    name: '1对多套系4-单图-单内容',
                    rute: 'publish-duo4',
                    text: '单图+自定义属性+多套系+文本内容+自动价格库存'
                }, {
                    type: 'dan',
                    name: '精简版单商品单图',
                    rute: 'publish-1',
                    text: '单图+自定义属性+文本内容'
                }, {
                    type: 'dan',
                    name: '精简版单商品多图',
                    rute: 'publish-2',
                    text: '多图+自定义属性+文本内容'
                }, {
                    type: 'zuhe',
                    name: '多图-自定义属性',
                    rute: 'publish-item1',
                    text: '多图+自定义属性+文本内容'
                }, {
                    type: 'zuhe',
                    name: '多图基础版',
                    rute: 'publish-item2',
                    text: '多图+文本内容'
                }, {
                    type: 'zuhe',
                    name: '多图',
                    rute: 'publish-item3',
                    text: '多图+文本内容'
                }, {
                    type: 'tuiguang',
                    name: '推广',
                    rute: 'publish-item3',
                    text: '多图+文本内容'
                }],
                
                listNav: [{
                    name: 'dan',
                    title: '单套餐型-商品通用表单',
                    text: ''
                }, {
                    name: 'duo',
                    title: '多套餐型-商品详版表单',
                    text: ''
                }, {
                    name: 'zuhe',
                    title: '自由组合型-商品简化表单',
                    text: ''
                },{
                    name: 'tuiguang',
                    title: '推广型-商品简化表单',
                    text: ''
                }]
            }
        },
        watch: {
            list: {
                handler(e, b) {
                    // console.log({
                    //     e,
                    //     b
                    // })
                },
                // immediate: true,
                // ,deep:true
            }
        },
        computed: {
            listData() {
                return this.listNav.filter(e => {
                    e.data = [];
                    this.list.filter(res => {
                        if (res.type == e.name) {
                            e.data.push(res)
                        }
                    })
                    return e
                })
            }
        },
        methods: {
            tapLi(e) {
                uni.navigateTo({
                    url: e.rute + "?query=" + encodeURIComponent(JSON.stringify(e))
                })
            }
        }
    }
</script>

<style lang="scss">
    .content {}

    .list {
        display: flex;
        flex-direction: column;
        background: #fafafa;

        .list-nav {
            padding: 10px;
            font-weight:800;
            font-size: 1.2em;
            // background: #09BB07;
            // color: #FFFFFF;
        }

        .box {
            padding: 0 2px;
            display: flex;
            flex-direction: row;

            .list-item {
                width: 100%;
                background: #FFFFFF;
                padding: 5px 10px;

                .list-item-text {
                    font-size: 0.7em;
                    color: #bababa;
                }
            }
        }

        .box:not(:first-of-type) {
            padding-top: 2px;
        }

        .box:last-child {
            padding-bottom: 2px;
        }

    }
</style>
