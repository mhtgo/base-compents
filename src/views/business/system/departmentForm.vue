<template>
    <el-dialog :title="isEdit?'编辑部门':'新增部门'" :visible.sync="dialogForm" width="380px">
        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="100px">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="所属单位:" prop="orgId">
                        <!-- <auto-search-org v-model="form.orgId" @select="v=>form.orgId=v"
                                         :name="form.orgName"></auto-search-org> -->
                        <!-- {{$store.state.user.currentUser.org.name}} -->
                        {{form.orgName}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="部门名称:" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注:" prop="remark">
                        <el-input type="textarea" :rows="3" style="width: 188px" placeholder="请输入内容" v-model="form.remark"></el-input>
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
    import {
        addDepartment,
        updateDepartment
    } from "@/api/system/department";
    import autoSearchOrg from '@/components/autocomplete/autoSearchOrg'
    import {
        PUBLIC_LIMIT
    } from "@/utils/Reg";
    import {
        maxLength,
        sortLength
    } from "@/utils/rules";

    export default {
        name: "departmentForm",
        components: {
            autoSearchOrg
        },
        data() {
            return {
                form: this.clearForm(),
                rules: {
                    name: [{
                            required: true,
                            message: '请输入部门名称',
                            trigger: 'change'
                        },
                        {
                            validator: PUBLIC_LIMIT,
                            trigger: 'change'
                        },
                        sortLength
                    ],
                    remark: [maxLength]
                },
                dialogForm: false,
                isEdit: false,
            }
        },
        methods: {
            clearForm() {
                return {
                    name: '',
                    remark: '',
                    orgName: this.$store.state.user.currentUser.org&&this.$store.state.user.currentUser.org.name,
                    orgId: this.$store.state.user.currentUser.org&&this.$store.state.user.currentUser.org.id
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
                addDepartment(this.form).then(res => {
                    this.$message({
                        message: '新增成功!',
                        type: 'success'
                    })
                    this.dialogForm = false
                    this.$emit('load')
                })
            },
            // 编辑
            handleToEdit() {
                updateDepartment(this.form.id, this.form).then(res => {
                    this.$message({
                        message: '编辑成功!',
                        type: 'success'
                    })
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
