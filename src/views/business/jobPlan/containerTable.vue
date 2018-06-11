<template>
    <div>
        <base-list ref="containerTable" :condition="condition" :showLine="false" :datas.sync="containerTable" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="110px" style="border-bottom: 1px dashed #ddd;">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="箱号：">
                            <el-input v-model="condition['search_LIKE_containerNo']" @input="handleChange" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="作业状态：">
                            <el-select v-model="condition['search_EQ_jobStatus']" placeholder="请选择" clearable>
                                <el-option v-for="[key, val] in _dictJobStatus" :key="key" :label="val"
                                           :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-button type="primary" icon="el-icon-search" @click="loadData"
                                   style="margin-left: 40px !important;">查 询
                        </el-button>
                        <el-button @click="handleExport">明细导出</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="总箱量：">
                            {{ total }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="未作业：">
                            {{ notStart }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="已作业：">
                            {{ completed }}
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="containerTable" border stripe max-height="500">
                <el-table-column prop="groupNo" label="配组号" sortable min-width="90" v-if="form.planType!=='JCJH'"></el-table-column>
                <el-table-column prop="jobStatus" label="作业状态" sortable min-width="105">
                    <template slot-scope="scope">
                        {{ scope.row.jobStatus | _filterJobStatus }}
                    </template>
                </el-table-column>
                <el-table-column prop="carNo" label="车号" sortable min-width="90"></el-table-column>
                <el-table-column prop="containerNo" label="箱号" sortable min-width="120"></el-table-column>
                <el-table-column prop="containerType" label="箱型" sortable min-width="75"></el-table-column>
                <el-table-column prop="containerSize" label="尺寸" sortable min-width="75"></el-table-column>
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
                <el-table-column prop="stratStationName" label="发站" sortable min-width="100"></el-table-column>
                <el-table-column prop="endStationName" label="到站" sortable min-width="100"></el-table-column>
                <el-table-column prop="ownerName" label="箱主" sortable min-width="120"></el-table-column>
                <el-table-column prop="cargoName" label="货名" sortable min-width="90"></el-table-column>
                <el-table-column prop="cargoWeight" label="货重" sortable min-width="75"></el-table-column>
            </el-table>
        </base-list>
    </div>
</template>

<script>
    import { getJobPlanContainerTable } from "@/api/jobPlan/jobPlan";
    import { newExportExcel } from '@/utils/newExport'
    import { ifHeavyType,jobStatus,tradeType } from "@/assets/dict";
    export default {
        name: "containerTable",
        props: {
            form: {
                type: Object,
                default: () => {
                },
            }
        },
        data() {
            return {
                condition: {
                    search_EQ_planType: '',
                    search_EQ_transportMode: '',
                    search_EQ_planNo: '',
                },
                containerTable: [],
                pageSearch: getJobPlanContainerTable,
                total: '',
                notStart: '',
                completed: '',
            }
        },
        mounted() {
        },
        methods: {
            loadData() {
                this.$refs.containerTable.loadData().then(res => {
                    console.log('res', res)
                    this.total = res.aaData[0].total
                    this.notStart = res.aaData[0].notStart
                    this.completed = res.aaData[0].completed
                    this.containerTable = res.aaData[0].container
                })
            },
            handleChange(){
                let a = v.toUpperCase()
                this.$nextTick(()=>{
                    this.condition['search_LIKE_containerNo'] = a
                })
            },
            handleExport(){
                let map = new Map()
                map.set('groupNo', '配组号')
                map.set('jobStatus', '作业状态')
                map.set('carNo', '车号')
                map.set('containerNo', '箱号')
                map.set('containerType', '箱型')
                map.set('containerSize', '尺寸')
                map.set('ifHeavy', '空重')
                map.set('tradeType', '内外贸')
                map.set('stratStationName', '发站')
                map.set('endStationName', '到站')
                map.set('ownerName', '箱主')
                map.set('cargoName', '货名')
                map.set('cargoWeight', '货重')
                let exportRecords = []
                let exportArr=JSON.parse(JSON.stringify(this.containerTable))
                exportArr.forEach(record => {
                    let exportRecord = {}
                    for (let [key, value] of map.entries()) {
                        if (key === 'jobStatus') {
                            record[key] = jobStatus.get(record[key])
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
                newExportExcel('集装箱明细', exportRecords)
            }
        },
        computed: {
            isTr() {
                for (let val of this.containerTable) {
                    return val.hasOwnProperty('wagonNo')
                }
            },
            isCr() {
                for (let val of this.containerTable) {
                    return val.hasOwnProperty('plateNumber')
                }
            }
        }
    }
</script>

<style scoped>

</style>
