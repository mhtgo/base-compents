<template>

    <!-- 提箱 -->
    <el-dialog title="拆箱" :visible.sync="dialogForm" width="600px">

        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="110px">
            <el-row>
                <el-col :span="24">
                    <el-form-item label=" " class="flexCenter">
                        <el-table :data="form.container" border max-height="300">
                            <el-table-column prop="containerType" label="箱型/尺寸" min-width="204">
                            </el-table-column>
                            <el-table-column prop="containerNo" label="空重" min-width="220">
                            </el-table-column>
                            <el-table-column prop="spec2" label="内外贸" min-width="220">
                            </el-table-column>
                            <el-table-column prop="ownerId" label="箱主" min-width="220">
                            </el-table-column>
                            <el-table-column prop="ifHeavy" label="空重" min-width="180">

                            </el-table-column>
                            <el-table-column prop="cargoName" label="货名" min-width="154">

                            </el-table-column>
                            <el-table-column prop="cargoWeight" label="货重" min-width="180">
                                <template slot-scope="scope">
                                    <el-input v-model.trim="scope.row.cargoWeight" clearable></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>

                 <el-col :span="12">
                    <el-form-item label="拆箱时间">
                        <el-date-picker v-model="form.conDate"
                              value-format="yyyy-MM-dd"
                              type="date"
                              placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>

            </el-row>

        </el-form>
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

    export default {
        name: "CX",
        components: { searchCustom, autoSearchPortStation, autoSearchSize, autoSearchEntrust, autoSearchCustom },
        data() {
            return {
                isEdit: false,
                dialogForm: false,
                form: this.clearForm(),
                rules: {
                    // code: [{ message: '只能输入中文,英文及数字', pattern: REG_TEXT, trigger: 'change' }, sortLength],
                    // name: [{ required: true, validator: PUBLIC_LIMIT, trigger: 'change' }, sortLength],
                    // contractType: [{ required: true, message: '请选择合同类型', trigger: 'change' }],
                    // partyAId: [{ required: true, message: '请输入甲方单位', trigger: 'change' }],
                    // partyBId: [{ required: true, message: '请输入乙方单位', trigger: 'change' }],
                    // businessMode: [{ required: true, message: '请选择业务模式', trigger: 'change' }],
                    // monthly: [{ required: true, message: '请选择是否月结', trigger: 'change' }],
                    // costStandard: [{ required: true, message: '请选择结算标准', trigger: 'change' }],
                    // contractAttribute: [{ required: true, message: '请选择合同属性', trigger: 'change' }],
                    // startDate: [{ required: true, message: '请选择有效期起', trigger: 'change' }],
                    // endDate: [{ required: true, message: '请选择有效期止', trigger: 'change' }],
                },
                multipleSelection: [],               // 选择的行
            }
        },
        methods: {

            mySelect(e){
                this.form.stratStationCode = e.pasCode
                this.form.stratStationName = e.pasName

                console.log(this.form)
            },

            mySelect2(e){
                this.form.endStationCode = e.pasCode
                this.form.endStationName = e.pasName
            },

            containerNoChange(val){
                searchArrive(val).then(res =>{
                    console.log(res)
                })
            },

            sizeChange(e){
                this.form.container[0].containerSize = e.containerSize
            },

            ownerChange(e){
                this.form.container[0].ownerId = e.id
            },

            /*
            * 保存 新增或编辑合同信息
            * this.isEdit 是否编辑
            * isApproval 是否送审
            * */
            handleSaveArrive(isApproval) {
                let contractCargo = this.form.contractCargo
                if (contractCargo && contractCargo.length === 0) {
                    this.$message({ message: `至少有一条到达信息`, type: 'error' })
                    return
                }

                this.handleApproval()

            },
            // 提交到达确认
            handleApproval() {
                arrive(this.form).then(response => {
                    console.log('提交成功')
                    // this.handleCloseDialog('提交成功!')
                })
            },

            clearForm() {
                return {
                    wagonNo: '',
                    stratStationCode: '',
                    // id: '',
                    stratStationName: '',
                    endStationCode: '',
                    endStationName: '',
                    shipper: '',
                    shipperTel: '',
                    consignee: '',
                    container: [{
                        containerType: '',
                        containerSize: '',
                        containerNo: '',
                        tradeType: '',
                        ownerId: '',
                        ifHeavy: '',
                        cargoName: '',
                        cargoWeight: '',
                    },],
                    // attachments: []
                }
            }
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
