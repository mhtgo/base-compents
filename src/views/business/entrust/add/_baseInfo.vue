<template>
    <div class="entrust-base">
        <div class="desc-list">
            <div class="header">基础信息</div>

            <el-form :inline="true" ref="forms" :model="forms" :rules="rules" label-width="90px">
                <el-row>
                    <el-col :span="8" v-if="isAdd !== '1'">
                        <el-form-item label="委托编号" prop="entrustNo">
                            <span>{{forms.entrustNo}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="委托名称" prop="entrustName">
                            <el-input v-model="forms.entrustName" placeholder="" :disabled="!(status==='NOACCEPT'||isAdd==='1')"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="委托单位" prop="entrustOrgId">
                            <el-select v-model="forms.entrustOrgId" filterable placeholder="请选择" @change="changeCompany" :disabled="!(status==='NOACCEPT'||isAdd==='1')"
                                clearable>
                                <el-option v-for="item in select.company" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="委托单类型:">
                            <!-- <el-input v-model="forms.entrustTypeText" disabled></el-input> -->
                            {{entrustType|_filterEntrustType}}
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="所属项目" prop="projectId">
                            <el-input v-model="forms.projectName" style="float: left; width: 200px;" disabled placeholder="请选择"></el-input>
                            <i class="el-icon-search" @click="handleProjectOpen()"></i>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="委托描述" prop="entrustDesc">
                            <el-input type="textarea" v-model="forms.entrustDesc" minlength="256" :autosize="{ minRows: 2, maxRows: 4}" :disabled="!(status==='NOACCEPT'||isAdd==='1')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div class="divider"></div>
        </div>
        <xm-dialog ref="xmDialog" :forms="forms" @chooseProject="chooseProject"></xm-dialog>
    </div>
</template>

<script>
    import {
        getCustomList
    } from '@/api/custom/customList'
    import {
        projectList
    } from '@/api/project/project'
    import xmDialog from './_xmDialog.vue'
    import {
        getEntrustDetail
    } from "@/api/entrust"
    export default {
        props: ['forms', 'entrustType', 'isAdd', 'status', 'id'],
        components: {
            xmDialog
        },
        data() {
            return {
                select: {
                    company: [],
                    project: []
                },
                rules: {
                    entrustName: [{
                            required: true,
                            message: '请输入委托名称',
                            trigger: 'blur'
                        },
                        {
                            max: 10,
                            message: '允许输入10个字符',
                            trigger: 'change'
                        }
                    ],
                    entrustOrgId: [{
                        required: true,
                        message: '请选择委托单位',
                        trigger: 'change'
                    }],
                    projectId: [{
                        required: true,
                        message: '请选择所属项目',
                        trigger: 'change'
                    }],
                    entrustDesc: [{
                        max: 256,
                        message: '只允许输入256个字符',
                        trigger: 'change'
                    }]
                }
            }
        },
        mounted() {
            this.getCustomList()
        },
        methods: {
            changeCompany() { // zhuimeikeji 改变单位的时候处理名称
                this.select.company.forEach(val => {
                    if (this.forms.entrustOrgId === val.id) {
                        this.forms.entrustOrgName = val.name
                        this.forms.entrustOrgCode = val.customerCode
                    }
                })
            },
            handleProjectOpen() { // zhuimeikeji 搜索项目
                if (this.status === 'NOACCEPT' || this.isAdd === '1') {
                    if (!this.forms.entrustOrgId) {
                        this.$message({
                            message: `请先选择委托单位`,
                            type: 'error'
                        })
                        return false
                    }
                    this.$refs.xmDialog.dialogForm = true
                    this.$nextTick(() => {
                        this.$refs.xmDialog.condition.search_EQ_partyId = this.forms.entrustOrgId
                        this.$refs.xmDialog.loadData()
                    })
                }
            },
            getCustomList() { // zhuimeikeji 加载客户列表
                getCustomList().then(res => {
                    this.select.company = res.data.aaData
                })
            },
            formvalidate() {
                this.$refs.forms.validate((valid) => {
                    if (valid) {
                        this.$parent.ispost = true
                    } else {
                        this.$parent.ispost = false
                    }
                })
            },
            chooseProject(val) {
              this.$set(this.forms, 'projectId', val.projectId)
              this.$set(this.forms, 'projectName', val.projectName)
            }
        }
    }

</script>

<style scoped>
    .el-icon-search {
        float: left;
        margin-left: 10px;
        margin-top: 8px;
        cursor: pointer;
        color: #999;
        font-weight: bold;
        font-size: 18px;
    }

</style>
