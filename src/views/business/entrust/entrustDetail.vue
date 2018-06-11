<template>
    <el-dialog title="委托详情" top="10vh" :visible.sync="dialogForm" width="90%">
        <el-form :inline="true" ref="form" :model="form" class="add-form" label-width="110px">
            <div class="desc-list">
                <div class="header">基础信息</div>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="委托编号:" prop="code">
                            {{ form.entrustNo }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="委托名称:">
                            {{ form.entrustName }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="委托单位:">
                            {{ form.entrustOrgName }}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="委托单类型:">
                            {{ form.entrustType | _filterEntrustType }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="所属项目:">
                            {{ form.projectName }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="委托描述:">
                            {{ form.entrustDesc }}
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div class="desc-list">
                <div class="header">委托信息</div>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="预计作业日期:" prop="code">
                            {{ form.jobDate }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="运输方式:">
                            {{ form.transportMode | _filterTransportModeType }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="包装方式:">
                            {{ '集装箱' }}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="起运地:">
                            {{ form.originName }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="目的地:">
                            {{ form.endName }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="预计数量:">
                            {{ form.containerNum }}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="form.entrustType==='THCK'">
                    <el-col :span="8">
                        <el-form-item label="出库方式:">
                            {{ form.specify| _filterSpecify}}
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div class="desc-list">
                <div class="header">集装箱信息</div>
                <el-row>
                    <el-col :span="12" v-if="form.entrustStatus==='VOID'">
                        <el-alert title="" type="info" :closable="false"
                                  class="mb-16 mr-20">
                            <span>总箱量：{{ amount }}</span>
                            <span>已作废：{{ hasVoid }}</span>
                            <el-button type="info" class="ml-20" @click="exportBills">明细导出</el-button>
                        </el-alert>
                    </el-col>
                    <el-col :span="12" v-if="form.entrustStatus==='ACCEPTED'">
                        <el-alert title="" type="info" :closable="false" class="mb-16 mr-20">
                            <span>总箱量：{{ amount }}</span>
                            <span>未作业：{{ noWork }}</span>
                            <el-button type="info" class="ml-20" @click="exportBills">明细导出</el-button>
                        </el-alert>
                    </el-col>
                    <el-col :span="12" v-if="form.entrustStatus==='OPERATE'||form.entrustStatus==='FINISHED'">
                        <el-alert title="" type="info"
                                  :closable="false" class="mb-16 mr-20">
                            <span>总箱量：{{ amount }}</span>
                            <span>未作业：{{ noWork }}</span>
                            <span>作业中：{{ working }}</span>
                            <span>已完成：{{ hasEnd }}</span>
                            <el-button type="info" class="ml-20" @click="exportBills">明细导出</el-button>
                        </el-alert>
                    </el-col>
                </el-row>

                <el-table :data="form.containerCargo" border stripe style="width: 100%">
                    <el-table-column type="index" label="序号" width="55"></el-table-column>
                    <el-table-column prop="entrustStatus" label="作业状态" width="120">
                        <template slot-scope="scope">
                            {{scope.row.jobStatus|_filterJobStatus}}
                        </template>
                    </el-table-column>
                    <el-table-column label="车牌号" width="120" prop="plateNumber"
                                     v-if="form.transportMode==='CR'"></el-table-column>
                    <el-table-column prop="groupNo" label="配组号" width="120" v-if="hasMatch"></el-table-column>
                    <el-table-column prop="containerNo" label="箱号" width="120"></el-table-column>
                    <el-table-column prop="containerType" label="箱型"></el-table-column>
                    <el-table-column prop="containerSize" label="尺寸"></el-table-column>
                    <el-table-column prop="tradeTypeName" label="内外贸">
                    </el-table-column>
                    <el-table-column prop="ifHeavyName" label="空重">
                    </el-table-column>
                    <el-table-column prop="ownerName" label="箱主"></el-table-column>
                    <el-table-column prop="cargoName" label="货名"></el-table-column>
                    <el-table-column prop="cargoOwnerName" label="货主"></el-table-column>
                    <el-table-column prop="cargoWeight" label="货重">
                        <template slot-scope="scope">
                            {{scope.row.cargoWeight}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="sealNumber" label="铅封号"></el-table-column>
                </el-table>

                <!-- <el-table :data="form.containerCargo" border stripe style="width: 100%" v-else>
          <el-table-column type="index" label="序号" width="55"></el-table-column>
          <el-table-column prop="entrustStatus" label="作业状态" width="120">
            <template slot-scope="scope">
              {{scope.row.entrustStatus|_filterEntrustStatus}}
            </template>
          </el-table-column>
          <el-table-column label="箱号" width="120" prop="containerNo"></el-table-column>
          <el-table-column label="车牌号" width="120" prop="plateNumber"></el-table-column>
          <el-table-column label="箱型" prop="containerType"></el-table-column>
          <el-table-column label="尺寸" prop="containerSize"></el-table-column>
          <el-table-column label="空重">
            <template slot-scope="scope">
              {{scope.row.ifHeavy|_filterIfHeavyType}}
            </template>
          </el-table-column>
          <el-table-column label="箱主" prop="ownerName"></el-table-column>
        </el-table> -->
                <el-row class="mt-16">
                    <el-col :span="6">
                        <div class="term">创建人</div>
                        <div class="detail">{{form.createBy}}</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="term">所属单位</div>
                        <div class="detail">{{form.createOrg}}</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="term">所属部门</div>
                        <div class="detail">{{form.createDept}}</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="term">创建时间</div>
                        <div class="detail">{{form.createDateTime}}</div>
                    </el-col>
                </el-row>
            </div>
        </el-form>
        <h3 v-if="form.entrustStatus==='VOID'">作废原因</h3>
        </hr>
        <el-form label-width="80px" v-if="form.entrustStatus==='VOID'">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="原因:">
                        {{form.voidReason}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="作废人:">
                        {{form.voidBy}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="作废时间:">
                        {{form.voidDateTime}}
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogForm = false">返 回</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import { getEntrustDetail } from "@/api/entrust";
    import { newExportExcel } from '@/utils/newExport'
    import { Alert } from 'element-ui'

    export default {
        name: "entrustDetail",
        components: {
            [Alert.name]: Alert,
            newExportExcel
        },
        data() {
            return {
                form: {},
                dialogForm: false,
                amount: 0,
                hasVoid: 0,
                noWork: 0,
                working: 0,
                hasEnd: 0,
                hasMatch: false //是否有配组号
            }
        },
        methods: {
            getData(id, type) {
                getEntrustDetail(id, type).then(res => {
                    this.form = res.data
                    // 汇总数据
                    if (this.form.entrustStatus === 'VOID') {
                        this.hasVoid = this.form.containerCargo.length
                    }
                    if (this.form.entrustStatus === 'ACCEPTED') {
                        this.noWork = this.form.containerCargo.length
                    }
                    if (this.form.entrustStatus === 'OPERATE' || this.form.entrustStatus === 'FINISHED') {
                        this.amount = this.form.containerCargo.length
                        this.working = 0
                        this.noWork = 0
                        this.hasEnd = 0
                        for (let index = 0; index < this.form.containerCargo.length; index++) {
                            if (this.form.containerCargo[index].jobStatus === 'NOOPERATE') {
                                this.noWork++
                            } else if (this.form.containerCargo[index].jobStatus === 'OPERATING') {
                                this.working++
                            } else if (this.form.containerCargo[index].jobStatus === 'OPERATED') {
                                this.hasEnd++
                            }
                        }
                    }
                    console.log(this.noWork)
                    for (let index = 0; index < this.form.containerCargo.length; index++) {
                        if (this.form.containerCargo[index].containerNo&&this.form.containerCargo[index].containerNo.indexOf("*") !== -1) {
                            let content
                            content = this.form.containerCargo[index].containerNo.substring(0, this.form.containerCargo[index].containerNo
                                    .length -
                                1)
                            this.form.containerCargo[index].containerNo = content
                        }
                    }
                    for (let index = 0; index < this.form.containerCargo.length; index++) {
                        if (this.form.containerCargo[index].groupNo) {
                            this.hasMatch = true
                        }
                    }
                    this.dialogForm = true
                })
            },
            exportBills() {
                let map = new Map()
                if (this.form.transportMode === 'CR') {
                    map.set('plateNumber', '车牌号')
                }
                if (this.hasMatch) {
                    map.set('groupNo', '配组号')
                }
                map.set('containerNo', '箱号')
                map.set('containerType', '箱型')
                map.set('containerSize', '尺寸')
                map.set('tradeTypeName', '内外贸')
                map.set('ifHeavyName', '空重')
                map.set('sealNumber', '铅封号')
                map.set('ownerName', '箱主')
                map.set('cargoName', '货名')
                map.set('cargoOwnerName', '货主')
                map.set('cargoWeight', '货重')
                let exportRecords = []
                this.form.containerCargo.forEach(record => {
                    let exportRecord = {}
                    for (let [key, value] of map.entries()) {
                        exportRecord[value] = record[key]
                    }
                    exportRecords.push(exportRecord)
                })
                newExportExcel('箱明细', exportRecords)
            }
        }
    }

</script>

<style scoped rel="stylesheet/scss" lang="scss">
    .desc-list {
        margin-bottom: 20px;
        padding-bottom: 16px;
        .header {
            color: rgba(0, 0, 0, .85);
            font-weight: 500;
            margin-bottom: 16px;
            font-size: 16px;
        }
        .term {
            line-height: 20px;
            padding-bottom: 12px;
            margin-right: 8px;
            color: rgba(0, 0, 0, .85);
            white-space: nowrap;
            display: table-cell;
            font-size: 14px;
            &:after {
                content: ":";
                margin: 0 8px 0 2px;
                position: relative;
                top: -.5px;
            }
        }
        .detail {
            line-height: 22px;
            width: 100%;
            padding-bottom: 16px;
            color: rgba(0, 0, 0, .65);
            display: table-cell;
            font-size: 14px;
        }
    }

    .mr-20 {
        .el-alert__content {
            span {
                margin-right: 20px;
                font-weight: 600;
            }
        }
    }
</style>
