<template>
    <div>
        <!-- 进场 火车 -->
        <base-list ref="enterTR" :condition="condition" :datas.sync="enterTR" :pageSearch="pageSearch">
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
                                <el-option v-for="[key, val] in _dictJobStatus" :key="key" :label="val"
                                           :value="key"></el-option>
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
                    <el-col :span="12">
                        <el-form-item label="预计作业时间">
                            <date-slot :startDate.sync="condition.search_GTE_planJobDate"
                                       :endDate.sync="condition.search_LTE_planJobDate"></date-slot>
                        </el-form-item>
                    </el-col>
                    <!--<el-col :span="4">-->
                        <!--<el-button icon="el-icon-search" type="primary" @click="loadData">-->
                            <!--查 询-->
                        <!--</el-button>-->
                    <!--</el-col>-->
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="ml-110">
                            <el-button type="primary" @click="openPLJX"
                                       v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_TRAINJC:BACTH')!==-1">
                                批量进场
                            </el-button>
                            <el-button type="primary" @click="trEnter"
                                       v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_TRAINJC:JC')!==-1">
                                进场
                            </el-button>
                            <el-button type="primary" @click="calEnter"
                                       :loading="$store.getters.loadingBtn"
                                       v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_TRAINJC:CANCEL')!==-1">
                                取消作业
                            </el-button>
                            <el-button icon="el-icon-search" type="primary" @click="loadData">
                                查 询
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="enterTR" border stripe max-height="500"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" prop="id" width="55"></el-table-column>
                <el-table-column fixed="left" prop="id" label="序号" min-width="50">
                    <template slot-scope="scope">
                        {{ scope.$index+1 }}
                    </template>
                </el-table-column>
                <!--<el-table-column prop="code" label="合同纸质编号" sortable min-width="180"></el-table-column>-->
                <el-table-column prop="planJobDate" label="预计作业日期" sortable min-width="140"></el-table-column>
                <el-table-column prop="containerNo" label="箱号" sortable min-width="150"></el-table-column>
                <el-table-column prop="wagonNo" label="车皮号" sortable min-width="90"></el-table-column>
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
                <el-table-column prop="ownerName" label="箱主" sortable min-width="160"></el-table-column>
                <el-table-column prop="cargoName" label="货名" sortable min-width="90"></el-table-column>
                <el-table-column prop="cargoWeight" label="货重" sortable min-width="75"></el-table-column>
                <el-table-column prop="jobStatus" label="作业状态" sortable min-width="110">
                    <template slot-scope="scope">
                        {{ scope.row.jobStatus | _filterJobStatus }}
                    </template>
                </el-table-column>
                <el-table-column prop="planNo" label="计划编号" sortable min-width="140"></el-table-column>
            </el-table>
        </base-list>
        <el-dialog title="确认弹窗" :visible.sync="pickUpDialog" :modal="false" :modal-append-to-body="false" width="30%"
                   style="margin-top: 8vh;">
            <el-form :rules="rules" ref="form" :model="form" label-width="100px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="进场时间：" prop="startRecord">
                            <el-date-picker v-model="form.startRecord" value-format="yyyy-MM-dd" type="date"
                                            placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handlePickCancel">取 消</el-button>
                <el-button type="primary" @click="pickUp" :loading="$store.getters.loadingBtn">确 定</el-button>
            </div>
        </el-dialog>
        <PLJC ref="pljc" code="HCPLJC" @loadData="loadData"></PLJC>
    </div>
</template>

<script>
    // import suitcaseForm from './suitcaseForm'
    import dateSlot from '@/components/date/dateSlot'
    import searchCustom from '@/components/autocomplete/autoSearchCustom'
    import searchContract from '@/components/autocomplete/autoSearchContract'
    import { containerEnter, enterCancel, enterChoice } from '@/api/containerJob/containerJob'
    import PLJC from './dialogs/PLJC'

    export default {
        name: "enterTR",
        components: {
            dateSlot,
            searchCustom,
            searchContract,
            PLJC
        },
        data() {
            return {
                pageSearch: containerEnter,   //查询接口名
                condition: {
                    search_EQ_transportMode: 'TR',
                    search_EQ_jobStatus:'NOOPERATE'
                }, // 查询条件
                enterTR: [], // table数组
                multipleSelection: [],
                startRecord: '',
                pickUpDialog: false,
                rules: {
                    startRecord: [{ required: true, message: '请选择入场时间!', trigger: 'change' }],
                },
                form: {
                    startRecord: ''
                },
            }
        },
        mounted() {
            // search_EQ_transportMode
            this.loadData('first')
        },
        methods: {
            loadData(val) {
                if (val === undefined) {
                    this.$emit('changeInfo')
                }
                this.$refs.enterTR.loadData()
            },
            trEnter() {
                let _arr = this.multipleSelection;
                if (!_arr.length) {
                    this.$message({
                        message: '至少选择一条数据!',
                        type: 'error'
                    })
                    return
                }
                this.pickUpDialog = true
            },
            // get selections
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            pickUp() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let __arr = this.multipleSelection;
                        let _data = {}
                        _data.enterDate = this.form.startRecord
                        _data.container = []
                        _data.transportMode = 'TR'
                        for (let i = 0; i < __arr.length; i++) {
                            _data.container.push({
                                containerNo: __arr[i].containerNo,
                                id: __arr[i].id,
                                planNo: __arr[i].planNo,
                                wagonNo: __arr[i].wagonNo,
                            })
                        }

                        enterChoice(_data).then(res => {
                            this.$message({
                                message: '进场成功!',
                                type: 'success'
                            })
                            this.loadData()
                            this.handlePickCancel()
                        })
                    } else {
                        this.$message({
                            message: '请检查表单!',
                            type: 'error'
                        })
                    }
                })
            },
            handlePickCancel() {
                this.pickUpDialog = false
            },
            //取消作业
            calEnter() {
                let _arr = this.multipleSelection;
                if (!_arr.length) {
                    this.$message({
                        message: '至少选择一条数据!',
                        type: 'error'
                    })
                    return
                }
                this.$confirm(`确定取消作业?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let container = []
                    for (let i = 0; i < _arr.length; i++) {
                        container.push({
                            containerNo: _arr[i].containerNo,
                            id: _arr[i].id,
                            planNo: _arr[i].planNo,
                        })
                    }
                    enterCancel({ container }).then(res => {
                        this.$message({
                            message: '取消进场成功!',
                            type: 'success'
                        })
                        this.loadData()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });

            },
            openPLJX() {
                this.$refs.pljc.dialogForm = true
                this.$refs.pljc.data = this.multipleSelection
            },
        },
        watch: {
            pickUpDialog(bool) {
                if (!bool) {
                    this.form.startRecord = ''
                    this.$refs.form.resetFields()
                }
            }
        }
    }

</script>

<style>


</style>
