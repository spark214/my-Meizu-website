<template>
  <div>
    <div>
      <input type="text" id="input" value=""/>
      <input type="button" id="code" onclick="createCode()"/>
      <input type="button" value="验证" onclick="validate()"/>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        code
      }
    },
    methods: {
      createCode(){
    //首先默认code为空字符串
    code = '';
    //设置长度，这里看需求，我这里设置了4
    var codeLength = 4;
    var codeV = document.getElementById('code');
    //设置随机字符
    var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
    //循环codeLength 我设置的4就是循环4次
    for(var i = 0; i < codeLength; i++){
      //设置随机数范围,这设置为0 ~ 36
      var index = Math.floor(Math.random()*36);
      //字符串拼接 将每次随机的字符 进行拼接
      this.code += random[index];
    }
    //将拼接好的字符串赋值给展示的Value
    codeV.value = this.code;
  },
      //下面就是判断是否== 的代码，无需解释
     validate(){
    var oValue = document.getElementById('input').value.toUpperCase();
    if(oValue ==0){
      alert('请输入验证码');
    }else if(oValue != code){
      alert('验证码不正确，请重新输入');
      oValue = ' ';
      createCode();
    }else{
      window.open('http://www.baidu.com','_self');
    }
  }
    },
    mounted(){
      createCode()
    }
  }
</script>
<style>
  #code {
    font-family: Arial;
    font-style: italic;
    font-weight: bold;
    border: 0;
    letter-spacing: 2px;
    color: blue;
  }
</style>
