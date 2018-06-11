<template>
    <el-dialog title="拆箱记录查询" :visible.sync="dialogForm" width="800px">
        <base-list ref="myRecords" :condition="condition" :showLine="false" :datas.sync="recordList"
                   :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-col :span="16">
                    <el-form-item label="上传时间">
                        <date-slot :startDate.sync="condition.search_GTE_uploadDate"
                                   :endDate.sync="condition.search_LTE_uploadDate"></date-slot>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-button icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
                </el-col>
            </el-form>
            <el-table slot="list" :data="recordList" border stripe max-height="500">
                <el-table-column prop="id" label="序号" min-width="60"></el-table-column>
                <el-table-column prop="uploadDate" label="记录上传时间" min-width="120"></el-table-column>
                <el-table-column prop="attachments" label="记录名称" min-width="120">
                    <template slot-scope="scope">
                        {{ scope.row.attachments&&scope.row.attachments[0].fileName }}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" align="center" label="操作" sortable width="140">
                    <template slot-scope="scope">
                        <div style="display: flex;justify-content: center">
                            <download v-model="scope.row.attachments" :showFileName="false"></download>
                            <a @click="handleDel(scope.row)" style="margin-left: 5px">删除</a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>


        <span slot="footer" class="dialog-footer">
            <!-- <el-button type="primary" @click="handleSaveContract(true)">确定</el-button> -->
            <el-button @click="dialogForm = false">取 消</el-button>
        </span>

    </el-dialog>
</template>

<script>
    import { delUnboxRecords, unboxRecords } from "@/api/containerJob/containerJob";
    import dateSlot from '@/components/date/dateSlot'
    import download from '@/components/download'

    export default {
        components: { dateSlot, download },
        data() {
            return {
                condition: {},                      // 查询条件
                recordList: [],                      // table数组
                pageSearch: unboxRecords,          // 分页查询api接口
                dialogForm: false,
                type: '',
            }
        },

        methods: {

            loadData() {
                this.$refs.myRecords.loadData()
            },

            handleSearch() {
                this.loadData()
            },
            handleDel(item){
                this.$confirm('确认删除吗？', '提示', {}).then(() => {
                    delUnboxRecords(item.id).then(res=>{
                        this.$message({ message: '删除成功!', type: 'success' })
                        this.loadData()
                    })
                })

            }
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    /*.dialog-footer {*/

    /*display: flex;*/

    /*justify-content: flex-start;*/

    /*}*/

</style>

