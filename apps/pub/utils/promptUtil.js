/**
 * Created by shaochj on 2017/3/17.
 * 公共提示方法
 * showConfirm：确认／取消提示框
 * showMessage：消息提示框
 */
import Vue from 'vue';

/**
 *
 * 提示框公共方法
 *title:标题
 * message:消息内容
 * confirmFunc：确认回调函数
 * type:消息类型：success, warning, info, error
 * cancelFunc：取消回调函数
 * confirmButtonText：	确定按钮的文本内容
 * cancelButtonText：取消按钮的文本内容
 */
export function showConfirm(title,message,confirmFunc,type,cancelFunc,confirmButtonText,cancelButtonText){

    if(!confirmButtonText){
        confirmButtonText = '确定';
    }
    if(!cancelButtonText){
        cancelButtonText = '取消';
    }
    if(!type){
        type = 'warning';
    }
    new Vue().$confirm(message, title, {
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        type: type
    }).then(function(){
        confirmFunc();
    }).catch(function(){
        if (typeof(eval(cancelFunc)) == "function") {
            cancelFunc();
        }
    });
}
/**
 *
 * 提示框公共方法
 *title:标题
 * message:消息内容
 * type:消息类型：success, warning, info, error
 * duration：显示时间, 毫秒。设为 0 则不会自动关闭
 * offset：偏移的距离
 */
export function showMessage(title,message,type,duration,offset){

    if(!duration){
        duration = 2000;//毫秒
    }
    if(!offset){
        offset = 30;//偏移量
    }
    new Vue().$notify(
        {
            title: title,
            message: message,
            type:type,
            duration:duration,
            offset:offset
        }
    );
}
export function timeDate(time, type) {
    var D = new Date(time);
    var Y = D.getFullYear();
    var M = D.getMonth() + 1;
    var DD = D.getDate();
    var HH = D.getHours();
    var MM = D.getMinutes();
    var SS = D.getSeconds();
    if (M < 10) {
        M = '0' + M;
    }
    if (DD < 10) {
        DD = '0' + DD;
    }
    if (HH < 10) {
        HH = '0' + HH;
    }
    if (MM < 10) {
        MM = '0' + MM;
    }
    if (SS < 10) {
        SS = '0' + SS;
    }
    if (type == 'date') {
        return Y + '-' + M + '-' + DD
    }
    if (type == 'datetime') {
        return Y + '-' + M + '-' + DD + '  ' + HH + ':' + MM + ':' + SS;
    }
    if (type == 'time') {
        return HH + ':' + MM + ':' + SS;
    }
}

