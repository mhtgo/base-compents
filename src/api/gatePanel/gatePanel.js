import fetch from '@/api'

/**
 * 工作台-到达接车确认
 * @param data
 */
export function acceptanceConfirmation(data) {
    return fetch({
        method: 'post',
        url: '/trainJobPlan/acceptanceConfirmation',
        data
    })
}

/**
 * 工作台-到达确报录入
 * 17点57分 完成
 * @param data
 */
export function arrive(data) {
    return fetch({
        method: 'post',
        url: '/trainJobPlan/arrive',
        data
    })
}

/**
 * 工作台-接运量
 *
 * @param data
 */
export function receive(params) {
    return fetch({
        method: 'get',
        url: `/trainJobPlan/receive`,
        params
        // data
    })
}

/**
 * 工作台-发送
 * @param data
 */
export function depart(data) {
    return fetch({
        method: 'post',
        url: '/trainJobPlan/depart',
        data
    })
}

/**
 * 工作台-发运量
 * @param data
 */
export function sendOut(params) {
    return fetch({
        method: 'get',
        url: `/trainJobPlan/sendOut`,
        params
    })
}

/**
 * 工作台-到达列表
 * @param data
 */
export function arriveList(params) {
    return fetch({
        method: 'get',
        url: '/trainJobPlan/arriveList',
        params
    })
}

/**
 * 工作台-发送列表
 * @param params
 */
export function sendList(params) {
    return fetch({
        method: 'get',
        url: '/trainJobPlan/sendList',
        params
    })
}


/**
 * 工作台
 * @param {*} data
 */
// export function records(param) {
//     console.log(param);
//     return fetch({
//         method: 'get',
//         url: `/trainJobPlan/records`,
        // url: `/trainJobPlan/records?search_EQ_recordType=${param.search_EQ_recordType}`,
//         param
//     })
// }

/**
 * 工作台-发送列表
 * @param data
 */
export function records(params) {
    return fetch({
        method: "get",
        url: "/trainJobPlan/records",
        params
    });
}

/**
 * 工作台-到达列表-删除
 */
export function delArrive(id) {
    return fetch({
        method: 'delete',
        url: `/trainJobPlan/arriveList/${id}`
    })
}

/**
 * 回填
 * @param {*} id
 */
// export function searchArrive(id) {
//     return fetch({
//         method: 'get',
//         url: '/trainJobPlan/arrive?search_LIKE_containerNo='+id
//     })
// }

//
// /**
//  * 回填(new)
//  * @param {*} id
//  */
// export function searchArrive(id) {
//     return fetch({
//         method: 'get',
//         url: '/containerJob/arrive?containerNo='+id
//     })
// }

/**
 * 回填(new)
 * @param {*} id
 * 委托里未受理未作业的箱
 */
export function searchArrive(id) {
    return fetch({
        method: 'get',
        url: '/entrust/detail?search_LIKE_containerNo='+id
    })
}


export function wagonInPortInfo(id) {
    return fetch({
        method: 'get',
        url: `/wagonInPortInfo?search_LIKE_wagonNo=${id}`
    })
}

