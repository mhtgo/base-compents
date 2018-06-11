import fetch from '@/api'

/**
 * 统计-集装箱作业量
 * @param {*} data
 */
export function containerJobStatistics(data) {
  return fetch({
    method: 'get',
    url: '/containerJob/statistics',
    data
  })
}

/**
 * 进场-取消作业
 * @param {*} data
 */
export function enterCancel(data) {
  return fetch({
    method: 'post',
    url: '/containerJob/enter/cancel',
    data
  })
}

/**
 * 拆箱-分页
 * @param {*} data
 */
export function unbox(params) {
  return fetch({
    method: 'get',
    url: '/containerJob/unbox',
      params
  })
}

/**
 * 拆箱-批量拆箱
 * @param {*} data
 */
export function unboxBatch(data) {
  return fetch({
    method: 'post',
    url: '/containerJob/unbox/batch',
    data
  })
}

/**
 * 拆箱-选择拆箱
 * @param {*} data
 */
export function unboxChoice(data) {
  return fetch({
    method: 'post',
    url: '/containerJob/unbox/choice',
    data
  })
}


/**
 * 拆箱-取消作业
 * @param {*} data
 */
export function unboxCancel(data) {
  return fetch({
    method: 'post',
    url: '/containerJob/unbox/cancel',
    data
  })
}


// 上传
export function unboxUpload(data) {
    return fetch({
        method:'post',
        url:`/containerJob/unbox/records`,
        data
    })
}

/**
 * 内转出场-分页
 * @param {*} data
 */
export function NZCC(params) {
  return fetch({
    method: 'get',
    url: '/containerJob/NZCC',
      params
  })
}

/**
 * 内转入场-分页
 */
export function NZRC(params) {
  return fetch({
    method: 'get',
    url: '/containerJob/NZRC',
      params
  })
}

/**
 * 拆箱-记录查询(附件)
 * @param {*} data
 */
export function unboxRecords(params) {
  return fetch({
    method: 'get',
    url: '/containerJob/unbox/records',
      params
  })
}

/**
 * 拆箱-记录删除(附件)
 * @param {*} data
 */
export function delUnboxRecords(id) {
    return fetch({
        method: 'delete',
        url: `/containerJob/unbox/records/${id}`,
    })
}

/**
 * 大堆箱提箱-导入箱
 */
export function heapById(id) {
  return fetch({
    method: 'post',
    url: `/heap/${id}`,
  })
}

/**
 * 大堆箱提箱-通过计划编号查箱列表
 */
export function planNoById(id) {
  return fetch({
    method: 'get',
    url: `/container/${id}/planNo`,
  })
}

/**
 * 进场-分页
 */
export function containerEnter(params) {
  return fetch({
    method: 'get',
    url: `/containerJob/enter`,
      params,
  })
}

/**
 * 选择进场
 */
export function enterChoice(data) {
  return fetch({
    method: 'post',
    url: `/containerJob/enter/choice`,
    data,
  })
}

/**
 * 进场-批量进场
 * @param {*} data
 */
export function enterBatch(data) {
  return fetch({
    method: 'post',
    url: `/containerJob/enter/batch`,
    data,
  })
}

/**
 * 日历统计
 * @param {*} data
 */
export function calendar(params) {
  return fetch({
    method: 'get',
    url: `/containerJob/calendar`,
      params,
  })
}

// 日历下的统计
export function getWorkStatistics(params) {
    return fetch({
        method: 'get',
        url: `/containerJob/statistics`,
        params,
    })
}

/**
 * 指定箱提箱-批量提箱
 * @param {*} data
 */
export function suitcaseBatch(data) {
  return fetch({
    method: 'post',
    url: `/containerJob/suitcase/batch`,
    data,
  })
}

/**
 * 指定箱提箱-取消作业
 * @param {*} data
 */
export function specifyCarCancel(data) {
  return fetch({
    method: 'post',
    url: `/containerJob/suitcase/cancel`,
    data,
  })
}

/**
 * 指定箱提箱-提箱
 * @param {*} data
 */
export function suitcaseChoice(data) {
  return fetch({
    method: 'post',
    url: `/containerJob/suitcase/choice`,
    data,
  })
}

/**
 * 指定箱提箱-分页
 * @param {*} data
 */
export function suitcase(params) {
  return fetch({
    method: 'get',
    url: `/containerJob/suitcase`,
      params,
  })
}

/**
 * 大堆箱提箱-分页
 * @param {*} data
 */
export function heapCar(params) {
  return fetch({
    method: 'get',
    url: `/containerJob/heapCar`,
      params,
  })
}

// 大堆箱提箱,通过计划编号获取列表
export function heapPlanNo(id,data) {
    return fetch({
        method:'post',
        url:`/containerJob/heap/${id}/planNo`,
        data
    })
}

// 大堆箱-取消作业
export function heapCancelJob(id,data) {
    return fetch({
        method:'post',
        url:`/containerJob/heap/${id}/cancel`,
        data
    })
}

// 大堆箱-导入箱
export function heapImportContainer(id,data) {
    return fetch({
        method:'post',
        url:`/containerJob/heap/${id}`,
        data
    })
}
// 在港车皮记录
export function onPortWagonNo(params) {
    return fetch({
        method:'get',
        url:`/wagonInPortInfo`,
        params,
    })
}

// 作业列表
export function getPageList(params) {
    return fetch({
        method:'get',
        url:`/containerJob/pageList`,
        params,
    })
}
