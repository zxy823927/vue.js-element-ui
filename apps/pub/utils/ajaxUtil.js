import Axios from "axios"
import Vue from 'vue';
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true;
import { showMessage } from './promptUtil'
export default {
	/**
	 * 封装ajax的get请求
	 * @param url
	 * @param params
	 * @param successFun
	 * @param failFun
	 * @param errorFun
	 */
	getJson: function(url, params, successFun, failFun, errorFun) {
		var req = {
			url: url,
			method: 'get',
			params: params,
			async: false,
			headers: {
				'Token': sessionStorage.getItem("Token")
			}
		};
		Axios(req).catch(
			function(err) {
				console.log(err.response)
				if(err.response && err.response.data && err.response.data.status == 440) {
					window.onTokenExpireLoginAgain();
				}
				if(err.response && err.response.data && err.response.data.status == 404) {
					window.onTokenExpireLoginAgain();
				}
				if(typeof errorFun == "function")
					errorFun(err.response.data)
				else {
					showMessage('请求异常', err.response && err.response.data.message ? err.response.data.message : "服务器通讯异常，请检查网络", 'error');
				}
			}
		).then(
			function(res) {
				successFun(res ? res.data : res);
			}
		)
	},
	postJson: function(url, params, successFun, failFun, errorFun) {
		var param = {
			data: params,
			headers: {
				// 'pushToken': sessionStorage.getItem('Token'),
							   'staffId':localStorage.getItem('staffId'),
							   'storeId':localStorage.getItem('storeId')
				// 'staffId': '10000009',
				// 'storeId': '020112'
			}
		}
		var req = {
			url: url,
			method: 'POST',
			data: param

		};
		Axios(req).catch(
			function(err) {
				if(err.response && err.response.data && err.response.data.status == 440) {
					window.onTokenExpireLoginAgain();
				}
				if(typeof errorFun == "function") {

					errorFun(err.response.data)
				} else {
					showMessage('请求异常', err.response && err.response.data.message ? err.response.data.message : "服务器通讯异常，请检查网络", 'error');
				}
			}
		).then(
			function(res) {
				if(res) {
					if(res.data.status == 440) {
						window.onTokenExpireLoginAgain();
						return false;
					}
				}
				successFun(res ? res.data : res);
			}
		);
	},
	putJson: function(url, params, successFun, failFun, errorFun) {
		console.log(params);
		var req = {
			url: url,
			method: 'put',
			data: params,
			headers: {
				'Token': sessionStorage.getItem("Token")
			},
		};
		Axios(req).catch(
			function(err) {
				if(err.response && err.response.data && err.response.data.status == 440) {
					window.onTokenExpireLoginAgain();
				}
				if(typeof errorFun == "function") {

					errorFun(err.response.data)
				} else {
					showMessage('请求异常', err.response && err.response.data.message ? err.response.data.message : "服务器通讯异常，请检查网络", 'error');
				}
			}
		).then(
			function(res) {
				successFun(res ? res.data : res);
			}
		);
	},
	postData: function(url, params, successFun, failFun) {
		Axios({
			url: url,
			method: 'POST',
			data: params
		}).then(function(res) {
			successFun(res);
		}).catch(function(res) {
			failFun(res)
		})
	},
	deleteJson: function(url, params, successFun, failFun, errorFun) {
		var req = {
			url: url,
			method: 'DELETE',
			params: params,
			async: false,
			headers: {
				'Token': sessionStorage.getItem("Token")
			}
		};
		Axios(req).catch(
			function(err) {
				if(err.response && err.response.data && err.response.data.status == 440) {
					window.onTokenExpireLoginAgain();
				}
				if(typeof errorFun == "function")
					errorFun(err.response.data)
				else {
					showMessage('请求异常', err.response && err.response.data.message ? err.response.data.message : "服务器通讯异常，请检查网络", 'error');
				}
			}
		).then(
			function(res) {
				successFun(res ? res.data : res);
			}
		)
	},
	formJson:function (url,dataJson,successFun) {
        Axios({
            url: url,
            method: 'post',
            data:dataJson,
            transformRequest: [function (res) {
                successFun(res ? res.data : res)
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
}