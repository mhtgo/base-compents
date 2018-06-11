<template>
    <div>
        <base-list ref="person" :condition="condition" :datas.sync="person" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="部门名称">
                            <auto-search-dept @selectName="v=>condition['search_LIKE_dept.name']=v"></auto-search-dept>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label=登录账户>
                            <el-input v-model="condition['search_LIKE_userName']" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="启用状态">
                            <el-select v-model="condition['search_EQ_status']" placeholder="请选择" clearable>
                                <el-option v-for="[key, val] in _dictAccountStatus" :key="key" :label="val"
                                           :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" icon="el-icon-search" @click="loadData" class="ml-80">查 询</el-button>
                        <el-button formVisible="true" icon="el-icon-plus" @click="handleDialogFormOpen(false)"
                                   v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_PERSONMGR:ADD')!==-1">
                            新增
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="person" border stripe max-height="500">
                <el-table-column prop="userName" label="登录账户" sortable min-width="120"></el-table-column>
                <el-table-column prop="org.name" label="所属单位" sortable min-width="200"></el-table-column>
                <el-table-column prop="dept.name" label="所属部门" sortable width="110"></el-table-column>
                <el-table-column prop="accountType" label="账户类型" sortable min-width="110">
                    <template slot-scope="scope">
                        {{ scope.row.accountType | _filterAccountType }}
                    </template>
                </el-table-column>
                <!--<el-table-column prop="roles" label="所属角色" sortable min-width="120"></el-table-column>-->
                <!--<el-table-column prop="processPermissions" label="所属安全组" sortable min-width="120"></el-table-column>-->
                <el-table-column prop="name" label="员工姓名" sortable min-width="120"></el-table-column>
                <el-table-column prop="telphone" label="联系方式" sortable width="110"></el-table-column>
                <el-table-column prop="status" label="状态" sortable width="80">
                    <template slot-scope="scope">
                        {{ scope.row.status | _filterAccountStatus }}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" align="center" label="操作" sortable width="140">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="handleDialogFormOpen(true,scope.row)"
                                   v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_PERSONMGR:UPD')!==-1">
                            编辑
                        </el-button>
                        <el-dropdown style="margin-left:10px">
                            <span class="el-dropdown-link">
                                <el-button size="small" type="text">更多
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <el-button type="text" class="danger" size="small"
                                               @click="handleChangeStatus(scope.row)"
                                               v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_PERSONMGR:DISABLED')!==-1">
                                        {{ scope.row.status ?'注销':'启用' }}
                                    </el-button>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button type="text" class="danger" size="small" @click="handleRemove(scope.row)"
                                               v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_PERSONMGR:DEL')!==-1">
                                        删除
                                    </el-button>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button type="text" size="small" @click="handlePassWord(scope.row)">重置密码
                                    </el-button>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <person-form ref="personForm" @load="loadData"></person-form>
    </div>
</template>

<script>
    import { changePersonStatus, deletePerson, getPersonList, resetPersonPassword } from "@/api/system/person";
    import personForm from './personForm'
    import autoSearchDept from '@/components/autocomplete/autoSearchDept'

    export default {
        name: "用户管理",
        components: { personForm, autoSearchDept },
        data() {
            return {
                condition: {},                      // 查询条件
                person: [],                      // table数组
                pageSearch: getPersonList,          // 分页查询api接口
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            loadData() {
                this.$refs.person.loadData().then(res => {
                    console.log(res)
                })
            },
            handleDialogFormOpen(bool, item) {
                if (bool) {
                    let form = JSON.parse(JSON.stringify(item))
                    let processPermissions = []
                    let roles = []
                    form.processPermissions.map((m, i) => {
                        processPermissions[i] = m.id
                    })
                    form.roles.forEach((m, i) => {
                        roles[i] = m.id
                    })
                    this.$refs.personForm.form = {
                        id: form.id,
                        orgId: form.org.id,
                        orgName: form.org.name,
                        userName: form.userName,
                        name: form.name,
                        deptId: form.dept ? form.dept.id : null,
                        deptName: form.dept ? form.dept.name : '',
                        telphone: form.telphone,
                        idNumber: form.idNumber,
                        email: form.email,
                        deptHeader: form.deptHeader,
                        status: form.status,
                        sex: form.sex,
                        accountType: form.accountType,
                        remark: form.remark,
                        processPermissions,
                        roles,
                    }
                    console.log(this.$refs.personForm.form)
                    this.$refs.personForm.isEdit = true
                    this.$refs.personForm.dialogForm = true
                } else {
                    this.$refs.personForm.dialogForm = true
                }
            },
            handleChangeStatus(item) {
                let msg = item.status ? '注销' : '启用'
                this.$confirm(`是否要${msg}该用户?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    changePersonStatus(item.id).then(res => {
                        this.$message({ type: 'success', message: `${msg}成功!` });
                        this.loadData()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            // 重置密码
            handlePassWord(item) {
                resetPersonPassword(item.id).then(res => {
                    this.$message({ type: 'success', message: `重置密码成功!` });
                    this.loadData()
                })
            },
            handleRemove(item) {
                deletePerson(item.id).then(res => {
                    this.$message({ type: 'success', message: `删除成功!` });
                    this.loadData()
                })
            }
        },
    }
</script>

<style scoped>

</style>
