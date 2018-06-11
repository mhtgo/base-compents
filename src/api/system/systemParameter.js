import fetch from '@/api'

export function getSystemParameterList(params) {
    return fetch({
        method:'get',
        url:`/parameters`,
        params,
    })
}

export function addSystemParameter(data) {
    return fetch({
        method:'post',
        url:'/parameters',
        data,
    })
}

export function updateSystemParameter(id,data) {
    return fetch({
        method:'put',
        url:`/parameters/${id}`,
        data,
    })
}

export function deleteSystemParameter(id) {
    return fetch({
        method:'delete',
        url:`/parameters/${id}`,
    })
}
