<template>
    <div>
        <div class="jobPlanStyle">
            <div class="jobPlanList" style="margin-right: 20px" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLAN_TXJH')!==-1">
                <h3>提箱计划</h3>
                <el-button type="primary" @click="handleOpenTable('TXJH')"
                 v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLAN_TXJH:QUERY')!==-1">查 询</el-button>
                <div class="dataList">
                    <table class="doubleTable">
                        <tr>
                            <td style="width: 50px;" @click="handleOpenTable('TXJH','','TR')">
                                <span class="iconfont icon-huoche"></span> 火车
                            </td>
                            <td @click="handleOpenTable('TXJH','NOOPERATE','TR')">未作业: {{ TXJH.nooperateTr }}</td>
                            <td @click="handleOpenTable('TXJH','OPERATE','TR')">作业中: {{ TXJH.operateTr }}</td>
                            <td @click="handleOpenTable('TXJH','COMPLETED','TR')">已完成: {{ TXJH.completedTr }}</td>
                            <td @click="handleOpenTable('TXJH','VOIDS','TR')">已作废: {{ TXJH.voidsTr }}</td>
                        </tr>
                        <tr>
                            <td style="width: 50px;" @click="handleOpenTable('TXJH','','CR')">
                                <span class="iconfont icon-qichebanci"></span> 汽车
                            </td>
                            <td @click="handleOpenTable('TXJH','NOOPERATE','CR')">未作业: {{ TXJH.nooperateCr }}</td>
                            <td @click="handleOpenTable('TXJH','OPERATE','CR')">作业中: {{ TXJH.operateCr }}</td>
                            <td @click="handleOpenTable('TXJH','COMPLETED','CR')">已完成: {{ TXJH.completedCr }}</td>
                            <td @click="handleOpenTable('TXJH','VOIDS','CR')">已作废: {{ TXJH.voidsCr }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="jobPlanList" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLAN_JCJH')!==-1">
                <h3>进场计划</h3>
                <el-button type="primary" @click="handleOpenTable('JCJH')"
                v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLAN_JCJH:QUERY')!==-1">查 询</el-button>
                <div class="dataList">
                    <table class="doubleTable">
                        <tr>
                            <td style="width: 50px;" @click="handleOpenTable('JCJH','','TR')">
                                <span class="iconfont icon-huoche"></span> 火车
                            </td>
                            <td @click="handleOpenTable('JCJH','NOOPERATE','TR')">未作业: {{ JCJH.nooperateTr }}</td>
                            <td @click="handleOpenTable('JCJH','OPERATE','TR')">作业中: {{ JCJH.operateTr }}</td>
                            <td @click="handleOpenTable('JCJH','COMPLETED','TR')">已完成: {{ JCJH.completedTr }}</td>
                            <td @click="handleOpenTable('JCJH','VOIDS','TR')">已作废: {{ JCJH.voidsTr }}</td>
                        </tr>
                        <tr>
                            <td style="width: 50px;" @click="handleOpenTable('JCJH','','CR')">
                                <span class="iconfont icon-qichebanci"></span> 汽车
                            </td>
                            <td @click="handleOpenTable('JCJH','NOOPERATE','CR')">未作业: {{ JCJH.nooperateCr }}</td>
                            <td @click="handleOpenTable('JCJH','OPERATE','CR')">作业中: {{ JCJH.operateCr }}</td>
                            <td @click="handleOpenTable('JCJH','COMPLETED','CR')">已完成: {{ JCJH.completedCr }}</td>
                            <td @click="handleOpenTable('JCJH','VOIDS','CR')">已作废: {{ JCJH.voidsCr }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <div class="jobPlanStyle" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLAN_NZRC')!==-1">
            <div class="jobPlanList" style="margin-right: 20px">
                <h3>内转入场计划</h3>
                <el-button type="primary" @click="handleOpenTable('NZRC')"
                v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLAN_NZRC:QUERY')!==-1">查 询</el-button>
                <div class="dataList">
                    <table class="simpleTable">
                        <tr>
                            <td @click="handleOpenTable('NZRC','NOOPERATE')">未作业: {{ NZRC.nooperate }}</td>
                            <td @click="handleOpenTable('NZRC','OPERATE')">作业中: {{ NZRC.operate }}</td>
                            <td @click="handleOpenTable('NZRC','COMPLETED')">已完成: {{ NZRC.completed }}</td>
                            <td @click="handleOpenTable('NZRC','VOIDS')">已作废: {{ NZRC.voids }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="jobPlanList" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLAN_NZCC')!==-1">
                <h3>内转出场计划</h3>
                <el-button type="primary" @click="handleOpenTable('NZCC')"
                v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLAN_NZCC:QUERY')!==-1">查 询</el-button>
                <el-button type="primary" @click="dialogForm=true"
                v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLAN_NZCC:ADD')!==-1">内转出场新增</el-button>
                <div class="dataList">
                    <table class="simpleTable">
                        <tr>
                            <td @click="handleOpenTable('NZCC','NOOPERATE')">未作业: {{ NZCC.nooperate }}</td>
                            <td @click="handleOpenTable('NZCC','OPERATE')">作业中: {{ NZCC.operate }}</td>
                            <td @click="handleOpenTable('NZCC','COMPLETED')">已完成: {{ NZCC.completed }}</td>
                            <td @click="handleOpenTable('NZCC','VOIDS')">已作废: {{ NZCC.voids }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <div class="jobPlanStyle" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLAN_CXJH')!==-1">
            <div class="jobPlanList" style="margin-right: 20px">
                <h3>拆箱计划</h3>
                <el-button type="primary" @click="handleOpenTable('CXJH')"
                v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLAN_CXJH:QUERY')!==-1">查 询</el-button>
                <div class="dataList">
                    <table class="simpleTable">
                        <tr>
                            <td @click="handleOpenTable('CXJH','NOOPERATE')">未作业: {{ CXJH.nooperate }}</td>
                            <td @click="handleOpenTable('CXJH','OPERATE')">作业中: {{ CXJH.operate }}</td>
                            <td @click="handleOpenTable('CXJH','COMPLETED')">已完成: {{ CXJH.completed }}</td>
                            <td @click="handleOpenTable('CXJH','VOIDS')">已作废: {{ CXJH.voids }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <el-dialog title="内转出场新增" :visible.sync="dialogForm" width="90%">
            <nzcc-add ref="nzcc" @loadData="loadData"></nzcc-add>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogForm = false">取 消</el-button>
                <el-button type="primary" @click="handleAdd" :loading="$store.getters.loadingBtn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { jobPlanStatistics } from "@/api/jobPlan/jobPlan";
    import nzccAdd from './nzccAdd'

    export default {
        name: "index",
        components: { nzccAdd },
        data() {
            return {
                CXJH: {},
                JCJH: {},
                TXJH: {},
                NZCC: {},
                NZRC: {},
                dialogForm: false,
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            loadData() {
                jobPlanStatistics().then(res => {
                    let data = res.data.aaData
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].planType === 'CXJH') {
                            this.CXJH = data[i]
                        }
                        if (data[i].planType === 'JCJH') {
                            this.JCJH = data[i]
                        }
                        if (data[i].planType === 'TXJH') {
                            this.TXJH = data[i]
                        }
                        if (data[i].planType === 'NZCC') {
                            this.NZCC = data[i]
                        }
                        if (data[i].planType === 'NZRC') {
                            this.NZRC = data[i]
                        }
                    }
                    this.dialogForm = false
                    // this.CXJH = data.CXJH
                    // this.JCJH = data.JCJH
                    // this.TXJH = data.TXJH
                    // this.NZCC = data.NZCC
                    // this.NZRC = data.NZRC
                })
            },
            /*
            * type:计划类型
            * status:作业状态
            * mode:运输方式
            * */
            handleOpenTable(type, status, mode) {
                const origin = window.location.origin
                let url = `/work/JobTable?type=${type}`
                let location = url
                if (status) {
                    location = `${url}&status=${status}`
                    if (mode) {
                        location = `${url}&status=${status}&mode=${mode}`
                    }
                } else {
                    if (mode) {
                        location = `${url}&mode=${mode}`
                    }
                }
                this.$router.push(location)
            },
            handleAdd() {
                this.$refs.nzcc.handleSubmit()
            }
        },
        watch: {
            dialogForm(bool) {
                if (!bool) {
                    this.$refs.nzcc.form['container'] = []
                    this.$refs.nzcc.clearForm()
                }
            }
        }
    }
</script>

<style scoped>
    .jobPlanStyle {
        width: 100%;
        display: flex;
    }

    .jobPlanList {
        width: 50%;
        margin-bottom: 20px;
    }

    .jobPlanList h3 {
        margin-bottom: 15px;
    }

    .dataList {
        margin-top: 15px;
    }

    .doubleTable {
        border-collapse: collapse;
        border-spacing: 0;
    }

    .doubleTable td:hover {
        cursor: pointer;
        background-color: #eeeeee;
    }

    .doubleTable tr th {
        font-weight: bold;
        background-color: #8EB4E3;
    }

    .doubleTable td, table th {
        height: 20px;
        border: 1px solid #A6A6A6;
        font-size: 14px;
        text-align: left;
        padding: 10px;
        width: 80px;
    }

    .simpleTable {
        border-collapse: collapse;
        border-spacing: 0;
    }

    .simpleTable td:hover {
        cursor: pointer;
        background-color: #eeeeee;
    }

    .simpleTable tr th {
        font-weight: bold;
        background-color: #8EB4E3;
    }

    .simpleTable td, table th {
        height: 20px;
        border: 1px solid #A6A6A6;
        font-size: 14px;
        text-align: left;
        padding: 10px;
        width: 100px;
    }
</style>
