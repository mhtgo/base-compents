<template>
    <div>
        <base-list ref="jobTable" :condition="condition" :datas.sync="jobTable" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="110px">
                <el-row>
                    <el-col style="width: 325px">
                        <el-form-item label="计划状态">
                            <el-select v-model="condition['search_EQ_planStatus']" placeholder="请选择" clearable>
                                <el-option v-for="[key, val] in _dictPlanStatus" :key="key" :label="val"
                                           :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 325px" v-if="isTransport">
                        <el-form-item label="运输方式">
                            <el-select v-model="condition['search_EQ_transportMode']" placeholder="请选择" clearable>
                                <el-option v-for="[key, val] in _dictTransportModeType" :key="key" :label="val"
                                           :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 435px">
                        <el-form-item label="预计作业日期">
                            <date-slot :startDate.sync="condition.search_GTE_planJobDate"
                                       :endDate.sync="condition.search_LTE_planJobDate" dateType="yyyy-MM-dd"
                                       middle="至"></date-slot>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" icon="el-icon-search" @click="loadData" class="ml-110">查 询</el-button>
                        <el-button type="primary" @click="loadData">刷 新</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="jobTable" border stripe max-height="500">
                <el-table-column prop="planNo" label="计划单号" sortable min-width="180">
                    <template slot-scope="scope">
                        <a @click="handleGetDetail(scope.row.planNo)" style="color: blue">{{ scope.row.planNo }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="planType" label="计划类型" sortable min-width="120">
                    <template slot-scope="scope">
                        {{ scope.row.planType | _filterPlanType }}
                    </template>
                </el-table-column>
                <el-table-column v-if="isTransport" prop="transportMode" label="运输方式" sortable
                                 min-width="120">
                    <template slot-scope="scope">
                        {{ scope.row.transportMode | _filterTransportModeType }}
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="packingWay" label="包装方式" sortable min-width="120">
                    <template slot-scope="scope">
                        {{ scope.row.packingWay | _filterPackingWay }}
                    </template>
                </el-table-column> -->
                <el-table-column prop="containerNum" label="预计作业数量" sortable min-width="140"></el-table-column>
                <el-table-column prop="planJobDate" label="预计作业日期" sortable min-width="140"></el-table-column>
                <el-table-column prop="planStatus" label="计划状态" sortable min-width="120">
                    <template slot-scope="scope">
                        {{ scope.row.planStatus | _filterPlanStatus }}
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <el-dialog title="计划详情页" :visible.sync="dialogForm" width="1000px">
            <h3>基础信息</h3>
            <base-info :form="baseForm"></base-info>
            <h3>集装箱明细</h3>
            <container-table :form="baseForm" ref="table"></container-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogForm = false">取 消</el-button>
                <el-button type="primary" @click="dialogForm=false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { jobPlanBaseInfo, jobPlanList } from "@/api/jobPlan/jobPlan";
    import dateSlot from '@/components/date/dateSlot'
    import baseInfo from './baseInfo'
    import containerTable from './containerTable'
    import { getLocalTime, mGetDate } from "@/utils/dateFormat";

    export default {
        name: "jobTable",
        components: { dateSlot, baseInfo, containerTable },
        data() {
            return {
                condition: {
                    search_EQ_planStatus: '',
                    search_EQ_transportMode: '',
                    search_EQ_planType: '',
                    search_GTE_planJobDate: '',
                    search_LTE_planJobDate: '',
                },                      // 查询条件
                jobTable: [],                      // table数组
                pageSearch: jobPlanList,          // 分页查询api接口
                dialogForm: false,
                baseForm: {},
            }
        },
        mounted() {
            const route = this.$route.query
            if (route.type) {
                this.condition.search_EQ_planType = route.type
            }
            if (route.status) {
                this.condition.search_EQ_planStatus = route.status
            }
            if (route.mode) {
                this.condition.search_EQ_transportMode = route.mode
            }
            if(route.date){
                this.condition.search_GTE_planJobDate=route.date
                this.condition.search_LTE_planJobDate=route.date
            }
            if(route.dateType==='month'){
                let toMonth = mGetDate(new Date().getFullYear(), new Date().getMonth() + 1)
                this.condition.search_GTE_planJobDate=route.date
                this.condition.search_LTE_planJobDate=route.date.substr(0,7)+toMonth
            }
            this.loadData()
        },
        activated(){
            const route = this.$route.query
            if (route.type) {
                this.condition.search_EQ_planType = route.type
            }
            if (route.status) {
                this.condition.search_EQ_planStatus = route.status
            }
            if (route.mode) {
                this.condition.search_EQ_transportMode = route.mode
            }
            if(route.date){
                this.condition.search_GTE_planJobDate=route.date
                this.condition.search_LTE_planJobDate=route.date
            }
            this.loadData()
        },
        methods: {
            loadData() {
                this.$refs.jobTable.loadData()
            },
            handleGetDetail(id) {
                this.dialogForm = true
                this.getBaseInfo(id)
            },
            getBaseInfo(id) {
                jobPlanBaseInfo(id).then(res => {
                    this.baseForm = res.data
                    // this.$refs.table.condition['search_EQ_planType'] = ''
                    // this.$refs.table.condition['search_EQ_transportMode'] = ''
                    this.$refs.table.condition['search_EQ_planNo'] = res.data.planNo
                    // if (res.data.planType) {
                    //     this.$refs.table.condition['search_EQ_planType'] = res.data.planType
                    // }
                    // if (res.data.transportMode) {
                    //     this.$refs.table.condition['search_EQ_transportMode'] = res.data.transportMode
                    // }
                    this.$refs.table.loadData()
                })
            }
        },
        computed: {
            isTransport() {
                return this.$route.query.type === 'TXJH' || this.$route.query.type === 'JCJH'
            }
        },
        // watch:{
        //     '$route' (to, from) {
        //         console.log(to)
        //     }
        // }
    }
</script>

<style scoped>

</style>
