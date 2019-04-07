import _ from 'lodash';

//解析导入数据
export const analyzeData = function (analyzeName,data,headMapping) {
  if(analyzeName === 'mapHeader'){
    let importData = [];
    for (let item of data) {
      let obj = {};
      for (let key in item) {
        for (let childItem of headMapping) {
          if (key === childItem.header) {
            obj[childItem.key] = item[key];
            break;
          }
        }
      }
      importData.push(obj);
    }
    return importData;
  }
};
// 处理导入的数据
export const dealFile = function (dealName,data) {
  if(dealName === 'exceptNull'){
    let result = {};
    if (data.length <= 0) {
      result = {
        error:true,
        msg:'请导入正确信息'
      };
    } else {
      result = {
        error:false,
        data:data
      };
    }
    return result;
  }
};
