import fetch from '@/api'

export function getSystemDictionaryList(params) {
    return fetch({
        method:'get',
        url:`/sysDic`,
        params,
    })
}

export function addSystemDictionary(data) {
    return fetch({
        method:'post',
        url:'/sysDic',
        data,
    })
}

export function updateSystemDictionary(id,data) {
    return fetch({
        method:'put',
        url:`/sysDic/${id}`,
        data,
    })
}

export function deleteSystemDictionary(id) {
    return fetch({
        method:'delete',
        url:`/sysDic/${id}`,
    })
}

export function codeGetSysdic(params) {
    return fetch({
        method:'get',
        url:`/sysDic/dicCode`,
        params
    })
}

export function queryByOrgIdAndDicCode(params) {
    return fetch({
        method:'get',
        url:`/sysDic/queryByOrgIdAndDicCode`,
        params
    })
}
