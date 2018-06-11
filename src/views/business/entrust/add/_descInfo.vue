<template>
    <div class="entrust-base">
        <div class="desc-list">
            <div class="header">委托信息</div>

            <el-form :inline="true" ref="forms" v-if="entrustType!=='THCK'" :model="forms" :rules="rules" label-width="110px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="预计作业日期" prop="jobDate">
                            <el-date-picker v-model="forms.jobDate" type="date" placeholder="选择日期" :picker-options="pickerOptions" :disabled="!(isAdd==='1'||status==='NOACCEPT')"
                                value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" v-if="entrustType!=='CXWT'">
                        <el-form-item label="运输方式" prop="transportMode">
                            <el-select v-if="entrustType!=='BCWT'" v-model="forms.transportMode" filterable placeholder="请选择" @change="changeTrafficZero"
                                :disabled="!(isAdd==='1'||status==='NOACCEPT')" clearable >
                                <el-option v-for="item in select.traffic" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            <span v-else>火车</span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" v-if="entrustType!=='CXWT'">
                        <el-form-item label="包装方式">
                            集装箱
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" v-if="entrustType!=='CXWT'">
                        <el-form-item label="起运地" prop="originCode">
                            <el-select v-model="forms.originCode" filterable placeholder="请选择" @change="changeStart" :disabled="!(isAdd==='1'||status==='NOACCEPT')" clearable >
                                <el-option v-for="item in select.start" :key="item.pasCode" :label="item.pasName" :value="item.pasCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" v-if="entrustType!=='CXWT'">
                        <el-form-item label="目的地" prop="endCode">
                            <el-select v-model="forms.endCode" filterable placeholder="请选择" @change="changeDist" :disabled="!(isAdd==='1'||status==='NOACCEPT')" clearable >
                                <el-option v-for="item in select.dist" :key="item.pasCode" :label="item.pasName" :value="item.pasCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="预计数量" prop="containerNum">
                            <el-input v-model="forms.containerNum" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <el-form :inline="true" ref="formsTH" v-else :model="forms" :rules="rules" label-width="110px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="预计作业日期" prop="jobDate">
                            <el-date-picker v-model="forms.jobDate" type="date" placeholder="选择日期" :picker-options="pickerOptions" :disabled="!(isAdd==='1'||status==='NOACCEPT')"
                                value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="entrustType==='THCK'">
                        <el-form-item label="出库方式" prop="out">
                            <el-select v-model="forms.specify" filterable placeholder="请选择" @change="changeSpecify" :disabled="!(isAdd==='1'||status==='NOACCEPT')">
                                <el-option v-for="[key, val] in _dictSpecify" :key="key" :label="val" :value="key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" v-if="entrustType!=='CXWT'">
                        <el-form-item label="运输方式" prop="transportMode">
                            <el-select v-if="entrustType!=='BCWT'" v-model="forms.transportMode" filterable placeholder="请选择" @change="changeTraffic"
                                :disabled="!(isAdd==='1'||status==='NOACCEPT')">
                                <el-option v-for="item in select.traffic" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            <span v-else>火车</span>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" v-if="entrustType!=='CXWT'">
                        <el-form-item label="包装方式">
                            集装箱
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="entrustType!=='CXWT'">
                        <el-form-item label="起运地" prop="originCode">
                            <el-select v-model="forms.originCode" filterable placeholder="请选择" @change="changeStart" :disabled="!(isAdd==='1'||status==='NOACCEPT')" clearable >
                                <el-option v-for="item in select.start" :key="item.pasCode" :label="item.pasName" :value="item.pasCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="entrustType!=='CXWT'">
                        <el-form-item label="目的地" prop="endCode">
                            <el-select v-model="forms.endCode" filterable placeholder="请选择" @change="changeDist" :disabled="!(isAdd==='1'||status==='NOACCEPT')" clearable >
                                <el-option v-for="item in select.dist" :key="item.pasCode" :label="item.pasName" :value="item.pasCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="预计数量" prop="containerNum">
                            <el-input v-model="forms.containerNum" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="divider"></div>
        </div>

    </div>
</template>

<script>
    import {
        getEntrustDetail
    } from "@/api/entrust"
    import btnDialog from './_btnDialog.vue'
    import {
        getPortList
    } from '@/api/port/port'
    export default {
        props: ['forms', 'entrustType', 'isAdd', 'status', 'MXlenght', 'id'],
        components: {
            btnDialog
        },
        watch: {
            MXlenght(newVal) {
                // this.forms.containerNum = newVal
                this.$set(this.forms, 'containerNum', newVal)
            }
        },
        data() {
            return {
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                select: {
                    traffic: [{
                        value: 'CR',
                        label: '汽车'
                    }, {
                        value: 'TR',
                        label: '火车'
                    }],
                    start: [],
                    out: [{
                        value: '1',
                        label: '指定箱'
                    }, {
                        value: '2',
                        label: '大堆箱'
                    }],
                    dist: [],
                },
                form: {
                    date: '',
                    traffic: '',
                    wrap: '提货出库',
                    start: '',
                    dist: '',
                    out: '',
                    desc: ''
                },
                rules: {
                    jobDate: [{
                        required: true,
                        message: '请选择预计作业日期',
                        trigger: 'blur'
                    }],
                    transportMode: [{
                        required: true,
                        message: '请选择运输方式',
                        trigger: 'blur'
                    }]
                }
            }
        },
        mounted() {
            this.getPortList()
        },
        methods: {
            changeTrafficZero(val) {
                this.$emit('changeTraffic', val)
            },
            changeTraffic(val) { // zhuimeikeji 改变运输方式
                if (this.forms.specify) {
                    this.$emit('changeTraffic', val)
                }
            },
            changeSpecify(val) { // zhuimeikeji 改变出库方式
                this.$emit('changeSpecify', val)
            },
            changeStart() {
                this.select.start.forEach(val => {
                    if (this.forms.originCode === val.pasCode) {
                        this.forms.originName = val.pasName
                    }
                })
            },
            changeDist() {
                this.select.dist.forEach(val => {
                    if (this.forms.endCode === val.pasCode) {
                        this.forms.endName = val.pasName
                    }
                })
            },
            getPortList() { // zhuimeikeji 获取地点数据
                getPortList({iDisplayLength:65535}).then(res => {
                    this.select.start = res.data.aaData
                    this.select.dist = res.data.aaData
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
            }
        }
    }

</script>

<style scoped>
    .el-icon-search {
        cursor: pointer;
        color: #999;
        font-weight: bold;
        font-size: 18px;
    }

</style>
