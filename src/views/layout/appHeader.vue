<template>
    <div style="width:100%">
        <el-row class="appHeader">
            <el-col :span="12">
                <!-- <span class="systemName">物流综合服务管理平台</span> -->
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        {{currenRoute.firstName?currenRoute.firstName:'首页'}}
                    </el-breadcrumb-item>
                    <template>
                        <el-breadcrumb-item v-if="currenRoute.secPath" class="shou" :to="{ path: currenRoute.secPath}">{{currenRoute.secName}}</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="currenRoute.third" class="shou"  :to="{ path: currenRoute.thirdPath}">{{currenRoute.third}}</el-breadcrumb-item>
                    </template>
                </el-breadcrumb>
            </el-col>
            <el-col :span="12" class="right-info">

                <!-- <el-dropdown trigger="click">
                <el-badge :max="99" :value="msgNum" class="item">
                    <span class="title">
                        <icon-svg icon-class="remind"></icon-svg>
                    </span>
                </el-badge>
                <el-dropdown-menu slot="dropdown" v-if="msgArr.length>0">
                    <el-dropdown-item :key="index" v-for="(item,index) in msgArr" @click.native="readMsg(item)" v-if="index<6">
                        {{ item.sendMsgTask.title }}
                    </el-dropdown-item>
                </el-dropdown-menu>
                <el-dropdown-menu slot="dropdown" v-if="msgArr.length===0">
                    <el-dropdown-item>
                        暂无新消息
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown> -->

                <el-dropdown trigger="click" class="userCss">
                    <span class="title">
                        <span>{{$store.state.user.currentUser.dept&&$store.state.user.currentUser.org.name}}&ensp;</span>
                        <span>{{$store.state.user.currentUser.dept&&$store.state.user.currentUser.dept.name}}&ensp;</span>
                        {{$store.state.user.currentUser.name}}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="changePwd">修改密码</el-dropdown-item>
                        <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-dialog title="修改密码" :visible.sync="showChange" width="500px" :before-close="cancel">
                <el-form :model="password" label-width="80px">
                    <el-form-item label="原密码:">
                        <el-input v-model="password.oldPwd" placeholder="" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码:">
                        <el-input v-model="password.newPwd" placeholder="" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码:">
                        <el-input v-model="password.confirmNewPwd" placeholder="" type="password"></el-input>
                    </el-form-item>
                </el-form>
                <div class="pwdFoot">
                    <el-button type="primary" @click.native="submitPwd">确定</el-button>
                    <el-button type="primary" @click.native="cancel">取消</el-button>
                </div>
            </el-dialog>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="tags-view-container">
                    <!-- <div class="history"> -->
                        <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
                            <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in Array.from(cachedViews)" :to="tag.path"
                                :key="tag.path" @contextmenu.prevent.native="openMenu(tag,$event)">
                                {{tag.name}}
                                <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
                            </router-link>
                        </scroll-pane>
                        <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
                            <li @click="closeSelectedTag(selectedTag)">{{'关闭当前页'}}</li>
                            <li @click="closeOthersTags">{{'关闭其他页面'}}</li>
                            <li @click="closeAllTags">{{'关闭所有'}}</li>
                        </ul>
                    <!-- </div> -->
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {
        out,
        updataPwd
    } from '@/api/auth/auth'
    import ScrollPane from '@/components/ScrollPane'
    export default {
        name: "appHeader",
        components: {
            ScrollPane
        },
        data() {
            return {
                currentUser: this.$store.state.user.currentUser,
                password: {},
                showChange: false,
                currenRoute: {
                    firstName: '',
                    secName: '',
                    secPath: '',
                    third: '',
                    thirdPath: ''
                },
                visible: false,
                top: 0,
                left: 0
            }
        },
        mounted() {
            this.filterBread(this.$route)
            this.addViewTags()
        },
        computed: {
            cachedViews() {
                return this.$store.state.tagsView.cachedViews
            }
        },
        watch: {
            $route(newVal) {
                this.currenRoute = {
                    firstName: '',
                    secName: '',
                    secPath: '',
                    third: '',
                    thirdPath: ''
                }
                if (newVal) {
                    this.filterBread(newVal)
                }
                this.addViewTags()
                this.moveToCurrentTag()

            },
            visible(value) {
                if (value) {
                    document.body.addEventListener('click', this.closeMenu)
                } else {
                    document.body.removeEventListener('click', this.closeMenu)
                }
            }
        },
        methods: {
            generateRoute() {
                if (this.$route.name) {
                    return this.$route
                }
                return false
            },
            addViewTags() {
                const route = this.generateRoute()
                if (!route) {
                    return false
                }
                this.$store.dispatch('addVisitedViews', route)
            },
            filterBread(newVal) {
                let a = newVal.fullPath.split('/')
                if (newVal.path.indexOf('Home') !== -1) {
                    this.currenRoute.firstName = '平台管理'
                    if (newVal.path.indexOf('SystemS') !== -1) {
                        this.currenRoute.secName = '系统管理工作台'
                        this.currenRoute.secPath = '/Home/SystemS'
                    } else if (newVal.path.indexOf('SystemBase') !== -1) {
                        this.currenRoute.secName = '基础管理工作台'
                        this.currenRoute.secPath = '/Home/SystemBase'
                    }
                } else if (newVal.path.indexOf('business') !== -1) {
                    this.currenRoute.firstName = '商务管理'
                    this.currenRoute.secName = '商务管理工作台'
                    this.currenRoute.secPath = '/business/busPla'
                } else if (newVal.path.indexOf('work') !== -1) {
                    this.currenRoute.firstName = '现场作业管理'
                    if (newVal.path.indexOf('gatePanel') !== -1) {
                        this.currenRoute.secName = '铁路道闸工作台'
                        this.currenRoute.secPath = '/work/gatePanel'
                    } else if (newVal.path.indexOf('JobPlan') !== -1) {
                        this.currenRoute.secName = '铁路作业计划管理'
                        this.currenRoute.secPath = '/work/JobPlan'
                    } else if (newVal.path.indexOf('containerJob') !== -1) {
                        this.currenRoute.secName = '铁路集装箱作业台'
                        this.currenRoute.secPath = '/work/containerJob'
                    }
                }
                if (a.length >= 4) {
                    this.currenRoute.third = newVal.name
                    this.currenRoute.thirdPath = newVal.fullPath
                }
                console.log(55,this.currenRoute)
            },
            logout() {
                out().then(res => {
                    location.reload()
                    this.$router.replace({
                        path: '/Login'
                    }) // 跳转路由
                })
            },
            changePwd() {
                this.showChange = true
            },
            submitPwd() {
                if (this.password.newPwd === this.password.confirmNewPwd) {
                    updataPwd(this.password).then(res => {
                        this.$message({
                            message: '修改密码成功',
                            type: 'success'
                        })
                        this.cancel()
                    })
                } else {
                    this.$message({
                        message: '两次输入密码不一致',
                        type: 'warn'
                    })
                }
            },
            cancel() {
                this.password = {}
                this.showChange = false
            },
            // 卡片
            isActive(route) {
                return route.path === this.$route.path
            },
            moveToCurrentTag() {
                const tags = this.$refs.tag
                this.$nextTick(() => {
                    for (const tag of tags) {
                        if (tag.to === this.$route.path) {
                            this.$refs.scrollPane.moveToTarget(tag.$el)
                            break
                        }
                    }
                })
            },
            closeSelectedTag(view) {
                this.$store.dispatch('delVisitedViews', view).then((views) => {
                    if (this.isActive(view)) {
                        const latestView = views.slice(-1)[0]
                        if (latestView) {
                            this.$router.push(latestView.path)
                        } else {
                            this.$router.push('/')
                        }
                    }
                })
            },
            closeOthersTags() {
                this.$router.push(this.selectedTag.path)
                this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
                    this.moveToCurrentTag()
                })
            },
            closeAllTags() {
                this.$store.dispatch('delAllViews')
                this.$router.push('/first')
            },
            openMenu(tag, e) {
                this.visible = true
                this.selectedTag = tag
                this.left = e.clientX-200
                this.top = e.clientY-58
            },
            closeSelectedTag(view) {
                this.$store.dispatch('delVisitedViews', view).then((views) => {
                    if (this.isActive(view)) {
                        const latestView = views.slice(-1)[0]
                        if (latestView) {
                            this.$router.push(latestView.path)
                        } else {
                            this.$router.push('/first')
                        }
                    }
                })
            },
            closeMenu() {
                this.visible = false
            }
        }
    }

</script>

<style scoped lang="scss">
    .appHeader {
        width: 100%;
        box-shadow: 0 1px 5px 0 rgba(0, 34, 77, 0.08);
        margin: 0px;
        padding: 18px 15px;
        background-image: linear-gradient(to right, #696aee, #4e76ea);
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .systemName {
        font-size: 28px;
        line-height: 28px;
        color: #fff;
    }

    .userCss {
        color: #fff;
    }

    .right-info {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .el-dropdown {
            margin: 0px 15px;
            cursor: pointer;
            color: #fff;
            .title {
                font-size: 16px;
                line-height: 16px;
            }
        }
    }

    .pwdFoot {
        margin: 0 auto;
        text-align: right;
    } // .history {
    //     width: 100%;
    //     background: #fff;
    //     white-space: nowrap;
    //     height: 34px;
    //     border-bottom: 1px solid #d8dce5;
    // }
    .tags-view-container {
        .tags-view-wrapper {
            background: #fff;
            height: 34px;
            border-bottom: 1px solid #d8dce5;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
            .tags-view-item {
                display: inline-block;
                position: relative;
                height: 26px;
                line-height: 26px;
                border: 1px solid #d8dce5;
                color: #495060;
                background: #fff;
                padding: 0 8px;
                font-size: 12px;
                margin-left: 5px;
                margin-top: 4px;
                &:first-of-type {
                    margin-left: 15px;
                }
                &.active {
                    background-color: #409EFF;
                    color: #fff;
                    border-color: #409EFF;
                    &::before {
                        content: '';
                        background: #fff;
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        position: relative;
                        margin-right: 2px;
                    }
                }
            }
        }
        .contextmenu {
            margin: 0;
            background: #fff;
            z-index: 100;
            position: absolute;
            list-style-type: none;
            padding: 5px 0;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 400;
            color: #333;
            box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
            li {
                margin: 0;
                padding: 7px 16px;
                cursor: pointer;
                &:hover {
                    background: #eee;
                }
            }
        }
    }

    .tags-view-item {
        display: inline-block;
        position: relative;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;
        text-decoration: none;
    }
    .shou{
        cursor: pointer;
    }
</style>
