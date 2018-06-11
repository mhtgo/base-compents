<template>
    <div>

        <!-- 指定箱提箱-分页 汽车 -->

        <base-list ref="heapCarTR" :condition="condition" :datas.sync="heapCarTR" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="110px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="箱主">
                            <autoSearchCustom v-model="condition['search_EQ_ownerId']" :isOwner="true"></autoSearchCustom>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="尺寸">
                            <autoSearchSize v-model="condition['search_EQ_containerSize']"></autoSearchSize>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="空重">
                            <el-select v-model="condition['search_EQ_ifHeavy']" placeholder="请选择"
                                       clearable>
                                <el-option v-for="[key, val] in _dictIfHeavyType" :key="key" :label="val"
                                           :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-button class="ml-110" icon="el-icon-search" type="primary" @click="loadData">查 询</el-button>
                    </el-col>
                </el-row>

            </el-form>
            <el-table slot="list" :data="heapCarTR" border stripe max-height="500">
                <el-table-column fixed="left" prop="id" label="序号" min-width="50">
                    <template slot-scope="scope">
                        {{ scope.$index+1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="containerType" label="箱型" sortable min-width="75">
                </el-table-column>
                <el-table-column prop="containerSize" label="尺寸" sortable min-width="75">
                </el-table-column>
                <el-table-column prop="ifHeavy" label="空重" sortable min-width="75">
                    <template slot-scope="scope">
                        {{ scope.row.ifHeavy | _filterIfHeavyType }}
                    </template>
                </el-table-column>
                <el-table-column prop="tradeType" label="内外贸" sortable min-width="90">
                    <template slot-scope="scope">
                        {{ scope.row.tradeType | _filterTradeType }}
                    </template>
                </el-table-column>
                <el-table-column prop="num" label="箱数" sortable min-width="75"></el-table-column>
                <el-table-column prop="cargoName" label="货名" sortable min-width="90"></el-table-column>
                <el-table-column prop="stratStationName" label="发站" sortable min-width="120"></el-table-column>
                <el-table-column prop="endStationName" label="到站" sortable min-width="120"></el-table-column>
                <el-table-column prop="ownerName" label="箱主" sortable min-width="160"></el-table-column>
                <el-table-column prop="planNo" label="计划编号" sortable min-width="140"></el-table-column>
                <el-table-column fixed="right" align="center" label="操作" sortable width="140">
                    <template slot-scope="scope">
                        <el-button size="small" type="text"
                                   @click="handleSetImport(scope.row)">导入箱
                        </el-button>
                        <el-button size="small" type="text"
                                   @click="handleCanCel(scope.row)">取消作业
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <cancel-job ref="cancelJob" @loadData="loadData"></cancel-job>
        <div style="display: none">
            <excel-import ref="excel" code="CRHEAP" @getUploadData="handleImport"></excel-import>
        </div>
    </div>
</template>

<script>
    import ExcelImport from '@/components/excel/import'
    import { heapCar,heapImportContainer } from '@/api/containerJob/containerJob'
    import cancelJob from './dialogs/cancelJob'
    import dateSlot from '@/components/date/dateSlot'
    import autoSearchCustom from '@/components/autocomplete/autoSearchCustom'
    import autoSearchSize from '@/components/autocomplete/autoSearchSize'
    export default {
        name: "heapCarCR",
        components: {
            dateSlot,
            cancelJob,
            ExcelImport,
            autoSearchCustom,
            autoSearchSize
            // suitcaseForm,
        },
        data() {
            return {
                pageSearch: heapCar,   //查询接口名
                condition: {
                    search_EQ_transportMode: 'CR'
                }, // 查询条件
                heapCarTR: [], // table数组
                setImportId: '',
            }
        },
        mounted() {
            this.loadData('first')
        },
        methods: {
            loadData(val) {
                if (val === undefined) {
                    this.$emit('changeInfo')
                }
                this.$refs.heapCarTR.loadData()
            },
            // 取消作业
            handleCanCel(item) {
                this.$refs.cancelJob.id = item.planNo
                this.$refs.cancelJob.isTr = false
                this.$refs.cancelJob.loadData()
                this.$refs.cancelJob.dialogForm = true
            },
            handleSetImport(item) {
                this.setImportId = item.planNo
                this.$refs.excel.handleClick()
            },
            handleImport(item){
                console.log(item)
                // todo 导入箱操作
                let container=[]
                for(let i=0;i<item.length;i++){
                    container.push({
                        plateNumber:item[i].plateNumber,
                        containerNo:item[i].containerNo,
                        containerType:item[i].containerType,
                        containerSize:item[i].containerSize,
                        ifHeavy:item[i].ifHeavy,
                        tradeType:item[i].tradeType,
                        ownerName:item[i].ownerName,
                    })
                }
                heapImportContainer(this.setImportId,{container}).then(res=>{
                    this.$message({ message: '导入成功!', type: 'success' })
                    this.loadData()
                })
            }
        },
    }

</script>

<style>


</style>
