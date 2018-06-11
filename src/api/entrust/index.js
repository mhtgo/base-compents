import fetch from '@/api'

// 查询委托分页
export function getEntrustList(params) {
    return fetch({
        method: 'get',
        url: '/entrust',
        params
    })
}

// 查询委托信息详情
export function getEntrustDetail(id, type) {
    return fetch({
        method: 'get',
        url: `/entrust/${id}/${type}`
    })
}

// zhuimeikeji 新增委托
export function addEntrust(data, type) {
    return fetch({
        method: 'post',
        url: `/entrust/${type}`,
        data
    })
}

// zhuimeikeji 编辑委托
export function editEntrust(data, id, type) {
    return fetch({
        method: 'put',
        url: `/entrust/${id}/${type}`,
        data
    })
}

// zhuimeikeji 根据ID删除委托
export function delEntrust(id) {
    return fetch({
        method:'delete',
        url:`/entrust/${id}`,
    })
}

// zhuimeikeji 根据ID作废委托
export function voidEntrust(id, data) {
    return fetch({
        method:'post',
        url:`/entrust/${id}/void`,
        data
    })
}

// zhuimeikeji 根据ID受理委托
export function acceptEntrust(id, data) {
    return fetch({
        method:'post',
        url:`/entrust/${id}/accept`,
        data
    })
}

// 完结
export function endEntrust(id,data) {
    return fetch({
        method:'post',
        url:`/entrust/${id}/end`,
        data
    })
}

// zhuimeikeji 委托统计
export function getEntrustStatistics() {
    return fetch({
        method: 'get',
        url: `/entrust/statistics`
    })
}

// 落空
export function goFail(id, data) {
    return fetch({
        method: 'post',
        url: `/entrust/${id}/fall`,
        data
    })
}

// 到达确报录入-集装箱信息回填(查询委托明细分页)
export function getContainerEntrustDetail(params) {
    return fetch({
        method:'get',
        url:`/entrust/detail`,
        params,
    })
}
