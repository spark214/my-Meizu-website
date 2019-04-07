<template>
  <div>
    <el-row :gutter="7">
      <el-col :span="6" v-for="item in item">
        <el-card shadow="hover" class="list_card" >
          <a @click="goProduct(item.id)">
            <img width="230px" class="list_img" v-lazy="item.img" :key="item.img">
            <div class="list_desc">
              <p class="list_name">{{item.name}}</p>
              <p class="list_title">{{item.title}}</p>
              <p class="list_price"><span>￥ </span><span class="price_span">{{item.price}}</span> 起</p>
         </div>
          </a>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props:{
    item:{
      type:Array
    }
  },
  methods:{
    goRouter(that) {
      this.$router.push({path: "/" + that});
    },
    goProduct(id){
      if (id <= 10)
        this.$router.push({path: "/mallProductPhone", query: {proId: id}})
      else
        this.$router.push({path: "/mallProductOther", query: {proId: id}})
    },
  }
}
</script>
<style>
  .list_card{
    position: relative;
    width: 303px;
    height: 400px;
    text-align: center;
    margin-top: 10px;
    cursor: pointer;
  }
.list_desc{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  line-height: 30px;
}
  .list_title{
    color:#999;
    font-size: 14px;
  }
  .list_name{
    color: #333;
    font-size: 16px;
  }
  .list_price{
    color: #c00;
  }
  .list_price span{
    font-size: 14px;
  }
  .price_span{
    font-size: 22px !important;
  }
</style>
