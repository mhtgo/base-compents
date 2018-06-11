<template>
    <el-dialog :title="isEdit?'编辑角色':'新增角色'" :visible.sync="dialogForm" width="380px">
        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="110px">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="角色代码:" prop="roleCode">
                        <el-input v-model="form.roleCode"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="角色名称:" prop="roleName">
                        <el-input v-model="form.roleName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
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
                    <el-form-item label="角色描述:" prop="remark">
                        <el-input type="textarea" :rows="3" style="width: 188px" placeholder="请输入内容"
                                  :maxLength="$maxLength"
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
    import { addRole, updateRole } from "@/api/system/role";
    import autoSearchOrg from '@/components/autocomplete/autoSearchOrg'
    import { maxLength, sortLength } from "@/utils/rules";

    export default {
        name: "roleForm",
        components: { autoSearchOrg },
        data() {
            return {
                form: this.clearForm(),
                rules: {
                    roleCode: [{ required: true, message:'请输入角色代码', trigger: 'change' },sortLength],
                    roleName: [{ required: true, message:'请输入角色名称', trigger: 'change' },sortLength],
                    remark: [maxLength]
                },
                dialogForm: false,
                isEdit: false,
            }
        },
        methods: {
            clearForm() {
                return {
                    roleCode: '',
                    roleName: '',
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
                addRole(this.form).then(res => {
                    this.$message({ message: '新增成功!', type: 'success' })
                    this.dialogForm = false
                    this.$emit('load')
                })
            },
            // 编辑
            handleToEdit() {
                updateRole(this.form.id, this.form).then(res => {
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
