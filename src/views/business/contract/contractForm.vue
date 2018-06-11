<template>
    <el-dialog :title="isEdit?'编辑合同':'新增合同'" :visible.sync="dialogForm" width="1000px">
        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="110px">
            <el-row>
                <el-col :span="8" v-if="isEdit">
                    <el-form-item label="电子编号">
                        <el-input type="text" v-model.trim="form.eleCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="纸质合同编号" prop="code">
                        <el-input type="text" v-model.trim="form.code" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="合同名称" prop="name">
                        <el-input type="text" v-model.trim="form.name" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="合同类型" prop="contractType">
                        <el-select v-model="form.contractType" placeholder="请选择" @change="handleChange">
                            <el-option v-for="[key, val] in _dictContractType" :key="key" :label="val"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="甲方单位" prop="partyAId">
                        <search-custom v-if="contractType==='I'" v-model="form.partyAId"
                                       @matchRecord="v=>{form.partyAId=v.id;form.partyAName=v.name}"
                                       :name="form.partyAName"></search-custom>
                        <search-org v-if="contractType==='O'" v-model="form.partyAId"
                                    @matchRecord="v=>{form.partyAId=v.id;form.partyAName=v.name}"
                                    :name="form.partyAName"></search-org>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="乙方单位" prop="partyBId">
                        <search-custom v-if="contractType==='O'" v-model="form.partyBId"
                                       @matchRecord="v=>{form.partyBId=v.id;form.partyBName=v.name}"
                                       :name="form.partyBName"></search-custom>
                        <search-org v-if="contractType==='I'" v-model="form.partyBId"
                                    @matchRecord="v=>{form.partyBId=v.id;form.partyBName=v.name}"
                                    :name="form.partyBName"></search-org>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="业务模式" prop="businessMode">
                        <el-select v-model="form.businessMode" placeholder="请选择" clearable>
                            <el-option v-for="[key, val] in _dictBusinessModel" :key="key" :label="val"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否月结" prop="monthly">
                        <el-select v-model="form.monthly" placeholder="请选择" clearable>
                            <el-option v-for="[key, val] in _dictTrueOrFalse" :key="key" :label="val"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="结算标准" prop="costStandard">
                        <el-select v-model="form.costStandard" placeholder="请选择" clearable>
                            <el-option v-for="[key, val] in _dictCostStandardType" :key="key" :label="val"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="合同属性" prop="contractAttribute">
                        <el-select v-model="form.contractAttribute" placeholder="请选择" clearable>
                            <el-option v-for="[key, val] in _dictContractAttribute" :key="key" :label="val"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="有效期起" prop="startDate">
                        <el-date-picker v-model="form.startDate"
                                        :picker-options="startPickerOptions"
                                        value-format="yyyy-MM-dd"
                                        type="date"
                                        placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="有效期止" prop="endDate">
                        <el-date-picker v-model="form.endDate"
                                        value-format="yyyy-MM-dd"
                                        :picker-options="endPickerOptions"
                                        type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <h3>货物信息</h3>
            <el-row type="flex" justify="end">
                <el-button type="primary" @click="handleAddCargo" class="ml-80">增 加</el-button>
                <el-button type="danger" @click="handleDelTable" style="margin-right: 25px">删 除</el-button>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label=" " class="flexCenter form-input-width">
                        <el-table :data="form.contractCargo" border max-height="300"
                                  @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="55"></el-table-column>
                            <!--<el-table-column fixed="left" prop="cargoTypeName" label="货物类型" min-width="204">-->
                            <!--<template slot-scope="scope">-->
                            <!--<el-select v-model="scope.row.cargoTypeName">-->
                            <!--<el-option v-for="[key, val] of _dictBankType" :label="val" :value="key"-->
                            <!--:key="key"></el-option>-->
                            <!--</el-select>-->
                            <!--</template>-->
                            <!--</el-table-column>-->
                            <el-table-column prop="cargoName" label="货物名称" min-width="150">
                                <template slot-scope="scope">
                                    <el-input maxlength="32" v-model.trim="scope.row.cargoName" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="spec1" label="规格1" min-width="100">
                                <template slot-scope="scope">
                                    <el-input maxlength="32" v-model.trim="scope.row.spec1" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="spec2" label="规格2" min-width="100">
                                <template slot-scope="scope">
                                    <el-input maxlength="32" v-model.trim="scope.row.spec2" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="spec3" label="规格3" min-width="100">
                                <template slot-scope="scope">
                                    <el-input maxlength="32" v-model.trim="scope.row.spec3" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="material" label="材质" min-width="100">
                                <template slot-scope="scope">
                                    <el-input maxlength="32" v-model.trim="scope.row.material" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="price" label="单价" min-width="154">
                                <template slot-scope="scope">
                                    <!--<el-input v-model.trim="scope.row.price" clearable></el-input>-->
                                    <input-numbers v-model.trim="scope.row.price"></input-numbers>
                                </template>
                            </el-table-column>
                            <el-table-column prop="place" label="产地" min-width="140">
                                <template slot-scope="scope">
                                    <el-input maxlength="32" v-model.trim="scope.row.place" clearable></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-col>
            </el-row>
            <h3>合同摘要</h3>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="摘要" class="customFormWidth">
                        <el-input type="textarea" maxlength="255" :rows="5" placeholder="请输入内容"
                                  v-model="form.abstractDesc"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注" class="customFormWidth">
                        <el-input type="textarea" maxlength="255" :rows="5" placeholder="请输入内容"
                                  v-model="form.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <h3>合同附件</h3>
            <!--<el-button type="primary" class="ml-80">上传附件</el-button>-->
            <el-row>
                <el-col :span="24">
                    <el-form-item label="附件" class="customFormWidth">
                        <attachments v-model="form.attachments"></attachments>
                        <download v-model="form.attachments"></download>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row style="margin-top: 20px" v-if="isEdit">
                <el-col :span="8">
                    <el-form-item label="创建人:">{{ form.createBy }}</el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="所属部门:">{{ form.deptName }}</el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="创建时间:">{{ form.createDateTime }}</el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button class="ml-80" type="primary" @click="handleSaveContract(false)"
                       :loading="$store.getters.loadingBtn">保存草稿</el-button>
            <!--<el-button type="primary" @click="handleSaveContract(true)"-->
            <!--:loading="$store.getters.loadingBtn">保存并提交</el-button>-->
            <el-button @click="dialogForm = false">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import { addContract, contractApprovalPass, updateContract } from "@/api/contract/contract";
    import { approval } from "@/api/workflow/workflow";
    import searchCustom from '@/components/autocomplete/autoSearchCustom'
    import searchOrg from '@/components/autocomplete/autoSearchOrg'
    import { PUBLIC_LIMIT, REG_TEXT } from "@/utils/Reg";
    import { sortLength } from "@/utils/rules";
    import { getLocalTime } from "@/utils/dateFormat";
    import attachments from '@/components/file-upload'
    import download from '@/components/download'

    export default {
        name: "contractForm",
        components: { searchCustom, attachments, download, searchOrg },
        data() {
            return {
                isEdit: false,
                dialogForm: false,
                form: this.clearForm(),
                rules: {
                    code: [{ message: '只能输入中文,英文及数字', pattern: REG_TEXT, trigger: 'change' }, sortLength],
                    name: [{ required: true, validator: PUBLIC_LIMIT, trigger: 'change' }, sortLength],
                    contractType: [{ required: true, message: '请选择合同类型', trigger: 'change' }],
                    partyAId: [{ required: true, message: '请输入甲方单位', trigger: 'change' }],
                    partyBId: [{ required: true, message: '请输入乙方单位', trigger: 'change' }],
                    businessMode: [{ required: true, message: '请选择业务模式', trigger: 'change' }],
                    monthly: [{ required: true, message: '请选择是否月结', trigger: 'change' }],
                    costStandard: [{ required: true, message: '请选择结算标准', trigger: 'change' }],
                    contractAttribute: [{ required: true, message: '请选择合同属性', trigger: 'change' }],
                    startDate: [{ required: true, message: '请选择有效期起', trigger: 'change' }],
                    endDate: [{ required: true, message: '请选择有效期止', trigger: 'change' }],
                },
                multipleSelection: [],               // 选择的行
            }
        },
        mounted() {
            if (!this.isEdit) {
                this.form.partyBId = this.$store.state.user.currentUser.org.id
                this.form.partyBName = this.$store.state.user.currentUser.org.name
                console.log('-------------here---------------')
                console.log(this.form.partyBName)
            }
        },
        methods: {
            // 新增一行货物信息
            handleAddCargo() {
                this.form.contractCargo.push({
                    cargoTypeName: '',
                    cargoName: '',
                    spec1: '',
                    spec2: '',
                    spec3: '',
                    material: '',
                    price: '',
                    place: '',
                })
            },
            // 选中表格的行
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            // 删除选中的行
            handleDelTable() {
                if (this.multipleSelection.length > 0) {
                    this.form.contractCargo = this.form.contractCargo.filter(f => {
                        return !this.multipleSelection.includes(f)
                    })
                } else {
                    this.$message({
                        message: `请先选择一条数据`,
                        type: 'error'
                    })
                }
            },

            /*
            * 保存 新增或编辑合同信息
            * this.isEdit 是否编辑
            * isApproval 是否送审
            * */
            handleSaveContract(isApproval) {
                let contractCargo = this.form.contractCargo
                if (contractCargo && contractCargo.length === 0) {
                    this.$message({ message: `至少有一条货物信息`, type: 'error' })
                    return
                }
                for (let i = 0; i < this.form.contractCargo.length; i++) {
                    // if (!contractCargo[i].cargoTypeName) {
                    //     this.$message({ message: `请选择货物类型`, type: 'error' })
                    //     return
                    // }
                    if (!contractCargo[i].cargoName) {
                        this.$message({ message: `请输入货物名称`, type: 'error' })
                        return
                    }
                }


                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.isEdit ? this.handleToEdit(isApproval) : this.handleToAdd(isApproval)
                    } else {
                        this.$message({
                            message: '请检查表单',
                            type: 'error'
                        })
                    }
                })
            },
            // 编辑合同信息
            handleToEdit(isApproval) {
                updateContract(this.form.id, this.form).then(res => {
                    isApproval ? this.handleApproval(this.form.id) : this.handleCloseDialog('编辑成功!')
                })
            },
            // 新增合同
            handleToAdd(isApproval) {
                addContract(this.form).then(res => {
                    isApproval ? this.handleApproval(res.data.id) : this.handleCloseDialog('新增成功!')
                })
            },
            // 合同提交
            handleApproval(id) {
                contractApprovalPass(id).then(response => {
                    this.handleCloseDialog('提交成功!')
                })
            },
            // 新增或编辑成功,关闭弹窗事件
            handleCloseDialog(msg) {
                this.$message({ message: `${msg}`, type: 'success' })
                this.dialogForm = false
                this.$emit('load')
                this.$storageMsg('loadData')
            },
            handleChange(val){
                if (val === 'I') {
                    this.form.partyBId = this.$store.state.user.currentUser.org.id
                    this.form.partyBName = this.$store.state.user.currentUser.org.name
                    this.form.partyAId = ''
                    this.form.partyAName = ''
                } else {
                    this.form.partyBId = ''
                    this.form.partyBName = ''
                    this.form.partyAId = this.$store.state.user.currentUser.org.id
                    this.form.partyAName = this.$store.state.user.currentUser.org.name
                }
            },
            clearForm() {
                return {
                    code: '',
                    name: '',
                    // id: '',
                    contractType: 'I',
                    businessMode: 'JZX',
                    monthly: false,
                    costStandard: 'BSTD',
                    contractAttribute: 'TSHT',
                    startDate: getLocalTime(+new Date(), 'YYYY-MM-DD'),
                    endDate: '',
                    abstractDesc: '',
                    remark: '',
                    partyAName: '',
                    partyBName: this.$store.state.user.currentUser.org.name,
                    partyAId: '',
                    partyBId: this.$store.state.user.currentUser.org.id,
                    contractCargo: [{
                        cargoTypeName: '',
                        cargoName: '',
                        spec1: '',
                        spec2: '',
                        spec3: '',
                        material: '',
                        price: '',
                        place: '',
                    }],
                    attachments: []
                }
            }
        },
        watch: {
            dialogForm(val) {
                if (!val) {
                    this.$refs.form.resetFields()
                    this.isEdit = false
                    this.form = this.clearForm()
                }
            },
            // contractType(val) {
            //     if (!this.isEdit) {
            //         if (val === 'I') {
            //             this.form.partyBId = this.$store.state.user.currentUser.org.id
            //             this.form.partyBName = this.$store.state.user.currentUser.org.name
            //             this.form.partyAId = ''
            //             this.form.partyAName = ''
            //         } else {
            //             this.form.partyBId = ''
            //             this.form.partyBName = ''
            //             this.form.partyAId = this.$store.state.user.currentUser.org.id
            //             this.form.partyAName = this.$store.state.user.currentUser.org.name
            //         }
            //     }
            // }
        },
        computed: {
            // 设置有效起始日期
            startPickerOptions() {
                let endDate = this.form.endDate
                return {
                    disabledDate(time) {
                        // if (time.getTime() < (+new Date()) - 60 * 60 * 24 * 1000) {
                        //     return true
                        // }
                        if (endDate) {
                            return time.getTime() > new Date(endDate).getTime()
                        } else {
                            return false
                        }
                    }
                }
            },
            // 设置有效截止日期
            endPickerOptions() {
                let startDate = this.form.startDate
                return {
                    disabledDate(time) {
                        if (startDate) {
                            // return time.getTime() < new Date(startDate).getTime() - 60 * 60 * 24 * 1000
                            return time.getTime() < new Date(startDate).getTime()
                        } else {
                            return false
                        }
                    }
                }
            },
            // 合同类型
            contractType() {
                return this.form.contractType
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    /*.dialog-footer {*/
    /*display: flex;*/
    /*justify-content: flex-start;*/
    /*}*/

</style>
