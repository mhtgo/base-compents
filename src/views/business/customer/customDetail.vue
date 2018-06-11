<template>
    <el-dialog title="查看客户信息" top="5vh" :visible.sync="dialogForm" :modal="false" :modal-append-to-body="false" width="90%">
        <el-form :inline="true" ref="form" :model="form" class="add-form" label-width="140px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="客户代码：">
                        {{ form.customerCode }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="客户简称：">
                        {{ form.shortName }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="客户名称：" prop="name">
                        {{ form.name }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>

                <el-col :span="8">
                    <el-form-item label="社会信用代码：" prop="creditCode">
                        {{ form.creditCode }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="客户类型：">
                        {{ form.customerType | _filterCustomType }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="成立日期：">
                        {{ form.regDate }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="注册资本(万元)：">
                        {{ form.regeditAmount | filterNum }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="法定代表人：">
                        {{ form.legalPerson }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系电话：">
                        {{ form.linkTel }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="联系人：">
                        {{ form.linkMan }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="企业性质：">
                        {{ form.entNature | _filterCompanyNature }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="上级单位：">
                        {{ form.parentOrgName }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="是否生产企业：">
                        {{ form.productionCompany | _filterTrueOrFalse}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="有无年产量：">
                        {{ form.isSupplyYield | _filterAllOrNone }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="年产量：" v-if="form.isSupplyYield">
                        {{ form.supplyYields }}
                    </el-form-item>
                    <el-form-item label="无年产量说明：" v-else>
                        {{ form.supplyNoYieldRemark }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="是否初次签约：">
                        {{ form.isFirstSigning | _filterTrueOrFalse }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="有无不良记录：">
                        {{ form.isBad | _filterAllOrNone }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否箱主：">
                        {{ form.isOwner | _filterTrueOrFalse }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="是否船公司：">
                        {{ form.isShipCompany | _filterTrueOrFalse }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否船代：">
                        {{ form.isShipAgent | _filterTrueOrFalse }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否货主：">
                        {{ form.isCargoOwner | _filterTrueOrFalse }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="是否发货人：">
                        {{ form.isConsigner | _filterTrueOrFalse }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否收货人：">
                        {{ form.isConsignee | _filterTrueOrFalse }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="注册地址：" prop="regAddress" class="customFormWidth">
                        {{ form.regAddress }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="办公地址：" class="customFormWidth">
                        {{ form.address }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="主营信息：" class="customFormWidth">
                        {{ form.busScope }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注：" class="customFormWidth">
                        {{ form.remark }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="附件：" prop="attachments">
                        <download v-model="form.attachments"></download>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="开户银行信息：" class="customFormBankWidth">
                        <el-table :data="form.customBank" border max-height="300">
                            <el-table-column prop="bankAccountType" label="银行类型" min-width="204">
                                <template slot-scope="scope">
                                    {{ scope.row.bankAccountType | _filterBankType }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="openBank" label="开户银行" min-width="150"></el-table-column>
                            <el-table-column prop="bankNo" label="银行账号" min-width="220"></el-table-column>
                            <el-table-column prop="bankName" label="账户名称" min-width="180"></el-table-column>
                        </el-table>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogForm = false">返 回</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import { getCustomDetail } from "@/api/custom/customList";
    import download from '@/components/download'
    export default {
        name: "customDetail",
        components:{download},
        data() {
            return {
                form: this.clearForm(),
                dialogForm: false,                //弹窗控制器
            }
        },
        methods: {
            getData(id) {
                getCustomDetail(id).then(res => {
                    this.form = res.data
                    this.dialogForm = true
                })
            },
            // 清除表单数据
            clearForm() {
                return {
                    creditCode: '',
                    customerCode: '',
                    customerType: 'NORMAL',
                    shortName: '',
                    name: '',
                    regDate: '',
                    regeditAmount: '',
                    legalPerson: '',
                    linkTel: '',
                    linkMan: '',
                    entNature: '',
                    parentOrgId: '',
                    productionCompany: false,
                    isSupplyYield: false,
                    supplyNoYieldRemark: '',
                    isFirstSigning: false,
                    isBad: false,
                    isOwner: false,
                    isShipCompany: false,
                    isShipAgent: false,
                    isCargoOwner: false,
                    isConsigner: false,
                    isConsignee: false,
                    isOwner: false,
                    regAddress: '',
                    address: '',
                    busScope: '',
                    remark: '',
                    attachments: [{ a: 1 }],
                    customBank: [{ b: 2 }],
                }
            },
        }
    }
</script>

<style scoped>

</style>
