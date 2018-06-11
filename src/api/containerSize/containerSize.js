import fetch from '@/api'

//尺寸
export function getContainerSize(id) {
    return fetch({
        method:'get',
        url:`/containerSize`,
    })
}

export function addContainerSize(data) {
    return fetch({
        method:'post',
        url:`/containerSize`,
        data,
    })
}

export function updateContainerSize(id,data) {
    return fetch({
        method:'put',
        url:`/containerSize/${id}`,
        data,
    })
}

export function deleteContainerSize(id) {
    return fetch({
        method:'delete',
        url:`/containerSize/${id}`,
    })
}
