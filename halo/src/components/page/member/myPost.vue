<template>
  <div class="myPost clearfix">
    <div class="myPost-header">
      <ul>
        <li :class="{'header-li-selected':liSelected == '1'}" @click="liSelected = '1'">主题</li>
        <li :class="{'header-li-selected':liSelected == '2'}" @click="liSelected = '2'">回复</li>
      </ul>
    </div>
    <div class="myPost-body">
      <div v-if="liSelected == '1'">
        <el-table :data="postList">
          <el-table-column
                  class-name="table-post-title"
                  prop="title"
                  label=""
                  min-width="200">
            <template slot-scope="scope">
              <p class="table-post-title" @click="goRouter()">
                {{scope.row.title}}
              </p>
              </template>
          </el-table-column>
          <el-table-column
                  prop="section"
                  label="版块"
                  align="center"
                  max-width="130">
          </el-table-column>
          <el-table-column
                  prop="author"
                  label="作者"
                  align="center"
                  max-width="180">
          </el-table-column>
          <el-table-column
                  label="回复/浏览"
                  align="center"
                  max-width="150">
            <template slot-scope="scope">
              {{scope.row.reply}}&nbsp;/&nbsp;{{scope.row.view}}
              </template>
          </el-table-column>
          <el-table-column
                  prop="time"
                  label="发表时间"
                  align="center"
                  max-width="150">
          </el-table-column>
        </el-table>
      </div>
      <div v-if="liSelected == '2'" class="myPost-reply">
        <el-table :data="postList">
          <el-table-column
                  prop="title"
                  label=""
                  min-width="200">
            <template slot-scope="scope">
              <p class="table-reply-title" @click="goRouter()">
                {{scope.row.title}}
              </p>
              <p class="table-reply">
                <i class="el-icon-caret-top"></i>
                <span @click="goRouter()">回复：{{scope.row.replyContext}}</span>
              </p>
              </template>
          </el-table-column>
          <el-table-column
                  prop="section"
                  label="版块"
                  align="center"
                  max-width="130">
          </el-table-column>
          <el-table-column
                  prop="author"
                  label="作者"
                  align="center"
                  max-width="180">
          </el-table-column>
          <el-table-column
                  prop="time"
                  label="回复时间"
                  align="center"
                  max-width="150">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  data(){
    return{
      liSelected:'1',
      postList:[
        {title:"欢迎来到Halo社区欢迎来到Halo社区欢迎来到Halo社区欢迎来到Halo社区",section:"综合讨论",author:"Halo User",time:"2019年3月12日",reply:"320",view:"2100",replyContext:"halo"}
      ]
    }
  },
  methods:{
    goRouter(){
      this.$router.push({path: "/postDetail", query: {}});
    }
  }
}
</script>
<style lang="less">
  @import "../../common.less";
.myPost{
  .myPost-header{
    border-bottom: 1px solid #e6e6e6 !important;
    ul {
      margin-left: 10px;

      li{
        position: relative;
        top:1px;
        padding: 12px 40px;
        color: #666;
        font-size: 14px;
        cursor: pointer;
        display: inline-block;
        margin-right: 10px;
      }

      .header-li-selected{
        border: 1px solid #e6e6e6 !important;
        border-bottom: 1px solid #FFFFFF !important;
        color: #00a0e9;
      }
    }
  }
  .myPost-body{
  .table-post-title .cell,.table-reply-title{
    cursor: pointer;
    max-width: 400px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .table-reply-title{
    max-width: 420px;
  }
  .table-reply{
    cursor: pointer;
    position: relative;
    background-color: #f5f5f5;
    padding: 10px;
    margin-top: 10px;

    .el-icon-caret-top{
      font-size: 20px;
      position: absolute;
      top: -13px;
      left: 20px;
      color: #f5f5f5;
    }
    span{
      display: inline-block;
      max-width: 95%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .el-table th>.cell{
    font-weight: 400;
    font-size: 14px;
    padding: 5px 10px;
  }
  .el-table td .cell{
    font-size: 14px;
    padding: 10px;
  }
  }
}
</style>
