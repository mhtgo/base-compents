<template>
    <el-dialog :title="isEdit?'编辑用户':'新增用户'" :visible.sync="dialogForm" width="860px">
        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="140px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="登录账户" prop="userName" clearable>
                        <el-input v-model.trim="form.userName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="账户名称" prop="name">
                        <el-input v-model.trim="form.name" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="所属单位" prop="orgId">
                        <!-- <auto-search-org v-model="form.orgId"
                                         @select="v=>form.orgId=v"
                                         @selectName="v=>form.orgName=v"
                                         :name="form.orgName"></auto-search-org> -->
                        <!-- {{$store.state.user.currentUser.org.name}} -->
                        {{form.orgName}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属部门" prop="deptId">
                        <auto-search-dept v-model="form.deptId"
                                          @select="v=>form.deptId=v"
                                          @selectName="v=>form.deptName=v"
                                          :orgId="$store.state.user.currentUser.org.id"
                                          :name="form.deptName"></auto-search-dept>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="手机号码" prop="telphone">
                        <el-input v-model.trim="form.telphone" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="身份证号" prop="idNumber">
                        <el-input v-model.trim="form.idNumber" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="邮箱地址" prop="email">
                        <el-input v-model.trim="form.email" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <!--<el-form-item label="是否部门负责人" prop="deptHeader">-->
                    <!--<el-select v-model="form.deptHeader" placeholder="请选择" clearable>-->
                    <!--<el-option v-for="[key, val] in _dictTrueOrFalse" :key="key" :label="val"-->
                    <!--:value="key"></el-option>-->
                    <!--</el-select>-->
                    <!--</el-form-item>-->
                    <el-form-item label="账户类型" prop="accountType">
                        <el-select v-model="form.accountType" placeholder="请选择" clearable>
                            <el-option v-for="[key, val] in _dictAccountType" :key="key" :label="val"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="是否启用" prop="status">
                        <el-select v-model="form.status" placeholder="请选择" clearable>
                            <el-option v-for="[key, val] in _dictAccountStatus" :key="key" :label="val"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="form.sex" placeholder="请选择" clearable>
                            <el-option v-for="[key, val] in _dictSexType" :key="key" :label="val"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="角色" class="form-checkbox" prop="roles">
                        <el-checkbox-group v-model="form.roles">
                            <el-checkbox v-for="(item,index) in role" :key="item.id"
                                         :label="item.id">{{ item.roleName }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="安全组" class="form-checkbox">
                        <el-checkbox-group v-model="form.processPermissions">
                            <el-checkbox v-for="(item,index) in processPermissions" :key="item.id"
                                         :label="item.id">{{ item.name }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注" prop="remark">
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
    import { addPerson, updatePerson } from "@/api/system/person";
    import { getRoleList } from "@/api/system/role";
    import { getSecurityGroupList } from "@/api/system/securityGroup";
    import autoSearchOrg from '@/components/autocomplete/autoSearchOrg'
    import autoSearchDept from '@/components/autocomplete/autoSearchDept'
    import { maxLength, sortLength, telLength } from "@/utils/rules";
    import { PUBLIC_NOT_ID_NUMBER, PUBLIC_TEL } from "@/utils/Reg";

    export default {
        name: "securityGroupForm",
        components: { autoSearchOrg, autoSearchDept },
        data() {
            return {
                form: this.clearForm(),
                rules: {
                    userName: [{ required: true, message: '请输入登录账户', trigger: 'change' }, sortLength],
                    name: [{ required: true, message: '请输入账户名称', trigger: 'change' }, sortLength],
                    deptId: [{ required: true, message: '请选择所属部门', trigger: 'change' }],
                    roles: [{ required: true, message: '请选择角色', trigger: 'change' }],
                    telphone: [{ required: true, validator: PUBLIC_TEL, trigger: 'change' }, telLength],
                    idNumber: [{ validator: PUBLIC_NOT_ID_NUMBER, trigger: 'blur' }],
                    email: [sortLength],
                    remark: [maxLength],
                    // deptHeader: [{ required: true, message: '请选择是否部门负责人', trigger: 'change' }],
                    status: [{ required: true, message: '请选择是否启用', trigger: 'change' }],
                    accountType: [{ required: true, message: '请选择账户类型', trigger: 'change' }],
                },
                dialogForm: false,
                isEdit: false,
                role: [],
                roles: [],
                processPermissions: [],
            }
        },
        mounted() {
            this.getRole();
        },
        methods: {
            clearForm() {
                return {
                    userName: '',
                    name: '',
                    deptId: '',
                    deptName: '',
                    telphone: '',
                    idNumber: '',
                    email: '',
                    deptHeader: '',
                    status: true,
                    sex: '',
                    accountType: '',
                    remark: '',
                    roles: [],
                    processPermissions: [],
                    orgName:this.$store.state.user.currentUser.org&&this.$store.state.user.currentUser.org.name,
                    orgId:this.$store.state.user.currentUser.org&&this.$store.state.user.currentUser.org.id
                }
            },
            // 保存
            handleSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.role.forEach(f => {
                            this.form.roles.map((m, i) => {
                                if (f.id == m) {
                                    this.form.roles[i] = {
                                        id: f.id,
                                        roleName: f.roleName
                                    }
                                }
                            })
                        })
                        this.processPermissions.forEach(f => {
                            this.form.processPermissions.map((m, i) => {
                                if (f.id == m) {
                                    this.form.processPermissions[i] = {
                                        id: f.id,
                                        name: f.name
                                    }
                                }
                            })
                        })
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
                this.form.password = 123456
                addPerson(this.form).then(res => {
                    this.$message({ message: '新增成功!', type: 'success' })
                    this.dialogForm = false
                    this.$emit('load')
                })
            },
            // 编辑
            handleToEdit() {
                updatePerson(this.form.id, this.form).then(res => {
                    this.$message({ message: '编辑成功!', type: 'success' })
                    this.dialogForm = false
                    this.$emit('load')
                })
            },
            // 获取角色列表
            getRole() {
                const params = {
                    iDisplayStart: 0,
                    iDisplayLength: 1000,
                    'search_LIKE_org.id': this.$store.state.user.currentUser.org.id,
                    sortType: '-createDateTime'
                }
                getRoleList(params).then(res => {
                    this.role = res.data.aaData
                    this.getProcessPermissions()
                })
            },
            // 获取安全组列表
            getProcessPermissions() {
                const params = {
                    iDisplayStart: 0,
                    iDisplayLength: 1000,
                    'search_LIKE_org.id': this.$store.state.user.currentUser.org.id,
                    sortType: '-createDateTime'
                }
                getSecurityGroupList(params).then(res => {
                    this.processPermissions = res.data.aaData
                })
            }
        },
        watch: {
            dialogForm(bool) {
                if (!bool) {
                    this.$refs.form.resetFields()
                    this.isEdit = false
                    this.form = this.clearForm()
                }
            }
        }
    }
</script>

<style scoped>

</style>
