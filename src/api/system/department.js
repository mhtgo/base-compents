import fetch from '@/api'

export function getDepartmentList(params) {
    return fetch({
        method: 'get',
        url: `/depts`,
        params,
    })
}

export function addDepartment(data) {
    return fetch({
        method: 'post',
        url: `/depts`,
        data,
    })
}

export function updateDepartment(id, data) {
    return fetch({
        method: 'put',
        url: `/depts/${id}`,
        data,
    })
}

export function deleteDepartment(id) {
    return fetch({
        method: 'delete',
        url: `/depts/${id}`,
    })
}
