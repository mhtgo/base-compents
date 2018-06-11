<template>
    <el-dialog :title="title" :visible.sync="dialogForm" width="90%">

        <div>
            <base-list ref="myRecords" :condition="condition" :isShowClose="true" :datas.sync="recordList"
                       :pageSearch="pageSearch">
                <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="车皮号" prop="condition.search_LIKE_wagonNo">
                                <el-input type="text" v-model.trim="condition.search_LIKE_wagonNo"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="在港状态" prop="condition.search_EQ_portStatus">
                                <el-select v-model="condition.search_EQ_portStatus">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="在港" value="true"></el-option>
                                    <el-option label="离港" value="false"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="时间">
                                <date-slot :startDate.sync="condition.search_GTE_date"
                                           dateType="yyyy-MM-dd"
                                           :endDate.sync="condition.search_LTE_date"></date-slot>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-button type="primary" icon="el-icon-search" @click="handleSearch" class="ml-80">查 询
                            </el-button>
                            <el-button @click="handleExport">明细导出</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <el-table slot="list" :data="recordList2" border stripe max-height="500"
                          :span-method="objectSpanMethod">
                    <el-table-column prop="id" type="selection" width="55"></el-table-column>
                    <el-table-column prop="wagonNo" label="车皮号" min-width="150">
                    </el-table-column>
                    <el-table-column prop="containerNo" label="箱号" min-width="150">
                    </el-table-column>
                    <el-table-column prop="containerType" label="箱型" min-width="80">
                    </el-table-column>
                    <el-table-column prop="containerSize" label="尺寸" min-width="60">
                    </el-table-column>
                    <el-table-column prop="ifHeavy" label="空重" min-width="60">
                        <template slot-scope="scope">
                            {{ scope.row.ifHeavy | _filterIfHeavyType }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="cargoName" label="货名" min-width="100">
                    </el-table-column>
                    <el-table-column prop="stratStationName" label="发站" min-width="100">
                    </el-table-column>
                    <el-table-column prop="endStationName" label="到站" min-width="100">
                    </el-table-column>
                    <el-table-column prop="portStatus" label="在港状态" min-width="80">
                        <template slot-scope="scope">
                            {{ scope.row.portStatus ? '在港' : '不在港' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="meetCarDate" label="接车时间" min-width="130">
                    </el-table-column>
                    <el-table-column prop="sendCarDate" label="发车时间" min-width="130">
                    </el-table-column>
                    <el-table-column prop="stopDate" label="停留时间(h)" min-width="100">
                    </el-table-column>
                </el-table>
            </base-list>
        </div>


        <span slot="footer" class="dialog-footer">
            <!-- <el-button type="primary" @click="handleSaveContract(true)">确定</el-button> -->
            <el-button @click="dialogForm = false">取 消</el-button>
        </span>

    </el-dialog>
</template>

<script>
    import { records } from "@/api/gatePanel/gatePanel";
    import { approval } from "@/api/workflow/workflow";
    import searchCustom from '@/components/autocomplete/autoSearchCustom'
    import { PUBLIC_LIMIT, REG_TEXT } from "@/utils/Reg";
    import { sortLength } from "@/utils/rules";
    import { getLocalTime } from "@/utils/dateFormat";
    import dateSlot from '@/components/date/dateSlot'
    import { newExportExcel } from '@/utils/newExport'
    import { ifHeavyType, portStatusType } from "@/assets/dict";

    function getCurrentMonthLast() {
        var date = new Date();
        var currentMonth = date.getMonth();
        var nextMonth = ++currentMonth;
        var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        var oneDay = 1000 * 60 * 60 * 24;
        return new Date(nextMonthFirstDay - oneDay).toLocaleDateString().split('/')[2];
    }

    export default {
        components: { searchCustom, dateSlot },
        data() {
            return {
                condition: {
                    search_GTE_date: '',
                    search_LTE_date: '',
                    search_EQ_recordType: '',
                },                      // 查询条件
                recordList: [],                      // table数组
                recordList2: [],                      // table数组
                pageSearch: records,          // 分页查询api接口
                title: '发车车皮记录',
                dialogForm: false,
                type: '',
            }
        },

        methods: {

            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (column.property == 'id' || column.property == 'wagonNo' || column.property == 'endStationName' || column.property ==
                    'stratStationName' || column.property == 'portStatus' || column.property == 'meetCarDate' || column.property == 'sendCarDate' || column.property == 'stopDate') {

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

            loadData(date1, date2, type, method) {

                // console.log(this.$refs.myRecords)

                setTimeout(() => {
                    console.log(type)
                    this.condition.search_EQ_recordType = type
                    this.condition.search_GTE_date = date1
                    this.condition.search_LTE_date = date2
                    if (method === 'month') {
                        let month = new Date(date1.split('-')[0] + '/' + date1.split('-')[1] + '/0')
                        this.condition.search_GTE_date = date1.split('-')[0] + '-' + date1.split('-')[1] + '-01'
                        this.condition.search_LTE_date = date1.split('-')[0] + '-' + date1.split('-')[1] + '-' + getCurrentMonthLast()
                        console.log(this.condition)
                    }
                    console.log(this.condition['search_GTE_date'].length)
                    if (this.condition['search_GTE_date'].length < 11) {
                        this.condition['search_GTE_date'] = this.condition['search_GTE_date'] + ' 00:00:00'
                    }
                    if (this.condition['search_LTE_date'].length < 11) {
                        this.condition['search_LTE_date'] = this.condition['search_LTE_date'] + ' 23:59:59'
                    }
                    if (type == 'send') {
                        this.title = '发车车皮记录'
                    } else {
                        this.title = '接车车皮记录'
                    }

                    this.$refs.myRecords.loadData().then(res => {
                        // 公共组件提供了promise 5-29
                        //-- 2018-5-27 12：47 更改
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
                        this.recordList = _tmp
                        this.recordList2 = _tmp

                        console.log(_tmp)
                    })

                }, 100)

            },

            handleSearch() {
                this.loadData(this.condition.search_GTE_date, this.condition.search_LTE_date, this.condition.search_EQ_recordType, '')
            },
            handleExport() {
                let title = '发车车皮记录'
                let type = this.condition.search_EQ_recordType
                let map = new Map()
                map.set('wagonNo', '车皮号')
                map.set('containerNo', '箱号')
                map.set('containerType', '箱型')
                map.set('containerSize', '尺寸')
                map.set('ifHeavy', '空重')
                map.set('cargoName', '货名')
                map.set('stratStationName', '发站')
                map.set('endStationName', '到站')
                map.set('portStatus', '在港状态')
                map.set('meetCarDate', '接车时间')
                map.set('sendCarDate', '发车时间')
                map.set('stopDate', '停留时间(h)')
                if (type === 'get') {
                    title = '接车车皮记录'
                }
                let exportRecords = []
                let exportArr=JSON.parse(JSON.stringify(this.recordList2))
                exportArr.forEach(record => {
                    let exportRecord = {}
                    for (let [key, value] of map.entries()) {
                        if (key === 'ifHeavy') {
                            record[key] = ifHeavyType.get(record[key])
                        }
                        if (key === 'portStatus') {
                            record[key] = portStatusType.get(record[key])
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
                        search_GTE_date: '',
                        search_LTE_date: '',
                        search_EQ_recordType: '',
                    }
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    /*.dialog-footer {*/

    /*display: flex;*/

    /*justify-content: flex-start;*/

    /*}*/

</style>

