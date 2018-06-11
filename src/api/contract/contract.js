import fetch from '@/api'

// 查询合同分页
export function getContractList(params) {
    return fetch({
        method: 'get',
        url: '/contracts',
        params
    })
}

// 根据ID查询合同
export function getContractInfo(id) {
    return fetch({
        method: 'get',
        url: `/contracts/${id}`
    })
}

// 新增合同
export function addContract(data) {
    return fetch({
        method: 'post',
        url: `/contracts`,
        data
    })
}

// 根据ID修改合同
export function updateContract(id, data={}) {
    return fetch({
        method: 'put',
        url: `/contracts/${id}`,
        data
    })
}

// 根据ID删除合同
export function delContract(id) {
    return fetch({
        method:'delete',
        url:`/contracts/${id}`,
    })
}

// 合同补充协议
export function contractSideAgreement(id, data={}) {
    return fetch({
        method: 'post',
        url: `/contracts/${id}/contractSideAgreement`,
        data
    })
}

// 合同提交并送审
export function contractApprovalPass(id) {
    return fetch({
        method: 'post',
        url: `/contracts/${id}/approvalPass`
    })
}

// 合同作废
export function contractVoid(id,data={}) {
    return fetch({
        method:'post',
        url:`/contracts/${id}/toVoid`,
        data,
    })
}
// 合同签订
export function contractSign(id,data={}) {
    return fetch({
        method:'post',
        url:`/contracts/${id}/sign`,
        data,
    })
}
