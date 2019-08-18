import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
//导入样式
import './assets/css/base.css'

//导入饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//use一下
Vue.use(ElementUI);

//导入组件
import bread from './components/bread.vue'
Vue.component('bread', bread)

//导入封装的路由对象
import router from './router/router'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
