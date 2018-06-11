<template>
    <el-dialog title="取消作业" :visible.sync="dialogForm" width="860px">
        <el-form :inline="true" class="search-form" label-width="80px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="箱号">
                        <el-input type="text" v-model.trim="condition.containerNo" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-button class="ml-80" icon="el-icon-search" type="primary" @click="loadData">查 询</el-button>
                    <el-button type="primary" @click="handleSubmit">确 定</el-button>
                    <el-button type="primary" @click="dialogForm=false">取 消</el-button>
                </el-col>
            </el-row>
        </el-form>
        <el-table :data="container" border stripe max-height="500"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection" prop="id" width="55"></el-table-column>
            <el-table-column prop="containerNo" label="箱号" sortable min-width="160"></el-table-column>
            <el-table-column v-if="isTr" prop="wagonNo" label="车皮号" sortable min-width="120"></el-table-column>
            <el-table-column v-if="!isTr" prop="plateNumber" label="车牌号" sortable min-width="120"></el-table-column>
            <el-table-column prop="containerType" label="箱型" sortable min-width="120"></el-table-column>
            <el-table-column prop="containerSize" label="尺寸" sortable min-width="120"></el-table-column>
            <el-table-column prop="ifHeavy" label="空重" sortable min-width="120">
                <template slot-scope="scope">
                    {{ scope.row.ifHeavy | _filterIfHeavyType }}
                </template>
            </el-table-column>
            <el-table-column prop="tradeType" label="内外贸" sortable min-width="120">
                <template slot-scope="scope">
                    {{ scope.row.tradeType | _filterTradeType }}
                </template>
            </el-table-column>
            <el-table-column prop="containerNum" label="箱数" sortable min-width="120"></el-table-column>
            <el-table-column prop="stratStationName" label="发站" sortable min-width="120"></el-table-column>
            <el-table-column prop="endStationName" label="到站" sortable min-width="120"></el-table-column>
            <el-table-column prop="ownerName" label="箱主" sortable min-width="120"></el-table-column>
        </el-table>
    </el-dialog>
</template>

<script>
    import { heapCancelJob, heapPlanNo } from "@/api/containerJob/containerJob";

    export default {
        name: "cancelJob",
        props:{
            id: '',                      // 计划编号
            isTr:false,
        },
        data() {
            return {
                dialogForm: false,
                condition: {
                    containerNo:'',
                },
                multipleSelection: [],
                container: [],
            }
        },
        methods: {
            loadData() {
                heapPlanNo(this.id,this.condition).then(res=>{
                    this.container=res.data.aaData
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            handleSubmit() {
                if (this.multipleSelection.length < 1) {
                    this.$message({ message: '请至少选择一条数据!', type: 'error' })
                    return
                }
                let container = []
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    container.push({ id: this.multipleSelection[i].id })
                }
                heapCancelJob(this.id, { container }).then(res => {
                    this.$message({ message: '取消成功!', type: 'success' })
                    this.$emit('loadData')
                    this.dialogForm = false
                })
            },
        }
    }
</script>

<style scoped>

</style>
