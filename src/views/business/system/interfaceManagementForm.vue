<template>
    <el-dialog :title="isEdit?'编辑角色':'新增角色'" :visible.sync="dialogForm" width="80%">
        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="140px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="所属系统" prop="orgId">
                        <el-input v-model="form.code"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="调用方式" prop="orgId">
                        <el-input v-model="form.code"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="对接单位" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="接口地址" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="接口类别" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="接口类别" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="调用秘钥" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="超时毫秒数" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="系统代码" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="接口描述" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" :rows="3" style="width: 188px" placeholder="请输入内容"
                                  v-model="form.remark"></el-input>
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
    import { addInterfaceManagement,updateInterfaceManagement } from "@/api/system/interfaceManagement";

    export default {
        name: "interfaceManagementForm",
        data() {
            return {
                form: this.clearForm(),
                rules: {},
                dialogForm: false,
                isEdit: false,
            }
        },
        methods: {
            clearForm() {
                return {
                    orgId: '',
                    name: '',
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
                addInterfaceManagement(this.form).then(res => {
                    this.$message({ message: '新增成功!', type: 'success' })
                    this.dialogForm = false
                    this.$emit('load')
                })
            },
            // 编辑
            handleToEdit() {
                updateInterfaceManagement(this.form.id, this.form).then(res => {
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
