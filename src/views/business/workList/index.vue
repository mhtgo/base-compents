<template>
    <div>
        <base-list ref="job" :condition="condition" :isShowClose="true" :datas.sync="job"
                   :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="100px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="计划编号">
                            <el-input type="text" v-model.trim="condition.search_LIKE_planNo" clearable></el-input>
                            <!-- <el-select v-model="condition['search_LIKE_planNo']" placeholder="请选择" clearable>
                              <el-option v-for="[key, val] in _dictBusinessModel" :key="key" :label="val"
                                         :value="key"></el-option>
                            </el-select> -->
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="箱号">
                            <el-input type="text" v-model.trim="condition.search_LIKE_containerNo" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="作业状态">
                            <el-select v-model="condition['search_EQ_jobStatus']" placeholder="请选择" clearable>
                                <el-option v-for="[key, val] in _dictJobStatus" :key="key" :label="val"
                                           :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="货名">
                            <el-input type="text" v-model.trim="condition.search_LIKE_cargoName" clearable></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10">
                        <el-form-item label="预计作业时间">
                            <date-slot :startDate.sync="condition.search_GTE_dateTime"
                                       :endDate.sync="condition.search_LTE_dateTime"></date-slot>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" icon="el-icon-search" @click="loadData" class="ml-100">查 询</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="job" border stripe max-height="500">
                <el-table-column fixed="left" prop="planNo" label="计划编号" sortable min-width="160"></el-table-column>
                <el-table-column prop="planJobDate" label="计划作业日期" sortable min-width="130"></el-table-column>
                <el-table-column prop="planType" label="计划类型" sortable min-width="120">
                    <template slot-scope="scope">
                        {{ scope.row.planType | _filterPlanType }}
                    </template>
                </el-table-column>
                <el-table-column prop="containerNo" label="箱号" sortable min-width="120"></el-table-column>
                <!--<el-table-column prop="containerNum" label="箱数" sortable min-width="120"></el-table-column>-->
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
                <el-table-column prop="ownerName" label="箱主" sortable min-width="120"></el-table-column>
                <el-table-column prop="cargoName" label="货名" sortable min-width="120"></el-table-column>
                <el-table-column prop="cargoWeight" label="货重" sortable min-width="120"></el-table-column>
                <el-table-column prop="cargoOwnerName" label="货主" sortable min-width="120"></el-table-column>
                <el-table-column prop="jobStatus" label="作业状态" sortable min-width="120">
                    <template slot-scope="scope">
                        {{ scope.row.jobStatus | _filterJobStatus }}
                    </template>
                </el-table-column>
                <el-table-column prop="operateDateTime" label="作业时间" sortable min-width="120"></el-table-column>
            </el-table>
        </base-list>
    </div>
</template>
<script>
    import { getPageList } from "@/api/containerJob/containerJob";
    import dateSlot from '@/components/date/dateSlot'
    import { getLocalTime, mGetDate } from "@/utils/dateFormat";

    export default {
        name: '作业列表',
        components: { dateSlot },
        data() {
            return {
                condition: {
                    search_EQ_jobStatus:'',
                    search_GTE_dateTime:'',
                    search_LTE_dateTime:'',
                },                      // 查询条件
                job: [],                      // table数组
                pageSearch: getPageList,          // 分页查询api接口
            }
        },
        mounted() {
            let query=this.$route.query
            console.log(query)
            if(query){
                this.condition['search_EQ_jobStatus']=query.status
                this.condition['search_GTE_dateTime']=query.date
                this.condition['search_LTE_dateTime']=query.date
                if(query.dateType==='month'){
                    let toMonth = mGetDate(new Date().getFullYear(), new Date().getMonth() + 1)
                    this.condition.search_GTE_dateTime=query.date
                    this.condition.search_LTE_dateTime=query.date.substr(0,7)+'-'+toMonth
                    console.log(this.condition.search_LTE_dateTime);
                }
            }

            this.loadData()
        },
        activated(){
            let query=this.$route.query
            console.log(query)
            if(query){
                this.condition['search_EQ_jobStatus']=query.status
                this.condition['search_GTE_dateTime']=query.date
                this.condition['search_LTE_dateTime']=query.date
                if(query.dateType==='month'){
                    let toMonth = mGetDate(new Date().getFullYear(), new Date().getMonth() + 1)
                    this.condition.search_GTE_dateTime=query.date
                    this.condition.search_LTE_dateTime=query.date.substr(0,7)+'-'+toMonth
                }
            }
            this.loadData()
        },
        methods: {
            loadData() {
                this.$refs.job.loadData()
            },
        }
    }
</script>
<style scoped lang="sass">

</style>
