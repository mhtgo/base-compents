<template>
    <el-form :inline="true" ref="form" :model="form" class="add-form" label-width="140px">
        <el-row>
            <el-col :span="12">
                <el-form-item label="计划分发规则名称：" prop="ruleName">
                    <p>{{ form.ruleName }}</p>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="委托类型名称：" prop="entrustType">
                    <p>{{ form.entrustType | _filterEntrustType }}</p>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="有效期起：" prop="startDate">
                    <p>{{ form.startDate }}</p>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="有效期止：" prop="endDate">
                    <p>{{ form.endDate }}</p>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="是否有效：" prop="valid">
                    <p>{{ form.valid | _filterValidType }}</p>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="所属单位：" prop="orgId">
                    <p>{{ form.orgName }}</p>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="规则优先级：" prop="valid">
                    <p>{{ form.priority }}</p>
                </el-form-item>
            </el-col>
        </el-row>

        <div>
            <el-row>
                <el-col :span="24" v-for="(item,index) in form.entrustSplitRuleFactor">
                    <el-form-item :label="index===0?'条件选择：':''" :style="index!==0?'margin-left:140px':''">
                        <div style="display: flex">
                            <div style="width: 80px">{{ item.attrCode | _filterAttrType }}</div>
                            <div style="width: 70px">{{ item.operator | _filterOperatorType }}</div>
                            <div>{{ item.attrValName ?item.attrValName:item.attrVal }}</div>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>

        <el-table :data="form.entrustSplitRuleDetails" border stripe max-height="500">
            <el-table-column prop="sortNo" label="分发顺序" width="155"></el-table-column>
            <el-table-column label="计划类型" min-width="120">
                <template slot-scope="scope">
                    {{ scope.row.planType | _filterPlanType }}
                </template>
            </el-table-column>
            <el-table-column prop="orgName" label="单位名称" min-width="120"></el-table-column>
            <el-table-column prop="deptName" label="部门名称" min-width="120"></el-table-column>
        </el-table>

        <el-row style="margin-top: 20px">
            <el-col :span="12">
                <el-form-item label="创建人：">
                    {{ form.createBy }}
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="创建时间：">
                    {{ form.createDateTime }}
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    import { getEntrustSplitRule, } from "@/api/entrustSplitRule/entrustSplitRule";
    import { transportModeType } from "@/assets/dict";

    export default {
        name: "entrustSplitRuleForm",
        data() {
            return {
                form: this.clearForm(),
                isEdit: false,
            }
        },
        mounted() {

        },
        methods: {
            clearForm() {
                return {
                    ruleName: '',
                    cargoName: "",
                    containerOwner: "",
                    endDate: "",
                    entrustType: "",
                    orgId: "",
                    orgName: "",
                    startDate: "",
                    transportMode: "",
                    valid: true,
                    entrustSplitRuleFactor: [],
                    entrustSplitRuleDetails: [{ sortNo: 1 }],
                }
            },
            getData(id) {
                getEntrustSplitRule(id).then(res => {
                    this.form = res.data
                    this.form.entrustSplitRuleFactor.forEach(f => {
                        if (f.attrCode === 'transportMode') {
                            f.attrValName = transportModeType.get(f.attrVal)
                        }
                    })
                })
            },

        },
    }
</script>

<style scoped>
.el-form-item__content p{
    width: 320px;
}
</style>
