import fetch from '@/api'

// 登陆
export function login(params) {
    return fetch({
        method: 'post',
        url: '/ajaxLogin',
        params
    })
}
// 注销
export function out() {
    return fetch({
        method: 'get',
        url: '/mylogout'
    })
}

// 根据token重新获取个人信息
export function getAgain() {
    return fetch({
        method: 'get',
        url: '/persons/loginUser'
    })
}

// 临时
export function out2() {
    return fetch({
        method: 'get',
        url: '/unauth'
    })
}
// 修改当前用户密码
export function updataPwd(data) {
    return fetch({
        method: 'put',
        url: '/persons/password',
        data
    })
}
// 修改指定用户密码（比如管理员修改某员工密码）
export function updataPwdAdmin(id, data) {
    return fetch({
        method: 'put',
        url: '/persons/${id}/password',
        data
    })
}