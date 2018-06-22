var HTTP_URL_DEVW = "" //阿里云服务器环境地址
var IMG_UP_LOADE='';// 阿里云服务器环境地址 上传图片
var EXPORT_TABLE_URL='';

var resultHost = {
	BASEHOST: '', //电话吧
	UP_LOAd_IMG:'',//图片上传
	EXPORT_TABLE:EXPORT_TABLE_URL,
    BASEHOST1:''
}

if(process.env.NODE_ENV == 'production') {
	//正式环境
    resultHost.BASEHOST = HTTP_URL_DEVW + 'api/web'; //
    resultHost.UP_LOAd_IMG=IMG_UP_LOADE+'api/web';//活动专区
} else if(process.env.NODE_ENV == 'development') {
	//本地开发环境
	resultHost.BASEHOST = HTTP_URL_DEVW + 'api/web'; //
    resultHost.UP_LOAd_IMG=IMG_UP_LOADE+'api/web';//活动专区

} else if(process.env.NODE_ENV == 'devsvr') {
    resultHost.BASEHOST1 = HTTP_URL_DEVW + 'api/web1'; //
	//10.220.17.23  开发线上服务器

} else if(process.env.NODE_ENV == 'devtest') {
	//10.220.17.10  联调测试服务器   //××××××××××× 此环境已废弃

} else if(process.env.NODE_ENV == 'testnew') {
	//10.220.17.22  线上测试服务器，统一部署，用于替代10环境
	resultHost.BASEHOST1 = HTTP_URL_DEVW + 'api/web'; //
	resultHost.UP_LOAd_IMG=IMG_UP_LOADE+'api/web';//活动专区
} else if(process.env.NODE_ENV == 'aliyuntest') {
	//10.220.17.22  阿里云环境，模拟总部

} else if(process.env.NODE_ENV == 'datapre') {
	//10.220.17.22  阿里云环境，模拟总部

}
module.exports = resultHost;