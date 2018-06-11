import fetch from '@/api'

// 客户统计
export function getCustomStatistics() {
    return fetch({
        method: 'get',
        url: `/customs/statistics`
    })
}

// 合同统计
export function getContractsStatistics() {
    return fetch({
        method: 'get',
        url: `/contracts/statistics`
    })
}

// 项目统计
export function getProjectStatistics() {
    return fetch({
        method: 'get',
        url: `/projectOperations/statistics`
    })
}

// 集装箱追踪
export function getContainerTrack(params) {
    return fetch({
        method:'get',
        url:`/container/record`,
        params
    })
}
