<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
					<span class="text" border-1px>
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
							<div class="icon">
								<img :src="food.icon" width="57">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<Cartcontrol :food="food" @cart-add="_drop"> </Cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<Shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></Shopcart>
		<Food :food="selectedFood" ref="food" @cart-add="_drop"></Food>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	import axios from 'axios'
	import Shopcart from './Shopcart.vue'
	import Cartcontrol from './Cartcontrol.vue'
	import Food from './Food.vue'

	export default{
		props:{
			seller: {
				type: Object
			}
		},
		data(){
			return{
				goods: [],
				ListHeight: [],
				scrollY: 0,
				selectedFood:{}
			}
		},
		computed:{
			currentIndex(){
				for(let i=0; i < this.ListHeight.length; i++){
					let height1 = this.ListHeight[i];
					let height2 = this.ListHeight[i+1];
					//滚动到最后一个或者在区间，获取index的值
					if(!height2 || this.scrollY >= height1 && this.scrollY < height2){
						return i;
					}
				}
				return 0; //如果ListHeight.length没有值无滚动的情况
			},
			selectFoods(){
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food)=>{
						if(food.count){
							foods.push(food);
						}
					});
				});
				return foods;
			}
		},
		created(){
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
			var _this=this;
	      	axios.get('../../data.json')
	      	.then((res) => {
	      		_this.goods = res.data.goods;

	      		//拿到数据后，dom更新操作
	      		_this.$nextTick(() => {
	      			_this._initScroll();
	      			_this.calculateHeight();
				});	
	      		
	     	 })
	     	 .catch((err) => {
	      	});
		},
		methods:{
			_initScroll(){
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {
					click: true //初始化可以点击菜单
				});
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
					probeType: 3, //scroll滚动时实时监听滚动的位置
					click: true
				});

				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				});
			},
			calculateHeight(){
				//获取右侧所有区块
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				// console.log( typeof foodList);
				let height = 0;
				this.ListHeight.push(height);
				for(let i=0; i < foodList.length; i++){
					let item = foodList[i];
					height += item.clientHeight; //每一区块的高度
					this.ListHeight.push(height);
				}
			},
			selectMenu(index,event){
				//bscorll自己自定义默认派发的事件_constructed为true，浏览器原生的点击事件没有这个属性
				if(!event._constructed){
					return; //设置原生浏览器点击事件不触发，防止PC端出现两个点击事件
				}
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el, 300);
			},
			_drop(target){
				this.$refs.shopcart.drop(target); //调用shopcart组件的drop()函数
			},
			selectFood(food,event){ //被选中的food,商品详情页
				if(!event._constructed){
					return; 
				}
				this.selectedFood = food;
				this.$refs.food.show();
			}
		},
		components:{
			Shopcart,
			Cartcontrol,
			Food
		}
	}
</script>
<style lang="less">
	@import "../assets/css/mixin.less";
	.goods{
		display: flex;
		position: absolute;
		top: 174px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;
		.menu-wrapper{
			flex: 0 0 80px;
			width: 80px;
			background: #f3f5f7;
			/*overflow: hidden;*/
			.menu-item{
				display: table;
				height: 54px;
				width: 56px;
				line-height: 14px;
				padding: 0 12px;
				&.current{
					position: relative;
					z-index: 10;
					margin-top: -1px;
					background: #fff;
					font-weight: 700;
					.text{
						.border-none();
					}
				}
				.icon{
					display: inline-block;
					vertical-align: top;
					width: 12px;
					height: 12px;
					margin-right: 4px;
					background-size: 12px 12px;
					background-repeat: no-repeat;
					&.decrease{
						.bg-image('decrease_3');
					}
					&.discount{
						.bg-image('discount_3');
					}
					&.guarantee{
						.bg-image('guarantee_3');
					}
					&.invoice{
						.bg-image('invoice_3');
					}
					&.special{
						.bg-image('special_3');
					}
				}
				.text{
					width: 56px;
					font-size: 12px;
					display: table-cell;
					vertical-align: middle;
					.border-1px(rgba(7,17,27,0.1));
				}
			}
		}
		.foods-wrapper{
			flex: 1;
			/*height: 100%;*/
			.title{
				padding-left: 14px;
				height: 26px;
				line-height: 26px;
				border-left: 2px solid #d9dde1;
				font-size: 12px;
				color: rgb(147,153,159);
				background: #f3f5f7;
			}
			.food-item{
				display: flex;
				margin: 18px;
				padding-bottom: 18px;
				.border-1px(rgba(7,17,27,0.1));
				&:last-child{
					.border-none();
					margin-bottom: 0;
				}
				.icon{
					 flex: 0 0 57px;
					 margin-right: 10px;
				}
				.content{
					flex: 1;
					.name{
						margin: 2px 0 8px 0;
						height: 14px;
						line-height: 14px;
						font-size: 14px;
						color: rgb(7,17,27);
					}
					.desc, .extra{
						line-height: 10px;
						font-size: 10px;
						color: rgb(147,153,159);
					}
					.desc{
						line-height: 12px;
						margin-bottom: 8px;
					}
					.extra{
						.count{
							margin-right: 12px;
						}
					}
					.price{
						font-weight: 700;
						line-height: 24px;
						.now{
							margin-right: 8px;
							font-size: 14px;
							color: rgb(240,20,20);
						}
						.old{
							text-decoration: line-through;
							font-size: 10px;
							color: rgb(147,153,159); 
						}
					}
					.cartcontrol-wrapper{
						position: absolute;
						right: 0;
						bottom: 12px;
					}
				}
			}
		}
	}
</style>