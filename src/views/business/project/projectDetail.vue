<template>
    <el-dialog title="查看项目" :visible.sync="dialogForm" width="1000px">
        <el-form :inline="true" ref="form" :model="form" class="add-form" label-width="110px">
            <h3>基本信息</h3>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="项目编号:" prop="code">
                        {{ form.code }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="项目名称:">
                        {{ form.name }}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="业务模式:">
                        {{ form.businessMode | _filterBusinessModel }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="项目有效期:">
                        {{ form.startDate }} 至 {{ form.endDate }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="项目描述:" class="customFormWidth">
                        {{ form.abstractDesc }}
                    </el-form-item>
                </el-col>
            </el-row>
            <div v-if="form.projectType==='NORMAL'">
                <h3>基础合同</h3>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label=" " class="flexCenter form-input-width">
                            <el-table style="margin: 20px 0" :data="form.contract" border stripe max-height="500">
                                <!-- <el-table-column fixed="left" prop="eleCode" label="合同编号" sortable
                                                 min-width="160"></el-table-column> -->
                                <el-table-column prop="name" label="合同名称" sortable min-width="160"></el-table-column>
                                <el-table-column prop="contractType" label="合同类型" sortable min-width="110">
                                    <template slot-scope="scope">
                                        {{ scope.row.contractType | _filterContractType }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="partyAName" label="客户名称" sortable
                                                 min-width="160"></el-table-column>
                                <el-table-column prop="contractStatus" label="状态" sortable min-width="80">
                                    <template slot-scope="scope">
                                        {{ scope.row.contractStatus | _filterContractStatus }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="useStatus" label="使用状态" sortable min-width="120">
                                    <template slot-scope="scope">
                                        {{ scope.row.useStatus | _filterUseOrUnused }}
                                    </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="附件信息" sortable width="200">
                                    <template slot-scope="scope">
                                        <download v-model="scope.row.attachments"></download>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div v-if="form.projectType==='TEMP'&&form.tempCustomer">
                <h3>客户信息</h3>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="客户单位：">
                            {{ form.tempCustomer.partyAName }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系人：">
                            {{ form.tempCustomer.linkMan }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系电话：">
                            {{ form.tempCustomer.linkTel }}
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <!--<h3>项目操作记录</h3>-->

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogForm = false">返 回</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import { getProjectDetail } from "@/api/project/project";
    import download from '@/components/download'

    export default {
        name: "projectDetail",
        components: { download },
        data() {
            return {
                form: {},
                dialogForm: false
            }
        },
        methods: {
            getData(id) {
                getProjectDetail(id).then(res => {
                    this.form = res.data
                    this.dialogForm = true
                })
            }
        }
    }
</script>

<style scoped>

</style>
