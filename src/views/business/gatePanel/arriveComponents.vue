<template>
    <el-dialog title="到达确报查询" :visible.sync="dialogForm" :modal-append-to-body="false" width="1000px"
               style="margin-top: 0vh;">
        <base-list ref="arrive" :condition="condition" :datas="arrive"
                   :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="110px">
                <el-row>
                    <!--<el-col :span="8">-->
                        <!--<el-form-item label="箱号">-->
                            <!--<el-input v-model="condition['search_LIKE_containerNo']"></el-input>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col :span="8">
                        <el-form-item label="发站">
                            <el-input v-model="condition['search_LIKE_stratStationName']"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="到站">
                            <el-input v-model="condition['search_LIKE_endStationName']"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <!--<el-row>-->
                    <!--<el-col :span="16">-->
                        <!--<el-form-item label="接车时间">-->
                            <!--<date-slot :startDate.sync="condition['search_GTE_operateTime']"-->
                                       <!--:endDate.sync="condition['search_LTE_operateTime']"></date-slot>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                <!--</el-row>-->
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" icon="el-icon-search" @click="loadData" class="ml-110">查 询</el-button>
                        <el-button @click="handleExport">明细导出</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="arrive" border stripe max-height="500" :span-method="objectSpanMethod">
                <el-table-column prop="wagonNo" label="车皮号" min-width="120"></el-table-column>
                <el-table-column prop="shipper" label="托运人" min-width="120"></el-table-column>
                <el-table-column prop="shipperTel" label="联系电话" min-width="135"></el-table-column>
                <el-table-column prop="consignee" label="收货人" min-width="120"></el-table-column>
                <el-table-column prop="consigneeTel" label="联系电话" min-width="135"></el-table-column>
                <el-table-column prop="containerNo" label="箱号" min-width="120"></el-table-column>
                <el-table-column prop="containerSize" label="尺寸" min-width="60"></el-table-column>
                <el-table-column prop="ifHeavy" label="空重" min-width="60">
                    <template slot-scope="scope">
                        {{ scope.row.ifHeavy | _filterIfHeavyType }}
                    </template>
                </el-table-column>
                <el-table-column prop="tradeType" label="内外贸" min-width="70">
                    <template slot-scope="scope">
                        {{ scope.row.tradeType | _filterTradeType }}
                    </template>
                </el-table-column>
                <el-table-column prop="ownerName" label="箱主" min-width="180"></el-table-column>
                <el-table-column prop="stratStationName" label="发站" min-width="110"></el-table-column>
                <el-table-column prop="endStationName" label="到站" min-width="110"></el-table-column>
                <el-table-column prop="cargoName" label="货名" min-width="150"></el-table-column>
                <el-table-column prop="cargoWeight" label="货重" min-width="60"></el-table-column>
            </el-table>
        </base-list>
    </el-dialog>
</template>

<script>
    import { arriveList } from "@/api/gatePanel/gatePanel";
    import { newExportExcel } from '@/utils/newExport'
    import { ifHeavyType, tradeType } from "@/assets/dict";
    import dateSlot from '@/components/date/dateSlot'

    export default {
        name: "arriveComponents",
        components: { dateSlot },
        data() {
            return {
                pageSearch: arriveList,
                condition: {
                    search_IN_status: 'NOOPERATE,OPERATE'
                },
                arrive: [],
                dialogForm: false
            }
        },
        methods: {
            loadData() {
                this.$refs.arrive.loadData()
                    .then(res => {
                        this.arrive = []
                        // 设置2条数据的planNo相同时，合并行
                        // 不会影响其他功能
                        let _tmp = res.aaData
                        for (let i = 0; i < _tmp.length; i++) {
                            //默认只有2条会重复
                            if (i % 2 == 1) {
                                //查询前一条数据
                                if (_tmp[i - 1].planNo == _tmp[i].planNo) {
                                    //标记前一条数据为合并
                                    _tmp[i - 1].merge = true;
                                    //标记当前数据为已合并数据
                                    _tmp[i].merged = true;
                                }
                                //查询后一条数据
                                if (_tmp[i + 1]) {
                                    if (_tmp[i + 1].planNo == _tmp[i].planNo) {
                                        //标记当前数据为合并
                                        _tmp[i].merge = true;
                                        //标记后一条数据为已合并数据
                                        _tmp[i + 1].merged = true;
                                    }
                                }
                            }
                            //- 2018-5-27 18：23 更改
                            //- 追加options参数,判断最后是否有操作按钮
                            _tmp[i].options = ''
                        }
                        this.arrive = _tmp
                    })
            },
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (column.property == 'id' || column.property == 'wagonNo' || column.property == 'shipper' || column.property ==
                    'shipperTel' || column.property == 'consignee' || column.property == 'consigneeTel' || column.property == 'options') {
                    if (row.merge) {
                        //合并当前行
                        return {
                            rowspan: 2,
                            colspan: 1
                        };

                    } else if (row.merged) {
                        //标记当前为已合并
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            },
            handleExport() {
                let title = '到达确报'
                let map = new Map()
                map.set('wagonNo', '车皮号')
                map.set('shipper', '托运人')
                map.set('shipperTel', '联系电话')
                map.set('consignee', '收货人')
                map.set('consigneeTel', '联系电话')
                map.set('containerNo', '箱号')
                map.set('containerSize', '尺寸')
                map.set('ifHeavy', '空重')
                map.set('tradeType', '内外贸')
                map.set('ownerName', '箱主')
                map.set('stratStationName', '发站')
                map.set('endStationName', '到站')
                map.set('cargoName', '货名')
                map.set('cargoWeight', '货重')
                let exportRecords = []
                let exportArr = JSON.parse(JSON.stringify(this.arrive))
                exportArr.forEach(record => {
                    let exportRecord = {}
                    for (let [key, value] of map.entries()) {
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
                newExportExcel(title, exportRecords)
            }
        },
        watch: {
            dialogForm(bool) {
                if (!bool) {
                    this.condition = {
                        search_IN_status: 'NOOPERATE,OPERATE'
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
