<template>
    <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="135px">
        <el-row>
            <el-col :span="12">
                <el-form-item label="计划分发规则名称" prop="ruleName">
                    <el-input v-model="form.ruleName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="委托类型名称" prop="entrustType">
                    <el-select v-model="form.entrustType" placeholder="请选择" clearable>
                        <el-option v-for="[key, val] in _dictEntrustType" :key="key" :label="val"
                                   :value="key"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="有效期起" prop="startDate">
                    <el-date-picker v-model="form.startDate"
                                    :picker-options="startPickerOptions"
                                    value-format="yyyy-MM-dd"
                                    type="date"
                                    placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="有效期止">
                    <el-date-picker v-model="form.endDate"
                                    value-format="yyyy-MM-dd"
                                    :picker-options="endPickerOptions"
                                    type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="是否有效" prop="valid">
                    <el-select v-model="form.valid" placeholder="请选择" clearable>
                        <el-option v-for="[key, val] in _dictValidType" :key="key" :label="val"
                                   :value="key"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="所属单位" prop="orgId">
                    <el-input v-model="form.orgName" :disabled="true"></el-input>
                    <!--<search-custom @selectName="v=>form.orgName=v" @select="v=>form.orgId=v"-->
                    <!--:name="form.orgName" :disabled="true"></search-custom>-->
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="规则优先级" prop="valid">
                    <el-select v-model="form.priority" placeholder="请选择" clearable>
                        <el-option v-for="[key, val] in _dictPriorityType" :key="key" :label="val"
                                   :value="key"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" v-for="(item,index) in form.entrustSplitRuleFactor">
                <el-form-item :label="index===0?'条件选择':''" :style="index!==0?'margin-left:135px':''">
                    <el-select v-model="item.attrCode" style="width: 130px" @change="handleCheckCode(item)">
                        <el-option v-for="[key, val] in _dictAttrType" :key="key" :label="val"
                                   :value="key"></el-option>
                    </el-select>
                    <el-select v-model="item.operator" style="width: 95px">
                        <el-option v-for="[key, val] in _dictOperatorType" :key="key" :label="val"
                                   :value="key"></el-option>
                    </el-select>
                    <!--运输方式-->
                    <el-select v-if="item.attrCode==='transportMode'" v-model="item.attrVal" placeholder="请选择">
                        <el-option v-for="[key, val] in _dictTransportModeType" :key="key" :label="val"
                                   :value="key"></el-option>
                    </el-select>
                    <!--货名-->
                    <el-input v-if="item.attrCode==='cargoName'" style="width: 188px" v-model="item.attrVal"></el-input>
                    <!--箱主单位-->
                    <search-custom v-if="item.attrCode==='containerOwner'" @select="v=>item.attrVal=v"  
                                   @selectName="v=>item.attrValName=v" :name="item.attrValName"
                                   :isOwner="true"></search-custom>
                    <!--委托来源-->
                    <!--<search-sysdic v-if="item.attrCode==='entrustFrom'" @select="v=>item.attrVal=v"-->
                                <!--@selectName="v=>item.attrValName=v"-->
                                <!--:name="item.attrValName" placeholder="请输入系统字典值"></search-sysdic>-->

                    <el-select v-if="item.attrCode==='entrustFrom'" v-model="item.attrVal" filterable placeholder="请选择">
                        <el-option v-for="obj in sysdic" :key="obj.dicValue" :label="obj.dicValue" :value="obj.dicValue"></el-option>
                    </el-select>
                    <!--委托单位-->
                    <search-custom v-if="item.attrCode==='entrustOrgId'" @select="v=>item.attrVal=v"
                                   :disabled="item.attrCode==='entrustOrgId'"
                                   @selectName="v=>item.attrValName=v" :name="item.attrValName"
                                   :isOwner="true"></search-custom>
                    <el-button v-if="index===form.entrustSplitRuleFactor.length-1"
                               @click="form.entrustSplitRuleFactor.push({ attrCode: 'cargoName', attrName: '因素名称', attrVal:'',attrValName:'',displayType: 'SELECT' })"
                               type="text" icon="el-icon-plus" size="medium"></el-button>
                    <el-button v-if="index!==form.entrustSplitRuleFactor.length"
                               @click="form.entrustSplitRuleFactor.splice(index,1)"
                               type="text" icon="el-icon-close" style="color: red" size="medium"></el-button>
                </el-form-item>
            </el-col>
        </el-row>
        <el-table :data="form.entrustSplitRuleDetails" border stripe max-height="500">
            <el-table-column label="分发顺序" prop="sortNo" width="155">
                <!--<template slot-scope="scope">-->
                <!--<el-input-number :controls="false" v-model="scope.row.sortNo"></el-input-number>-->
                <!--</template>-->
            </el-table-column>
            <el-table-column label="计划类型" min-width="120">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.planType" placeholder="请选择" clearable>
                        <el-option v-for="[key, val] in _dictPlanType" :key="key" :label="val"
                                   :value="key"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="单位名称" min-width="120">
                <template slot-scope="scope">
                    <search-org v-model="scope.row.orgId"
                                @select="v=>scope.row.orgId=v"
                                @selectName="v=>scope.row.orgName=v"
                                :name="scope.row.orgName"></search-org>
                </template>
            </el-table-column>
            <el-table-column label="部门名称" min-width="120">
                <template slot-scope="scope">
                    <search-dept v-model="scope.row.deptId"
                                 @select="v=>scope.row.deptId=v"
                                 @selectName="v=>scope.row.deptName=v"
                                 :disabled="scope.row.orgId===''||scope.row.orgId===undefined"
                                 :orgId="scope.row.orgId"
                                 :name="scope.row.deptName"></search-dept>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="120">
                <template slot-scope="scope">
                    <el-button size="small" type="text" @click="handleAddTable(scope.row)">复制</el-button>
                    <el-button :disabled="form.entrustSplitRuleDetails.length===1" type="text" class="danger"
                               size="small" @click="handleRemove(scope.$index)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row v-if="isEdit" style="margin-top: 20px">
            <el-col :span="12">
                <el-form-item label="创建人:">
                    {{ form.createBy }}
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="创建时间:">
                    {{ form.createDateTime }}
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    import dateSlot from '@/components/date/dateSlot'
    import {
        addEntrustSplitRule,
        getEntrustSplitRule,
        updateEntrustSplitRule
    } from "@/api/entrustSplitRule/entrustSplitRule";
    import searchCustom from '@/components/autocomplete/autoSearchCustom'
    import searchOrg from '@/components/autocomplete/autoSearchOrg'
    import searchDept from '@/components/autocomplete/autoSearchDept'
    import searchSysdic from '@/components/autocomplete/autoSearchSysdic'
    import {queryByOrgIdAndDicCode} from "@/api/system/systemDictionary";

    const conditionOptions = [
        { attrCode: 'transportMode', attrName: '运输方式', operator: '', attrVal: '', displayType: 'SELECT' },
        { attrCode: 'cargoName', attrName: '货名', operator: '', attrVal: '', displayType: 'TEXT' },
        { attrCode: 'containerOwner', attrName: '箱主单位', operator: '', attrVal: '', displayType: 'SELECT' },
        { attrCode: 'entrustFrom', attrName: '委托来源', operator: '', attrVal: '', displayType: 'SELECT' },
        { attrCode: 'entrustOrgId', attrName: '委托单位', operator: '', attrVal: '', displayType: 'SELECT' },
    ];
    export default {
        name: "entrustSplitRuleForm",
        components: { dateSlot, searchCustom, searchOrg, searchDept,searchSysdic },
        data() {
            return {
                form: this.clearForm(),
                rules: {
                    ruleName: [{ required: true, message: '请输入规则名称', trigger: 'change' }],
                    entrustType: [{ required: true, message: '请选择委托类型', trigger: 'change' }],
                    startDate: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
                    endDate: [{ required: true, message: '请选择结束时间', trigger: 'change' }],
                    valid: [{ required: true, message: '是否有效', trigger: 'change' }],
                    orgId: [{ required: true, message: '请输入所属单位', trigger: 'change' }],
                    containerOwner: [{ required: true, message: '请输入箱主单位', trigger: 'change' }],
                    cargoName: [{ required: true, message: '请输入货名', trigger: 'change' }],
                    transportMode: [{ required: true, message: '请选择运输方式', trigger: 'change' }],
                },
                isEdit: false,
                condition: conditionOptions,
                sysdic:[]
            }
        },
        mounted() {
            this.form.orgId = this.$store.state.user.currentUser.org.id
            this.form.orgName = this.$store.state.user.currentUser.org.name
            this.getQuery()
        },
        methods: {
            clearForm() {
                return {
                    ruleName: '',
                    endDate: "",
                    entrustType: "",
                    orgId: this.$store.state.user.currentUser.org.id,
                    orgName: this.$store.state.user.currentUser.org.name,
                    startDate: "",
                    valid: true,
                    entrustSplitRuleFactor: [{ attrCode: 'cargoName', attrName: '因素名称', attrVal:'',attrValName:'',displayType: 'SELECT' }],
                    entrustSplitRuleDetails: [{ sortNo: 1 }],
                }
            },
            getData(id) {
                getEntrustSplitRule(id).then(res => {
                    this.form = res.data
                    this.getQuery()
                    console.log(res.data)
                })
            },
            getQuery(){
                let params={
                    'orgId': this.$store.state.user.currentUser.org.id,
                    'dicCode':'entrust_from',
                }
                queryByOrgIdAndDicCode(params).then(res=>{
                    this.sysdic=res.data
                })
            },
            handleCheckCode(item) {
                console.log(item)
                item.attrVal = ''
                item.attrValName = ''
            },
            handleAddTable(item) {
                let params = { ...item }
                params.sortNo = this.form.entrustSplitRuleDetails.length + 1
                this.form.entrustSplitRuleDetails.push(params)
            },
            handleRemove(index) {
                if (this.form.entrustSplitRuleDetails.length === 1) {
                    this.$message({ message: '至少需要一条数据!', type: 'error' });
                } else {
                    this.form.entrustSplitRuleDetails.splice(index, 1)
                }
            },
            handleSubmit(isEdit) {
                console.log(this.form)
                let details = this.form.entrustSplitRuleDetails
                for (let i = 0; i < details.length; i++) {
                    if (!details[i].planType) {
                        this.$message({ message: '请选择作业计划类型!', type: 'error' });
                        return
                    }
                    if (!details[i].orgName) {
                        this.$message({ message: '请输入单位!', type: 'error' });
                        return
                    }
                }
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        isEdit ? this.handleUpdate() : this.handleToAdd()
                    } else {
                        this.$message({ message: '请检查表单!', type: 'error' });
                    }
                })
            },
            handleUpdate() {
                updateEntrustSplitRule(this.form.id, this.form).then(res => {
                    this.$message({ message: '编辑成功!', type: 'success' });
                    this.$emit('load')
                })
            },
            handleToAdd() {
                addEntrustSplitRule(this.form).then(res => {
                    this.$message({ message: '新增成功!', type: 'success' });
                    this.$emit('load')
                })
            }
        },
        watch: {},
        computed: {
            startPickerOptions() {
                let endDate = this.form.endDate
                return {
                    disabledDate(time) {
                        if (endDate) {
                            return time.getTime() > new Date(endDate).getTime()
                        } else {
                            return false
                        }
                    }
                }
            },
            endPickerOptions() {
                let startDate = this.form.startDate
                return {
                    disabledDate(time) {
                        if (startDate) {
                            return time.getTime() < new Date(startDate).getTime()
                        } else {
                            return false
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .el-button.is-circle {
        border-radius: 50%;
        padding: 6px;
    }
</style>
