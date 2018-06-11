<template>
    <el-dialog :title="isEdit?'编辑箱类型':'新增箱类型'" :visible.sync="dialogForm" width="670px">
        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="100px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="箱型名称" prop="containerType">
                        <el-input v-model="form.containerType"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="高度(英尺)" prop="heightFoot">
                        <el-input v-model="form.heightFoot"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="高度(毫米)" prop="heightMm">
                        <el-input v-model="form.heightMm"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" :rows="4" style="width: 188px" placeholder="请输入内容"
                                  v-model="form.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogForm = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">保 存</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import { addContainerType, updateContainerType } from "@/api/containerType/containerType";
    import { PUBLIC_NUMBER } from "@/utils/Reg";
    import { maxLength, sortLength } from "@/utils/rules";

    export default {
        name: "containerTypeForm",
        data() {
            return {
                form: this.clearForm(),
                rules: {
                    containerType: [{ required: true, message: '请输入箱型名称', trigger: 'change' }, sortLength],
                    heightFoot: [{ required: true, validator: PUBLIC_NUMBER, trigger: 'change' }],
                    heightMm: [{ required: true, validator: PUBLIC_NUMBER, trigger: 'change' }],
                    remark: [maxLength]
                },
                dialogForm: false,
                isEdit: false,
            }
        },
        methods: {
            clearForm() {
                return {
                    containerType: '',
                    heightFoot: '',
                    heightMm: '',
                    remark: '',
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
                addContainerType(this.form).then(res => {
                    this.$message({ message: '新增成功!', type: 'success' })
                    this.dialogForm = false
                    this.$emit('load')
                })
            },
            // 编辑
            handleToEdit() {
                updateContainerType(this.form.id, this.form).then(res => {
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
