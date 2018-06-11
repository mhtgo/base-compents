<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
    #app {
        font-family: "Monospaced Number","Chinese Quote",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    /* 面包屑白色 */
    .el-breadcrumb__inner{
        color: #fff;
    }
    .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
        color: #fff !important;
    }
    .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
        color: #fff;
    }
</style>
<style lang="css" src="@/assets/iconfont/iconfont.css">
</style>
