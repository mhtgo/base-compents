<template>
    <div>

        <!-- 内转入场-分页 -->

        <base-list ref="nzrc" :condition="condition" :datas.sync="nzrc" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="110px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="计划编号">
                            <el-input type="text" v-model.trim="condition.search_LIKE_planNo"></el-input>
                            <!-- <el-select v-model="condition['search_LIKE_planNo']" placeholder="请选择" clearable>
                              <el-option v-for="[key, val] in _dictBusinessModel" :key="key" :label="val"
                                         :value="key"></el-option>
                            </el-select> -->
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="箱号">
                            <el-input type="text" v-model.trim="condition.search_LIKE_containerNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="作业状态">
                            <el-select v-model="condition['search_EQ_jobStatus']" placeholder="请选择" clearable>
                                <el-option v-for="[key, val] in _dictJobStatus" :key="key" :label="val" :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="货名">
                            <el-input type="text" v-model.trim="condition.search_LIKE_cargoName"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10">
                        <el-form-item label="预计作业时间">
                            <date-slot :startDate.sync="condition.search_GTE_planJobDate" :endDate.sync="condition.search_LTE_planJobDate"></date-slot>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-button class="ml-110" icon="el-icon-search" type="primary" @click="loadData">查 询</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="nzrc" border stripe max-height="500">
                <!--<el-table-column fixed="left" label="选择" align="center" min-width="50">-->
                    <!--<template slot-scope="scope">-->
                        <!--&lt;!&ndash;<el-radio v-model="radio" :label="scope.$index" @change.native="radio=scope.$index"></el-radio>&ndash;&gt;-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column fixed="left" prop="id" label="序号" min-width="50">
                    <template slot-scope="scope">
                        {{ scope.$index+1 }}
                    </template>
                </el-table-column>
                <!--<el-table-column prop="code" label="合同纸质编号" sortable min-width="180"></el-table-column>-->
                <el-table-column prop="planJobDate" label="预计作业日期" sortable min-width="130"> </el-table-column>
                <el-table-column prop="groupNo" label="配组号" sortable min-width="90"></el-table-column>
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
                <el-table-column prop="stratStationName" label="发站" sortable min-width="120"></el-table-column>
                <el-table-column prop="endStationName" label="到站" sortable min-width="120"></el-table-column>
                <el-table-column prop="ownerName" label="箱主" sortable min-width="160"></el-table-column>
                <el-table-column prop="cargoName" label="货名" sortable min-width="90"></el-table-column>
                <el-table-column prop="cargoWeight" label="货重" sortable min-width="75"></el-table-column>
                <el-table-column prop="jobStatus" label="作业状态" sortable min-width="120">
                    <template slot-scope="scope">
                        {{ scope.row.jobStatus | _filterJobStatus }}
                    </template>
                </el-table-column>
                <el-table-column prop="planNo" label="计划编号" sortable min-width="140"></el-table-column>
            </el-table>
        </base-list>

        <!-- <contract-form ref="contractForm" @load="loadData"></contract-form>
        <contract-detail ref="contractDetail"></contract-detail>
        <custom-detail ref="customDetail"></custom-detail>
        <contract-supply ref="contractSupply"></contract-supply> -->
    </div>
</template>

<script>

    import { NZRC } from '@/api/containerJob/containerJob'

    import dateSlot from '@/components/date/dateSlot'
    import searchCustom from '@/components/autocomplete/autoSearchCustom'
    import searchContract from '@/components/autocomplete/autoSearchContract'

    export default {
        name: "NZRC",
        components: {
            dateSlot,
            searchCustom,
            searchContract,
            // suitcaseForm,
        },
        data() {
            return {
                pageSearch: NZRC,   //查询接口名
                condition: {
                    // search_EQ_transportMode: 'CR'
                    search_EQ_jobStatus:'NOOPERATE'
                }, // 查询条件
                nzrc: [], // table数组
            }
        },
        mounted() {
            // this.loadData()
        },
        methods: {
            loadData() {
                this.$refs.nzrc.loadData()
            },
        },
    }

</script>

<style>


</style>
