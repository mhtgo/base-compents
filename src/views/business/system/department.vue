<template>
    <div>
        <base-list ref="department" :condition="condition" :datas.sync="department" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="所属单位">
                            <auto-search-org @selectName="v=>condition['search_LIKE_org.name']=v" :allOrg="true"></auto-search-org>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="部门名称">
                            <auto-search-dept @selectName="v=>condition['search_LIKE_name']=v"></auto-search-dept>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" icon="el-icon-search" @click="loadData" class="ml-80">查 询</el-button>
                        <el-button formVisible="true" icon="el-icon-plus" @click="handleDialogFormOpen(false)"
                        v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_DEPTMGR:ADD')!==-1">新增
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="department" border stripe max-height="500">
                <el-table-column prop="org.name" label="所属单位" sortable min-width="120"></el-table-column>
                <el-table-column prop="name" label="部门名称" sortable min-width="200"></el-table-column>
                <el-table-column prop="remark" label="备注" sortable min-width="120"></el-table-column>
                <el-table-column fixed="right" align="center" label="操作" sortable width="140">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="handleDialogFormOpen(true,scope.row)"
                        v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_DEPTMGR:UPD')!==-1">编辑</el-button>
                        <el-button type="text" class="danger" size="small" @click="handleRemove(scope.row)"
                        v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_DEPTMGR:DEL')!==-1">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <department-form ref="departmentForm" @load="loadData"></department-form>
    </div>
</template>

<script>
    import { getDepartmentList,deleteDepartment } from "@/api/system/department";
    import departmentForm from './departmentForm'
    import autoSearchDept from '@/components/autocomplete/autoSearchDept'
    import autoSearchOrg from '@/components/autocomplete/autoSearchOrg'

    export default {
        name: "部门管理",
        components: { departmentForm,autoSearchDept,autoSearchOrg },
        data() {
            return {
                condition: {},                      // 查询条件
                department: [],                      // table数组
                pageSearch: getDepartmentList,          // 分页查询api接口
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            loadData() {
                this.$refs.department.loadData()
            },
            handleDialogFormOpen(bool, item) {
                if (bool) {
                    let form = JSON.parse(JSON.stringify(item))
                    this.$refs.departmentForm.form = {
                        id: form.id,
                        orgId: form.org.id,
                        orgName: form.org.name,
                        name: form.name,
                        remark: form.remark,
                    }
                    this.$refs.departmentForm.isEdit = true
                    this.$refs.departmentForm.dialogForm = true
                } else {
                    this.$refs.departmentForm.dialogForm = true
                }
            },
            handleRemove(item){
                this.$confirm(`是否删除该部门?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteDepartment(item.id).then(res => {
                        this.$message({ type: 'success', message: `删除成功!` });
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
