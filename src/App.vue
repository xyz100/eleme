<template>
  <div id="app">
    <Header :seller="seller"></Header>
    <Tab></Tab>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import Tab from './components/Tab.vue'
  import axios from 'axios'
  import {urlParse} from './common/js/util'

  export default{
    name: 'app',
    data(){
      return{
        seller:{
          id: (()=>{
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      }
    },
    components:{
      Header,
      Tab
    },
    created(){
      axios.get('../../data.json?id='+this.seller.id).then((res)=>{
        //es6中给对象扩展属性的方法
        this.seller = Object.assign({},this.seller,res.data.seller);
      }).catch(function(err){});
    } 
  }
</script>
<style lang="less">
</style>
