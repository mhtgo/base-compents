<template>
    <el-dialog :title="isEdit?'编辑系统参数':'新增系统参数'" :visible.sync="dialogForm" width="860px">
        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="140px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="参数代码:" prop="paramCode">
                        <el-input v-model.trim="form.paramCode" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="参数名称:" prop="paramName">
                        <el-input v-model.trim="form.paramName" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="参数级别:" prop="paramType">
                        <el-select v-model="form.paramType" placeholder="请选择" clearable>
                            <el-option v-for="[key, val] in _dictParamType" :key="key" :label="val"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="参数值:" prop="paramValue">
                        <el-input v-model.trim="form.paramValue" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="所属单位:" prop="orgId">
                        <!--<el-input v-model="form.orgId"></el-input>-->
                        <!-- <auto-search-org v-model="form.orgId"
                                         @select="v=>form.orgId=v"
                                         @selectName="v=>form.orgName=v"
                                         :name="form.orgName"></auto-search-org> -->
                        <!-- {{$store.state.user.currentUser.org.name}} -->
                        {{form.orgName}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="参数描述:" prop="remark">
                        <el-input type="textarea" :rows="3" style="width: 188px" placeholder="请输入内容"
                                  v-model.trim="form.remark"></el-input>
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
    import { addSystemParameter, updateSystemParameter } from "@/api/system/systemParameter";
    import { PRIVATE_CODE, PUBLIC_CHINESE, PUBLIC_NUMBER } from "@/utils/Reg";
    import { maxLength, sortLength } from "@/utils/rules";
    import autoSearchOrg from '@/components/autocomplete/autoSearchOrg'

    export default {
        name: "systemParameterForm",
        components: { autoSearchOrg },
        data() {
            return {
                form: this.clearForm(),
                rules: {
                    paramCode: [{ required: true, message: '请输入参数代码', trigger: 'change' }, maxLength],
                    paramName: [{ required: true, message: '请输入参数代码', trigger: 'change' }, maxLength],
                    paramType: [{ required: true, message: '请选择参数级别', trigger: 'change' }],
                    paramValue: [{ required: true, message: '请输入参数值', trigger: 'change' }, maxLength],
                    remark: [maxLength]
                },
                dialogForm: false,
                isEdit: false,
            }
        },
        methods: {
            clearForm() {
                return {
                    paramCode: '',
                    paramName: '',
                    paramType: '',
                    paramValue: '',
                    remark: '',
                    orgName:this.$store.state.user.currentUser.org&&this.$store.state.user.currentUser.org.name,
                    orgId:this.$store.state.user.currentUser.org&&this.$store.state.user.currentUser.org.id
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
                addSystemParameter(this.form).then(res => {
                    this.$message({ message: '新增成功!', type: 'success' })
                    this.dialogForm = false
                    this.$emit('load')
                })
            },
            // 编辑
            handleToEdit() {
                updateSystemParameter(this.form.id, this.form).then(res => {
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
