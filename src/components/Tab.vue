<template>
	<div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods" tag="a" active-class="active" >商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings" tag="a" active-class="active">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller" tag="a" active-class="active">商家</router-link>
      </div>
    </div>
</template>
<script>
 
	export default{

	}
</script>
<style lang="less">
	@import "../assets/css/mixin.less";
	.tab{
	    display: flex;
	    width: 100%;
	    height: 40px;
	    line-height: 40px;
	    /*border-bottom: 1px solid rgba(7,17,27,0.1);*/
	    .border-1px(rgba(7,17,27,0.1));
	    .tab-item{
	    	flex: 1;
	        text-align: center;
	        a{
	        	display: block;
	        	font-size: 14px;
	        	color: rgb(77,85,93);
	        	&.active{
	        		color: rgb(240,20,20);
	        	}
	        }
	    }
	}
</style>