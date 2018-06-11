import fetch from '@/api'

// zhuimeikeji 箱筛选
export function getContainerList(params) {
    return fetch({
        method: 'get',
        url: `/container/list`,
        params
    })
}
