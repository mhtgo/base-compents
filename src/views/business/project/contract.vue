<template>
    <div>
        <!--正式合同-->
        <div v-if="model==='NORMAL'">
            <el-button type="primary" @click="handleAddContract">添加收入合同</el-button>
            <el-table style="margin: 20px 0" :data="contract" border stripe max-height="500">
                <el-table-column prop="id" label="合同编号" sortable min-width="180"></el-table-column>
                <el-table-column prop="name" label="合同名称" sortable min-width="160"></el-table-column>
                <el-table-column prop="contractType" label="合同类型" sortable min-width="110">
                    <template slot-scope="scope">
                        {{ scope.row.contractType | _filterContractType }}
                    </template>
                </el-table-column>
                <el-table-column prop="partyAName" label="客户名称" sortable min-width="160">
                    <!--<template slot-scope="scope">-->
                    <!--<a style="color: blue" @click="_toOpenCustomerDetail(scope.row.partyAId)">-->
                    <!--{{ scope.row.partyAName }}-->
                    <!--</a>-->
                    <!--</template>-->
                </el-table-column>
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
                <el-table-column label="附件信息" sortable width="200">
                    <template slot-scope="scope">
                        <download v-model="scope.row.attachments"></download>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" align="center" label="操作" sortable width="140">
                    <template slot-scope="scope">
                        <el-button size="small" class="danger" type="text" @click="handleDelTable">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="选择收入合同" :visible.sync="dialogForm" :modal-append-to-body="false" width="90%">
                <select-contract ref="selectContract" @select="handleSelect"></select-contract>
                <!--<span slot="footer" class="dialog-footer">-->
                    <!--<el-button type="primary" @click="handleMakeSure">确定</el-button>-->
                    <!--<el-button @click="dialogForm = false">取 消</el-button>-->
                <!--</span>-->
            </el-dialog>
        </div>
        <!--临时合同-->
        <div v-else>
            <el-form :inline="true" ref="form" :model="project" class="search-form" :rules="rules" label-width="110px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="客户单位名称" prop="partyAName">
                            <el-input v-model="project.partyAName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="联系人" prop="linkMan">
                            <el-input v-model="project.linkMan"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="联系方式" prop="linkTel">
                            <el-input v-model="project.linkTel"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <el-button style="margin-bottom: 20px" type="primary" @click="handleUpStep">上一步</el-button>
        <el-button style="margin-bottom: 20px" type="primary" @click="handleSubmit">保存草稿</el-button>
        <el-button style="margin-bottom: 20px" type="primary" @click="handleBack">返 回</el-button>
        <custom-detail ref="customDetail"></custom-detail>
    </div>
</template>

<script>
    import selectContract from '@/views/business/contract/index.vue'
    import CommonBuild from './common'
    import {
        getProjectContractNormal,
        getProjectContractTemp,
        updateProjectContractNormal,
        updateProjectContractTemp
    } from "@/api/project/project";
    import customDetail from '@/views/business/customer/customDetail.vue'
    import { PUBLIC_LIMIT, PUBLIC_TEL, REG_CHINESE, } from "@/utils/Reg";
    import { sortLength, telLength } from "@/utils/rules";
    import download from '@/components/download'

    export default {
        mixins: [CommonBuild],
        name: "contract",
        components: { selectContract, customDetail,download },
        data() {
            return {
                dialogForm: false,
                contract: [],
                project: {
                    partyAName: '',
                    linkMan: '',
                    linkTel: '',
                },
                rules: {
                    partyAName: [{ required: true, validator: PUBLIC_LIMIT, trigger: 'change' }, sortLength],
                    linkMan: [{ required: true, message: '请输入联系人', trigger: 'change' },
                        { message: '请输入中文', pattern: REG_CHINESE, trigger: 'change' }, sortLength],
                    linkTel: [{ required: true, validator: PUBLIC_TEL, trigger: 'change' }, telLength],
                }
            }
        },
        methods: {
            loadData() {
                this.model === 'NORMAL' ? this.getNormalContract() : this.getTempCustomer();
            },
            // 获取合同信息
            getNormalContract() {
                getProjectContractNormal(this.id).then(res => {
                    this.contract = res.data.aaData
                })
            },
            // 获取临时客户信息
            getTempCustomer() {
                getProjectContractTemp(this.id).then(res => {
                    if (res.data) {
                        this.project = res.data
                    }
                })
            },
            // 打开客户详情页
            _toOpenCustomerDetail(id) {
                this.$refs.customDetail.getData(id)
            },
            // 打开合同弹窗
            handleAddContract() {
                this.dialogForm = true
                this.$nextTick(() => {
                    this.$refs.selectContract.isSelect = true
                    this.$refs.selectContract.contract = []
                    this.$refs.selectContract.radio = undefined
                    this.$refs.selectContract.condition = {}
                    this.$refs.selectContract.condition.search_EQ_useStatus = false
                    this.$refs.selectContract.condition.search_EQ_contractType = 'I'
                    // this.$refs.selectContract.condition.search_EQ_contractStatus = 'C'
                    setTimeout(() => {
                        this.$refs.selectContract.loadData()
                    }, 300)
                })
            },
            // 选择合同
            handleSelect(val) {
                this.contract = JSON.parse(JSON.stringify([val]))
                this.dialogForm = false
            },
            // 删除合同
            handleDelTable() {
                this.contract = []
            },
            // 确认选择
            handleMakeSure() {
                if (this.contract.length > 0) {
                    this.dialogForm = false
                } else {
                    this.$message({ message: `请选择一条合同!`, type: 'error' })
                }
            },
            // 上一步
            handleUpStep() {
                this.$store.commit('SET_CURRENT', 0)
            },
            // 提交,并前往下一步
            handleSubmit() {
                this.model === 'NORMAL' ? this.handleSubmitNormal() : this.handleSubmitTemp()
            },
            handleSubmitNormal() {
                if (this.contract.length > 0) {
                    let data = {
                        step: 2,
                        contract: [{ id: this.contract[0].id }]
                    }
                    updateProjectContractNormal(this.id, data).then(res => {
                        this.$message({ message: `提交成功!`, type: 'success' })
                        this.handleBack()
                    })
                } else {
                    this.$message({ message: `请选择一条合同!`, type: 'error' })
                }
            },
            handleSubmitTemp() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let data = {
                            step: 2,
                            linkMan: this.project.linkMan,
                            linkTel: this.project.linkTel,
                            partyAName: this.project.partyAName,
                        }
                        updateProjectContractTemp(this.id, data).then(res => {
                            this.$message({ message: `提交成功!`, type: 'success' })
                            this.handleBack()
                        })
                    } else {
                        this.$message({ message: `请检查表单!`, type: 'error' })
                    }
                })
            },
            handleBack() {
                this.$store.dispatch('delVisitedViews',{path:`/business/busPla/Project/build/${this.model}/${this.id}`,name:'项目操作'}).then(()=>{
                    this.$store.commit('ADD_CACHED_VIEWS', {path:'/business/busPla/Project/index',name:'项目管理'})
                    this.$router.push('/business/busPla/Project/index')
                })
            }
        },
        watch: {
            dialogForm(bool) {
                if (!bool) {
                    this.$refs.selectContract.contract = []
                    this.$refs.selectContract.condition = {}
                    // 清空搜索组件的值
                    this.$refs.selectContract.$refs.searchContract.infoName = ''
                }
            }
        }
    }
</script>

<style scoped>

</style>
