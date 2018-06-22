 import Axios from "axios"
 import Vue from 'vue';
export default {
    loadUtil: function(){
        Date.prototype.format = function(fmt) {
            var o = {
                "M+" : this.getMonth()+1,                 //月份
                "d+" : this.getDate(),                    //日
                "h+" : this.getHours(),                   //小时
                "m+" : this.getMinutes(),                 //分
                "s+" : this.getSeconds(),                 //秒
                "q+" : Math.floor((this.getMonth()+3)/3), //季度
                "S"  : this.getMilliseconds()             //毫秒
            };
            if(/(y+)/.test(fmt)) {
                fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
            }
            for(var k in o) {
                if(new RegExp("("+ k +")").test(fmt)){
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                }
            }
            return fmt;
        }
    },
    /**
     * 校验特殊字符
     * @param str
     * @returns {boolean} 包含以下字符返回true
     */
    patternSpecial:function(str){
        var pattern = new RegExp("[`~!@#¥$^&*=|{}':;',\\[\\].<>/?~！@#￥……&*——|{}【】‘；：”“'。，、？]");

        return pattern.test(str);
    },
    /**
     * 数字千分位格式化
     * @param num
     * @returns {string}
     */
    toThousands:function(num){
        var num = (num || 0).toString(), result = '';
        while (num.length > 3) {
            result = ',' + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
        }
        if (num) { result = num + result; }
        return result;
    },

    /**
     * 判断是否数组
     *
     **/
    isArray:function(value){
        if (value instanceof Array || 
            (!(value instanceof Object) && 
            (Object.prototype.toString.call((value)) == '[object Array]') || 
            typeof value.length == 'number' && 
            typeof value.splice != 'undefined' && 
            typeof value.propertyIsEnumerable != 'undefined' && 
            !value.propertyIsEnumerable('splice'))) { 
        return true; 
        }
        return false;
    },

    //验证汉字及英文
    formValidate_Name: function(value){
        var regex = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z]){1,100}$");
        return regex.test(value);
    },

    //验证汉字及英文
    formValidate_Code: function(value){
        var regex = new RegExp("^([a-zA-Z0-9]){1,100}$");
        return regex.test(value);
    },

    //验证纯数字
    formValidate_Number: function(value){
        var regex = new RegExp("^([0-9]){1,100}$");
        return regex.test(value);
    },

    mergeJsonObject : function (jsonbject1, jsonbject2) {
        var resultJsonObject={};
        for(var attr in jsonbject1){
            resultJsonObject[attr]=jsonbject1[attr];
        }
        for(var attr in jsonbject2){
            resultJsonObject[attr]=jsonbject2[attr];
        }

        return resultJsonObject;
    },
    timeDate:function (time,type) {
     var D = new Date(time);
     var Y = D.getFullYear();
     var M = D.getMonth() + 1;
     var DD = D.getDate();
     var HH = D.getHours();
     var MM = D.getMinutes();
     var SS = D.getSeconds();
     if(M < 10) {
         M = '0' + M;
     }
     if(DD < 10) {
         DD = '0' + DD;
     }
     if(HH < 10) {
         HH = '0' + HH;
     }
     if(MM < 10) {
         MM = '0' + MM;
     }
     if(SS < 10) {
         SS = '0' + SS;
     }
     if (type=='date'){
         return Y + '-' + M + '-' + DD
     }
     if (type=='datetime'){
         return Y + '-' + M + '-' + DD + '  ' + HH + ':' + MM + ':' + SS;
     }

 }
}
