<template>
    <div>

        <!-- 拆箱作业 -->
        <base-list ref="unbox" :condition="condition" :datas.sync="unbox" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="110px">
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

                    <el-col :span="12">
                        <el-form-item label="预计作业时间">
                            <date-slot :startDate.sync="condition.search_GTE_planJobDate"
                                       :endDate.sync="condition.search_LTE_planJobDate"></date-slot>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div style="display: flex;" class="ml-110">
                            <el-button @click="handleUnBoxBatch" type="primary"
                                       v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_CX:BACTH')!==-1">批量拆箱</el-button>
                            <el-button @click="handleUnBoxSingle" type="primary"
                                       v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_CX:CX')!==-1">拆箱</el-button>
                            <el-button @click="handleCancelJob" type="primary"
                                       v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_CX:CANCEL')!==-1">取消作业</el-button>
                            <el-button @click="dialogUpload=true" type="primary"
                                       v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_CX:UPLOADFILE')!==-1">上传记录</el-button>
                            <el-button icon="el-icon-search" type="primary" @click="loadData">查 询</el-button>
                        </div>
                    </el-col>
                </el-row>
                <!--<el-row>-->
                    <!--<el-col :span="8">-->
                        <!--<el-button class="ml-110" icon="el-icon-search" type="primary" @click="loadData">查 询</el-button>-->
                    <!--</el-col>-->
                <!--</el-row>-->

            </el-form>

            <el-table slot="list" :data="unbox" border stripe max-height="500"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" prop="id" width="55"></el-table-column>
                <el-table-column fixed="left" prop="id" label="序号" min-width="50">
                    <template slot-scope="scope">
                        {{ scope.$index+1 }}
                    </template>
                </el-table-column>
                <!--<el-table-column prop="code" label="合同纸质编号" sortable min-width="180"></el-table-column>-->
                <el-table-column prop="planJobDate" label="预计作业日期" sortable min-width="130"></el-table-column>
                <el-table-column prop="containerNo" label="箱号" sortable min-width="160"></el-table-column>
                <el-table-column prop="wagonNo" label="车皮号" sortable min-width="120"></el-table-column>
                <el-table-column prop="plateNumber" label="车牌号" sortable min-width="120"></el-table-column>
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
                <el-table-column prop="shipper" label="托运人" sortable min-width="120"></el-table-column>
                <el-table-column prop="shipperTel" label="联系电话" sortable min-width="120"></el-table-column>
                <el-table-column prop="consignee" label="收货人" sortable min-width="120"></el-table-column>
                <el-table-column prop="consigneeTel" label="联系电话" sortable min-width="120"></el-table-column>
                <el-table-column prop="jobStatus" label="作业状态" sortable min-width="120">
                    <template slot-scope="scope">
                        {{ scope.row.jobStatus | _filterJobStatus }}
                    </template>
                </el-table-column>
                <el-table-column prop="planNo" label="计划编号" sortable min-width="140"></el-table-column>
            </el-table>
        </base-list>
        <el-dialog title="拆箱" :visible.sync="dialogForm" :modal="false" :modal-append-to-body="false" width="900px"
                   style="margin-top: 8vh;">
            <el-form :rules="rules" ref="form" :model="form" label-width="80px">
                <el-row v-for="(item,index) in form.container" :key="item.id">
                    <el-col :span="5">
                        <el-form-item label="箱号:">
                            {{ item.containerNo }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="箱型:">
                            {{ item.containerType }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item label="尺寸:">
                            {{ item.containerSize }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="货名:">
                            {{ item.cargoName }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="货重:">
                            {{ item.cargoWeight }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="车牌号"
                                      :prop="'container.'+index+'.plateNumber'"
                                      :rules="{ required: true, message: '请输入车牌号', trigger: 'change' }">
                            <el-input type="text" v-model="item.plateNumber" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="拆箱时间" prop="unboxDate">
                    <el-date-picker v-model="form.unboxDate" value-format="yyyy-MM-dd" type="date"
                                    placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleUnBoxCancel">取 消</el-button>
                <el-button type="primary" @click="handleUnBoxSubmit" :loading="$store.getters.loadingBtn">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="上传附件" :visible.sync="dialogUpload" :modal="false" :modal-append-to-body="false" width="600px"
                   style="margin-top: 8vh;">
            <attachments v-model="attachments"></attachments>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUpload=false">取 消</el-button>
                <el-button type="primary" @click="handleUpload" :loading="$store.getters.loadingBtn">确认上传</el-button>
            </div>
        </el-dialog>

        <PLCX ref="plcx" @load="loadData"></PLCX>
        <!-- <contract-form ref="contractForm" @load="loadData"></contract-form>
        <contract-detail ref="contractDetail"></contract-detail>
        <custom-detail ref="customDetail"></custom-detail>
        <contract-supply ref="contractSupply"></contract-supply> -->
    </div>
</template>

<script>

    import { unbox, unboxCancel, unboxChoice, unboxUpload } from '@/api/containerJob/containerJob'
    import PLCX from './dialogs/PLCX'
    import dateSlot from '@/components/date/dateSlot'
    import attachments from '@/components/file-upload'

    export default {
        name: "unbox",
        components: {
            dateSlot,
            attachments,
            PLCX
            // suitcaseForm,
        },
        data() {
            return {
                pageSearch: unbox,   //查询接口名
                multipleSelection: [],   // 选择行
                condition: {
                    search_EQ_jobStatus:'NOOPERATE'
                }, // 查询条件
                unbox: [], // table数组
                attachments: [],             // 附件
                dialogForm: false,             // 拆箱弹窗
                dialogUpload: false,             // 上传弹窗
                form: {
                    container: [],
                    unboxDate: '',
                },
                rules: {
                    unboxDate: [{ required: true, message: '请选择拆箱时间', trigger: 'change' }],
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
                this.$refs.unbox.loadData()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            handleUnBoxSingle() {
                if (this.multipleSelection.length < 1) {
                    this.$message({ message: '请选择至少一条数据!', type: 'error' })
                    return
                }
                this.dialogForm = true
                this.form.container = this.multipleSelection
            },
            handleUnBoxSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        console.log('cc')
                        let data = {
                            container: [],
                            unboxDate: '',
                        }
                        for (let i = 0; i < this.form.container.length; i++) {
                            data.container.push({
                                containerNo: this.form.container[i].containerNo,
                                plateNumber: this.form.container[i].plateNumber,
                                id: this.form.container[i].id,
                                planNo: this.form.container[i].planNo,
                            })
                        }
                        data.unboxDate = this.form.unboxDate
                        unboxChoice(data).then(res => {
                            console.log(res)
                            this.loadData()
                            this.handleUnBoxCancel()
                        })
                    } else {
                        this.$message({ message: '请检查表单!', type: 'error' })
                    }
                })
            },
            handleUnBoxCancel() {
                this.dialogForm = false
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
                    unboxCancel({ container }).then(res => {
                        this.$message({ message: '取消作业成功!', type: 'success' })
                        this.loadData()
                    })
                })
            },
            // 批量拆箱
            handleUnBoxBatch() {
                this.$refs.plcx.dialogForm = true
            },
            // 上传记录
            handleUpload() {
                unboxUpload({ attachments: this.attachments }).then(res => {
                    this.$message({ message: '上传成功!', type: 'success' })
                    this.loadData()
                    this.dialogUpload = false
                    this.attachments=[]
                })
            }
        },
        watch: {
            dialogForm(bool) {
                if (!bool) {
                    this.form = {
                        container: [],
                        unboxDate: ''
                    }
                    this.$refs.form.resetFields()
                }
            }
        }
    }

</script>

<style>


</style>
