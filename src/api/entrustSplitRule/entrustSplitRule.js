import fetch from '@/api'

export function getEntrustSplitRuleList(params) {
    return fetch({
        method: 'get',
        url: `/entrustSplitRule`,
        params,
    })
}

// 查询详情
export function getEntrustSplitRule(id) {
    return fetch({
        method: 'get',
        url: `/entrustSplitRule/${id}`,
    })
}

// 新增
export function addEntrustSplitRule(data) {
    return fetch({
        method: 'post',
        url: `/entrustSplitRule`,
        data
    })
}

// 编辑
export function updateEntrustSplitRule(id,data) {
    return fetch({
        method: 'put',
        url: `/entrustSplitRule/${id}`,
        data
    })
}

// 删除
export function deleteEntrustSplitRule(id) {
    return fetch({
        method:'delete',
        url:`/entrustSplitRule/${id}`
    })
}
