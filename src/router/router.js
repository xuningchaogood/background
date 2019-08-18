//导入vue
import Vue from 'vue'

import VueRouter from 'vue-router'
//use一下
Vue.use(VueRouter)
//导入组件
import login from '../views/login.vue'
import index from '../views/index.vue'
import users from '../views/userlist.vue'
import rights from '../views/rights.vue'
import roles from '../views/rolelist.vue'
import goods from '../views/goods.vue'
//设置组件规则
const routes = [
    { path: '/login', component: login },
    {
        path: '/index', component: index, children: [
            { path: 'users', component: users },
            { path: 'rights', component: rights },
            { path: 'roles', component: roles },
            { path: 'goods', component: goods },
        ]
    },
]

//实例化组件
const router = new VueRouter({
    routes
})
//全局导航守卫
// router.beforeEach((to, from, next) => {
//     if (to.path.indexOf('index') != -1) {
//         if (window.localStorage.getItem('token')) {
//             //
//             next();
//         } else {
//             //没 值
//             //提示他先登录
//             Vue.prototype.$message.error('请先登录')
//             //打回登录页
//             router.push('/login')
//         }
//     } else {
//         //访问其他页
//         next();
//     }
// })
//暴露router
export default router