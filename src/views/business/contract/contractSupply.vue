<template>
    <el-dialog title="合同补充协议新增" :visible.sync="dialogForm" width="500px">
        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="110px">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="协议名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="所属合同" prop="contractName" clearable>
                        <div style="display: flex;align-items: center">
                            <el-input v-model="form.contractName" :disabled="true"></el-input>
                            <i @click="handleSelectContract" class="el-icon-search"
                               style="margin-left: 5px;font-size: 20px;cursor: pointer"></i>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="客户名称" prop="customerName" clearable>
                        <el-input v-model="form.customerName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="补充说明" prop="specification">
                        <el-input type="textarea" :rows="3" maxlength="255" placeholder="请输入内容" v-model="form.specification"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="协议附件" prop="attachments">
                        <attachments v-model="form.attachments"></attachments>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSave" :loading="$store.getters.loadingBtn">保 存</el-button>
            <el-button @click.native="dialogForm=false">取 消</el-button>
        </span>
        <el-dialog title="选择收入合同" :visible.sync="dialogContract" :modal="false" :modal-append-to-body="false"
                   width="90%">
            <select-contract ref="selectContract" @select="handleMakeSure"></select-contract>
            <!--<span slot="footer" class="dialog-footer">-->
                    <!--<el-button type="primary" @click="handleMakeSure">确定</el-button>-->
                    <!--<el-button @click="dialogContract = false">取 消</el-button>-->
                <!--</span>-->
        </el-dialog>
    </el-dialog>
</template>

<script>
    import selectContract from '@/views/business/contract/index.vue'
    import attachments from '@/components/file-upload'
    import { contractSideAgreement } from "@/api/contract/contract";

    export default {
        name: "contractSupply",
        components: { selectContract, attachments },
        data() {
            return {
                dialogForm: false,
                dialogContract: false,
                form: {
                    contractName: '',
                    contractId: '',
                    customerName: '',
                    customerId: '',
                    attachments: []
                },
                rules: {
                    name: [{ required: true, message: '请输入协议名称', trigger: 'change' }],
                    contractName: [{ required: true, message: '请选择合同', trigger: 'change' }],
                    customerName: [{ required: true, message: '请输入客户名称', trigger: 'change' }],
                    specification: [{ required: true, message: '请输入协议说明', trigger: 'change' }],
                    attachments: [{ required: true, message: '请上传附件', trigger: 'change' }],
                },
                contract: {},
            }
        },
        methods: {
            handleSave() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        contractSideAgreement(this.form.contractId, this.form).then(rse => {
                            this.$message({ message: `新增补充协议成功`, type: 'success' })
                            this.dialogForm = false
                            this.$emit('load')
                        })
                    } else {
                        this.$message({ message: '请检查表单!', type: 'error' })
                    }
                })
            },
            // 打开合同弹窗
            handleSelectContract() {
                this.dialogContract = true
                // this.$refs.selectContract.loadData()

                this.$nextTick(() => {
                    this.$refs.selectContract.isSelect = true
                    // this.$refs.selectContract.condition.search_EQ_useStatus = false
                    // this.$refs.selectContract.condition.search_EQ_contractType = 'I'
                    this.$refs.selectContract.loadData()
                })
            },
            // 选择合同
            handleSelect(val) {
                this.contract = JSON.parse(JSON.stringify(val))
            },
            handleMakeSure(val) {
                this.contract = JSON.parse(JSON.stringify(val))
                this.dialogContract = false
                this.form.contractName = this.contract.name
                this.form.contractId = this.contract.id
                this.form.customerName = this.contract.partyAName
                this.form.customerId = this.contract.partyAId
            }
        },
        watch: {
            dialogForm(bool) {
                if (!bool) {
                    this.form.attachments = []
                    this.$refs.form.resetFields()
                }
            }
        }
    }
</script>

<style scoped>

</style>
