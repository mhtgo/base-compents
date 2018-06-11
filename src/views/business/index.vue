<template>
    <div>
        <!-- <ExcelImport :code="SPFPMX" @getUploadData='getExcleText' class="but"></ExcelImport>
        <el-table :data="ceshiTable">
          <el-table-column label="重量" prop="weight"></el-table-column>
          <el-table-column label="名字" prop="name"></el-table-column>
        </el-table> -->
        <!--客户管理,综合查询-->
        <div class="card-body-flex">
            <el-card class="box-card" shadow="hover"
                     v-if="$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_CUSTOM')!==-1">
                <div slot="header" class="clearfix">
                    <span>客户管理</span>
                </div>
                <div>
                    <el-button @click="handleAddCustomer" class="card-btn"
                               v-if="$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_CUSTOM:ADD')!==-1">
                        新增客户
                    </el-button>
                    <el-button @click="handleList({path:'/business/busPla/Customer',name:'客户管理'})" class="card-btn"
                               v-if="$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_CUSTOM:QUERY')!==-1">
                        快速查询
                    </el-button>
                </div>
                <div style="margin-top: 20px">
                    客户总数: {{ customStatistics }}
                </div>
            </el-card>
            <el-card class="box-card" style="margin-left: 20px" shadow="hover"
                     v-if="$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_COMPREHENSIVE')!==-1">
                <div slot="header" class="clearfix">
                    <span>综合查询</span>
                </div>
                <div v-for="item in multiple" :key="item.name"
                     @click="handleOpenContainer(item)"
                     class="text items card-body-flex">
                    <span>{{ item.name }}</span>
                    <i class="el-icon-search" style="font-size: 18px;color: blue"></i>
                </div>
            </el-card>
        </div>
        <!--合同管理-->
        <div style="margin-top: 20px"
             v-if="$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_CONTRACT')!==-1">
            <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                    <span>合同管理</span>
                </div>
                <div>
                    <el-button @click="handleAddContract" class="card-btn"
                               v-if="$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_CONTRACT:ADD')!==-1">
                        新增合同
                    </el-button>
                    <el-button @click="handleSupply" class="card-btn"
                               v-if="$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_CONTRACT:ADDEXTRA')!==-1">
                        新增补充协议
                    </el-button>
                    <el-button @click="handleList({path:'/business/busPla/Contract',name:'合同管理'})" class="card-btn"
                               v-if="$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_CONTRACT:QUERY')!==-1">
                        快速查询
                    </el-button>
                </div>
                <div style="display: flex">
                    <div class="box-data">
                        <div style="margin-top: 20px;">
                            合同总数: {{ contractsStatistics.total }}
                        </div>
                        <div class="flexWarp">
                            <div class="text items card-body-flex" style="width: 45%;padding-right: 5%"
                                 @click="handleContract('ineffective')">
                                <span>未生效合同 {{ contractsStatistics.ineffectiveCount }}</span>
                                <i class="el-icon-search" style="font-size: 18px;color: blue"></i>
                            </div>
                            <div class="text items card-body-flex" style="width: 45%;padding-right: 5%"
                                 @click="handleContract('effective')">
                                <span>有效合同 {{ contractsStatistics.effective }}</span>
                                <i class="el-icon-search" style="font-size: 18px;color: blue"></i>
                            </div>
                            <div class="text items card-body-flex" style="width: 45%;padding-right: 5%"
                                 @click="handleContract('imminentExpiry')">
                                <span>30天后过期合同 {{ contractsStatistics.imminentExpiry }}</span>
                                <i class="el-icon-search" style="font-size: 18px;color: blue"></i>
                            </div>
                            <div class="text items card-body-flex" style="width: 45%;padding-right: 5%"
                                 @click="handleContract('expired')">
                                <span>已过期合同 {{ contractsStatistics.expired }}</span>
                                <i class="el-icon-search" style="font-size: 18px;color: blue"></i>
                            </div>
                        </div>
                    </div>
                    <div style="padding-left: 20px">
                        <div style="margin-top: 20px">
                            未生效合同操作
                        </div>
                        <div class="flexWarp" style="margin-top: 20px">
                            <div class="items-li" @click="handleContractList('D')">
                                <i class="iconfont icon-cunrucaogaoxiang"></i>
                                <p>草稿
                                    <span>{{ contractsStatistics.draft }}</span>
                                </p>
                            </div>
                            <!--<div class="items-li">-->
                            <!--<i class="iconfont icon-navicon-ckdsp"></i>-->
                            <!--<p>审批中 <span>22</span></p>-->
                            <!--</div>-->
                            <div class="items-li" @click="handleContractList('R')">
                                <i class="iconfont icon-cehuixiaohepiliangtuihui"></i>
                                <p>被驳回
                                    <span>{{ contractsStatistics.bounced }}</span>
                                </p>
                            </div>
                            <div class="items-li" @click="handleContractList('S')">
                                <i class="el-icon-document" style="height: 38px;line-height: 38px"></i>
                                <p>未签订
                                    <span>{{ contractsStatistics.notSigned }}</span>
                                </p>
                            </div>
                            <div class="items-li" @click="handleContractList('V')">
                                <i class="iconfont icon-quxiaofabu"></i>
                                <p>已作废
                                    <span>{{ contractsStatistics.voidCount }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
        <!--项目管理-->
        <div style="margin-top: 20px"
             v-if="$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_PROJECTMGR')!==-1">
            <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                    <span>项目管理</span>
                </div>
                <div>
                    <el-button @click="handleOpenProject('NORMAL')" class="card-btn"
                               v-if="$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_PROJECTMGR:ADD')!==-1">
                        新建集装箱项目
                    </el-button>
                    <el-button @click="handleOpenProject('TEMP')" class="card-btn"
                               v-if="$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_PROJECTMGR:ADD')!==-1">
                        新建临时
                    </el-button>
                    <el-button @click="handleFreezeProject" class="card-btn"
                               v-if="$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_PROJECTMGR:FROZEN')!==-1">
                        项目冻结
                    </el-button>
                    <el-button @click="handleOpenProject('')" class="card-btn"
                               v-if="$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_PROJECTMGR:QUERY')!==-1">
                        快速查询
                    </el-button>
                </div>
                <div style="display: flex">
                    <div class="box-data">
                        <div style="margin-top: 20px;">
                            项目总数: {{ projectStatistics.total }}
                        </div>
                        <div class="flexWarp">
                            <div class="text items card-body-flex" style="width: 28%;padding-right: 5%"
                                 @click="handleProjectStatus('ineffective')">
                                <span>未生效项目 {{ projectStatistics.ineffective }}</span>
                                <i class="el-icon-search" style="font-size: 18px;color: blue"></i>
                            </div>
                            <div class="text items card-body-flex" style="width: 28%;padding-right: 5%"
                                 @click="handleProjectStatus('started')">
                                <span>已立项项目 {{ projectStatistics.started }}</span>
                                <i class="el-icon-search" style="font-size: 18px;color: blue"></i>
                            </div>
                            <div class="text items card-body-flex" style="width: 28%;padding-right: 5%"
                                 @click="handleProjectStatus('expired')">
                                <span>已过期项目 {{ projectStatistics.expired }}</span>
                                <i class="el-icon-search" style="font-size: 18px;color: blue"></i>
                            </div>
                            <div class="text items card-body-flex" style="width: 28%;padding-right: 5%"
                                 @click="handleProjectStatus('executing')">
                                <span>执行中项目 {{ projectStatistics.executing }}</span>
                                <i class="el-icon-search" style="font-size: 18px;color: blue"></i>
                            </div>
                            <div class="text items card-body-flex" style="width: 28%;padding-right: 5%"
                                 @click="handleProjectStatus('frozen')">
                                <span>已冻结项目 {{ projectStatistics.frozen }}</span>
                                <i class="el-icon-search" style="font-size: 18px;color: blue"></i>
                            </div>
                            <div class="text items card-body-flex" style="width: 28%;padding-right: 5%"
                                 @click="handleProjectStatus('end')">
                                <span>已完结项目 {{ projectStatistics.end }}</span>
                                <i class="el-icon-search" style="font-size: 18px;color: blue"></i>
                            </div>
                        </div>
                    </div>
                    <div style="padding-left: 20px">
                        <div style="margin-top: 20px">
                            未生效项目操作
                        </div>
                        <div class="flexWarp" style="margin-top: 20px">
                            <div class="items-li" @click="handleProjectList('D')">
                                <i class="iconfont icon-cunrucaogaoxiang"></i>
                                <p>草稿
                                    <span>{{ projectStatistics.draft }}</span>
                                </p>
                            </div>
                            <!--<div class="items-li" @click="handleProjectList('A')">-->
                            <!--<i class="iconfont icon-navicon-ckdsp"></i>-->
                            <!--<p>审批中-->
                            <!--<span>22</span>-->
                            <!--</p>-->
                            <!--</div>-->
                            <div class="items-li" @click="handleProjectList('R')">
                                <i class="iconfont icon-cehuixiaohepiliangtuihui"></i>
                                <p>被驳回
                                    <span>{{ projectStatistics.bounced }}</span>
                                </p>
                            </div>
                            <div class="items-li" @click="handleProjectList('Z')">
                                <i class="iconfont icon-quxiaofabu"></i>
                                <p>已作废
                                    <span>{{ projectStatistics.voidCount }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
        <!--委托管理-->
        <div style="margin-top: 20px"
             v-if="$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_ENTRUSTMGR')!==-1">
            <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                    <span>委托管理</span>
                </div>
                <div>
                    <el-button @click.native="entrustAdd('JCRK')" class="card-btn"
                               v-if="$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_ENTRUSTMGR:ADD')!==-1">
                        进场入库委托创建
                    </el-button>
                    <el-button @click.native="entrustAdd('THCK')" class="card-btn"
                               v-if="$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_ENTRUSTMGR:ADD')!==-1">
                        提货出库委托创建
                    </el-button>
                    <el-button @click.native="entrustAdd('CXWT')" class="card-btn"
                               v-if="$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_ENTRUSTMGR:ADD')!==-1">
                        拆箱委托
                    </el-button>
                    <el-button @click.native="entrustAdd('BCWT')" class="card-btn"
                               v-if="$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_ENTRUSTMGR:ADDSUPPLY')!==-1">
                        补充委托
                    </el-button>
                    <el-button @click.native="entrustOpen()" class="card-btn"
                               v-if="$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_ENTRUSTMGR:QUERY')!==-1">
                        委托快速查询
                    </el-button>
                </div>
                <div style="display: flex; margin-top: 20px;">
                    <div class="box-data">
                        <div style="margin-top: 20px;">
                            委托总数:
                            <span v-html="statistics.entrust.total"></span>
                        </div>
                        <div class="flexWarp">
                            <div class="text items card-body-flex" @click="entrustOpen('WSX')"
                                 style="width: 45%; padding-right: 5%">
                                <span>未生效委托数
                                    <span v-html="statistics.entrust.ineffective"></span>
                                </span>
                                <i class="el-icon-search" style="font-size: 18px;color: blue"></i>
                            </div>
                            <div class="text items card-body-flex" style="width: 45%; padding-right: 5%">
                                <span>未执行委托数
                                    <span v-html="statistics.entrust.unexecuted"></span>
                                </span>
                                <i class="el-icon-search" @click="entrustOpen('WZX')"
                                   style="font-size: 18px;color: blue"></i>
                            </div>
                            <div class="text items card-body-flex" style="width: 45%; padding-right: 5%">
                                <span>执行中委托数
                                    <span v-html="statistics.entrust.executing"></span>
                                </span>
                                <i class="el-icon-search" @click="entrustOpen('ZXZ')"
                                   style="font-size: 18px;color: blue"></i>
                            </div>
                            <div class="text items card-body-flex" style="width: 45%; padding-right: 5%">
                                <span>已完结委托数
                                    <span v-html="statistics.entrust.end"></span>
                                </span>
                                <i class="el-icon-search" @click="entrustOpen('YWJ')"
                                   style="font-size: 18px;color: blue"></i>
                            </div>
                        </div>
                    </div>
                    <div style="padding-left: 20px">
                        <div style="margin-top: 20px">
                            未生效委托操作
                        </div>
                        <div class="flexWarp" style="margin-top: 20px;">
                            <div class="items-li" @click="entrustOpen('WSL')">
                                <i class="el-icon-document"></i>
                                <p>未受理
                                    <span v-html="statistics.entrust.noAccept"></span>
                                </p>
                            </div>
                            <div class="items-li" @click="entrustOpen('YZF')">
                                <i class="el-icon-printer"></i>
                                <p>已作废
                                    <span v-html="statistics.entrust.voidCount"></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
        <!--新增客户-->
        <custom-form ref="customForm" @load="loadData"></custom-form>
        <!--新增合同-->
        <contract-form ref="contractForm" @load="loadData"></contract-form>
        <!--合同补充协议-->
        <contract-supply ref="contractSupply" @load="loadData"></contract-supply>
        <project-freezing ref="projectFreezing" @load="loadData"></project-freezing>
        <!-- 委托新增 -->
        <addEntrust ref="entrust" :entrustType="entrustType" :isAdd="isAdd"></addEntrust>
    </div>
</template>

<script>
    import ExcelImport from '@/components/excel/import'
    import { getEntrustStatistics } from '@/api/entrust'
    import { getContractsStatistics, getCustomStatistics, getProjectStatistics } from "@/api/statistics/statistics";
    import CustomForm from './customer/customForm'
    import ContractForm from './contract/contractForm'
    import contractSupply from './contract/contractSupply'
    import addEntrust from './entrust/add-index'
    import projectFreezing from '../business/project/projectFreezing'

    export default {
        name: "index",
        components: {
            CustomForm,
            ContractForm,
            contractSupply,
            ExcelImport,
            addEntrust,
            projectFreezing
        },
        data() {
            return {
                ceshiTable: [],
                customStatistics: 88,
                contractsStatistics: 88,
                projectStatistics: 88,
                multiple: [{
                    name: '集装箱跟踪'
                }, {
                    name: '在港箱查询'
                }],
                statistics: {
                    entrust: {}
                },
                entrustType: '', //新增委托方式
                isAdd: '1'
            }
        },
        mounted() {
            window.addEventListener('storage', (val) => {
                let key = val.key
                let msg = JSON.parse(val.newValue)
                if (key === 'message') {
                    this.loadData()
                }
            })
            this.loadData()
        },
        methods: {
            loadData() {
                this.getEntrustStatistics()
                this.getCustomStatistics()
                this.getContractsStatistics()
                this.getProjectStatistics()
            },
            // 新增客户
            handleAddCustomer() {
                this.$nextTick(() => {
                    this.$refs.customForm.dialogForm = true
                    this.$refs.customForm.form['entNature'] = 'GYQY'
                })
            },
            // 列表快速查询
            handleList(url) {
                this.$store.commit('ADD_CACHED_VIEWS', url)
                this.$router.push(url.path)
            },
            // 新增合同
            handleAddContract() {
                this.$refs.contractForm.dialogForm = true
            },
            // 合同补充协议
            handleSupply() {
                this.$refs.contractSupply.dialogForm = true
            },
            // 合同列表带过滤
            handleContractList(val) {
                this.$store.commit('ADD_CACHED_VIEWS', {path:'/business/busPla/Contract',name:'合同管理'})
                this.$router.push('/business/busPla/Contract?status=' + val)
            },
            // 合同带统计状态过滤
            handleContract(val) {
                this.$store.commit('ADD_CACHED_VIEWS', {path:'/business/busPla/Contract',name:'合同管理'})
                this.$router.push('/business/busPla/Contract?statistics=' + val)
            },
            // 打开项目页面
            handleOpenProject(type) {
                if (type) {
                    this.$store.commit('ADD_CACHED_VIEWS', {path:`/business/busPla/Project/build/${type}/0`,name:'项目操作'})
                    this.$router.push(`/business/busPla/Project/build/${type}/0`)
                } else {
                    this.$store.commit('ADD_CACHED_VIEWS', {path:'/business/busPla/Project/index',name:'项目管理'})
                    this.$router.push(`/business/busPla/Project`)
                }
            },
            // 项目冻结
            handleFreezeProject() {
                this.$refs.projectFreezing.dialogForm = true
            },
            // 根据过滤条件打开项目分页
            handleProjectList(val) {
                this.$router.push('/business/busPla/Project?status=' + val)
            },
            handleProjectStatus(val) {
                this.$router.push('/business/busPla/Project?statistics=' + val)
            },
            // 集装箱查询
            handleOpenContainer(item) {
                if (item.name === '集装箱跟踪') {
                this.$store.commit('ADD_CACHED_VIEWS', {path:'/business/busPla/Track',name:'集装箱追踪查询'})
                    this.$router.push('/business/busPla/Track')
                }
                if (item.name === '在港箱查询') {
                this.$store.commit('ADD_CACHED_VIEWS', {path:'/business/busPla/ContainerOnPort',name:'在港箱查询'})
                    this.$router.push('/business/busPla/ContainerOnPort')
                }
            },
            // 获取客户统计
            getCustomStatistics() {
                getCustomStatistics().then(res => {
                    this.customStatistics = res.data
                })
            },
            // 合同统计
            getContractsStatistics() {
                getContractsStatistics().then(res => {
                    this.contractsStatistics = res.data
                })
            },
            // 项目统计
            getProjectStatistics() {
                getProjectStatistics().then(res => {
                    this.projectStatistics = res.data
                })
            },
            getEntrustStatistics() {
                getEntrustStatistics().then(res => {
                    this.statistics.entrust = res.data
                })
            },
            // 委托状态快速查询
            entrustOpen(val) {
                this.$store.commit('ADD_CACHED_VIEWS', {path:'/business/busPla/Entrust/index',name:'委托管理'})
                if (val) {
                    this.$router.push('/business/busPla/Entrust/?condition=' + val)
                } else {
                    this.$router.push('/business/busPla/Entrust')
                }
            },
            // 委托新增
            entrustAdd(val) {
                this.entrustType = val
                if (this.entrustType === 'CXWT' || this.entrustType === 'BCWT') {
                    this.$refs.entrust.isTarin = 'TR'
                }
                this.$refs.entrust.addVisible = true
            },
        }

    }

</script>

<style scoped lang="scss">
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 15px;
    }

    .items {
        margin-top: 15px;
        cursor: pointer;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 100%;
    }

    .card-body-flex {
        display: flex;
        justify-content: space-between;
        i {
            font-size: 20px;
        }
    }

    .box-data {
        width: 50%;
        border-right: 1px solid #ccc;
    }

    .flexWarp {
        display: flex;
        flex-wrap: wrap;
    }

    /* zhuimeikeji 添加样式 */

    .items-li {
        float: left;
        text-align: center;
        font-size: 14px;
        padding-right: 30px;
        cursor: pointer;
    }

    .items-li i {
        font-size: 28px;
        color: blue;
    }

    .items-li p span {
        padding-left: 5px;
        color: #ff0000;
    }

</style>
