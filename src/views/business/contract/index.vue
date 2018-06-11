<template>
    <div>
        <base-list ref="contract" :condition="condition" :isShowClose="true" :datas.sync="contract"
                   :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="110px">
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
                        <el-form-item label="合同类型">
                            <el-select v-model="condition['search_EQ_contractType']" placeholder="请选择"
                                       :disabled="isSelect" clearable>
                                <el-option v-for="[key, val] in _dictContractType" :key="key" :label="val"
                                           :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同属性">
                            <el-select v-model="condition['search_EQ_contractAttribute']" placeholder="请选择"
                                       clearable>
                                <el-option v-for="[key, val] in _dictContractAttribute" :key="key" :label="val"
                                           :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="合同名称">
                            <!--<el-input type="text" v-model="condition['search_LIKE_name']"></el-input>-->
                            <search-contract @selectName="v=>condition['search_LIKE_name']=v"
                                             ref="searchContract"></search-contract>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="客户名称">
                            <!--<el-input type="text" v-model="condition['search_LIKE_partyName']"></el-input>-->
                            <search-custom v-model="condition['search_EQ_partyId']"></search-custom>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同状态">
                            <el-select v-model="condition['search_EQ_contractStatus']" placeholder="请选择" clearable>
                                <el-option v-for="[key, val] in _dictContractStatus" :key="key" :label="val"
                                           :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="使用状态">
                            <el-select v-model="condition['search_EQ_useStatus']" placeholder="请选择" :disabled="isSelect"
                                       clearable>
                                <el-option v-for="[key, val] in _dictUseOrUnused" :key="key" :label="val"
                                           :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同创建时间">
                            <date-slot :startDate.sync="condition.search_GTE_createDateTime"
                                       :endDate.sync="condition.search_LTE_createDateTime"></date-slot>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-button class="ml-110" icon="el-icon-search" type="primary" @click="loadData">查 询</el-button>
                        <el-button type="primary" @click="loadData">刷 新</el-button>
                        <el-button type="primary" @click="handleDialogFormOpen(false)"
                                   v-if="!isSelect&&$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_CONTRACT:ADD')!==-1">
                            新 增
                        </el-button>
                        <el-button type="primary" @click="_selectData" v-if="isSelect">选 择</el-button>

                        <!--<el-button type="primary" @click="handleSupply">补充协议</el-button>-->
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="contract" border stripe max-height="500" :row-class-name="tableRowClassName">
                <el-table-column fixed="left" label="选择" align="center" min-width="50" v-if="isSelect">
                    <template slot-scope="scope">
                        <el-radio v-model="radio" :label="scope.$index"
                                  @change.native="radio=scope.$index"></el-radio>
                    </template>
                </el-table-column>
                <!-- <el-table-column fixed="left" prop="id" label="合同电子编号" sortable min-width="180">
                    <template slot-scope="scope">
                        <a style="color: blue" @click="handleContractInfo(scope.row.id)">{{ scope.row.id }}</a>
                    </template>
                </el-table-column> -->
                <!--<el-table-column prop="code" label="合同纸质编号" sortable min-width="180"></el-table-column>-->
                <el-table-column prop="name" label="合同名称" sortable min-width="160">
                    <template slot-scope="scope">
                        <a style="color: blue" @click="handleContractInfo(scope.row.id)">{{ scope.row.name }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="contractType" label="合同类型" sortable min-width="110">
                    <template slot-scope="scope">
                        {{ scope.row.contractType | _filterContractType }}
                    </template>
                </el-table-column>
                <el-table-column prop="contractAttribute" label="合同属性" sortable min-width="110">
                    <template slot-scope="scope">
                        {{ scope.row.contractAttribute | _filterContractAttribute }}
                    </template>
                </el-table-column>
                <el-table-column prop="partyAName" label="客户名称" sortable min-width="160">
                    <template slot-scope="scope">
                        <a style="color: blue" @click="_toOpenCustomerDetail(scope.row.partyAId)">
                            {{ scope.row.partyAName }}
                        </a>
                    </template>
                </el-table-column>
                <el-table-column prop="businessMode" label="业务模式" sortable min-width="120">
                    <template slot-scope="scope">
                        {{ scope.row.businessMode | _filterBusinessModel }}
                    </template>
                </el-table-column>
                <el-table-column prop="startDate" label="有效期起" sortable min-width="160"></el-table-column>
                <el-table-column prop="endDate" label="有效期止" sortable min-width="160"></el-table-column>
                <el-table-column prop="createDateTime" label="创建时间" sortable min-width="160"></el-table-column>
                <el-table-column prop="contractStatus" label="状态" sortable min-width="80">
                    <template slot-scope="scope">
                        {{ scope.row.contractStatus | _filterContractStatus }}
                    </template>
                </el-table-column>
                <el-table-column prop="useStatus" label="使用状态" sortable min-width="120">
                    <template slot-scope="scope">
                        {{ scope.row.useStatus | _filterUseOrUnused }}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" align="center" label="操作" sortable width="140" v-if="!isSelect">
                    <template slot-scope="scope">
                        <el-button size="small" type="text"
                                   :disabled="!(scope.row.contractStatus==='D'||scope.row.contractStatus==='S'||scope.row.contractStatus==='R'||scope.row.contractStatus==='V')"
                                   @click="handleDialogFormOpen(true,scope.row)"
                                   v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_CONTRACT:UPD')!==-1">
                            编辑
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
                                               :disabled="!(scope.row.contractStatus==='D'||scope.row.contractStatus==='S'||scope.row.contractStatus==='R'||scope.row.contractStatus==='V')"
                                               @click="handleDelContract(scope.row.id)"
                                               v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_CONTRACT:DEL')!==-1">
                                        删除
                                    </el-button>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button type="text" class="danger" size="small"
                                               :disabled="!(scope.row.contractStatus==='D'||scope.row.contractStatus==='R')"
                                               @click="handleVoid(scope.row.id)"
                                               v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_CONTRACT:VOID')!==-1">
                                        作废
                                    </el-button>
                                </el-dropdown-item>
                                <!--<el-dropdown-item>-->
                                <!--<el-button size="small" type="text"-->
                                <!--:disabled="!(scope.row.contractStatus==='D')">送审-->
                                <!--</el-button>-->
                                <!--</el-dropdown-item>-->
                                <el-dropdown-item>
                                    <el-button size="small" type="text"
                                               @click="handleSign(scope.row.id)"
                                               :disabled="!(scope.row.contractStatus==='S')"
                                               v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_CONTRACT:SIGN')!==-1">
                                        签订
                                    </el-button>
                                </el-dropdown-item>
                                <!--<el-dropdown-item>-->
                                <!--<el-button size="small" type="text">打印审批单</el-button>-->
                                <!--</el-dropdown-item>-->
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <el-dialog title="作废合同" :visible.sync="publicDialogForm" width="500px">
            <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="135px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="作废原因" prop="reason">
                            <el-input type="textarea" :rows="6" style="width: 250px"
                                      placeholder="请输入作废原因"
                                      :maxLength="$maxLength"
                                      v-model="form.reason"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="publicDialogForm = false">取 消</el-button>
                <el-button type="primary" @click="handleVoidPost">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="签订信息" :visible.sync="signDialogForm" width="500px">
            <el-form :inline="true" ref="sign" :model="sign" :rules="signRules" class="add-form" label-width="135px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="签订时间" prop="signDate">
                            <el-date-picker v-model="sign.signDate" value-format="yyyy-MM-dd" type="date"
                                            placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="签订人" prop="signPerson">
                            <el-input v-model="sign.signPerson"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="signDialogForm = false">取 消</el-button>
                <el-button type="primary" @click="handleSignPost">确 定</el-button>
            </div>
        </el-dialog>
        <contract-form ref="contractForm" @load="loadData"></contract-form>
        <contract-detail ref="contractDetail"></contract-detail>
        <custom-detail ref="customDetail"></custom-detail>
        <!--<contract-supply ref="contractSupply"></contract-supply>-->
    </div>
</template>

<script>
    import { contractSign, contractVoid, delContract, getContractList } from "@/api/contract/contract";
    import { maxLength } from "../../../utils/rules";
    import dateSlot from '@/components/date/dateSlot'
    import customDetail from '@/views/business/customer/customDetail'
    import ContractForm from './contractForm'
    import ContractDetail from './contractDetail'
    import searchCustom from '@/components/autocomplete/autoSearchCustom'
    import searchContract from '@/components/autocomplete/autoSearchContract'
    // import contractSupply from './contractSupply'

    export default {
        name: "合同管理",
        components: {
            ContractForm,
            dateSlot,
            customDetail,
            ContractDetail,
            searchCustom,
            searchContract,
            // contractSupply
        },
        data() {
            return {
                pageSearch: getContractList,
                condition: {
                    search_EQ_contractStatus: '',
                    search_EQ_statisticsStatus: '',
                },                      // 查询条件
                form: {
                    reason: '',
                },
                rules: {
                    reason: [{ required: true, message: '请输入作废原因', trigger: 'change' }, maxLength],
                },
                sign: {},
                signRules: {
                    signDate: [{ required: true, message: '请选择签订时间', trigger: 'change' }],
                    signPerson: [{ required: true, message: '请输入签订人', trigger: 'change' }]
                },
                contract: [],                       // table数组
                isSelect: false,                     // 是否是合同筛选状态,如果是true,则显示单选框及选择按钮
                radio: undefined,
                publicDialogForm: false,
                publicDialogId: null,
                signDialogForm: false,
                signDialogId: null,
            }
        },
        mounted() {
            console.log(this.$route)
            let status = this.$route.query.status
            if (status) {
                this.condition['search_EQ_contractStatus'] = status
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
                this.condition['search_EQ_contractStatus'] = status
            }
            let statistics = this.$route.query.statistics
            if (statistics) {
                this.condition['search_EQ_statisticsStatus'] = statistics
            }
            this.loadData()
        },
        methods: {
            loadData() {
                this.$refs.contract.loadData()
            },
            // 合同如果已过期,当前行则显示为其他颜色
            tableRowClassName({ row, rowIndex }) {
                if (row.isExpire) {
                    return 'warning-row'
                }
            },
            // 打开合同表单页面
            handleDialogFormOpen(isEdit, item) {
                if (isEdit) {
                    this.$refs.contractForm.form = JSON.parse(JSON.stringify(item))
                    this.$refs.contractForm.form['attachments'] = JSON.parse(JSON.stringify(item)).attachments === null ? [] : JSON.parse(JSON.stringify(item)).attachments
                    this.$refs.contractForm.isEdit = true
                }
                this.$refs.contractForm.dialogForm = true
            },
            // 打开合同详情页
            handleContractInfo(id) {
                this.$refs.contractDetail.getData(id)
            },
            // 根据ID删除合同
            handleDelContract(id) {
                this.$confirm('确认删除吗？', '提示', {}).then(() => {
                    delContract(id).then(res => {
                        this.$message({ message: '删除成功!', type: 'success' })
                        this.loadData()
                        this.$storageMsg('loadData')
                    })
                })
            },
            // 合同作废
            handleVoid(id) {
                this.publicDialogForm = true
                this.publicDialogId = id
            },
            handleVoidPost() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        contractVoid(this.publicDialogId, this.form).then(res => {
                            this.form.reason = ''
                            this.$message({ message: '作废成功!', type: 'success' })
                            this.publicDialogForm = false
                            this.loadData()
                            this.$storageMsg('loadData')
                        })
                    } else {
                        this.$message({ message: '请检查表单!', type: 'error' })
                    }
                })
            },
            handleSign(id) {
                this.signDialogForm = true
                this.signDialogId = id
            },
            handleSignPost() {
                this.$refs.sign.validate((valid) => {
                    if (valid) {
                        contractSign(this.signDialogId, this.sign).then(res => {
                            this.sign.signPerson = ''
                            this.sign.signDate = ''
                            this.$message({ message: '签订成功!', type: 'success' })
                            this.signDialogForm = false
                            this.loadData()
                            this.$storageMsg('loadData')
                        })
                    } else {
                        this.$message({ message: '请检查表单!', type: 'error' })
                    }
                })
            },
            // 打开客户详情页
            _toOpenCustomerDetail(id) {
                this.$refs.customDetail.getData(id)
            },
            _selectData() {
                if (this.radio !== undefined) {
                    // 如果是合同筛选选择,则返回选中的数据
                    this.$emit('select', this.contract[this.radio])
                    this.radio = undefined
                } else {
                    this.$message({
                        message: '请选择一条数据',
                        type: 'error'
                    })
                }
            },
            // 打开补充协议
            handleSupply() {
                this.$refs.contractSupply.dialogForm = true
            },
        },
        watch: {
            // radio(val) {
            //     if (val !== undefined) {
            //         this.$emit('select', this.contract[val])
            //     }
            // },
            publicDialogForm(bool) {
                if (!bool) {
                    this.$refs.form.resetFields()
                }
            },
            signDialogForm(bool) {
                if (!bool) {
                    this.$refs.sign.resetFields()
                }
            }
        }
    }
</script>

<style>

</style>
