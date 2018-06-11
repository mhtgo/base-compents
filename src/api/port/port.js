import fetch from '@/api'

export function getPortList(params) {
    return fetch({
        method: 'get',
        url: `/portAndStation`,
        params,
    })
}

export function addPort(data) {
    return fetch({
        method:'post',
        url:`/portAndStation`,
        data,
    })
}

export function updatePort(id,data) {
    return fetch({
        method:'put',
        url:`/portAndStation/${id}`,
        data,
    })
}

export function deletePort(id) {
    return fetch({
        method:'delete',
        url:`/portAndStation/${id}`,
    })
}
