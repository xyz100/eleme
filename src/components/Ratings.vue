<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <Star :size="36" :score="seller.serviceScore" class="star"></Star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <Star :size="36" :score="seller.foodScore"></Star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <Split></Split>
            <RatingSelect :select-type="selectType" :only-content="onlyContent" :ratings="ratings" @toggle="toggleContent" @select="select"></RatingSelect>
            <div class="rating-wrapper">
                <ul>
                    <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-item border-1px">
                        <div class="avatar">
                            <img width="28" height="28" :src="rating.avatar">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <Star class="star" :size="24" :score="rating.score"></Star>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <!-- rating.recommend判断是否有这个字段  rating.recommend.length 判断这个字段是否为数组-->
                            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                <span class="icon-thumb_up"></span>
                                <span class="item" v-for="item in rating.recommend">{{item}}</span>
                            </div>
                            <div class="time">
                                {{rating.rateTime | formatDate}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>    
    import BScroll from 'better-scroll'
    import Vue from 'vue'
    import Star from './Star.vue'
    import RatingSelect from './RatingSelect.vue'
    import Split from './Split.vue'
    import axios from 'axios'
    import {formatDate} from '../common/js/date'

    const All = 2; //全部评价

    export default{
        props:{
           seller:{
                type: Object
           }
        },
        data(){
            return{
                ratings:[],
                selectType: All,
                onlyContent: true,
            }
        },
        created(){
            var _this=this;
            axios.get('../../data.json')
            .then(function(res){
                _this.ratings = res.data.ratings;
                _this.$nextTick(()=>{
                    _this.scroll = new BScroll(_this.$refs.ratings,{
                        click: true
                    });
                });     
            })
            .catch(function(err){

            });
        },
        filters:{
            formatDate(time){
                let date = new Date(time);
                return formatDate(date,'yyyy-MM-dd hh:mm');
            }
        },
        methods:{
            //监听事件子组件是否显示内容
            toggleContent(){
                this.onlyContent = !this.onlyContent;
                this.$nextTick(()=>{
                    this.scroll.refresh();
                });
            },
            //监听事件子组件3个按钮类型
            select(type){
                this.selectType = type;
                this.$nextTick(()=>{
                    this.scroll.refresh();
                });
            },
            //绑定3个按钮类型和显示的内容
            needShow(type, text){
                //判断是否显示内容onlyContent=true并且没有文本，不展示
                if(this.onlyContent && !text){
                    return false;
                }
                if(this.selectType === All){
                    return true;
                }else{
                    return type === this.selectType;
                }
            }
        },
        components:{
            Star,
            Split,
            RatingSelect
        }
    }
</script>
<style lang="less">
    @import "../assets/css/mixin.less";
    .ratings{
        position: absolute;
        top: 174px;
        left: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        .overview{
            display: flex;
            padding: 18px 0;
            .overview-left{
                flex: 0 0 137px;
                width: 137px;
                border-right: 1px solid rgba(7,17,27,0.1);
                text-align: center;
                padding: 6px 0; 
                @media only screen and (max-width: 320px){
                    flex: 0 0 120px;
                    width: 120px;
                }
                .score{
                    font-size: 24px;
                    line-height: 28px;
                    color: rgb(255,153,0);
                    margin-bottom: 6px;
                }
                .title{
                    font-size: 12px;
                    line-height: 12px;
                    color: rgb(7,17,27);
                    margin-bottom: 8px;
                }
                .rank{
                    font-size: 10px;
                    line-height: 10px;
                    color: rgb(147,153,159);
                }
            }
            .overview-right{
                flex: 1;
                padding: 6px 0 6px 24px;
                @media only screen and (max-width: 320px){
                    padding-left: 4px;
                }
                .score-wrapper{
                    font-size: 0;
                    margin-bottom: 8px;
                    .title{
                        font-size: 12px;
                        line-height: 18px;
                        color: rgb(7,17,27);
                        vertical-align: top;
                    }
                    .star{
                        display: inline-block;
                        vertical-align: top;
                        margin: 0 12px;
                    }
                    .score{
                        font-size: 12px;
                        line-height: 18px;
                        display: inline-block;
                        vertical-align: top;
                        color: rgb(255,153,0);
                    }
                }
                .delivery-wrapper{
                    font-size: 0;
                    .title{
                        font-size: 12px;
                        line-height: 18px;
                        color: rgb(7,17,27);
                    }
                    .delivery{
                        font-size: 12px;
                        color: rgb(147,153,159);
                        margin-left: 12px;
                    }
                }
            }
        }
        .rating-wrapper{
            padding: 0 18px;
            .rating-item{
                display: flex;
                padding: 18px 0;
                .border-1px(rgba(7,17,27,0.1));
                .avatar{
                    flex: 0 0 28px;
                    width: 28px;
                    margin-right: 12px;
                    img{
                        border-radius: 50%;
                    }
                }
                .content{
                    flex: 1;
                    position: relative;
                    .name{
                        font-size: 10px;
                        line-height: 12px;
                        color: rgb(7,17,27);
                        margin-bottom: 4px;
                    }
                    .star-wrapper{
                        font-size: 0;
                        margin-bottom: 6px;
                        .star{
                            display: inline-block;
                            vertical-align: top;
                            margin-right: 6px;
                        }
                        .delivery{
                            display: inline-block;
                            vertical-align: top;
                            font-size: 10px;
                            line-height: 12px;
                            color: rgb(147,153,159);
                        }
                    }
                    .text{
                        font-size: 12px;
                        line-height: 18px;
                        color: rgb(7,17,27);
                        margin-bottom: 8px;
                    }
                    .recommend{
                        line-height: 16px;
                        font-size: 0;
                        .icon-thumb_up, .item{
                            display: inline-block;
                            margin-bottom: 0 8px 4px 0;
                            font-size: 9px;
                        }
                        .icon-thumb_up{
                            color: rgb(0,160,220);
                        }
                        .item{
                            padding: 0 6px;
                            /*border: 1px solid rgba(7,17,27,0.1);*/
                            /*.border-1px(rgba(7,17,27,0.1));*/
                            /*.bordert-1px(rgba(7,17,27,0.1));*/
                            /*.borders(rgba(7,17,27,0.1));*/
                            border-radius: 1px;
                            color: rgb(147,153,159);
                            background: #fff;
                            margin-right: 8px;
                        }
                    }
                    .time{
                        position: absolute;
                        top: 0;
                        right: 0;
                        font-size: 10px;
                        line-height: 12px;
                        color: rgb(147,153,159);
                    }
                }
            }
        }
    }
</style>