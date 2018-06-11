<template>
    <el-dialog :title="isEdit?'编辑港口站点':'新增港口站点'" :visible.sync="dialogForm" width="60%">
        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="80px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="类型" prop="pasType">
                        <el-select v-model="form.pasType" placeholder="请选择" clearable>
                            <el-option v-for="[key, val] in _dictPortAndStationType" :key="key" :label="val"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="编码" prop="pasCode">
                        <el-input v-model.trim="form.pasCode" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="名称" prop="pasName">
                        <el-input v-model.trim="form.pasName" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所在地" prop="localName">
                        <el-input v-model.trim="form.localName" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" :rows="3" style="width: 188px" placeholder="请输入内容"
                                  v-model.trim="form.remark"></el-input>
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
    import { addPort, updatePort } from "@/api/port/port";
    import { REG_CHINESE, REG_UPPER_WORD } from "@/utils/Reg";
    import { maxLength, sortLength } from "@/utils/rules";

    export default {
        name: "portForm",
        data() {
            return {
                form: this.clearForm(),
                rules: {
                    pasType: [{ required: true, message: '请选择类型', trigger: 'change' }, sortLength],
                    pasCode: [
                        { required: true, message: '请输入编码', trigger: 'change' },
                        { pattern: REG_UPPER_WORD, message: '请输入大写字母', trigger: 'change' }, sortLength],
                    pasName: [
                        { required: true, message: '请输入名称', trigger: 'change' },
                        { pattern: REG_CHINESE, message: '请输入中文', trigger: 'change' }, sortLength],
                    localName: [{ pattern: REG_CHINESE, message: '请输入中文', trigger: 'change' }, sortLength],
                    remark: [maxLength]
                },
                dialogForm: false,
                isEdit: false,
            }
        },
        methods: {
            clearForm() {
                return {
                    pasCode: '',
                    pasName: '',
                    localName: '',
                    remark: '',
                    pasType: ''
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
                addPort(this.form).then(res => {
                    this.$message({ message: '新增成功!', type: 'success' })
                    this.dialogForm = false
                    this.$emit('load')
                })
            },
            // 编辑
            handleToEdit() {
                updatePort(this.form.id, this.form).then(res => {
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
