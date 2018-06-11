<template>
    <div>
        <base-list ref="project" :condition="condition" :isShowClose="true" :datas.sync="project" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="业务模式">
                            <el-select v-model="condition['search_EQ_businessMode']" placeholder="请选择" clearable>
                                <el-option v-for="[key, val] in _dictBusinessModel" :key="key" :label="val"
                                           :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="项目类型">
                            <el-select v-model="condition['search_EQ_projectType']" placeholder="请选择" clearable>
                                <el-option v-for="[key, val] in _dictProjectType" :key="key" :label="val"
                                           :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="项目名称">
                            <!--<el-input v-model="condition['search_LIKE_name']"></el-input>-->
                            <search-project @selectName="v=>condition['search_LIKE_name']=v"></search-project>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <!--<el-col :span="8">-->
                        <!--<el-form-item label="客户名称">-->
                            <!--&lt;!&ndash;<search-custom @selectName="v=>condition['search_LIKE_customerName']=v"></search-custom>&ndash;&gt;-->
                            <!--<search-custom v-model="condition['search_EQ_partyId']"></search-custom>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col :span="8">-->
                    <!--<el-form-item label="合同名称">-->
                    <!--&lt;!&ndash;<el-input v-model="condition['search_LIKE_contractName']"></el-input>&ndash;&gt;-->
                    <!--<search-contract @selectName="v=>condition['search_LIKE_contractName']=v"></search-contract>-->

                    <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col :span="8">
                        <el-form-item label="项目状态">
                            <el-select v-model="condition['search_EQ_projectStatus']" placeholder="请选择" :disabled="isSelect" clearable>
                                <el-option v-for="[key, val] in _dictProjectStatus" :key="key" :label="val"
                                           :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                        <el-col :span="12">
                            <el-form-item label="起草时间">
                                <date-slot :startDate.sync="condition.search_GTE_createDateTime"
                                           :endDate.sync="condition.search_LTE_createDateTime"></date-slot>
                            </el-form-item>
                        </el-col>
                </el-row>

                <el-row>
                    <el-col :span="16">
                        <el-button class="ml-80" type="primary" @click="loadData">查 询</el-button>
                        <el-button type="primary" @click="handleDialogFormOpen(false)"
                        v-if="!isSelect&&$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_PROJECTMGR:ADD')!==-1">新增临时</el-button>
                        <el-button type="primary" @click="$router.push(`build/NORMAL/0`)"
                        v-if="!isSelect&&$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_PROJECTMGR:ADD')!==-1">新增正式</el-button>
                        <!--<el-button type="primary" @click="handleFrozen">冻结项目</el-button>-->
                        <!--<el-button type="primary" @click="handlePrint">打印</el-button>-->
                        <el-button type="primary" @click="_selectData" v-if="isSelect">选 择</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="project" border stripe max-height="500">
                <el-table-column fixed="left" label="选择" align="center" min-width="50" v-if="isSelect">
                    <template slot-scope="scope">
                        <el-radio v-model="radio" :label="scope.$index"
                                  @change.native="radio=scope.$index"></el-radio>
                    </template>
                </el-table-column>
                <el-table-column fixed="left" prop="code" label="项目编号" sortable min-width="180">
                    <template slot-scope="scope">
                        <a style="color: blue" @click="_toOpenProjectDetail(scope.row.id)">{{ scope.row.code }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="项目名称" sortable min-width="180"></el-table-column>
                <!--<el-table-column prop="customerName" label="客户名称" sortable min-width="160">-->
                    <!--<template slot-scope="scope">-->
                        <!--<a style="color: blue" @click="_toOpenCustomerDetail(scope.row.customerId)">-->
                            <!--{{ scope.row.customerName }}-->
                        <!--</a>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column prop="contractName" label="合同名称" sortable min-width="110">-->
                <!--<template slot-scope="scope">-->
                <!--<a style="color: blue" @click="_toOpenContractDetail(scope.row.contractId)">-->
                <!--{{ scope.row.contractName }}-->
                <!--</a>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column prop="businessMode" label="业务模式" sortable min-width="120">
                    <template slot-scope="scope">
                        {{ scope.row.businessMode | _filterBusinessModel }}
                    </template>
                </el-table-column>
                <el-table-column prop="projectType" label="项目类型" sortable min-width="120">
                    <template slot-scope="scope">
                        {{ scope.row.projectType | _filterProjectType }}
                    </template>
                </el-table-column>
                <el-table-column prop="startDate" label="有效期起" sortable min-width="120"></el-table-column>
                <el-table-column prop="endDate" label="有效期止" sortable min-width="120"></el-table-column>
                <el-table-column prop="projectStatus" label="项目状态" sortable min-width="120">
                    <template slot-scope="scope">
                        {{ scope.row.projectStatus | _filterProjectStatus }}
                    </template>
                </el-table-column>
                <el-table-column prop="createBy" label="创建人" sortable width="110"></el-table-column>
                <el-table-column prop="createDateTime" label="创建时间" sortable min-width="120"></el-table-column>
                <el-table-column fixed="right" align="center" label="操作" sortable width="140" v-if="!isSelect">
                    <template slot-scope="scope">
                        <el-button size="small" type="text"
                                   :disabled="!(scope.row.projectStatus==='D'||scope.row.projectStatus==='R'||scope.row.projectStatus==='V'||scope.row.projectStatus==='S'||scope.row.projectStatus==='C')"
                                   @click="handleDialogFormOpen(true,scope.row)"
                                   v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_PROJECTMGR:UPD')!==-1">编辑
                        </el-button>
                        <el-dropdown style="margin-left:10px">
                            <span class="el-dropdown-link">
                                <el-button size="small" type="text">更多
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <el-button type="text" class="danger" size="small"
                                               :disabled="!(scope.row.projectStatus==='D'||scope.row.projectStatus==='R'||scope.row.projectStatus==='V')"
                                               @click="handleDelProject(scope.row.id)"
                                               v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_PROJECTMGR:DEL')!==-1">删除
                                    </el-button>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <!--起草,退回,立项-->
                                    <el-button type="text" class="danger" size="small"
                                               :disabled="!(scope.row.projectStatus==='D'||scope.row.projectStatus==='R'||scope.row.projectStatus==='S')"
                                               @click="handleProject(scope.row.id,'void')"
                                               v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_PROJECTMGR:VOID')!==-1">作废
                                    </el-button>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button type="text" size="small"
                                               :disabled="!(scope.row.projectStatus==='C')"
                                               @click="handleProject(scope.row.id,'freeze')"
                                               v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_PROJECTMGR:FROZEN')!==-1">冻结
                                    </el-button>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button type="text" size="small"
                                               :disabled="!(scope.row.projectStatus==='F')"
                                               @click="handleUnFreezeProject(scope.row.id)"
                                               v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_PROJECTMGR:UNFROZEN')!==-1">解冻
                                    </el-button>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button type="text" size="small"
                                               :disabled="!(scope.row.projectStatus==='C')"
                                               @click="handleFinishProject(scope.row.id)"
                                               v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_PROJECTMGR:END')!==-1">完结
                                    </el-button>
                                </el-dropdown-item>
                                <!--<el-dropdown-item>-->
                                <!--<el-button size="small" type="text">送审</el-button>-->
                                <!--</el-dropdown-item>-->

                                <!--<el-dropdown-item>-->
                                <!--<el-button size="small" type="text">打印审批单</el-button>-->
                                <!--</el-dropdown-item>-->
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <el-dialog :title="publicDialogTitle" :visible.sync="publicDialogForm" width="500px">
            <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="135px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="publicDialogText+'原因'" prop="reason">
                            <el-input type="textarea" :rows="6" style="width: 250px"
                                      :placeholder="'请输入'+publicDialogText+'原因'"
                                      :maxLength="$maxLength"
                                      v-model="form.reason"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="publicDialogForm = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <project-detail ref="projectDetail"></project-detail>
        <custom-detail ref="customDetail"></custom-detail>
        <contract-detail ref="contractDetail"></contract-detail>
        <!--<project-freezing ref="projectFreezing"></project-freezing>-->
    </div>
</template>

<script>
    import dateSlot from '@/components/date/dateSlot'
    import {
        delProject,
        finishProject,
        freezeProject,
        projectList,
        unFreezeProject,
        voidProject
    } from "@/api/project/project";
    import projectDetail from './projectDetail'
    import contractDetail from '@/views/business/contract/contractDetail.vue'
    import customDetail from '@/views/business/customer/customDetail.vue'
    import searchCustom from '@/components/autocomplete/autoSearchCustom'
    import searchContract from '@/components/autocomplete/autoSearchContract'
    import searchProject from '@/components/autocomplete/autoSearchProject'
    // import projectFreezing from './projectFreezing'

    export default {
        name: '项目管理',
        components: {
            dateSlot,
            contractDetail,
            customDetail,
            projectDetail,
            searchCustom,
            searchContract,
            searchProject,
            // projectFreezing
        },
        data() {
            return {
                pageSearch: projectList,
                condition: {
                    search_EQ_projectStatus:'',
                    search_EQ_statisticsStatus:'',
                },                      // 查询条件
                project: [],                       // table数组
                form: {
                    reason: '',
                },
                rules: {},
                isSelect: false,
                radio: undefined,
                publicDialogTitle: '',
                publicDialogForm: false,
                publicDialogSubmitId: '',
                publicDialogText: '',
            }
        },
        mounted() {
            let status = this.$route.query.status
            if (status) {
                this.condition['search_EQ_projectStatus'] = status
            }
            let statistics = this.$route.query.statistics
            if (statistics) {
                this.condition['search_EQ_statisticsStatus'] = statistics
            }
            this.loadData()
        },
        activated(){
            let status = this.$route.query.status
            if (status) {
                this.condition['search_EQ_projectStatus'] = status
            }
            let statistics = this.$route.query.statistics
            if (statistics) {
                this.condition['search_EQ_statisticsStatus'] = statistics
            }
            this.loadData()
        },
        methods: {
            loadData() {
                this.$refs.project.loadData()
            },
            //
            handleDialogFormOpen(bool, item) {
                if (bool) {
                    this.$router.push(`build/${item.projectType}/${item.id}`)
                } else {
                    this.$router.push(`build/TEMP/0`)
                }
            },
            // 删除项目
            handleDelProject(id) {
                this.$confirm(`是否删除该项目?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delProject(id).then(res => {
                        this.$message({ message: '删除成功!', type: 'success' })
                        this.loadData()
                        this.$storageMsg('loadData')
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            // 作废或冻结项目提示
            handleProject(id, val) {
                let msg = val === 'void' ? '作废' : '冻结'
                this.publicDialogSubmitId = id
                this.publicDialogText = msg
                this.publicDialogTitle = val === 'void' ? `是否将该项目${msg}` : `是否将该项目${msg}`
                this.publicDialogForm = true
            },
            // 作废或冻结项目操作
            handleSubmit() {
                let id = this.publicDialogSubmitId
                if (this.publicDialogText === '作废') {
                    voidProject(id, { id, reason: this.form.reason }).then(res => {
                        this.$message({ message: '作废成功!', type: 'success' })
                        this.publicDialogForm = false
                        this.$storageMsg('loadData')
                    })
                } else if (this.publicDialogText === '冻结') {
                    freezeProject(id, { id, reason: this.form.reason }).then(res => {
                        this.$message({ message: '冻结成功!', type: 'success' })
                        this.publicDialogForm = false
                        this.$storageMsg('loadData')
                    })
                }
                this.form.reason = ''
            },
            // 解冻
            handleUnFreezeProject(id) {
                this.$confirm(`是否解冻该项目?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    unFreezeProject(id).then(res => {
                        this.$message({ message: '解冻成功!', type: 'success' })
                        this.loadData()
                        this.$storageMsg('loadData')
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            handleFinishProject(id) {
                this.$confirm(`是否完结该项目?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    finishProject(id).then(res => {
                        this.$message({ message: '已完结!!', type: 'success' })
                        this.loadData()
                        this.$storageMsg('loadData')
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            // 打开项目详情
            _toOpenProjectDetail(id) {
                this.$refs.projectDetail.getData(id)
            },
            // 打开客户详情
            _toOpenCustomerDetail(id) {
                this.$refs.customDetail.getData(id)
            },
            // 打开合同详情
            _toOpenContractDetail(id) {
                this.$refs.contractDetail.getData(id)
            },
            // 项目选址
            _selectData() {
                if (this.radio !== undefined) {
                    // 如果是项目筛选选择,则返回选中的数据
                    this.$emit('select', this.project[this.radio])
                } else {
                    this.$message({
                        message: '请选择一条数据',
                        type: 'error'
                    })
                }
            },
        },
        watch: {
            publicDialogForm(bool) {
                if (!bool) {
                    this.form.reason = ''
                    this.loadData()
                }
            }
        }
    }
</script>

<style scoped>

</style>
