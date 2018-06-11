<template>
    <el-dialog :title="isEdit?'编辑箱尺寸':'新增箱尺寸'" :visible.sync="dialogForm" width="60%">
        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="100px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="尺寸" prop="containerSize">
                        <el-input v-model="form.containerSize"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="表箱系数" prop="teu">
                        <el-input v-model="form.teu"></el-input>
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
    import { addContainerSize, updateContainerSize } from "@/api/containerSize/containerSize";
    import { PUBLIC_NUMBER } from "@/utils/Reg";
    import { maxLength, sortLength } from "@/utils/rules";

    export default {
        name: "containerSizeForm",
        data() {
            return {
                form: this.clearForm(),
                rules: {
                    containerSize: [{ required: true, validator: PUBLIC_NUMBER, trigger: 'change' }, sortLength],
                    teu: [{ required: true, validator: PUBLIC_NUMBER, trigger: 'change' }],
                },
                dialogForm: false,
                isEdit: false,
            }
        },
        methods: {
            clearForm() {
                return {
                    containerSize: '',
                    teu: '',
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
                addContainerSize(this.form).then(res => {
                    this.$message({ message: '新增成功!', type: 'success' })
                    this.dialogForm = false
                    this.$emit('load')
                })
            },
            // 编辑
            handleToEdit() {
                updateContainerSize(this.form.id, this.form).then(res => {
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
