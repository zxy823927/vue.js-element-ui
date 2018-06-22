import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './router/App.vue'
import routerConfig from './router/router.js'
import AMap from 'vue-amap';
import './pub/styles/iconfont/iconfont.css';
import './pub/styles/reset.css';
import mainUtil from '../pub/utils/mainUtil';
import VueDND from 'awe-dnd'

Vue.use(Router);
Vue.use(ElementUI);
Vue.use(AMap);
Vue.use(VueDND);

AMap.initAMapApiLoader({
    key: '01f5ef909a6d9bb75a9ea9ec70554554',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geocoder', 'AMap.Geolocation']
});
const router = new Router(routerConfig);

Vue.prototype.loginContext = JSON.parse(sessionStorage.getItem('loginContext'));
//加载一些工具类，如date.format()等
mainUtil.loadUtil();
new Vue({
    el: '#app',
    render: h => h(App),
    router: router
});
