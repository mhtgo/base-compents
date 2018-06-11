import fetch from '@/api'

export function getInterfaceManagementList(params) {
    return fetch({
        method:'get',
        url:`/interfaceManagement`,
        params,
    })
}

export function addInterfaceManagement(data) {
    return fetch({
        method:'post',
        url:'/interfaceManagement',
        data,
    })
}

export function updateInterfaceManagement(id,data) {
    return fetch({
        method:'put',
        url:`/interfaceManagement/${id}`,
        data,
    })
}

