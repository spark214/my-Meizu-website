<template>
    <div class="postManage">
        <!--<div class="crumbs">-->
            <!--<el-breadcrumb separator="/">-->
                <!--<el-breadcrumb-item>-->
                    <!--<i class="el-icon-goods"></i>-->
                    <!--社区管理-->
                <!--</el-breadcrumb-item>-->
            <!--</el-breadcrumb>-->
        <!--</div>-->
        <div class="container">
            <div class="post-header">
                <el-input v-model="select_word" placeholder="" class="searchInput"></el-input>
                <el-button icon="search" @click="search">搜索</el-button>
                <el-button type="primary" @click="handleNew()" class="newBtn">发帖</el-button>
                <loader exportName="ll"  :headMapping="headMapping"
                        :exportData="validTableData" class="loadBtn"></loader>
            </div>
            <el-table :data="dataTable" ref="multipleTable" @selection-change="handleSelectionChange"
                      style="width: 100%" class="elTable">
                <el-table-column label="标题" prop="title"></el-table-column>
                <el-table-column label="版块" prop="section"></el-table-column>
                <el-table-column label="用户ID" prop="userId"></el-table-column>
                <el-table-column label="用户名" prop="username"></el-table-column>
                <el-table-column label="浏览量" prop="viewNum"></el-table-column>
                <el-table-column label="回复量" prop="replyNum"></el-table-column>
                <!--<el-table-column label="创建时间" prop="createTime"></el-table-column>-->
                <el-table-column label="最后回复时间" prop="replyTime"></el-table-column>
                <el-table-column label="操作" min-width="150">
                    <template slot-scope="scope">
                        <el-button size="small"  @click="handleView(scope.$index,scope.row)">
                            查看
                        </el-button>
                        <el-button size="small" type="primary" @click="handleEdit(scope.$index,scope.row)" >
                            编辑
                        </el-button>
                        <el-button size="small" type="danger" @click="handleCancelHonor(scope.$index,scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages">
                </el-pagination>
            </div>
        </div>
        <el-dialog :visible.sync="editorVisible" :title="editorTitle">
            <div class="editDialog-header" width="720px">
                <div class="editor-header-item">
                    <label>版块：</label>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="editor-header-item">
                    <lable>标题：</lable>
                    <el-input class="editor-item-titleInput"></el-input>
                </div>
            </div>
            <div>
                <editor></editor>
            </div>
            <div class="editor-footer">
                <el-button type="primary">提交</el-button>
                <el-button>取消</el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="viewVisible" :title="查看帖子">
            <div class="viewDialog-header">
                <p class="view-title">{{view.title}}</p>
                <p class="view-info"><span>作者：{{view.author}}</span><span> 版块: {{view.section}}</span><span>浏览量：{{view.viewNum}}</span><span>回复量：{{view.replyNum}}</span><span>发帖时间：{{view.createTime}}</span>
                </p>
                <div class="view-header-button">
                    <el-button type="primary">编辑</el-button>
                    <el-button type="danger">删帖</el-button>
                </div>
            </div>
            <div class="viewDialog-body">
                <p v-html="view.context"></p>
            </div>
            <div class="viewDialog-comment">
                <h4>回复</h4>
                <div v-for="(item,index) in view.reply" class="comment-item">
                    <p class="comment-item-floor">F{{index+1}}</p>
                    <p class="comment-item-context">{{item.context}}</p>
                    <p class="comment-item-info"><span>回复者：{{item.author}}</span><span>回复时间：{{item.replytime}}</span><span class="comment-item-delReply">删除该回复</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import editor from '../common/editor.vue';
    import loader from '../common/loader.vue';
export default{
    components:{
        editor,loader
    },
    data(){
        return{
            options: [
                {value: '1', label: '综合讨论'},
                {value: '2', label: '闲置交易'},
                {value: '3', label: '建议反馈'},
                {value: '4', label: '谈天说地'},
            ],
            dataTable:[
                {title:'123',section:'123',userId:'123',username:'123',viewNum:'123',createTime:'1',replyNum:'1',replyTime:'2'},
            ],
            view: {
                section: '鹅',
                title: '666',
                author: '333',
                viewNum: '12',
                replyNum: '12',
                context:'<a href="404.vue">ni hao</a>',
                createTime: '1',
                reply: [
                    {context: '123', author: '1', replytime: '1'},
                    {context: '145', author: '8', replytime: '1'},
                    {context: '567', author: '9', replytime: '1'},
                ]
            },
            editorVisible:false,
            editorTitle:'发布帖子',
            viewVisible:false,
            idx:-1,
            headMapping : [
                {header: '店铺编码', key: 'storeCode'},
                {header: '店铺名称', key: 'storeName'},
                {header: '店铺级别', key: 'storeLevel'}],
            validTableData:[
                {storeCode: "1601",storeLevel: "A+",storeName: "MISS SIXTY广州正佳广场天河路店"}]
        }
    },
    methods:{
        handleView(index,row){
            this.idx = index;
            this.viewVisible = true;
        },
        handleEdit(index,row){
            this.idx = index;
            this.editorTitle = '编辑帖子';
            this.editorVisible = true;
        },
        handleNew(){
            this.editorTitle = '发布帖子';
            this.editorVisible = true;
        }
    }
}
</script>
<style lang="less">
@import "common.less";
.postManage{
.post-header{
    position: relative;
    margin-bottom: 30px;

    .searchInput{
        width: 280px;
    }
    .newBtn{
        position: absolute;
        right: 0px;
    }
    .loadBtn{
        position: absolute;
        right: 70px;
        top:0px;
    }
}
.editDialog-header{
    margin-bottom: 20px;
    .editor-header-item{
        margin: 20px 0;

        .editor-item-titleInput{
            width: 550px;
        }

        &:first-child{
          margin-top: 0;
         }
    }
}

.editor-footer{
    margin-top: 20px;
    text-align: right;
}
    .viewDialog-header {
        position: relative;

        .view-title{
            margin: 10px 0;
            font-size: 18px;
            font-weight: bold;
        }
        .view-info{
            display: flex;
            flex-direction: row;

            span{
                color: #999;
                margin-right: 15px;
            }
        }
    .view-header-button{
        position: absolute;
        top: 10px;
        right: 0px;
    }
    }
.viewDialog-body{
    max-height: 300px;
    overflow-y: auto;
    margin: 15px 0;
    border: 1px solid #dddddd;
    border-radius: 3px;
    padding: 20px 10px;
}
.viewDialog-comment{
    max-height: 250px;
    overflow-y: auto;
    margin: 20px 0;
    border-radius: 3px;
    border: 1px solid #dddddd;
    padding: 10px 5px;

    h4{
        margin-left: 3px;
        font-size: 18px;
        color: #bbb;
        margin-bottom: 10px;
    }
    .comment-item{
        border-top: 1px solid #dddddd;
        position: relative;
        padding: 10px 0;
        .comment-item-floor{
            font-size: 14px;
            color: #bbb;
            position: absolute;
            right: 10px;
            top:10px;
        }
       .comment-item-context{
           padding: 5px;
           padding-top: 0px;
           color: #666;
       }
       .comment-item-info{
           span{
               margin-left: 3px;
               margin-right: 10px;
               font-size: 12px;
               padding-bottom: 10px;
           }
           .comment-item-delReply{
               color: #409EFF;
           }
       }
    }
}
}
</style>