<template>
  <div class="tags" v-if="showTags">
    <ul>
      <li class="tags-li" v-for="(item,index) in tagsList" :key="index" :class="{'active':isActive(item.path)}">
        <router-link :to="item.path" class="tags-li-title">
          {{item.title}}
        </router-link>
        <span class="tags-li-close" @click="closeTags(index)" ><i class="el-icon-close"></i> </span>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data:()=>({
      tagsList:[]
    }),
    methods:{
      isActive(path) {
        return path === this.$route.path;
      },
      // 设置标签
      setTags(route) {
        const isExist = this.tagsList.some(item => {
          return item.path === route.path;
        })
        !isExist && this.tagsList.push({
          title: route.meta.title,
          path: route.path
        })
      },
      // 关闭单个标签
      closeTags(index) {
        const delItem = this.tagsList.splice(index, 1)[0];
        const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
        if (item) {
          delItem.path === this.$route.path && this.$router.push(item.path);
        }else{
          this.$router.push('/');
        }
      },
    },
    computed:{
      showTags(){
        return this.tagsList.length>0;
      }
    },
    watch:{
      $route(newValue,oldValue){
        this.setTags(newValue);
      }
    },
    created(){
      this.setTags(this.$route);
    }
  }
</script>
<style>
  .tags {
    position: relative;
    height: 30px;
    overflow: hidden;
    background: #fff;
    padding-right: 120px;
  }

  .tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .tags-li {
    float: left;
    margin: 3px 5px 2px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 23px;
    line-height: 23px;
    border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all .3s ease-in;
    -moz-transition: all .3s ease-in;
    transition: all .3s ease-in;
  }
  .tags-li.active {
    border: 1px solid #409EFF;
    background-color: #409EFF;
    color: #fff;
  }
  .tags-li:not(.active):hover {
    background: #f8f8f8;
  }
  .tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
  }

  .tags-li.active .tags-li-title {
    color: #fff;
  }
</style>
