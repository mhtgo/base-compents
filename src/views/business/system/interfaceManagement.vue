<template>
    <div>
        <base-list ref="interfaceManagement" :condition="condition" :datas.sync="interfaceManagement" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="对接单位">
                            <el-input v-model="condition['search_LIKE_name']"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="关键字">
                            <el-input v-model="condition['search_LIKE_name']"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" icon="el-icon-search" @click="loadData" class="ml-80">查 询</el-button>
                        <el-button formVisible="true" icon="el-icon-plus" @click="handleDialogFormOpen(false)">新增
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="interfaceManagement" border stripe max-height="500">
                <el-table-column prop="shortName" label="对接单位" sortable min-width="120"></el-table-column>
                <el-table-column prop="name" label="接口地址" sortable min-width="200"></el-table-column>
                <el-table-column prop="name" label="对接方式" sortable min-width="200"></el-table-column>
                <el-table-column prop="name" label="接口名称" sortable min-width="200"></el-table-column>
                <el-table-column prop="name" label="调用秘钥" sortable min-width="200"></el-table-column>
                <el-table-column prop="name" label="连接时间" sortable min-width="200"></el-table-column>
                <el-table-column prop="name" label="连接状态" sortable min-width="200"></el-table-column>
                <el-table-column prop="name" label="系统代码" sortable min-width="200"></el-table-column>
                <el-table-column fixed="right" align="center" label="操作" sortable width="140">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="handleDialogFormOpen(true,scope.row)">编辑</el-button>
                        <el-button type="text" class="danger" size="small" @click="handleRemove(scope.row.id)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <interfaceManagement-form ref="interfaceManagementForm" @load="loadData"></interfaceManagement-form>
    </div>
</template>

<script>
    import { getInterfaceManagementList } from "@/api/system/interfaceManagement";
    import interfaceManagementForm from './interfaceManagementForm'

    export default {
        name: "interfaceManagement",
        components: { interfaceManagementForm },
        data() {
            return {
                condition: {},                      // 查询条件
                interfaceManagement: [],                      // table数组
                pageSearch: getInterfaceManagementList,          // 分页查询api接口
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            loadData() {
                this.$refs.interfaceManagement.loadData()
            },
            handleDialogFormOpen(bool, item) {
                if (bool) {
                    this.$refs.interfaceManagementForm.form = JSON.parse(JSON.stringify(item))
                    this.$refs.interfaceManagementForm.isEdit = true
                    this.$refs.interfaceManagementForm.dialogForm = true
                } else {
                    this.$refs.interfaceManagementForm.dialogForm = true
                }
            }
        },
    }
</script>

<style scoped>

</style>
