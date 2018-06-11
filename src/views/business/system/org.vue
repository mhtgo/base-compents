<template>
    <div>
        <base-list ref="org" :condition="condition" :datas.sync="org" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="单位名称" clearable>
                            <!--<el-input v-model="condition['search_LIKE_name']"></el-input>-->
                            <auto-search-org @selectName="v=>condition['search_LIKE_name']=v" :allOrg="true"></auto-search-org>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="启用状态">
                            <el-select v-model="condition['search_EQ_status']" placeholder="请选择" clearable>
                                <el-option v-for="[key, val] in _dictOrgStatusType" :key="key" :label="val" :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" icon="el-icon-search" @click="loadData" class="ml-80">查 询</el-button>
                        <el-button formVisible="true" icon="el-icon-plus" @click="handleDialogFormOpen(false)" v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_ORGMGR:ADD')!==-1">新增
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="org" border stripe max-height="500">
                <el-table-column prop="name" label="单位名称" sortable min-width="200" fixed="left"></el-table-column>
                <el-table-column prop="entNature" label="企业性质" sortable width="120">
                    <template slot-scope="scope">
                        {{ scope.row.entNature | _filterCompanyNature }}
                    </template>
                </el-table-column>
                <el-table-column prop="parentName" label="上级单位" sortable min-width="200"></el-table-column>
                <el-table-column prop="linkMan" label="联系人" sortable min-width="120"></el-table-column>
                <el-table-column prop="linkTel" label="联系电话" sortable width="120"></el-table-column>
                <el-table-column prop="status" label="状态" sortable width="80">
                    <template slot-scope="scope">
                        {{ scope.row.status | _filterOrgStatusType }}
                    </template>
                </el-table-column>
                <el-table-column prop="foundedDate" label="注册时间" sortable min-width="120"></el-table-column>
                <el-table-column fixed="right" align="center" label="操作" sortable width="140">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="handleDialogFormOpen(true,scope.row)" v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_ORGMGR:UPD')!==-1">编辑</el-button>
                        <el-button type="text" class="danger" size="small" @click="handleRemove(scope.row)" v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_ORGMGR:DISABLED')!==-1">
                            {{ scope.row.status ?'注销':'启用' }}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <org-form ref="orgForm" @load="loadData"></org-form>
    </div>
</template>

<script>
    import {
        cancelOrg,
        getOrgList
    } from "@/api/system/org";
    import orgForm from './orgForm'
    import autoSearchOrg from '@/components/autocomplete/autoSearchOrg'

    export default {
        name: "使用单位",
        components: {
            orgForm,
            autoSearchOrg
        },
        data() {
            return {
                condition: {}, // 查询条件
                org: [], // table数组
                pageSearch: getOrgList, // 分页查询api接口
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.loadData()
            })
        },
        methods: {
            loadData() {
                this.$refs.org.loadData()
            },
            handleDialogFormOpen(bool, item) {
                if (bool) {
                    this.$refs.orgForm.form = JSON.parse(JSON.stringify(item))
                    this.$refs.orgForm.isEdit = true
                    this.$refs.orgForm.dialogForm = true
                } else {
                    this.$refs.orgForm.dialogForm = true
                }
            },
            handleRemove(item) {
                let msg = item.status ? '注销' : '启用'
                this.$confirm(`是否${msg}该单位?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    cancelOrg(item.id).then(res => {
                        this.$message({
                            type: 'success',
                            message: `${msg}成功!`
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
