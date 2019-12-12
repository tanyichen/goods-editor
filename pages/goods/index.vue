<template>
    <view class="uni-body">
        <view class="list">
            <view @tap="tapLi(item)" class="box" v-for="item in list" :key="item.name">
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
</template>

<script>
    export default {
        data() {
            return {
                list: [{
                    name: '1对多套系-多版本+多套系',
                    rute: 'publish-duo',
                    text: '多图+自定义属性+多版本+多套系+多图文内容'
                }, {
                    name: '1对多套系-多套系',
                    rute: 'publish-duo1',
                    text: '多图+自定义属性+多套系+多图文内容'
                }, {
                    name: '1对多套系2-多套系-自动价格/库存',
                    rute: 'publish-duo2',
                    text: '多图+自定义属性+多套系+多图文内容+自动价格库存'
                }, {
                    name: '1对多套系3-单内容',
                    rute: 'publish-duo3',
                    text: '多图+自定义属性+多套系+文本内容+自动价格库存'
                }, {
                    name: '1对多套系4-单图-单内容',
                    rute: 'publish-duo4',
                    text: '单图+自定义属性+多套系+文本内容+自动价格库存'
                }, {
                    name: '精简版单商品单图',
                    rute: 'publish-1',
                    text: '单图+自定义属性+文本内容'
                }, {
                    name: '精简版单商品多图',
                    rute: 'publish-2',
                    text: '多图+自定义属性+文本内容'
                }]
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
    .list {
        display: flex;
        flex-direction: column;
        background: #fafafa;

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
