import fetch from '@/api'

// 计划统计
export function jobPlanStatistics(params) {
    return fetch({
        method:'get',
        url:`/jobPlan/statistics`,
        params,
    })
}

// 计划分页
export function jobPlanList(params) {
    return fetch({
        method:'get',
        url:`/jobPlan`,
        params,
    })
}

// 计划基础信息详情
export function jobPlanBaseInfo(id) {
    return fetch({
        method:'get',
        url:`/jobPlan/${id}`,
    })
}

// 获取计划ID的集装箱详情
export function getJobPlanContainerTable(params) {
    return fetch({
        method:'get',
        url:`/jobPlan/container`,
        params
    })
}

export function addJobPlanNZCC(data) {
    return fetch({
        method:'post',
        url:`/jobPlan/nzcc`,
        data,
    })
}
