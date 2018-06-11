<template>
    <div>
        <base-list ref="containerSize" :condition="condition" :datas.sync="containerSize" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="尺寸">
                            <el-input v-model="condition['search_LIKE_containerSize']"></el-input>
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
            <el-table slot="list" :data="containerSize" border stripe max-height="500">
                <el-table-column prop="containerSize" label="尺寸" sortable min-width="120"></el-table-column>
                <el-table-column prop="teu" label="标箱系数" sortable min-width="120"></el-table-column>
                <el-table-column fixed="right" align="center" label="操作" sortable width="140">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="handleDialogFormOpen(true,scope.row)">编辑</el-button>
                        <el-button type="text" class="danger" size="small" @click="handleRemove(scope.row.id)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <containerSize-form ref="containerSizeForm" @load="loadData"></containerSize-form>
    </div>
</template>

<script>
    import { getContainerSize,deleteContainerSize } from "@/api/containerSize/containerSize";
    import containerSizeForm from './containerSizeForm'

    export default {
        name: "containerSize",
        components: { containerSizeForm },
        data() {
            return {
                condition: {},                      // 查询条件
                containerSize: [],                      // table数组
                pageSearch: getContainerSize,          // 分页查询api接口
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            loadData() {
                this.$refs.containerSize.loadData()
            },
            handleDialogFormOpen(bool,item) {
                if (bool) {
                    console.log(this.$refs)
                    console.log(item)
                    this.$refs.containerSizeForm.form = JSON.parse(JSON.stringify(item))
                    this.$refs.containerSizeForm.isEdit = true
                    this.$refs.containerSizeForm.dialogForm = true
                } else {
                    this.$refs.containerSizeForm.dialogForm = true
                }
            },
            handleRemove(id){
                deleteContainerSize(id).then(res=>{
                    this.$message({ message: '删除成功!', type: 'success' })
                    this.loadData()
                })
            }
        },
    }
</script>

<style scoped>

</style>
