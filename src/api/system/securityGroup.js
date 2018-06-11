import fetch from '@/api'

export function getSecurityGroupList(params) {
    return fetch({
        method:'get',
        url:`/processPermissions`,
        params,
    })
}

export function addSecurityGroup(data) {
    return fetch({
        method:'post',
        url:'/processPermissions',
        data,
    })
}

export function updateSecurityGroup(id,data) {
    return fetch({
        method:'put',
        url:`/processPermissions/${id}`,
        data,
    })
}

export function deleteSecurityGroup(id) {
    return fetch({
        method:'delete',
        url:`/processPermissions/${id}`,
    })
}
