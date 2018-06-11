<template>
    <div>
        <base-list ref="port" :condition="condition" :datas.sync="port" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="类型">
                            <el-select v-model="condition['search_EQ_pasType']" placeholder="请选择" clearable>
                                <el-option v-for="[key, val] in _dictPortAndStationType" :key="key" :label="val"
                                           :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="名称">
                            <el-input v-model="condition['search_LIKE_pasName']" clearable></el-input>
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
            <el-table slot="list" :data="port" border stripe max-height="500">
                <el-table-column prop="pasCode" label="编码" sortable min-width="120"></el-table-column>
                <el-table-column prop="pasType" label="类型" sortable min-width="200">
                    <template slot-scope="scope">
                        {{ scope.row.pasType | _filterPortAndStationType }}
                    </template>
                </el-table-column>
                <el-table-column prop="pasName" label="名称" sortable min-width="200"></el-table-column>
                <el-table-column prop="localName" label="所在地" sortable min-width="200"></el-table-column>
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
        <port-form ref="portForm" @load="loadData"></port-form>
    </div>
</template>

<script>
    import { getPortList,deletePort } from "@/api/port/port";
    import portForm from './portForm'

    export default {
        name: "港口管理",
        components: { portForm },
        data() {
            return {
                condition: {},                      // 查询条件
                port: [],                      // table数组
                pageSearch: getPortList,          // 分页查询api接口
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            loadData() {
                this.$refs.port.loadData()
            },
            handleDialogFormOpen(bool,item) {
                if (bool) {
                    this.$refs.portForm.form = JSON.parse(JSON.stringify(item))
                    this.$refs.portForm.isEdit = true
                    this.$refs.portForm.dialogForm = true
                } else {
                    this.$refs.portForm.dialogForm = true
                }
            },
            handleRemove(id){
                deletePort(id).then(res=>{
                    this.$message({ message: '删除成功!', type: 'success' })
                    this.loadData()
                })
            }
        },
    }
</script>

<style scoped>

</style>
