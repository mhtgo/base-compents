import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getCookie, Token } from '@/utils/cookie'
import router from '../router/index'
// 后端联调接口
// const FWQ = 'http://192.168.1.225:8089'
// const FWQ = 'http://192.168.1.121:8899'
// 模拟接口-本地
// const mockUrl = 'http://192.168.1.121:8083/mock/11'
// 模拟接口-外网
const mockUrls = 'http://wisdomorg.oicp.net:8083/mock/11'
// const url = process.env.NODE_ENV === 'development' ? mockUrls : process.env.LOCAL_BASE_API
// const url = "http://192.168.1.225:8089";
const url = process.env.NODE_ENV === 'development' ? '/api' : process.env.LOCAL_BASE_API
// const url = "http://wisdomorg.oicp.net:8899";

// 创建axios实例
const service = axios.create({
    baseURL: url,  // 开发环境跨域配置的地址
    timeout: 30000 // 请求超时时间
})

const loadingOver = () => {
    if (store.getters.loadingBtn) {
        store.commit('SET_LOADING_STATUS', false)
    }
}

// request拦截器
service.interceptors.request.use(
    config => {
        // if (!config.isJson) {
        //     config.transformRequest = [
        //         function (data) {
        //             let ret = ''
        //             for (let it in data) {
        //                 ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        //             }
        //             ret = ret.substring(0, ret.length - 1)
        //             return ret
        //         }
        //     ]
        //     config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        // } else {
        //     config.headers['Content-Type'] = 'application/json'
        // }

        // 请求头统一配置
        config.headers['Content-Type'] = 'application/json'
        config.headers['Accept'] = 'application/json;charset=UTF-8'
        if (getCookie(Token)) {
            config.headers['Authorization'] = getCookie(Token) // 请求头携带Authorization为Token值
        }
        if (config.method === 'put' || config.method === 'post') {
            store.commit('SET_LOADING_STATUS', true)
        }

        return config
    },
    error => {
        loadingOver()
        Promise.reject(error)
    }
)

// respone拦截器
service.interceptors.response.use(
    response => {
        loadingOver()
        return response.data
    },
    error => {
        loadingOver()
        console.log(error.response)
        if(error.response.status===504||error.response.status===511){
            Message({
                message: `服务器错误`,
                showClose: true,
                type: 'error',
                duration: 3 * 1000
            })
            router.replace('/Login')
        }
        // let message = error.response.data.msg
        let message = error.response.data.msg || error.response.data.error
        let msg = message.indexOf(':') > 0 ? message.split(':')[1] : message
        Message({
            message: `${msg}`,
            showClose: true,
            type: 'error',
            duration: 3 * 1000
        })

        return Promise.reject(error)
    }
)

export default service
