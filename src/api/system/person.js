import fetch from '@/api'

export function getPersonList(params) {
    return fetch({
        method: 'get',
        url: `/persons`,
        params,
    })
}
// 根据id查详情
export function getPerson(id) {
    return fetch({
        method: 'get',
        url: `/persons/${id}`
    })
}

// 根据name查详情
export function getPersonName(userName) {
    return fetch({
        method: 'get',
        url: `/persons/account/${userName}`
    })
}


export function addPerson(data) {
    return fetch({
        method: 'post',
        url: '/persons',
        data,
    })
}

export function updatePerson(id, data) {
    return fetch({
        method: 'put',
        url: `/persons/${id}`,
        data,
    })
}

export function deletePerson(id) {
    return fetch({
        method: 'delete',
        url: `/persons/${id}`,
    })
}
// 注销或启用
export function changePersonStatus(id) {
    return fetch({
        method: 'post',
        url: `/persons/${id}/status`,
    })
}
//重置密码

export function resetPersonPassword(id) {
    return fetch({
        method: 'post',
        url: `/persons/${id}/resetPassword`,
    })
}
