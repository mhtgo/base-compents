<template>
    <base-list ref="containerOnPort" :condition="condition" :datas.sync="container" :pageSearch="pageSearch">
        <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="100px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="箱号">
                        <!--<search-container-on-port-->
                            <!--v-model="condition['search_LIKE_containerNo']"></search-container-on-port>-->
                        <el-input type="text" v-model="condition['search_LIKE_containerNo']" @input="changeUp" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="进港时间起">
                        <el-date-picker v-model="condition['search_GTE_inPortTime']"
                                        :picker-options="startPickerOptions"
                                        value-format="yyyy-MM-dd"
                                        type="date"
                                        placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="进港时间止">
                        <el-date-picker v-model="condition['search_LTE_inPortTime']"
                                        :picker-options="startPickerOptions"
                                        value-format="yyyy-MM-dd"
                                        type="date"
                                        placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-button type="primary" icon="el-icon-search" @click="loadData" class="ml-100">查 询</el-button>
            <el-button @click="handleExport">明细导出</el-button>
        </el-form>

        <el-table slot="list" :data="container" border stripe max-height="500">
            <el-table-column fixed="left" label="箱号" prop="containerNo" sortable min-width="140"></el-table-column>
            <el-table-column label="箱型" prop="containerType" sortable min-width="75"></el-table-column>
            <el-table-column label="尺寸" prop="containerSize" sortable min-width="75"></el-table-column>
            <el-table-column label="空重" prop="ifHeavy" sortable min-width="75">
                <template slot-scope="scope">
                    {{scope.row.ifHeavy|_filterIfHeavyType}}
                </template>
            </el-table-column>
            <el-table-column label="内外贸" prop="tradeType" sortable min-width="90">
                <template slot-scope="scope">
                    {{scope.row.tradeType|_filterTradeType}}
                </template>
            </el-table-column>
            <el-table-column label="货名" prop="cargoName" sortable min-width="100"></el-table-column>
            <el-table-column label="货重" prop="cargoWeight" sortable min-width="75"></el-table-column>
            <el-table-column label="箱主" prop="ownerName" sortable min-width="160"></el-table-column>
            <el-table-column label="提单号" prop="billNumber" sortable min-width="100"></el-table-column>
            <el-table-column label="位置" prop="positionDesc" sortable min-width="100"></el-table-column>
            <el-table-column label="运输方式" prop="inTransportMode" sortable min-width="130">
                <template slot-scope="scope">
                    {{ scope.row.inTransportMode | _filterTransportModeType }}
                </template>
            </el-table-column>
            <el-table-column label="车号" prop="inCarNo" sortable min-width="120"></el-table-column>
            <el-table-column label="船名" prop="inShipName" sortable min-width="120"></el-table-column>
            <el-table-column label="航次" prop="inVoyageNo" sortable min-width="120"></el-table-column>
            <el-table-column label="进港时间" prop="inPortTime" sortable min-width="160"></el-table-column>
        </el-table>
    </base-list>
</template>

<script>
    import { getContainerPort } from "@/api/containerType/containerType";
    import searchContainerOnPort from '@/components/autocomplete/autoSearchContainerOnPort'
    import { newExportExcel } from '@/utils/newExport'
    import { ifHeavyType,tradeType,transportModeType } from "@/assets/dict";
    export default {
        name: "在港箱查询",
        components: { searchContainerOnPort },
        data() {
            return {
                condition: {},
                container: [],       // 数据源
                pageSearch: getContainerPort,
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            loadData() {
                this.$refs.containerOnPort.loadData()
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
                map.set('containerType', '箱型')
                map.set('containerSize', '尺寸')
                map.set('ifHeavy', '空重')
                map.set('tradeType', '内外贸')
                map.set('cargoName', '货名')
                map.set('cargoWeight', '货重')
                map.set('ownerName', '箱主')
                map.set('billNumber', '提单号')
                map.set('positionDesc', '位置')
                map.set('inTransportMode', '运输方式')
                map.set('inCarNo', '车号')
                map.set('inShipName', '船名')
                map.set('inVoyageNo', '航次')
                map.set('inPortTime', '进港时间')
                let exportRecords = []
                let exportArr=JSON.parse(JSON.stringify(this.container))
                exportArr.forEach(record => {
                    let exportRecord = {}
                    for (let [key, value] of map.entries()) {
                        if (key === 'ifHeavy') {
                            record[key] = ifHeavyType.get(record[key])
                        }
                        if (key === 'tradeType') {
                            record[key] = tradeType.get(record[key])
                        }
                        if (key === 'inTransportMode') {
                            record[key] = transportModeType.get(record[key])
                        }
                        exportRecord[value] = record[key]
                    }
                    exportRecords.push(exportRecord)
                })
                newExportExcel('在港箱查询', exportRecords)
            }
        },
        computed: {
            // 设置有效起始日期
            startPickerOptions() {
                let endDate = this.condition['search_LTE_inPortTime']
                return {
                    disabledDate(time) {
                        // if (time.getTime() < (+new Date()) - 60 * 60 * 24 * 1000) {
                        //     return true
                        // }
                        if (endDate) {
                            return time.getTime() > new Date(endDate).getTime()
                        } else {
                            return false
                        }
                    }
                }
            },
            // 设置有效截止日期
            endPickerOptions() {
                let startDate = this.condition['search_GTE_inPortTime']
                return {
                    disabledDate(time) {
                        if (startDate) {
                            // return time.getTime() < new Date(startDate).getTime() - 60 * 60 * 24 * 1000
                            return time.getTime() < new Date(startDate).getTime()
                        } else {
                            return false
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
