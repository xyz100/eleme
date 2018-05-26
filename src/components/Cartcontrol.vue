<template>
	<div class="cartcontrol">
		<transition name="fade">
			<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart"></div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
	</div>

</template>
<script>
	import Vue from 'vue'
	export default{
		props:{
			food:{
				type: Object
			}
		},
		methods:{
			addCart(event){
				if(!event._constructed){
					return;
				}
				if(!this.food.count){
					Vue.set(this.food, 'count', 1);
				}else{
					this.food.count++;
				}
				this.$emit('cart-add',event.target); //添加这句，提交'cart-add'事情给父组件，第二个是要传递的参数
			},
			decreaseCart(event){
				if(!event._constructed){
					return;
				}
				if(this.food.count){
					this.food.count--;
				}
			}
		}
	}
</script>
<style lang="less">
	.cartcontrol{
		display: inline-block;
		/*中间间隙为0*/
		font-size: 0;
		.cart-decrease, .cart-add{
			display: inline-block;
			padding: 6px;
			display: inline-block;
			font-size: 24px;
			line-height: 24px;
			color: rgb(0,160,220);		
			&.fade-enter-active, &.fade-leave-active {
				opacity: 1;
			 	transition: all 0.4s linear;
			 	transform: translate3d(0, 0, 0) rotate(0);
			}
			&.fade-enter, &.fade-leave-active {
			 	opacity: 0;
			 	transform: translate3d(24px, 0, 0) rotate(180deg);
			}
		}
		.cart-count{
			display: inline-block;
			vertical-align: top;
			width: 12px;
			padding-top: 6px;
			line-height: 24px;
			text-align: center;
			font-size: 10px;
			color: rgb(147,153,159);
		}
		.cart-add{
			
		}
	}
</style>