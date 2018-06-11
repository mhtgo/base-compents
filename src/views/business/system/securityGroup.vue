<template>
    <div>
        <base-list ref="securityGroup" :condition="condition" :datas.sync="securityGroup" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="100px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="安全组名称">
                            <el-input v-model.trim="condition['search_LIKE_name']" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="安全组标识">
                            <el-input v-model.trim="condition['search_LIKE_code']" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="所属单位">
                            <!--<el-input v-model="condition['search_LIKE_orgName']"></el-input>-->
                            <auto-search-org v-model="condition['search_LIKE_org.id']" :allOrg="true"></auto-search-org>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" icon="el-icon-search" @click="loadData" class="ml-100">查 询</el-button>
                        <el-button formVisible="true" icon="el-icon-plus" @click="handleDialogFormOpen(false)"
                        v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_SECURITYGROUP:ADD')!==-1">新增
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="securityGroup" border stripe max-height="500">
                <el-table-column prop="code" label="安全组标识" sortable min-width="120"></el-table-column>
                <el-table-column prop="org.name" label="所属单位" sortable min-width="200"></el-table-column>
                <el-table-column prop="name" label="安全组名称" sortable min-width="200"></el-table-column>
                <el-table-column prop="createDateTime" label="创建时间" sortable min-width="200"></el-table-column>
                <el-table-column fixed="right" align="center" label="操作" sortable width="140">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="handleDialogFormOpen(true,scope.row)"
                        v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_SECURITYGROUP:UPD')!==-1">编辑</el-button>
                        <el-button type="text" class="danger" size="small" @click="handleRemove(scope.row)"
                        v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_SECURITYGROUP:DEL')!==-1">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <securityGroup-form ref="securityGroupForm" @load="loadData"></securityGroup-form>
    </div>
</template>

<script>
    import { deleteSecurityGroup, getSecurityGroupList } from "@/api/system/securityGroup";
    import securityGroupForm from './securityGroupForm'
    import autoSearchOrg from '@/components/autocomplete/autoSearchOrg'

    export default {
        name: "安全组",
        components: { securityGroupForm, autoSearchOrg },
        data() {
            return {
                condition: {},                      // 查询条件
                securityGroup: [],                      // table数组
                pageSearch: getSecurityGroupList,          // 分页查询api接口
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            loadData() {
                this.$refs.securityGroup.loadData()
            },
            handleDialogFormOpen(bool, item) {
                if (bool) {
                    let form = JSON.parse(JSON.stringify(item))
                    this.$refs.securityGroupForm.form = {
                        code: form.code,
                        name: form.name,
                        orgId: form.org.id,
                        orgName: form.org.name,
                        id: form.id,
                    }
                    this.$refs.securityGroupForm.isEdit = true
                    this.$refs.securityGroupForm.dialogForm = true
                } else {
                    this.$refs.securityGroupForm.dialogForm = true
                }
            },
            handleRemove(item) {
                this.$confirm(`是否删除该数据?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteSecurityGroup(item.id).then(res => {
                        this.$message({ message: '删除成功!', type: 'success' })
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
