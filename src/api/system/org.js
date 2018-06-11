import fetch from '@/api'

export function getOrgList(params) {
    return fetch({
        method: 'get',
        url: `/orgs`,
        params,
    })
}

export function addOrg(data) {
    return fetch({
        method: 'post',
        url: '/orgs',
        data,
    })
}

export function updateOrg(id, data) {
    return fetch({
        method: 'put',
        url: `/orgs/${id}`,
        data,
    })
}


export function cancelOrg(id, data) {
    return fetch({
        method: 'post',
        url: `orgs/${id}/cancellation`,
        data,
    })
}
