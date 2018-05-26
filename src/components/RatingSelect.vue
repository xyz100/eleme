<template>
	<div>
		<div class="ratingselect">
			<div class="rating-type border-1px">
				<span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
				<span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
				<span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
			</div>
			<div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
				<span class="icon-check_circle"></span>
				<span class="text">只看有内容的评价</span>
			</div>
		</div>
	</div>
</template>
<script>
	const Positive = 0; //正面评价
	const Negative = 1; //负面评价
	const All = 2;      //全部评价
	export default{
		props:{
			ratings:{
				type: Array,
				default(){
					return [];
				}
			},
			selectType:{
				type: Number,
				default: All
			},
			onlyContent:{
				type: Boolean,
				default: false
			},
			desc:{
				type: Object,
				default(){
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					}
				}
			}
		},
		computed:{
			positives(){
				return this.ratings.filter((rating)=>{
					//过滤拿到都是Positive 0的数组
					return rating.rateType === Positive;
				});
			},
			negatives(){
				return this.ratings.filter((rating)=>{
					return rating.rateType === Negative;
				});
			}
		},
		methods:{
			select(type, event){
				if(!event._constructed){
					return;
				}
				this.$emit('select', type);
			},
			toggleContent(event){
				if(!event._constructed){
					return;
				}
				this.$emit('toggle', this.onlyContent);
			}
		}
	}
</script>
<style lang="less">
	@import "../assets/css/mixin.less";
	.ratingselect{
		.rating-type{
			padding: 18px 0;
			margin: 0 18px;
			.border-1px(rgba(7,17,27,0.1));
			font-size: 0;
			.block{
				font-size: 12px;
				line-height: 16px;
				display: inline-block;
				padding: 8px 12px;
				border-radius: 1px;
				margin-right: 8px;
				color: rgb(77,85,93);
				&.active{
					color: #fff;
				}
				.count{
					font-size: 8px;
					margin-left: 2px;
				}
				&.positive{
					background: rgba(0,160,220,0.2);
					&.active{
						background: rgb(0,160,220);
					}
				}
				&.negative{
					background: rgba(77,85,93,0.2);
					&.active{
						background: rgb(77,85,93);
					}
				}
			}
		}
		.switch{
			padding: 12px 18px;
			line-height: 24px;
			border-bottom: 1px solid rgba(7,17,27,0.1);
			color: rgb(147,153,159);
			font-size: 0;
			&.on{
				.icon-check_circle{
					color: #00c850;
				}
			}
			.icon-check_circle{
				font-size: 24px;
				margin-right: 4px;
				display: inline-block;
				vertical-align: top;
			}
			.text{
				font-size: 12px;
			}
		}
	}
</style>