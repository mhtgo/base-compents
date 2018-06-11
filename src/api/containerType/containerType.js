import fetch from '@/api'
// 箱型
export function getContainerTypeList(params) {
    return fetch({
        method: 'get',
        url: `/containerType`,
        params,
    })
}

export function addContainerType(data) {
    return fetch({
        method:'post',
        url:`/containerType`,
        data,
    })
}

export function updateContainerType(id,data) {
    return fetch({
        method:'put',
        url:`/containerType/${id}`,
        data,
    })
}

export function deleteContainerType(id) {
    return fetch({
        method:'delete',
        url:`/containerType/${id}`,
    })
}

//尺寸
export function getContainerSize(id) {
    return fetch({
        method:'get',
        url:`/containerSize`,
    })
}

// 在港箱查询
export function getContainerPort(params) {
    return fetch({
        method:'get',
        url:`/container/containerOnPort`,
        params,
    })
}
