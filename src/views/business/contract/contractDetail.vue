<template>
    <el-dialog title="查看合同" :visible.sync="dialogForm" :modal="false" width="1000px">
        <el-form :inline="true" ref="form" :model="form" class="add-form" label-width="110px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="纸质合同编号：">
                        {{ form.code }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="电子编号：">
                        {{ form.eleCode }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="合同名称：">
                        {{ form.name }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="合同类型：">
                        {{ form.contractType | _filterContractType }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="甲方单位：">
                        {{ form.partyAName }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="乙方单位：">
                        {{ form.partyBName }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="业务模式：">
                        {{ form.businessMode | _filterBusinessModel }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否月结：">
                        {{ form.monthly | _filterTrueOrFalse }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="结算标准：">
                        {{ form.costStandard | _filterCostStandardType }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="合同属性：">
                        {{ form.contractAttribute | _filterContractAttribute }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="有效期起：">
                        {{ form.startDate }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="有效期止：">
                        {{ form.endDate }}
                    </el-form-item>
                </el-col>
            </el-row>
            <h3>货物信息</h3>
            <el-row>
                <el-col :span="24">
                    <el-form-item label=" " class="flexCenter">
                        <el-table :data="form.contractCargo" border max-height="300">
                            <!--<el-table-column fixed="left" prop="cargoTypeName" label="货物类型" min-width="204">-->
                            <!--<template slot-scope="scope">-->
                            <!--{{ scope.row.cargoTypeName }}-->
                            <!--</template>-->
                            <!--</el-table-column>-->
                            <el-table-column prop="cargoName" label="货物名称" min-width="150">
                                <template slot-scope="scope">
                                    {{ scope.row.cargoName }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="spec1" label="规格1" min-width="220"></el-table-column>
                            <el-table-column prop="spec2" label="规格2" min-width="220"></el-table-column>
                            <el-table-column prop="spec3" label="规格3" min-width="220"></el-table-column>
                            <el-table-column prop="material" label="材质" min-width="180"></el-table-column>
                            <el-table-column prop="price" label="单价" min-width="180">
                                <template slot-scope="scope">
                                    {{ scope.row.price }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="place" label="产地" min-width="180"></el-table-column>
                        </el-table>
                    </el-form-item>
                </el-col>
            </el-row>
            <h3>合同摘要</h3>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="摘要：" class="customFormWidth">
                        {{ form.abstractDesc }}
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
            <h3>合同附件</h3>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="附件：">
                        <download v-model="form.attachments"></download>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="margin-top: 20px">
                <el-col :span="8">
                    <el-form-item label="创建人：">{{ form.createBy }}</el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="所属部门：">{{ form.deptName }}</el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="创建时间：">{{ form.createDateTime }}</el-form-item>
                </el-col>
            </el-row>
            <div v-if="form.contractSideAgreement.length>0">
                <h3>补充协议列表</h3>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label=" " class="flexCenter">
                            <el-table :data="form.contractSideAgreement" border stripe max-height="500">
                                <el-table-column label="协议编号" prop="id" min-width="80"></el-table-column>
                                <el-table-column label="协议名称" prop="name" min-width="120"></el-table-column>
                                <el-table-column label="协议补充说明" prop="specification" min-width="200"></el-table-column>
                                <el-table-column label="创建人" prop="createBy" min-width="80"></el-table-column>
                                <el-table-column label="创建时间" prop="createDateTime" min-width="120"></el-table-column>
                                <el-table-column label="协议附件" min-width="220">
                                    <template slot-scope="scope">
                                        <download v-model="scope.row.attachments"></download>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <!--合同作废-->
            <div v-if="form.contractStatus==='V'">
                <h3>作废原因</h3>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="原因：" class="customFormWidth">{{ form.cancelReason }}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="作废人：">{{ form.cancelPerson }}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="作废时间：">{{ form.cancelTime }}</el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogForm = false">返 回</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import { getContractInfo } from "@/api/contract/contract";
    import download from '@/components/download'

    export default {
        name: "contractDetail",
        components: { download },
        data() {
            return {
                form: {},
                dialogForm: false
            }
        },
        methods: {
            getData(id) {
                getContractInfo(id).then(res => {
                    this.form = res.data
                    this.dialogForm = true
                })
            }
        }
    }
</script>

<style scoped>

</style>
