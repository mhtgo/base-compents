import fetch from '@/api'

// 获取项目分页
export function projectList(params) {
  return fetch({
    method: 'get',
    url: `/projectOperations`,
    params,
  })
}


// 根据ID查询项目详情
export function getProjectDetail(id) {
  return fetch({
    method: 'get',
    url: `/projectOperations/${id}`
  })
}

// 根据ID删除项目
export function delProject(id) {
  return fetch({
    method: 'delete',
    url: `/projectOperations/${id}`
  })
}

// 根据ID获取项目的基础信息
export function getProjectBaseInfo(id) {
  return fetch({
    method: 'get',
    url: `/projectOperations/${id}/baseInfo`
  })
}

// 根据ID获取正式项目的合同信息(步骤二)
export function getProjectContractNormal(id) {
  return fetch({
    method: 'get',
    url: `/projectOperations/${id}/contract`
  })
}

// 根据ID获取临时客户的信息(步骤二)
export function getProjectContractTemp(id) {
  return fetch({
    method: 'get',
    url: `/projectOperations/temp/${id}/customer`
  })
}

// 获取项目的执行步骤信息
export function getStep(id) {
  return fetch({
    method: 'get',
    url: `/projectOperations/${id}/step`
  })
}

// 项目步骤一,保存提交
export function saveProjectBaseInfo(data) {
  return fetch({
    method: 'post',
    url: `/projectOperations`,
    data,
  })
}

// 项目步骤一,修改提交
export function updateProjectBaseInfo(id, data) {
  return fetch({
    method: 'put',
    url: `/projectOperations/${id}`,
    data,
  })
}

// 项目步骤二,提交(正式合同)
export function updateProjectContractNormal(id, data) {
  return fetch({
    method: 'post',
    url: `/projectOperations/${id}/contract`,
    data,
  })
}

// 项目步骤二,提交(项目临时客户)
export function updateProjectContractTemp(id, data) {
  return fetch({
    method: 'post',
    url: `/projectOperations/temp/${id}/customer`,
    data,
  })
}

// 项目作废
export function voidProject(id,data) {
    return fetch({
        method:'post',
        url:`/projectOperations/${id}/invalid`,
        data
    })
}

// 项目冻结
export function freezeProject(id,data={}) {
    return fetch({
        method:'post',
        url:`/projectOperations/${id}/freeze`,
        data
    })
}

// 项目解冻
export function unFreezeProject(id,data={}) {
    return fetch({
        method:'post',
        url:`/projectOperations/${id}/unFreeze`,
        data,
    })
}
// 项目完结
export function finishProject(id,data={}) {
    return fetch({
        method:'post',
        url:`/projectOperations/${id}/finish`,
        data
    })
}
