import fetch from '@/api'
// 分页
export function getRoleList(params) {
    return fetch({
        method:'get',
        url:`/roles`,
        params,
    })
}
// 详情
export function getRoleListOne(id) {
    return fetch({
        method:'get',
        url:`/roles/${id}`
    })
}
// 新增
export function addRole(data) {
    return fetch({
        method:'post',
        url:'/roles',
        data,
    })
}
// 编辑
export function updateRole(id,data) {
    return fetch({
        method:'put',
        url:`/roles/${id}`,
        data,
    })
}
// 删除
export function deleteRole(id) {
    return fetch({
        method:'delete',
        url:`/roles/${id}`,
    })
}
// 分配权限
export function disPower(id, data) {
    return fetch({
        method:'post',
        url:`/roles/${id}/permissions`,
        data
    })
}
// 获取权限
export function getPower(id) {
    return fetch({
        method:'get',
        url:`/roles/${id}/permissions`
    })
}