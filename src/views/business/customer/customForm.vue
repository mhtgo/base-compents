<template>
    <el-dialog :title="isEdit?'编辑客户信息':'新增客户信息'" :visible.sync="dialogForm" width="1100px">
        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="140px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="客户代码" prop="customerCode">
                        <el-input type="text" v-model.trim="form.customerCode" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="客户简称" prop="shortName">
                        <el-input type="text" v-model.trim="form.shortName" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="客户名称" prop="name">
                        <el-input type="text" v-model.trim="form.name" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="社会信用代码" prop="creditCode">
                        <el-input type="text" v-model.trim="form.creditCode" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="成立日期">
                        <el-date-picker v-model="form.regDate" type="date" placeholder="选择日期"
                                        value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="注册资本(万元)" prop="regeditAmount">
                        <input-numbers v-model="form.regeditAmount" :name="form.regeditAmount"></input-numbers>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="法定代表人" prop="legalPerson">
                        <el-input type="text" v-model.trim="form.legalPerson" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系电话" prop="linkTel">
                        <el-input type="text" v-model.trim="form.linkTel" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系人" prop="linkMan">
                        <el-input type="text" v-model.trim="form.linkMan" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="企业性质">
                        <el-select v-model="form.entNature" placeholder="请选择" clearable>
                            <el-option v-for="[key, val] in _dictCompanyNature" :key="key" :label="val"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="上级单位">
                        <search-custom v-model="form.parentOrgId" @select="v=>form.parentOrgId=v"
                                       :name="form.parentOrgName"></search-custom>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="客户类型" v-if="isEdit">
                        <el-select v-model="form.customerType" placeholder="请选择" clearable>
                            <el-option v-for="[key, val] in _dictCustomType" :key="key" :label="val"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="是否生产企业">
                        <el-radio v-model="form.productionCompany" :label="true">是</el-radio>
                        <el-radio v-model="form.productionCompany" :label="false">否</el-radio>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="有无年产量">
                        <el-radio v-model="form.isSupplyYield" :label="true">是</el-radio>
                        <el-radio v-model="form.isSupplyYield" :label="false">无</el-radio>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="年产量" v-show="form.isSupplyYield" prop="supplyYields">
                        <el-input type="text" v-model.trim="form.supplyYields" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="无年产量说明" v-show="!form.isSupplyYield">
                        <el-input type="text" v-model.trim="form.supplyNoYieldRemark" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="是否初次签约">
                        <el-radio v-model="form.isFirstSigning" :label="true">是</el-radio>
                        <el-radio v-model="form.isFirstSigning" :label="false">否</el-radio>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="有无不良记录">
                        <el-radio v-model="form.isBad" :label="true">是</el-radio>
                        <el-radio v-model="form.isBad" :label="false">无</el-radio>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否箱主">
                        <el-radio v-model="form.isOwner" :label="true">是</el-radio>
                        <el-radio v-model="form.isOwner" :label="false">否</el-radio>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="是否船公司">
                        <el-radio v-model="form.isShipCompany" :label="true">是</el-radio>
                        <el-radio v-model="form.isShipCompany" :label="false">否</el-radio>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否船代">
                        <el-radio v-model="form.isShipAgent" :label="true">是</el-radio>
                        <el-radio v-model="form.isShipAgent" :label="false">否</el-radio>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否货主">
                        <el-radio v-model="form.isCargoOwner" :label="true">是</el-radio>
                        <el-radio v-model="form.isCargoOwner" :label="false">否</el-radio>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="是否发货人">
                        <el-radio v-model="form.isConsigner" :label="true">是</el-radio>
                        <el-radio v-model="form.isConsigner" :label="false">否</el-radio>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否收货人">
                        <el-radio v-model="form.isConsignee" :label="true">是</el-radio>
                        <el-radio v-model="form.isConsignee" :label="false">否</el-radio>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="注册地址" prop="regAddress" class="customFormWidth">
                        <el-input type="text" v-model.trim="form.regAddress" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="办公地址" prop="address" class="customFormWidth">
                        <el-input type="text" v-model.trim="form.address" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="主营信息" prop="busScope" class="customFormWidth">
                        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.busScope"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注" prop="remark" class="customFormWidth">
                        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="附件">
                        <attachments v-model="form.attachments"></attachments>
                        <download v-model="form.attachments"></download>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="开户银行信息">
                        <el-button type="primary" @click="handleAddBank">新 增</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label=" " class="customFormBankWidth">
                        <el-table :data="form.customBank" border max-height="300">
                            <el-table-column fixed="left" prop="accountType" label="银行类型" min-width="204">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.bankAccountType">
                                        <el-option v-for="[key, val] of _dictBankType" :label="val" :value="key"
                                                   :key="key"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="openBank" label="开户银行" min-width="150">
                                <template slot-scope="scope">
                                    <el-input maxLength="32" v-model.trim="scope.row.openBank" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="bankNo" label="银行账号" min-width="220">
                                <template slot-scope="scope">
                                    <el-input maxLength="32" v-model.trim="scope.row.bankNo" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="bankName" label="账户名称" min-width="180">
                                <template slot-scope="scope">
                                    <el-input maxLength="32" v-model.trim="scope.row.bankName" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="80" align="center">
                                <template slot-scope="scope">
                                    <el-button type="text" class="danger"
                                               @click="form.customBank.splice(scope.$index,1)">删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogForm = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="$store.getters.loadingBtn">保 存</el-button>
        </div>
    </el-dialog>

</template>

<script>
    import { addCustomer, updateCustomer } from '@/api/custom/customList'
    import {
        PRIVATE_CODE,
        PUBLIC_LIMIT,
        PUBLIC_NOT_CHINESE,
        PUBLIC_TEL,
        REG_ALL_NUMBER,
        REG_CHINESE,
        REG_LIMIT,
        REG_NUMBER,
        REG_TEXT,
        PUBLIC_NUM_CODE
    } from "@/utils/Reg";
    import {
        creditCodeLength,
        creditCodeMinLength,
        maxLength,
        normalLength,
        sortLength,
        telLength
    } from "@/utils/rules";
    import searchCustom from '@/components/autocomplete/autoSearchCustom'
    import attachments from '@/components/file-upload'
    import download from '@/components/download'

    export default {
        name: "customForm",
        components: { searchCustom, attachments, download },
        data() {
            // 如果有年产量,则验证是否为数字
            const isSupplyYield = (r, v, c) => {
                if (this.isSupplyYield) {
                    if (v === undefined || v === '' || REG_ALL_NUMBER.test(v)) {
                        c()
                    } else {
                        return c(new Error('请输入正确的数字'))
                    }
                } else {
                    c()
                }
            }
            return {
                form: this.clearForm(),
                dialogForm: false,                //弹窗控制器
                rules: {
                    creditCode: [{ message: '请输入社会信用代码', trigger: 'change' },
                        { validator: PUBLIC_NUM_CODE, trigger: 'change' }, creditCodeLength, creditCodeMinLength],
                    name: [{ required: true, validator: PUBLIC_LIMIT, trigger: 'change' }, sortLength],
                    shortName: [{ required: true, validator: PUBLIC_LIMIT, trigger: 'change' }, sortLength],
                    regeditAmount: [{ message: '请输入正确的数字', pattern: REG_ALL_NUMBER, trigger: 'blur' }, sortLength],
                    legalPerson: [{ message: '请输入中文', pattern: REG_CHINESE, trigger: 'change' }, sortLength],
                    linkMan: [{ message: '请输入中文', pattern: REG_CHINESE, trigger: 'change' }, sortLength],
                    regAddress: [{ required: true, validator: PUBLIC_LIMIT, trigger: 'change' }, normalLength],
                    linkTel: [{ message: '请输入正确的数字', pattern: REG_ALL_NUMBER, trigger: 'change' }, telLength],
                    supplyYields: [{ validator: isSupplyYield, trigger: 'change' }],
                    attachments: [{ required: true, message: '请上传附件', trigger: 'change' }],
                    customerCode: [{ required: true, validator: PRIVATE_CODE, trigger: 'change' }],
                    address: [normalLength],
                    busScope: [maxLength],
                    remark: [maxLength],
                },
                isEdit: false,                  // 是否编辑表单
            }
        },
        mounted() {
        },
        methods: {
            // 提交表单
            handleSubmit() {
                console.log(this.form)
                // 避免重复提交时 提示报错
                if (!this.dialogForm) {
                    return
                }
                let bank = this.form.customBank
                for (let i = 0; i < bank.length; i++) {
                    let key = Object.values(bank[i])
                    for (let j = 0; j < key.length; j++) {
                        if (key[j] === '') {
                            let msg = ''
                            msg = j === 1 ? '开户银行' : j === 2 ? '银行账号' : '账户名称'
                            this.$message({
                                message: `${msg}不能为空! 请填写完整的银行信息`,
                                type: 'error'
                            })
                            return
                        }
                    }
                }
                for (let i = 0; i < bank.length; i++) {
                    if (!REG_TEXT.test(bank[i].openBank)) {
                        this.$message({
                            message: `开户银行只能输入中文,英文及数字`,
                            type: 'error'
                        })
                        return
                    }
                    if (!REG_NUMBER.test(bank[i].bankNo)) {
                        this.$message({
                            message: `银行账号只能输入数字`,
                            type: 'error'
                        })
                        return
                    }
                    if (!REG_TEXT.test(bank[i].bankName)) {
                        this.$message({
                            message: `账户名称只能输入中文,英文及数字`,
                            type: 'error'
                        })
                        return
                    }
                }

                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.isEdit ? this.handleToEdit() : this.handleToAdd()
                    } else {
                        this.$message({
                            message: '请检查表单',
                            type: 'error'
                        })
                    }
                })
            },
            // 新增
            handleToAdd() {
                addCustomer(this.form).then(res => {
                    this.$message({ message: '新增成功!', type: 'success' })
                    this.dialogForm = false
                    this.$emit('load')
                    this.$storageMsg('loadData')
                })
            },
            // 编辑
            handleToEdit() {
                updateCustomer(this.form.id, this.form).then(res => {
                    this.$message({ message: '编辑成功!', type: 'success' })
                    this.dialogForm = false
                    this.$emit('load')
                    this.$storageMsg('loadData')
                })
            },
            // 添加银行信息
            handleAddBank() {
                this.form.customBank.push({ bankAccountType: 'B', openBank: '', bankNo: '', bankName: '' })
            },
            // 上传
            handleUpload() {
                this.$message({ message: '功能开发中...', type: 'error' })
            },
            // 清除表单数据
            clearForm() {
                return {
                    creditCode: '',
                    customerCode: '',
                    customerType: 'NORMAL',
                    shortName: '',
                    name: '',
                    regDate: '',
                    regeditAmount: '',
                    legalPerson: '',
                    linkTel: '',
                    linkMan: '',
                    entNature: '',
                    parentOrgId: '',
                    productionCompany: false,
                    isSupplyYield: false,
                    supplyNoYieldRemark: '',
                    isFirstSigning: false,
                    isBad: false,
                    isOwner: false,
                    isShipCompany: false,
                    isShipAgent: false,
                    isCargoOwner: false,
                    isConsigner: false,
                    isConsignee: false,
                    isOwner: false,
                    regAddress: '',
                    address: '',
                    busScope: '',
                    remark: '',
                    // attachments: [],
                    customBank: [],
                }
            },
        },
        watch: {
            dialogForm(bool) {
                if (!bool) {
                    this.$refs.form.resetFields()
                    this.isEdit = false
                    this.form = this.clearForm()
                } else {
                    console.log(this.form)
                }
            },
        },
        computed: {
            isSupplyYield() {
                return this.form.isSupplyYield
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
