import fetch from '@/api'


// 查询客户分页
export function getCustomList(params) {
    return fetch({
        method: 'get',
        url: '/customs',
        params
    })
}

// 新增客户
export function addCustomer(data) {
    return fetch({
        method: 'post',
        url: `/customs`,
        data
    })
}

// 编辑客户信息
export function updateCustomer(id, data) {
    return fetch({
        method: 'put',
        url: `/customs/${id}`,
        data,
    })
}

// 查询客户信息详情
export function getCustomDetail(id) {
    return fetch({
        method: 'get',
        url: `/customs/${id}`
    })
}

// 根据ID删除客户
export function delCustomer(id) {
    return fetch({
        method: 'delete',
        url: `/customs/${id}`,
    })
}
