<template>
    <el-dialog :title="isEdit?'编辑安全组':'新增安全组'" :visible.sync="dialogForm" width="430px">
        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="140px">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="安全组标识:" prop="code">
                        <el-input v-model="form.code"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="安全组名称:" prop="name">
                        <el-input v-model="form.name"></el-input>
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
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogForm = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="$store.getters.loadingBtn">保 存</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import { addSecurityGroup,updateSecurityGroup } from "@/api/system/securityGroup";
    import autoSearchOrg from '@/components/autocomplete/autoSearchOrg'
    import { maxLength, sortLength } from "@/utils/rules";

    export default {
        name: "securityGroupForm",
        components: { autoSearchOrg },
        data() {
            return {
                form: this.clearForm(),
                rules: {
                    code:[{required:true,message:'请输入安全组标识',trigger:'change'},sortLength],
                    name:[{required:true,message:'请输入安全组名称',trigger:'change'},sortLength]
                },
                dialogForm: false,
                isEdit: false,
            }
        },
        methods: {
            clearForm() {
                return {
                    name: '',
                    code:'',
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
                addSecurityGroup(this.form).then(res => {
                    this.$message({ message: '新增成功!', type: 'success' })
                    this.dialogForm = false
                    this.$emit('load')
                })
            },
            // 编辑
            handleToEdit() {
                updateSecurityGroup(this.form.id, this.form).then(res => {
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
