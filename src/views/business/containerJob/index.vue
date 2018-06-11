import { calendar } from "../../../api/containerJob/containerJob";
<template>
    <div style="display: flex;flex-wrap: wrap">
        <div style="width:100%;max-width: 1100px;display: flex;justify-content: space-between">
            <div
                v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_STATISTICALQUERY')!==-1">
                <calendar-month ref="calendarMonth" @handleMonth="v=>handleMonth(v.month)"></calendar-month>
                <div class="clear"></div>
                <div style="margin-top: 10px">
                    <div>全部作业量： {{ work.totalJobNum }}</div>
                    <ul class="statistics-calendar">
                        <li>提箱： {{ TXJH.totalJobNum }}</li>
                        <li>进场： {{ JCJH.totalJobNum }}</li>
                        <li>内转入场： {{ NZRC.totalJobNum }}</li>
                        <li>内转出场： {{ NZCC.totalJobNum }}</li>
                        <li>拆箱： {{ CXJH.totalJobNum }}</li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div style="margin-top: 10px">
                    <div>已作业量： {{ work.jobNum }}</div>
                    <ul class="statistics-calendar">
                        <li>提箱： {{ TXJH.jobNum }}</li>
                        <li>进场： {{ JCJH.jobNum }}</li>
                        <li>内转入场： {{ NZRC.jobNum }}</li>
                        <li>内转出场： {{ NZCC.jobNum }}</li>
                        <li>拆箱： {{ CXJH.jobNum }}</li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div style="margin-top: 10px">
                    <div>未作业量： {{ work.unJobNum }}</div>
                    <ul class="statistics-calendar">
                        <li>提箱： {{ TXJH.unJobNum }}</li>
                        <li>进场： {{ JCJH.unJobNum }}</li>
                        <li>内转入场： {{ NZRC.unJobNum }}</li>
                        <li>内转出场： {{ NZCC.unJobNum }}</li>
                        <li>拆箱： {{ CXJH.unJobNum }}</li>
                    </ul>
                    <div class="clear"></div>
                </div>
            </div>
            <calendar-components ref="calendar"></calendar-components>
        </div>
        <template>
            <div style="width: 100%;margin-top: 20px">
                <template>
                    <el-row style="margin-bottom: 20px">
                        <el-col :span="24">
                            <el-button type="primary" @click="opendDialog('container')"
                                       v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_CONTAINERTRACKING')!==-1">
                                集装箱跟踪
                            </el-button>
                            <el-button type="primary" @click="opendDialog('inCon')"
                                       v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_CONTAINERINPORTQUERY')!==-1">
                                在港箱查询
                            </el-button>
                            <el-button type="primary" @click="opendDialog('unbox')"
                                       v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_CXRECORDQUERY')!==-1">
                                拆箱记录查询
                            </el-button>
                            <el-button type="primary" @click="opendDialog('arrive')"
                                       v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_ARRIVECONFIRMQUERY')!==-1">
                                到达确报查询
                            </el-button>
                        </el-col>
                    </el-row>

                </template>
                <el-tabs v-model="panelName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="火车提箱（指定箱）" name="suitcaseTR"
                                 v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_TRAINTX')!==-1">
                        <suitcase-TR @changeInfo="changeCalendar" ref="suitcaseTR"></suitcase-TR>
                    </el-tab-pane>

                    <el-tab-pane label="火车提箱（大堆箱）" name="heapCarTR"
                                 v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_TRAINTX')!==-1">
                        <heap-car-TR @changeInfo="changeCalendar" ref="heapCarTR"></heap-car-TR>
                    </el-tab-pane>

                    <el-tab-pane label="火车进场" name="enterTR"
                                 v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_TRAINJC:QUERY')!==-1">
                        <enter-TR @changeInfo="changeCalendar" ref="enterTR"></enter-TR>
                    </el-tab-pane>

                    <el-tab-pane label="拆箱作业" name="unbox"
                                 v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_CX:QUERY')!==-1">
                        <unbox @changeInfo="changeCalendar" ref="unbox"></unbox>
                    </el-tab-pane>

                    <el-tab-pane label="汽车提箱（指定箱）" name="suitcaseCR"
                                 v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_CARTX:QUERY')!==-1">
                        <suitcase-CR @changeInfo="changeCalendar" ref="suitcaseCR"></suitcase-CR>
                    </el-tab-pane>

                    <el-tab-pane label="汽车提箱（大堆箱）" name="heapCarCR"
                                 v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_CARTX:QUERY')!==-1">
                        <heap-car-CR @changeInfo="changeCalendar" ref="heapCarCR"></heap-car-CR>
                    </el-tab-pane>

                    <el-tab-pane label="汽车进场" name="enterCR"
                                 v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_CARJC:QUERY')!==-1">
                        <enter-CR @changeInfo="changeCalendar" ref="enterCR"></enter-CR>
                    </el-tab-pane>

                    <el-tab-pane label="内转出场" name="NZCC"
                                 v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_NZCC:QUERY')!==-1">
                        <NZCC ref="NZCC"></NZCC>
                    </el-tab-pane>

                    <el-tab-pane label="内转入场" name="NZRC"
                                 v-if="$store.state.user.currentUser.securityPermissions.indexOf('WJOB_CONTAINERPLANJOB_NZJC:QUERY')!==-1">
                        <NZRC ref="NZRC"></NZRC>
                    </el-tab-pane>

                </el-tabs>


            </div>
        </template>

        <!--<arrive-search ref="arriveSearch"></arrive-search>-->
        <!--<container-search ref="containerSearch"></container-search>-->
        <!--<in-con-search ref="inConSearch"></in-con-search>-->
        <unbox-search ref="unboxSearch"></unbox-search>
        <arrive-components ref="arriveComponents"></arrive-components>
    </div>
</template>

<style>

</style>

<script>
    import calendarComponents from '../../../components/calendar/calendar'
    import calendarMonth from '../../../components/calendar/month'
    import suitcaseTR from './suitcaseTR' //火车提箱（指定箱）
    import heapCarTR from './heapCarTR' //火车提箱（大堆箱）
    import enterTR from './enterTR' //火车进场
    import unbox from './unbox' //拆箱作业
    import suitcaseCR from './suitcaseCR' //汽车提箱（指定箱）
    import heapCarCR from './heapCarCR' //汽车提箱（大堆箱）
    import enterCR from './enterCR' //汽车进场
    import NZCC from './NZCC' //内转出场
    import NZRC from './NZRC' //内转入场
    import arriveSearch from './dialogs/arriveSearch' //到达确报查询
    import containerSearch from './dialogs/containerSearch' //集装箱跟踪
    import inConSearch from './dialogs/inConSearch' //在港箱查询
    import unboxSearch from './dialogs/unboxSearch' //拆箱记录查询
    import { companyNature, customType } from "@/assets/dict";
    import { getWorkStatistics } from "@/api/containerJob/containerJob";
    import { getLocalTime } from "@/utils/dateFormat";
    import arriveComponents from '../gatePanel/arriveComponents'

    export default {
        name: "containerJobPage",
        components: {
            suitcaseTR,
            heapCarTR,
            enterTR,
            unbox,
            suitcaseCR,
            heapCarCR,
            enterCR,
            NZCC,
            NZRC,
            arriveSearch,
            containerSearch,
            inConSearch,
            unboxSearch,
            calendarComponents,
            calendarMonth,
            arriveComponents
        },
        data() {
            return {
                panelName: 'enterTR',
                dateType: true,
                work: {},
                JCJH: {
                    totalJobNum: 0,
                    jobNum: 0,
                    unJobNum: 0
                },
                TXJH: {
                    totalJobNum: 0,
                    jobNum: 0,
                    unJobNum: 0
                },
                NZRC: {
                    totalJobNum: 0,
                    jobNum: 0,
                    unJobNum: 0
                },
                NZCC: {
                    totalJobNum: 0,
                    jobNum: 0,
                    unJobNum: 0
                },
                CXJH: {
                    totalJobNum: 0,
                    jobNum: 0,
                    unJobNum: 0
                },
            }
        },
        mounted() {

            // calendar.init({
            //   cellClickCallback: function(cell, datedata){
            //     console.log(datedata);
            //     alert('你点击的是'+ datedata.solarYear + '年' + datedata.solarMonth + '月' + datedata.solarDate + '日');
            //   }
            // });

            this.handleMonth()
        },
        methods: {
            changeCalendar() {
                if (this.$refs.calendarMonth) {
                    this.$refs.calendarMonth.getMonthDay()
                    this.$refs.calendar.getMonthDay()
                }
            },
            //- click tabs
            handleClick(tab, event) {

                if (tab.name == 'suitcaseTR') {
                    this.$refs.suitcaseTR.loadData('first')
                } else if (tab.name == 'heapCarTR') {
                    this.$refs.heapCarTR.loadData('first')
                } else if (tab.name == 'enterTR') {
                    this.$refs.enterTR.loadData('first')
                } else if (tab.name == 'unbox') {
                    this.$refs.unbox.loadData('first')
                } else if (tab.name == 'suitcaseCR') {
                    this.$refs.suitcaseCR.loadData('first')
                } else if (tab.name == 'heapCarCR') {
                    this.$refs.heapCarCR.loadData('first')
                } else if (tab.name == 'enterCR') {
                    this.$refs.enterCR.loadData('first')
                } else if (tab.name == 'NZCC') {
                    this.$refs.NZCC.loadData()
                } else if (tab.name == 'NZRC') {
                    this.$refs.NZRC.loadData()
                }
            },
            opendDialog(type) {

                if (type == 'container') {
                    this.$router.push('/business/busPla/Track')

                    // this.$refs.containerSearch.dialogForm = true
                } else if (type == 'arrive') {
                    // this.$router.push('/work/gatePanel')

                    this.$refs.arriveComponents.dialogForm = true
                    this.$nextTick(() => {
                        this.$refs.arriveComponents.loadData()
                    })
                } else if (type == 'inCon') {
                    this.$router.push('/business/busPla/ContainerOnPort')
                    // this.$refs.inConSearch.dialogForm = true
                } else if (type == 'unbox') {
                    this.$refs.unboxSearch.dialogForm = true
                    this.$nextTick(() => {
                        this.$refs.unboxSearch.loadData()
                    })
                }

            },
            handleMonth(date) {
                let params = {
                    search_GTE_dateTime: date || getLocalTime(new Date(), 'YYYY-MM-DD'),
                }
                getWorkStatistics(params).then(res => {
                    console.log(res)
                    this.work = res.data
                    this.work.containerJobStatNumDTOs.map(m => {
                        if (m.planType === 'JCJH') {
                            this.JCJH = m
                        }
                        if (m.planType === 'TXJH') {
                            this.TXJH = m
                        }
                        if (m.planType === 'NZRC') {
                            this.NZRC = m
                        }
                        if (m.planType === 'NZCC') {
                            this.NZCC = m
                        }
                        if (m.planType === 'CXJH') {
                            this.CXJH = m
                        }
                    })
                })
            }
        },
        watch: {
            //-
        }
    }
</script>

<style>
    .calendar-count h3 {
        margin-top: 15px;
    }

    .statistics-calendar li {
        margin-top: 8px;
        float: left;
        width: 98px;
        font-size: 14px;
    }
</style>
