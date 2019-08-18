//导入axios
import axios from 'axios'

//设置基地址
const http = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
})

export default http;

//请求拦截
http.interceptors.request.use(function (config) {
    //把你所有的请求拦下来
    //拦下来给你加一个请求头 请求头的内容是token
    config.headers.Authorization = window.localStorage.getItem('token')

    return config
}, function (error) {
    //发生错误的回调函数
    return Promise.reject(error);
})
//登录
export const login = ({ username, password }) => {
    return http.post('login', {
        username,
        password
    })
}
//获取左侧菜单权限
export const menus = () => {
    return http.get('menus')
}

//用户数据列表
export const users = ({ query, pagenum, pagesize }) => {
    return http.get('users', {
        //get请求如果提交的参数不是让你写在网址上
        params: {
            query,
            pagenum,
            pagesize,
        }
    })
}

// 新增用户的方法
export const addUsers = ({ username, password, email, mobile }) => {

    return http.post('users', {
        username,
        password,
        email,
        mobile
    });
}

// 修改用户状态
export const status = ({ uId, type }) => {
    return http.put(`users/${uId}/state/${type}`)
}

//删除用户
export const delUsers = ({ id }) => {
    return http.delete(`users/${id}`, {
        data: {
            id: id
        }
    })
}

//编辑用户
export const redUsers = ({ id, email, mobile }) => {
    return http.put(`users/${id}`, {
        id: id,
        email: email,
        mobile: mobile,
    })
}

//获取角色列表
export const getRoles = () => {
    return http.get('roles')
}

//分配用户角色
export const changeUserRole = ({ id, rid }) => {
    return http.put(`users/${id}/role`, {
        rid
    })
}

//显示权限列表
export const rights = (type) => {
    return http.get(`rights/${type}`)
}

//添加角色
export const addRole = ({ roleName, roleDesc }) => {
    return http.post('roles', {
        roleName,
        roleDesc,
    })
}
//删除角色
export const delRole=(id)=>{
    return http.delete(`roles/${id}`)
}
//编辑角色
export const editRole=({id,roleName,roleDesc})=>{
    return http.put(`roles/${id}`,{
        roleName,
        roleDesc
    })
}