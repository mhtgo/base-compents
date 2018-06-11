<template>
    <el-aside width="200px" class="asideNav">
        <el-menu style="width: 200px" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64"
            text-color="#fff" active-text-color="#ffd04b">
            <el-submenu index="1" v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR')!==-1">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>平台管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item @click="handleRouterPush({path: '/Home/SystemS',name: '系统管理工作台'})" v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR')!==-1"
                        index="1-1">
                        系统管理工作台</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item @click="handleRouterPush({path: '/Home/SystemBase',name: '基础管理工作台'})" v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_BASEMGR')!==-1"
                        index="1-2">
                        基础管理工作台</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2" v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR')!==-1">
                <template slot="title">
                    <i class="el-icon-goods"></i>
                    <span>商务管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item @click="handleRouterPush({path: '/business/busPla',name: '商务管理'})" v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR')!==-1"
                        index="2-1">
                        商务管理工作台</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3" v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB')!==-1">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>现场作业</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item @click="handleRouterPush({path: '/work/gatePanel',name: '铁路道闸工作台'})" v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_TRAIN')!==-1"
                        index="3-2">
                        铁路道闸工作台
                    </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item @click="handleRouterPush({path: '/work/JobPlan',name: '铁路作业计划管理'})" v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLAN')!==-1"
                        index="3-3">
                        铁路作业计划管理
                    </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item @click="handleRouterPush({path: '/work/containerJob',name: '铁路集装箱作业台'})" v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB')!==-1"
                        index="3-4">
                        铁路集装箱作业台
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
    export default {
        name: "navItem",
        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleRouterPush(val) {
                // console.log(val)
                this.$store.commit('ADD_CACHED_VIEWS', val)
                this.$router.push(val.path)
            }
        }
    }

</script>

<style scoped>
    .asideNav {
        width: 200px;
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        background-color: rgb(84, 92, 100);
    }

</style>
