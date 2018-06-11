<template>
    <base-list ref="containerTrack" :jobTime="true" :condition="condition" :datas.sync="container" :pageSearch="pageSearch">
        <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="箱号">
                        <!--<el-input type="text" v-model="condition['search_LIKE_containerNo']" clearable></el-input>-->
                        <!--<search-entrust-container-no v-model="condition['search_LIKE_containerNo']"></search-entrust-container-no>-->
                        <el-input type="text" v-model="condition['search_LIKE_containerNo']" @input="changeUp" clearable></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="作业类型">
                        <el-select v-model="condition['search_EQ_containerJobType']" placeholder="请选择" clearable>
                            <el-option v-for="[key, val] in _dictContainerJobType" :key="key" :label="val"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="作业时间">
                        <date-slot :startDate.sync="condition['search_GTE_jobTime']" :endDate.sync="condition['search_LTE_jobTime']"></date-slot>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-button type="primary" icon="el-icon-search" @click="loadData" class="ml-80">查 询</el-button>
            <el-button @click="handleExport">明细导出</el-button>
        </el-form>

        <el-table slot="list" :data="container" border stripe max-height="500">
            <el-table-column label="作业类型" prop="containerJobType" width="80">
                <template slot-scope="scope">
                    {{ scope.row.containerJobType | _filterContainerJobType }}
                </template>
            </el-table-column>
            <el-table-column label="作业时间" prop="jobTime" width="180"></el-table-column>
            <el-table-column label="车号" prop="carNo" width="120"></el-table-column>
            <el-table-column label="作业人员" prop="operName" width="120"></el-table-column>
            <el-table-column label="箱号" prop="containerNo" width="120"></el-table-column>
            <el-table-column label="尺寸" prop="containerSize"></el-table-column>
            <el-table-column label="箱型" prop="containerType" width="120"></el-table-column>
            <el-table-column label="空重" prop="ifHeavy">
                <template slot-scope="scope">
                    {{scope.row.ifHeavy|_filterIfHeavyType}}
                </template>
            </el-table-column>
            <el-table-column label="内外贸" prop="tradeType">
                <template slot-scope="scope">
                    {{scope.row.tradeType|_filterTradeType}}
                </template>
            </el-table-column>
            <!-- <el-table-column label="发站" prop="stratStationName" width="120"></el-table-column>
            <el-table-column label="到站" prop="endStationName" width="120"></el-table-column> -->
            <el-table-column label="货名" prop="cargoName" width="120"></el-table-column>
            <el-table-column label="货重" prop="cargoWeight"></el-table-column>
        </el-table>
    </base-list>
</template>

<script>
    import {getContainerTrack} from "@/api/statistics/statistics";
    import dateSlot from '@/components/date/dateSlot'
    import searchEntrustContainerNo from '@/components/autocomplete/autoSearchEntrustContainerNo'
    import { newExportExcel } from '@/utils/newExport'
    import { ifHeavyType,containerJobType,tradeType } from "@/assets/dict";
    export default {
        name: "containerTrack",
        components: {  dateSlot,searchEntrustContainerNo },
        data() {
            return {
                condition: {
                    'search_GTE_jobTime':new Date()
                },
                container: [],       // 数据源
                pageSearch: getContainerTrack,
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            loadData() {
                console.log(this.condition)
                this.$refs.containerTrack.loadData()
            },
            changeUp(v) {
                let a = v.toUpperCase()
                this.$nextTick(()=>{
                    this.condition['search_LIKE_containerNo'] = a
                })
            },
            handleExport(){
                let map = new Map()
                map.set('containerNo', '箱号')
                map.set('containerJobType', '作业类型')
                map.set('jobTime', '作业时间')
                map.set('carNo', '车号')
                map.set('operName', '作业人员')
                map.set('containerType', '箱型')
                map.set('containerSize', '尺寸')
                map.set('ifHeavy', '空重')
                map.set('tradeType', '内外贸')
                map.set('stratStationName', '发站')
                map.set('endStationName', '到站')
                map.set('cargoName', '货名')
                map.set('cargoWeight', '货重')
                let exportRecords = []
                let exportArr=JSON.parse(JSON.stringify(this.container))
                exportArr.forEach(record => {
                    let exportRecord = {}
                    for (let [key, value] of map.entries()) {
                        if (key === 'containerJobType') {
                            record[key] = containerJobType.get(record[key])
                        }
                        if (key === 'ifHeavy') {
                            record[key] = ifHeavyType.get(record[key])
                        }
                        if (key === 'tradeType') {
                            record[key] = tradeType.get(record[key])
                        }
                        exportRecord[value] = record[key]
                    }
                    exportRecords.push(exportRecord)
                })
                newExportExcel('集装箱跟踪', exportRecords)
            }
        }
    }
</script>

<style scoped>

</style>
