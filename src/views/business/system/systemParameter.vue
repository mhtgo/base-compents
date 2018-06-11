<template>
    <div>
        <base-list ref="systemParameter" :condition="condition" :datas.sync="systemParameter" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="参数代码">
                            <el-input v-model="condition['search_LIKE_paramCode']" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="参数名称">
                            <el-input v-model="condition['search_LIKE_paramName']" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="参数级别">
                            <el-select v-model="condition['search_EQ_paramType']" placeholder="请选择" clearable>
                                <el-option v-for="[key, val] in _dictParamType" :key="key" :label="val"
                                           :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" icon="el-icon-search" @click="loadData" class="ml-80">查 询</el-button>
                        <el-button formVisible="true" icon="el-icon-plus" @click="handleDialogFormOpen(false)"
                        v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_PARAMETER:ADD')!==-1">新增
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="systemParameter" border stripe max-height="500">
                <el-table-column prop="paramCode" label="参数代码" sortable min-width="120"></el-table-column>
                <el-table-column prop="paramName" label="参数名称" sortable min-width="200"></el-table-column>
                <el-table-column prop="paramType" label="参数级别" sortable min-width="200">
                    <template slot-scope="scope">
                        {{ scope.row.paramType | _filterParamType }}
                    </template>
                </el-table-column>
                <el-table-column prop="paramValue" label="参数值" sortable min-width="200"></el-table-column>
                <el-table-column prop="remark" label="参数描述" sortable min-width="200"></el-table-column>
                <el-table-column fixed="right" align="center" label="操作" sortable width="140">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="handleDialogFormOpen(true,scope.row)"
                        v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_PARAMETER:UPD')!==-1">编辑</el-button>
                        <el-button type="text" class="danger" size="small" @click="handleRemove(scope.row)"
                        v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_PARAMETER:DEL')!==-1">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <systemParameter-form ref="systemParameterForm" @load="loadData"></systemParameter-form>
    </div>
</template>

<script>
    import { deleteSystemParameter, getSystemParameterList } from "@/api/system/systemParameter";
    import systemParameterForm from './systemParameterForm'

    export default {
        name: "系统参数管理",
        components: { systemParameterForm },
        data() {
            return {
                condition: {},                      // 查询条件
                systemParameter: [],                      // table数组
                pageSearch: getSystemParameterList,          // 分页查询api接口
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            loadData() {
                this.$refs.systemParameter.loadData()
            },
            handleDialogFormOpen(bool, item) {
                if (bool) {
                    let form = JSON.parse(JSON.stringify(item))
                    this.$refs.systemParameterForm.form = {
                        id: form.id,
                        paramCode: form.paramCode,
                        paramName: form.paramName,
                        paramType: form.paramType,
                        paramValue: form.paramValue,
                        orgId: form.org.id,
                        orgName: form.org.name,
                        remark: form.remark,
                    }
                    this.$refs.systemParameterForm.isEdit = true
                    this.$refs.systemParameterForm.dialogForm = true
                } else {
                    this.$refs.systemParameterForm.dialogForm = true
                }
            },
            handleRemove(item) {
                this.$confirm(`是否删除该数据?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteSystemParameter(item.id).then(res => {
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
