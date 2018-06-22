var exportReslut = {
    validatTel:function (rule, value, callback) {
        //校验区号-xxx格式的电话号码
        // (\(\d{3,4}\)|\d{3,4}-|\s)?\d{8} 
        // /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/   
        if (value && !(/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value))) {
            callback(new Error('请输入正确的电话号码'));
        } else {
            callback();
        }
    },
    validatTelSplit:function (rule, value, callback) {
        //逗号隔开的区号-xxx格式的电话号码
        if (value && !(/^((0\d{2}-\d{8}(-\d{1,4})?)|(0\d{3}-\d{7,8}(-\d{1,4})?)((,)0\d{2}-\d{8}(-\d{1,4})?)|(0\d{3}-\d{7,8}(-\d{1,4})?){0})$/.test(value))) {
            callback(new Error('请输入正确的电话号码'));
        } else {
            callback();
        }
    },
    validatMobile:function (rule, value, callback) {
        //手机号校验
        if (value && (!(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,0-9]))\d{8}$/.test(value)))) {
            callback(new Error('请输入正确的手机号'));
        } else {
            callback();
        }
    },
    validatMobilOrTel:function(rule, value, callback){
        //手机号校验或者电话校验
        if (value && (!(/^((\+?86)|(\(\+86\)))?\d{3,4}-\d{7,8}(-\d{3,4})?$|^((\+?86)|(\(\+86\)))?1\d{10}$/.test(value)))) {
            callback(new Error('请输入正确的电话号'));
        } else {
            callback();
        }
    },
    validatNumbers:function(rule, value, callback){
        //保留两位小数的数字校验
        if (value && (!(/^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/.test(value)))) {
            callback(new Error('金额保留位两位小数'));
        } else {
            callback();
        }
    },
    
    validatPostCode:function(rule, value, callback){
        //邮编校验
        if (value && (!(/^[0-9][0-9]{5}$/.test(value)))) {
            callback(new Error('请输入正确的邮编'));
        } else {
            callback();
        }
    },
    validatFax:function (rule, value, callback) {
        if (value && (!(/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/.test(value)))) {
            callback(new Error('请输入正确的传真号'));
        } else {
            callback();
        }
    },
    validateIP:function(rule, value, callback)
    {
        var reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
        if (value && (!reg.test(value))) {
            callback(new Error('请输入正确的IP'));
        } else {
            callback();
        }
    },
    validatePort:function(rule, value, callback){
        var reg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
        if (value && (!reg.test(value))) {
            callback(new Error('请输入正确的端口'));
        } else {
            callback();
        }
    }
}
module.exports = exportReslut;