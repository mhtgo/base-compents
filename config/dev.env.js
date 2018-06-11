'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // LOCAL_BASE_API: 'http://wisdomorg.oicp.net:8083/mock/11', // 开发环境的地址
    LOCAL_BASE_API: 'http://wisdomorg.oicp.net:8899', // 开发环境的地址
})
