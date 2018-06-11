<template>
    <div>
        <h2 class="page-title">委托管理</h2>
        <base-list ref="customer" :condition="condition" :datas.sync="contracts" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="委托类型">
                            <el-select v-model="condition['search_EQ_entrustType']" placeholder="请选择" clearable>
                                <el-option v-for="[key, val] in _dictEntrustType" :key="key" :label="val" :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="委托单位">
                            <search-custom v-model="condition['search_LIKE_orgId']"></search-custom>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="所属项目">
                            <autoSearchProject v-model="condition['search_LIKE_projectId']"></autoSearchProject>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="委托名称">
                            <!-- <search-custom v-model="condition['search_LIKE_entrustName']"></search-custom> -->
                            <el-input v-model="condition['search_LIKE_entrustName']" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="委托状态">
                            <el-select v-model="checkStatus" placeholder="请选择" multiple clearable @change="chooseStatus">
                                <el-option v-for="[key, val] in _dictEntrustStatus" :key="key" :label="val" :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                        <el-form-item label="创建时间">
                            <date-slot :startDate.sync="condition.search_GTE_createDateTime" :endDate.sync="condition.search_LTE_createDateTime"></date-slot>
                        </el-form-item>
                        </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" icon="el-icon-search" @click="loadData" class="ml-80">查 询</el-button>
                        <el-button type="primary" @click="loadData">刷 新</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="contracts" border stripe max-height="500">
                <el-table-column label="序号" type="index" width="50"></el-table-column>
                <el-table-column prop="entrustNo" label="委托单号" min-width="200" sortable >
                    <template slot-scope="scope">
                        <a class="text-btn" @click="_toOpenEntrustDetail(scope.row.entrustNo, scope.row.entrustType)">{{ scope.row.entrustNo }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="entrustName" label="委托单名称" min-width="200" sortable ></el-table-column>
                <el-table-column prop="orgName" label="委托单位" min-width="200" sortable >
                    <template slot-scope="scope">
                        <a class="text-btn" @click="_toOpenCustomerDetail(scope.row.entrustOrgId)">{{ scope.row.entrustOrgName }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="projectName" label="所属项目" min-width="200" sortable >
                    <template slot-scope="scope">
                        <a class="text-btn" @click="_toOpenProjectDetail(scope.row.projectId)">{{ scope.row.projectName }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="entrustType" label="委托类型" width="120" sortable>
                    <template slot-scope="scope">
                        {{ scope.row.entrustType | _filterEntrustType }}
                    </template>
                </el-table-column>
                <el-table-column prop="entrustStatus" label="委托单状态"  width="120" sortable>
                    <template slot-scope="scope">
                        {{ scope.row.entrustStatus | _filterEntrustStatus }}
                    </template>
                </el-table-column>
                <el-table-column prop="createBy" label="创建人" width="100" sortable></el-table-column>
                <el-table-column prop="createDateTime" label="创建时间" width="120" sortable></el-table-column>
                <el-table-column fixed="right" align="center" label="操作" width="140">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="handleEditOpen(scope.row)">编辑</el-button>
                        <!-- <el-button type="text" class="danger" size="small" @click="remove(scope.row.entrustNo)">删除 -->
                        <!-- </el-button> -->
                        <el-dropdown class="ml-10">
                            <span class="el-dropdown-link">
                                更多
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="remove(scope.row.entrustNo)" class="danger"
                                :disabled="!(scope.row.entrustStatus === 'NOACCEPT'||scope.row.entrustStatus === 'VOID')"
                                v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_ENTRUSTMGR:DEL')!==-1">
                                删除</el-dropdown-item>
                                <el-dropdown-item @click.native="handleVoid(scope.row.entrustNo)"
                                :disabled="!(scope.row.entrustStatus === 'NOACCEPT'||scope.row.entrustStatus === 'ACCEPTED')"
                                v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_ENTRUSTMGR:VOID')!==-1">
                                作废</el-dropdown-item>
                                <el-dropdown-item @click.native="handleAccept(scope.row.entrustNo)"
                                :disabled="!(scope.row.entrustStatus === 'NOACCEPT')"
                                v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_ENTRUSTMGR:ACCEPT')!==-1">
                                受理</el-dropdown-item>
                                <el-dropdown-item @click.native="handleEnd(scope.row.entrustNo)"
                                v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_ENTRUSTMGR:END')!==-1">
                                完结</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <entrust-detail ref="entrustDetail"></entrust-detail>
        <custom-detail ref="customDetail"></custom-detail>
        <project-detail ref="projectDetail"></project-detail>
        <!-- 委托新增 -->
        <addEntrust ref="entrust" @upData="loadData" :entrustType="entrustType" :isAdd="isAdd" :status="status" :id="id"></addEntrust>
    </div>
</template>

<script>
    import EntrustDetail from './entrustDetail'
    import CustomDetail from '../customer/customDetail'
    import ProjectDetail from '../project/projectDetail'
    import addEntrust from '@/views/business/entrust/add-index'
    import {
        companyNature,
        customType
    } from "@/assets/dict";
    import {
        MessageBox
    } from 'element-ui';
    import searchCustom from '@/components/autocomplete/autoSearchCustom'
    import autoSearchProject from '@/components/autocomplete/autoSearchProject'
    import dateSlot from '@/components/date/dateSlot'
    import {
        getEntrustList,
        delEntrust,
        voidEntrust,
        acceptEntrust,
        endEntrust
    } from '@/api/entrust'

    export default {
        name:"委托管理",
        components: {
            EntrustDetail,
            CustomDetail,
            ProjectDetail,
            searchCustom,
            dateSlot,
            autoSearchProject,
            addEntrust
        },
        data() {
            return {
                condition: {}, // 查询条件
                contracts: [], // table数组
                pageSearch: getEntrustList, // 分页查询api接口
                isAdd: '2', // 委托编辑标识
                entrustType: '', // 委托类型
                status: '', //委托状态
                id: '', //委托id
                checkStatus:''
            }
        },
        mounted() {
            if (this.$route.query.condition === 'WSX') {
                this.condition['search_IN_status'] = "NOACCEPT,VOID"
                this.checkStatus = ['NOACCEPT', 'VOID']
            } else if (this.$route.query.condition === 'WZX') {
                this.condition['search_IN_status'] = "ACCEPTED"
                this.checkStatus = ['ACCEPTED']
            } else if (this.$route.query.condition === 'ZXZ') {
                this.condition['search_IN_status'] = "OPERATE"
                this.checkStatus = ['OPERATE']
            } else if (this.$route.query.condition === 'YWJ') {
                this.condition['search_IN_status'] = "FINISHED"
                this.checkStatus = ['FINISHED']
            } else if (this.$route.query.condition === 'WSL') {
                this.condition['search_IN_status'] = "NOACCEPT"
                this.checkStatus = ['NOACCEPT']
            } else if (this.$route.query.condition === 'YZF') {
                this.condition['search_IN_status'] = "VOID"
                this.checkStatus = ['VOID']
            }
            this.loadData()
        },
        activated(){
            if (this.$route.query.condition === 'WSX') {
                this.condition['search_IN_status'] = "NOACCEPT,VOID"
                this.checkStatus = ['NOACCEPT', 'VOID']
            } else if (this.$route.query.condition === 'WZX') {
                this.condition['search_IN_status'] = "ACCEPTED"
                this.checkStatus = ['ACCEPTED']
            } else if (this.$route.query.condition === 'ZXZ') {
                this.condition['search_IN_status'] = "OPERATE"
                this.checkStatus = ['OPERATE']
            } else if (this.$route.query.condition === 'YWJ') {
                this.condition['search_IN_status'] = "FINISHED"
                this.checkStatus = ['FINISHED']
            } else if (this.$route.query.condition === 'WSL') {
                this.condition['search_IN_status'] = "NOACCEPT"
                this.checkStatus = ['NOACCEPT']
            } else if (this.$route.query.condition === 'YZF') {
                this.condition['search_IN_status'] = "VOID"
                this.checkStatus = ['VOID']
            }
            this.loadData()
        },
        methods: {
            loadData() {
                this.$refs.customer.loadData()
                this.entrustType = ''
                this.status = ''
                this.id = ''
            },
            // 打开委托详情
            _toOpenEntrustDetail(id, type) {
                this.$refs.entrustDetail.getData(id, type)
            },
            // 打开项目详情
            _toOpenProjectDetail(id) {
                this.$refs.projectDetail.getData(id)
            },
            // 打开客户详情
            _toOpenCustomerDetail(id) {
                this.$refs.customDetail.getData(id)
            },
            remove(entrustNo) {
                this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delEntrust(entrustNo).then(res => {
                        this.$message({
                            message: `删除成功!`,
                            type: 'success'
                        })
                        this.loadData()
                    })
                })
            },
            delInfos(id) {
                delEntrust(id).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.loadData()
                })
            },
            handleEnd(id) {
                this.$confirm('是否完结?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.endInfos(id)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消完结'
                    });
                });
            },
            endInfos(id) {
                endEntrust(id, {
                    'acceptTime': this.getNowdate()
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '完结成功!'
                    })
                    this.loadData()
                })
            },
            handleAccept(id) {
                this.$confirm('是否受理?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.acceptInfos(id)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消受理'
                    });
                });
            },
            acceptInfos(id) {
                acceptEntrust(id, {
                    'acceptTime': this.getNowdate()
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '受理成功!'
                    })
                    this.loadData()
                })
            },
            getNowdate() {
                let myDate = new Date()
                return myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate()
            },
            handleVoid(id) {
                this.$prompt('请输入作废原因', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({
                    value
                }) => {
                    this.voidInfos(id, value)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            voidInfos(id, value) {
                voidEntrust(id, {
                    'voidReason': value
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '你输入的作废原因是: ' + value
                    });
                    this.loadData()
                })
            },
            handleEditOpen(row) {
                console.log(row)
                this.entrustType = row.entrustType
                this.status = row.entrustStatus
                this.id = row.entrustNo
                this.$nextTick(() => {
                    this.$refs.entrust.addOrEdit()
                    this.$refs.entrust.addVisible = true
                })
                // this.$router.push({
                //     path: '/Home/Entrust/Add',
                //     query: {
                //         'entrustType': row.entrustType,
                //         'isAdd': '2',
                //         'status': row.entrustStatus,
                //         'id': row.entrustNo
                //     }
                // })
            },
            chooseStatus(){
                let a =''
                this.condition['search_IN_status'] = ''
               for (let index = 0; index < this.checkStatus.length; index++) {
                   this.condition['search_IN_status'] = this.condition['search_IN_status'] +','+this.checkStatus[index]
               }
            }
        }
    }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>


</style>
