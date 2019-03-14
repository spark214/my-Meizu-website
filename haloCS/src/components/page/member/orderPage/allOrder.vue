<template>
    <div>
        <v-order v-if="order.length>0" :datas="order"></v-order>
        <v-unfound v-if="order.length==0"></v-unfound>
    </div>
</template>
<script>
    import vOrder from '../common/orderTable';
    import vUnfound from '../common/unfound';
    export default {
        data() {
            return {
                order: [],
            }
        },
        methods: {
            getData(){
                var token = sessionStorage.getItem('accessToken');
                var url = this.$rootUrl + "/api/order/myOrder";
                const options = {
                    method: 'POST',
                    headers: {'token': token},
                    url: url,
                    data: {}
                };
                this.$axios(options).then((res) => {
                    let item = res.data.data;
                    if (item.data) {
                        if (item.errorCode == 0) {
                            this.order = item.data.orderDetailList;
                        }
                    }
                })
            }
        },
        components: {
            vOrder, vUnfound
        },
        created(){
            this.getData()
        }
    }
</script>
<style>

</style>
