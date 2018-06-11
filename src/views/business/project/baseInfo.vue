<template>
    <div>
        <el-form :inline="true" ref="form" :model="project" class="search-form" :rules="rules" label-width="110px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="项目名称" prop="name">
                        <el-input v-model="project.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="项目模式">
                        集装箱作业项目
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="项目描述" class="customFormWidth" prop="abstractDesc">
                        <el-input type="textarea" :rows="3" placeholder="请输入内容"
                                  v-model="project.abstractDesc"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="项目有效期" prop="date">
                        <date-slot :startDate.sync="project.startDate"
                                   dateType="yyyy-MM-dd"
                                   :endDate.sync="project.endDate" middle="至"></date-slot>
                    </el-form-item>
                </el-col>
            </el-row>
            <!--<el-row>-->
                <!--<el-col :span="12">-->
                    <!--<el-form-item label="是否月结" prop="monthly">-->
                        <!--<el-radio v-model="project.monthly" :label="true">是</el-radio>-->
                        <!--<el-radio v-model="project.monthly" :label="false">否</el-radio>-->
                    <!--</el-form-item>-->
                <!--</el-col>-->
            <!--</el-row>-->
            <!--<el-row>-->
                <!--<el-col :span="12">-->
                    <!--<el-form-item label="结算标准" prop="standSettlement">-->
                        <!--<el-select v-model="project.standSettlement" placeholder="请选择" clearable>-->
                            <!--<el-option v-for="[key, val] in _dictStandSettlementType" :key="key" :label="val"-->
                                       <!--:value="key"></el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                <!--</el-col>-->
            <!--</el-row>-->
            <!--<el-row>-->
                <!--<el-col :span="12">-->
                    <!--<el-form-item label="作业区域" prop="operationAreaName">-->
                        <!--<el-select v-model="project.operationAreaName" placeholder="请选择" clearable>-->
                            <!--<el-option v-for="[key, val] in _dictStandSettlementType" :key="key" :label="val"-->
                                       <!--:value="key"></el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                <!--</el-col>-->
            <!--</el-row>-->
        </el-form>
        <el-row>
            <el-col>
                <el-button class="ml-110" type="primary" @click="handleNext" :loading="$store.getters.loadingBtn">下一步</el-button>
                <el-button @click="handleBack">返 回</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import CommonBuild from './common'
    import dateSlot from '@/components/date/dateSlot'
    import { getProjectBaseInfo, saveProjectBaseInfo, updateProjectBaseInfo } from "@/api/project/project";
    import { maxLength, sortLength } from "@/utils/rules";

    export default {
        mixins: [CommonBuild],
        name: "baseInfo",
        components: { dateSlot },
        data() {
            let dateV = (r, v, c) => {
                if (!this.project.startDate) {
                    return c(new Error('请选择起始日期'))
                } else if (!this.project.endDate) {
                    return c(new Error('请选择结束日期'))
                } else {
                    c()
                }
            }
            return {
                project: {
                    name: '',
                    abstractDesc: '',
                    startDate: '',
                    endDate: '',
                    monthly: true,
                    standSettlement: '',
                    operationAreaName: ''
                },
                rules: {
                    name: [{ required: true, message: '请输入项目名称', trigger: 'change' }, sortLength],
                    abstractDesc: [maxLength],
                    date: [{ required: true, validator: dateV, trigger: 'blur' }],
                    standSettlement: [{ required: true, message: '请选择结算标准', trigger: 'change' }],
                    monthly: [{ required: true, message: '请选择是否月结', trigger: 'change' }],
                    operationAreaName: [{ required: true, message: '请选择作业区域', trigger: 'change' }],
                },
            }
        },
        methods: {
            loadData() {
                getProjectBaseInfo(this.id).then(res => {
                    this.project = res.data
                })
            },
            handleBack() {
                this.$store.dispatch('delVisitedViews',{path:`/business/busPla/Project/build/${this.model}/${this.id}`,name:'项目操作'}).then(()=>{
                    this.$store.commit('ADD_CACHED_VIEWS', {path:'/business/busPla/Project/index',name:'项目管理'})
                    this.$router.push('/business/busPla/Project/index')
                })
            },
            handleNext() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.project.businessMode = 'JZX'
                        this.project.projectType = this.model
                        this.project.operationAreaId = 1
                        this.id ? this.handleUpdate() : this.handleSave()
                    } else {
                        this.$message({
                            message: '请检查表单',
                            type: 'error'
                        })
                    }
                })
            },
            handleSave() {
                saveProjectBaseInfo(this.project).then(res => {
                    this.$store.commit('SET_CURRENT', this.$store.getters.current + 1)
                    this.$router.push(`/business/busPla/Project/build/${this.model}/${res.data.id}`)
                })
            },
            handleUpdate() {
                updateProjectBaseInfo(this.id, this.project).then(res => {
                    this.$store.commit('SET_CURRENT', this.$store.getters.current + 1)
                })
            }
        }
    }
</script>

<style scoped>

</style>
