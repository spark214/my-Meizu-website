<template>
  <div>
    <v-header></v-header>
    {{msg}}
  </div>
</template>
<script>
  import vHeader from '../common/header';

  export default {
    data(){
      return{
        msg:"index"
      }
    },
    components:{
      vHeader
    }
  }
</script>
