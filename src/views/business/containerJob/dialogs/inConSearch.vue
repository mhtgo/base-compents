<template>
    <!-- 在港集装箱查询 -->
    <el-dialog title="在港集装箱查询" :visible.sync="dialogForm" width="90%">

        <base-list ref="conSearch" :condition="condition" :datas.sync="conSearch" :pageSearch="pageSearch">
        <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="110px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="箱号">
                    <el-input type="text" v-model.trim="form.search_LIKE_containerNo"></el-input>
                    </el-form-item>
                </el-col>

                 <el-col :span="12">
                    <el-form-item label="作业类型">
                    <el-select v-model="condition['search_EQ_planStatus	']" placeholder="请选择" clearable>
                        <el-option v-for="[key, val] in _dictPlanStatus" :key="key" :label="val" :value="key"></el-option>
                    </el-select>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="作业时间">
                    <date-slot :startDate.sync="condition.search_GTE_planJobDate" :endDate.sync="condition.search_GTE_planJobDate"></date-slot>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-button icon="el-icon-search" type="primary" @click="loadData">查 询</el-button>
                    <el-button type="primary" @click="loadData">导 出</el-button>
                </el-col>
            </el-row>

        </el-form>
        <el-table slot="list" :data="contract" border stripe max-height="500" :row-class-name="tableRowClassName">
            <el-table-column fixed="left" label="选择" align="center" min-width="50" v-if="isSelect">
            <template slot-scope="scope">
                <el-radio v-model="radio" :label="scope.$index" @change.native="radio=scope.$index"></el-radio>
            </template>
            </el-table-column>
            <el-table-column fixed="left" prop="id" label="序号" min-width="180">
            <template slot-scope="scope">
                <a style="color: blue" @click="handleContractInfo(scope.row.id)">{{ scope.row.id }}</a>
            </template>
            </el-table-column>
            <!--<el-table-column prop="code" label="合同纸质编号" sortable min-width="180"></el-table-column>-->
            <el-table-column prop="planJobDate" label="集装箱箱号" sortable min-width="110"> </el-table-column>

            <el-table-column prop="wagonNo" label="作业类型" sortable min-width="160"></el-table-column>

            <el-table-column prop="containerType" label="作业时间" sortable min-width="160"></el-table-column>

            <el-table-column prop="containerType" label="车皮号/车牌号" sortable min-width="160"></el-table-column>

            <el-table-column prop="containerSize" label="作业人员" sortable min-width="160"></el-table-column>

            <el-table-column prop="containerSize" label="箱型" sortable min-width="160"></el-table-column>

            <el-table-column prop="containerSize" label="尺寸" sortable min-width="160"></el-table-column>

            <el-table-column prop="ifHeavy" label="空重" sortable min-width="160">
            <template slot-scope="scope">
                {{ scope.row.businessMode | _filterIfHeavyType }}
            </template>
            </el-table-column>

            <el-table-column prop="ifHeavy" label="内外贸" sortable min-width="160">
            <template slot-scope="scope">
                {{ scope.row.businessMode | _filterIfHeavyType }}
            </template>
            </el-table-column>

            <el-table-column prop="cargoName" label="品名" sortable min-width="160"></el-table-column>

            <el-table-column prop="stratStationName" label="发站" sortable min-width="160"></el-table-column>

            <el-table-column prop="endStationName" label="到站" sortable min-width="160"></el-table-column>

            <el-table-column prop="cargoWeight" label="货名" sortable min-width="160"></el-table-column>

            <el-table-column prop="cargoWeight" label="货重" sortable min-width="160"></el-table-column>

        </el-table>
        </base-list>

        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSaveArrive(true)">确定</el-button>
            <el-button @click="dialogForm = false">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
    // import { addContract, contractApprovalPass, updateContract } from "@/api/contract/contract";
    import { approval } from "@/api/workflow/workflow";
    import searchCustom from '@/components/autocomplete/autoSearchCustom'
    import { PUBLIC_LIMIT, REG_TEXT } from "@/utils/Reg";
    import { sortLength } from "@/utils/rules";
    import { getLocalTime } from "@/utils/dateFormat";

    import autoSearchPortStation from '@/components/autocomplete/autoSearchPortStation'
    import autoSearchSize from '@/components/autocomplete/autoSearchSize'
    import autoSearchEntrust from '@/components/autocomplete/autoSearchEntrust'
    import autoSearchCustom from '@/components/autocomplete/autoSearchCustom'

    import { arrive, searchArrive } from "@/api/gatePanel/gatePanel";

    import dateSlot from '@/components/date/dateSlot'

    export default {
        name: "inConSearch",
        components: { searchCustom, autoSearchPortStation, autoSearchSize, autoSearchEntrust, autoSearchCustom, dateSlot },
        data() {
            return {
                isEdit: false,
                dialogForm: false,
                form: this.clearForm(),
                rules: {
                },
                multipleSelection: [],               // 选择的行
            }
        },
        methods: {


        },
        watch: {
            dialogForm(val) {
                if (!val) {
                    this.$refs.form.resetFields()
                    this.isEdit = false
                    this.form = this.clearForm()
                }
            }
        },
        computed: {
            // 设置有效起始日期
            startPickerOptions() {
                let endDate = this.form.endDate
                return {
                    disabledDate(time) {
                        if(time.getTime()<(+new Date())-60*60*24*1000){
                            return true
                        }
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
                let startDate = this.form.startDate
                return {
                    disabledDate(time) {
                        if (startDate) {
                            return time.getTime() < new Date(startDate).getTime()-60*60*24*1000
                        } else {
                            return false
                        }
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
