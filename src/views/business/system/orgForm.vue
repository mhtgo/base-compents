<template>
    <el-dialog :title="isEdit?'编辑单位':'新增单位'" :visible.sync="dialogForm" width="95%">
        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="135px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="统一社会信息代码" prop="creditCode">
                        <el-input v-model.trim="form.creditCode"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="单位名称" prop="name">
                        <el-input v-model.trim="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系人" prop="linkMan">
                        <el-input v-model.trim="form.linkMan"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="联系方式" prop="linkTel">
                        <el-input v-model.trim="form.linkTel"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="企业传真" prop="fax">
                        <el-input v-model.trim="form.fax"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="企业性质" prop="entNature">
                        <el-select v-model="form.entNature" placeholder="请选择">
                            <el-option v-for="[key, val] in _dictCompanyNature" :key="key" :label="val"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="所在地" prop="address">
                        <el-input v-model.trim="form.address"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="注册时间" prop="foundedDate">
                        <el-date-picker v-model="form.foundedDate" value-format="yyyy-MM-dd" type="date"
                                        placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="注册资本(万元)" prop="registeredCapital">
                        <input-numbers v-model="form.registeredCapital" :name="form.registeredCapital"></input-numbers>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="法定代表人" prop="legalPerson">
                        <el-input v-model.trim="form.legalPerson"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="上级单位" prop="parentId">
                        <auto-search-org v-model="form.parentId"
                                         @select="v=>form.parentId=v"
                                         @selectName="v=>form.parentName=v"
                                         :name="form.parentName"></auto-search-org>
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
    import { addOrg, updateOrg } from "@/api/system/org";
    import { PUBLIC_LIMIT,PUBLIC_NUM_CODE, PUBLIC_NOT_CHINESE, PUBLIC_TEL, REG_ALL_NUMBER, REG_CHINESE, REG_NUMBER } from "@/utils/Reg";
    import { creditCodeLength, creditCodeMinLength, maxLength, sortLength, telLength } from "@/utils/rules";
    import autoSearchOrg from '@/components/autocomplete/autoSearchOrg'

    export default {
        name: "roleForm",
        components: { autoSearchOrg },
        data() {
            return {
                form: this.clearForm(),
                rules: {
                    creditCode: [{ required: true, message: '请输入社会统一信用代码', trigger: 'change' },
                        { validator: PUBLIC_NUM_CODE, trigger: 'change' },,creditCodeLength, creditCodeMinLength],
                    name: [{ required: true, validator: PUBLIC_LIMIT, trigger: 'change' }, sortLength],
                    linkMan: [{ required: true, message: '请输入联系人', trigger: 'change' },
                        { message: '请输入中文', pattern: REG_CHINESE, trigger: 'change' }, sortLength],
                    linkTel: [{ required: true, validator: PUBLIC_TEL, trigger: 'change' }, telLength],
                    fax: [{ message: '请输入正确的数字', pattern: REG_NUMBER, trigger: 'change' }, telLength],
                    registeredCapital: [{ message: '请输入正确的数字', pattern: REG_ALL_NUMBER, trigger: 'change' }, telLength],
                    legalPerson: [sortLength],
                    address: [maxLength],
                    foundedDate: [{ required: true, message: '请选择注册时间', trigger: 'change' }],
                },
                dialogForm: false,
                isEdit: false,
            }
        },
        methods: {
            clearForm() {
                return {
                    creditCode: '',
                    name: '',
                    linkMan: '',
                    linkTel: '',
                    fax: '',
                    entNature: 'GYQY',
                    address: '',
                    foundedDate: '',
                    registeredCapital: '',
                    legalPerson: '',
                    parentId: '',
                    parentName: '',
                }
            },
            // 保存
            handleSubmit() {
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
                addOrg(this.form).then(res => {
                    this.$message({ message: '新增成功!', type: 'success' })
                    this.dialogForm = false
                    this.$emit('load')
                })
            },
            // 编辑
            handleToEdit() {
                updateOrg(this.form.id, this.form).then(res => {
                    this.$message({ message: '编辑成功!', type: 'success' })
                    this.dialogForm = false
                    this.$emit('load')
                })
            },
        },
        watch: {
            dialogForm(bool) {
                if (!bool) {
                    this.$refs.form.resetFields()
                    this.isEdit = false
                    this.form = this.clearForm()
                }
            },
        },
    }
</script>

<style scoped>

</style>
