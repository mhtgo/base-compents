import fetch from '@/api'

// 送审
export function approval(data) {
    return fetch({
        method: 'post',
        url:'/workFlows/submitFlow',
        data,
    })
}
