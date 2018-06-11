<template>
    <div>
        <base-list ref="role" :condition="condition" :datas.sync="role" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="角色代码">
                            <search-role-code @selectName="v=>condition['search_LIKE_roleCode']=v"></search-role-code>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="角色名称">
                            <search-role-name @selectName="v=>condition['search_LIKE_roleName']=v"></search-role-name>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="所属单位">
                            <!--<el-input v-model="condition['search_LIKE_orgId']"></el-input>-->
                            <auto-search-org v-model="condition['search_LIKE_org.id']" :allOrg="true"></auto-search-org>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" icon="el-icon-search" @click="loadData" class="ml-80">查 询</el-button>
                        <el-button formVisible="true" icon="el-icon-plus" @click="handleDialogFormOpen(false)"
                                   v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_ROLEMGR:ADD')!==-1">
                            新增
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="role" border stripe max-height="500">
                <el-table-column prop="roleCode" label="角色代码" sortable min-width="120"></el-table-column>
                <el-table-column prop="roleName" label="角色名称" sortable min-width="120"></el-table-column>
                <el-table-column prop="remark" label="角色描述" sortable min-width="200"></el-table-column>
                <el-table-column prop="org.name" label="所属单位" sortable min-width="200"></el-table-column>
                <el-table-column prop="createBy" label="创建人" sortable width="100"></el-table-column>
                <el-table-column prop="createDateTime" label="创建时间" sortable min-width="200"></el-table-column>
                <el-table-column fixed="right" align="center" label="操作" sortable width="140">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="handleDialogFormOpen(true,scope.row)"
                                   v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_ROLEMGR:UPD')!==-1">
                            编辑
                        </el-button>
                        <!-- <el-button type="text" class="danger" size="small" @click="handleRemove(scope.row)">删除
                        </el-button> -->
                        <el-dropdown style="margin-left:10px">
                            <span class="el-dropdown-link">
                                <el-button size="small" type="text">更多
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <el-button type="text" class="danger" size="small" @click="handleRemove(scope.row)"
                                               v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_ROLEMGR:DEL')!==-1">
                                        删除
                                    </el-button>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button type="text" size="small" @click="handlePower(scope.row)"
                                               v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_ROLEMGR:PERMISSION')!==-1">
                                        分配权限
                                    </el-button>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <role-form ref="roleForm" @load="loadData"></role-form>
        <prowerTree ref="rolePower" @load="loadData" :id="id"></prowerTree>
    </div>
</template>

<script>
    import { deleteRole, getRoleList } from "@/api/system/role";
    import autoSearchOrg from '@/components/autocomplete/autoSearchOrg'
    import SearchRoleCode from '@/components/autocomplete/searchRoleCode'
    import searchRoleName from '@/components/autocomplete/searchRoleName'
    import roleForm from './roleForm'
    import prowerTree from './prowerTree'

    export default {
        name: "角色管理",
        components: {
            roleForm,
            autoSearchOrg,
            prowerTree,
            SearchRoleCode,
            searchRoleName,
        },
        data() {
            return {
                condition: {}, // 查询条件
                role: [], // table数组
                pageSearch: getRoleList, // 分页查询api接口
                id: ''
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.loadData()
            })
        },
        methods: {
            loadData() {
                this.$refs.role.loadData()
            },
            handlePower(row) {
                this.id = row.id
                this.$nextTick(() => {
                    this.$refs.rolePower.load()
                    this.$refs.rolePower.getSpc()
                })
            },
            handleDialogFormOpen(bool, item) {
                if (bool) {
                    let form = JSON.parse(JSON.stringify(item))
                    this.$refs.roleForm.form = {
                        id: form.id,
                        roleCode: form.roleCode,
                        roleName: form.roleName,
                        orgId: form.org.id,
                        orgName: form.org.name,
                        remark: form.remark,
                    }
                    this.$refs.roleForm.isEdit = true
                    this.$refs.roleForm.dialogForm = true
                } else {
                    this.$refs.roleForm.dialogForm = true
                }
            },
            handleRemove(item) {
                this.$confirm(`是否删除该数据?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteRole(item.id).then(res => {
                        this.$message({
                            type: 'success',
                            message: `删除成功!`
                        });
                        this.loadData()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
        },
    }

</script>

<style scoped>


</style>
