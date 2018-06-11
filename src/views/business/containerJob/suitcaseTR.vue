<template>
    <div>

        <!-- 指定箱提箱-分页 火车 -->
        <base-list ref="suitcaseTR" :condition="condition" :datas.sync="suitcaseTR" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="110px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="计划编号">
                            <el-input type="text" v-model.trim="condition.search_LIKE_planNo" clearable></el-input>
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
                    <el-col :span="12">
                        <el-form-item label="预计作业时间">
                            <date-slot :startDate.sync="condition.search_GTE_planJobDate"
                                       :endDate.sync="condition.search_LTE_planJobDate"></date-slot>
                        </el-form-item>
                    </el-col>
                    <!--<el-col :span="4">-->
                        <!--<el-button icon="el-icon-search" type="primary" @click="loadData">查 询</el-button>-->
                    <!--</el-col>-->
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="ml-110">
                            <el-button @click="handleBatchTX" type="primary"
                                       v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_TRAINTX:BACTH')!==-1">批量提箱</el-button>
                            <el-button @click="handleTx" type="primary"
                                       v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_TRAINTX:TX')!==-1">提箱</el-button>
                            <el-button @click="handleCancelJob" type="primary"
                                       :loading="$store.getters.loadingBtn"
                                       v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_TRAINTX:CANCEL')!==-1">取消作业</el-button>
                            <el-button icon="el-icon-search" type="primary" @click="loadData">查 询</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="suitcaseTR" border stripe max-height="500"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" prop="id" width="55"></el-table-column>
                <el-table-column fixed="left" prop="id" label="序号" min-width="50">
                    <template slot-scope="scope">
                        {{ scope.$index+1 }}
                    </template>
                </el-table-column>
                <!--<el-table-column prop="code" label="合同纸质编号" sortable min-width="180"></el-table-column>-->
                <el-table-column prop="planJobDate" label="预计作业日期" sortable min-width="140"></el-table-column>
                <!-- "groupNo":"@word(4)",           // 火车 时返回 配组号 -->
                <el-table-column prop="groupNo" label="配组号" sortable min-width="90"></el-table-column>
                <!-- "wagonNo":"@word(4)",           // 火车 时返回 车皮号 -->
                <el-table-column prop="wagonNo" label="车皮号" sortable min-width="120"></el-table-column>

                <el-table-column prop="containerNo" label="箱号" sortable min-width="160"></el-table-column>

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

                <el-table-column prop="stratStationName" label="发站" sortable min-width="160"></el-table-column>

                <el-table-column prop="endStationName" label="到站" sortable min-width="160"></el-table-column>

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
        <el-dialog title="提箱" :visible.sync="dialogForm" :modal="false" :modal-append-to-body="false" width="900px"
                   style="margin-top: 8vh;">
            <el-form :rules="rules" ref="form" :model="form">
                <el-row v-for="(item,index) in form.container" :key="item.id">
                    <el-col :span="6">
                        <el-form-item label="箱号:" label-width="90px">
                            {{ item.containerNo }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="箱型/尺寸:" label-width="80px">
                            {{ item.containerType }} {{ item.containerSize }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="空重:">
                            {{ item.ifHeavy | _filterIfHeavyType }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="货名:">
                            {{ item.cargoName }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="80px" label="货重:"
                                      :prop="'container.'+index+'.cargoWeight'"
                                      :rules="{ required: true, message: '请输入货重', trigger: 'change' }">
                            <input-numbers v-model="item.cargoWeight"></input-numbers>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="车皮号" prop="wagonNo" label-width="90px">
                            <search-wagon-no @selectName="v=>form.wagonNo=v" :name="form.wagonNo"></search-wagon-no>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="提箱时间" prop="suitcaseDate" label-width="90px">
                            <el-date-picker v-model="form.suitcaseDate" value-format="yyyy-MM-dd" type="date"
                                            placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogForm=false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit" :loading="$store.getters.loadingBtn">确 定</el-button>
            </div>
        </el-dialog>
        <PLTX ref="pltx" code="TRPLTX" @loadData="loadData"></PLTX>
    </div>
</template>

<script>

    import { specifyCarCancel, suitcase, suitcaseChoice } from '@/api/containerJob/containerJob'
    import PLTX from './dialogs/PLTX'
    import dateSlot from '@/components/date/dateSlot'
    import searchWagonNo from '@/components/autocomplete/autoSearchWagonNo'

    export default {
        name: "suitcaseTR",
        components: {
            dateSlot,
            PLTX,
            searchWagonNo
            // suitcaseForm,
        },
        data() {
            return {
                pageSearch: suitcase,   //查询接口名
                condition: {
                    search_EQ_transportMode: 'TR',
                    search_EQ_jobStatus:'NOOPERATE'
                }, // 查询条件
                suitcaseTR: [],              // table数组
                multipleSelection: [],      // 选择的行
                dialogForm: false,
                form: {
                    wagonNo: '',
                    suitcaseDate: '',
                    container: [],
                },
                rules: {
                    wagonNo: [{ required: true, message: '请输入车皮号', trigger: 'change' }],
                    suitcaseDate: [{ required: true, message: '请选择提箱时间', trigger: 'change' }],
                },
            }
        },
        mounted() {
            this.loadData()

        },
        methods: {
            loadData(val) {
                if (val === undefined) {
                    this.$emit('changeInfo')
                }
                this.$refs.suitcaseTR.loadData()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            // 批量提箱
            handleBatchTX() {
                this.$refs.pltx.dialogForm = true
            },
            // 提箱
            handleTx() {
                if (this.multipleSelection.length < 1) {
                    this.$message({ message: '请选择至少一条数据!', type: 'error' })
                    return
                }
                let _arr=this.multipleSelection
                let isOne = true
                if (_arr.length > 1) {
                    for (let i = 0; i < _arr.length; i++) {
                        if (_arr[0].wagonNo != _arr[i].plateNumber) {
                            isOne = false
                        }
                    }
                }
                if (isOne) {
                    this.form.wagonNo = _arr[0].wagonNo
                }
                this.form.container = this.multipleSelection
                this.dialogForm = true
            },
            // 提箱提交
            handleSubmit() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        let data = {
                            suitcaseDate: '',
                            container: [],
                        }
                        for (let i = 0; i < this.form.container.length; i++) {
                            data.container.push({
                                containerNo: this.form.container[i].containerNo,
                                cargoWeight: this.form.container[i].cargoWeight,
                                id: this.form.container[i].id,
                                planNo: this.form.container[i].planNo,
                                wagonNo: this.form.wagonNo,
                            })
                        }
                        data.suitcaseDate = this.form.suitcaseDate
                        suitcaseChoice(data).then(res => {
                            this.$message({ message: '提箱成功!', type: 'success' })
                            this.loadData()
                            this.dialogForm = false
                        })
                    } else {
                        this.$message({ message: '请检查表单!', type: 'error' })
                    }
                })
            },
            // 取消作业
            handleCancelJob() {
                if (this.multipleSelection.length < 1) {
                    this.$message({ message: '请选择至少一条数据!', type: 'error' })
                    return
                }
                let container = []
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    container.push({
                        containerNo: this.multipleSelection[i].containerNo,
                        id: this.multipleSelection[i].id,
                        planNo: this.multipleSelection[i].planNo,
                    })
                }
                this.$confirm('是否取消作业?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    specifyCarCancel({ container }).then(res => {
                        this.$message({ message: '取消作业成功!', type: 'success' })
                        this.loadData()
                    })
                })
            }
        },
        watch: {
            dialogForm(bool) {
                if (!bool) {
                    this.form = {
                        container: [],
                        suitcaseDate: '',
                        wagonNo: ''
                    }
                    this.$refs.form.resetFields()
                }
            }
        }
    }

</script>

<style>


</style>
