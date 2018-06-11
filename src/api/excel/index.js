import fetch from '@/api'

// 获取excel模板分页列表
export function getExcelTemplates (params) {
  return fetch({
    method: 'get',
    url: '/excelModels',
    params
  })
}

// 获取指定的excel模板
export function getExcelTemplate (data) {
  return fetch({
    method: 'get',
    url: `/excelModels/${data.id}`,
    data
  })
}
// 新增excel模板
export function saveExcelTemplate (data) {
  return fetch({
    method: 'post',
    url: '/excelModels',
    data,
    isJson: true
  })
}
// 更新excel模板
export function updateExcelTemplate (id, data) {
  return fetch({
    method: 'put',
    url: `/excelModels/${id}`,
    data,
    isJson: true
  })
}

// 删除excel模板
export function delExcelTemplate (data) {
  return fetch({
    method: 'delete',
    url: `/excelModels/${data.id}`
  })
}

// 下载量
export function dolNum (id) {
  return fetch({
    method: 'get',
    url: `/excelModels/${id}/updateDownLoadNum`
  })
}

