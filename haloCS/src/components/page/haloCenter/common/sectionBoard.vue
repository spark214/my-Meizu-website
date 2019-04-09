<template>
    <div class="sectionBoard">
        <div class="addSection" @click="goRouter('/newPost')">
            <i class="el-icon-edit"></i><span>发布帖子</span>
        </div>
        <div class="sectionBoard-container">
            <div class="sectionBoard-header">热门版块</div>
            <div class="sectionBoard-body">
                <div class="sectionBoard-item" v-for="item in sectionList" @click="goRouter('/centerSection',item.id)">
                    {{item.typeName}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            sectionList: []
        }
    },
    methods:{
        goRouter(item,id){
            this.$router.push({path: item, query: {id:id}});
        },
        getData(){
            var url = this.$rootUrl + "/api/forum/getType";
            const options = {
                method: 'GET',
                url: url,
                data: {}
            };
            this.$axios(options).then((res) => {
                let item = res.data.data;
                if (item.code == 0) {
                    this.sectionList = item.data;
                }
            })
        }
    },
    created(){
        this.getData();
    }
}
</script>
<style lang='less'>
    .sectionBoard{
    .sectionBoard-container {
        margin: 10px auto;
        width: 280px;
        margin-left: 10px;
        border: 1px solid #e6e6e6;
        background-color: #fff;
        padding: 0 15px 10px;
        box-shadow: 1px 1px 10px #e2e2e2;
        font-family: "微软雅黑", Arial, Helvetica, sans-serif;

    .sectionBoard-header {
        height: 50px;
        display: flex;
        align-items: center;
        font-size: 18px;
        color: #333;
    }

    .sectionBoard-body {
        border-top: 1px solid #e6e6e6;
        padding-top: 15px;
        width: 100%;
        margin: auto;

    .sectionBoard-item {
        cursor: pointer;
        padding: 8px;
        color: #666;

    &:nth-child(even) {
         background-color: #f7f7f7;
     }

    &:hover {
         color: #00a7ea;
     }

    }
    }
    }
    .addSection {
        cursor: pointer;
        box-shadow: 1px 1px 10px #e2e2e2;
        margin: 10px 0;
        margin-left: 10px;
        width: 310px;
        height: 50px;
        color: #fff;
        background-color: #00a7ea;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;

    i {
        margin-right: 10px;
    }

    }
    }
</style>