<template>
    <div>
        <base-list ref="containerType" :condition="condition" :datas.sync="containerType" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="100px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="箱类型名称">
                            <el-input v-model="condition['search_LIKE_containerType']" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" icon="el-icon-search" @click="loadData" class="ml-100">查 询</el-button>
                        <el-button formVisible="true" icon="el-icon-plus" @click="handleDialogFormOpen(false)">新增
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="containerType" border stripe max-height="500">
                <el-table-column prop="containerType" label="箱类型名称" sortable min-width="120"></el-table-column>
                <el-table-column prop="heightFoot" label="箱高(英尺)" sortable min-width="120"></el-table-column>
                <el-table-column prop="heightMm" label="箱高(毫米)" sortable min-width="120"></el-table-column>
                <el-table-column prop="remark" label="备注" sortable min-width="120"></el-table-column>
                <el-table-column fixed="right" align="center" label="操作" sortable width="140">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="handleDialogFormOpen(true,scope.row)">编辑</el-button>
                        <el-button type="text" class="danger" size="small" @click="handleRemove(scope.row.id)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <containerType-form ref="containerTypeForm" @load="loadData"></containerType-form>
    </div>
</template>

<script>
    import { getContainerTypeList,deleteContainerType } from "@/api/containerType/containerType";
    import containerTypeForm from './containerTypeForm'

    export default {
        name: "箱类型管理",
        components: { containerTypeForm },
        data() {
            return {
                condition: {},                      // 查询条件
                containerType: [],                      // table数组
                pageSearch: getContainerTypeList,          // 分页查询api接口
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            loadData() {
                this.$refs.containerType.loadData()
            },
            handleDialogFormOpen(bool,item) {
                if (bool) {
                    console.log(this.$refs)
                    console.log(item)
                    this.$refs.containerTypeForm.form = JSON.parse(JSON.stringify(item))
                    this.$refs.containerTypeForm.isEdit = true
                    this.$refs.containerTypeForm.dialogForm = true
                } else {
                    this.$refs.containerTypeForm.dialogForm = true
                }
            },
            handleRemove(id){
                deleteContainerType(id).then(res=>{
                    this.$message({ message: '删除成功!', type: 'success' })
                    this.loadData()
                })
            }
        },
    }
</script>

<style scoped>

</style>
