<template>
    <div>
        <template
            v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_TRAIN_STATISTICALQUERY')!==-1">
            <el-row>
                <div class="clear1"></div>
                <el-col :span="12">
                    <h3>接运量</h3>
                    <div class="clear1"></div>
                    <el-radio v-model="search_EQ_dateType" :label="'month'">按月</el-radio>
                    <el-radio v-model="search_EQ_dateType" :label="'day'">按日</el-radio>
                    <div class="clear1"></div>
                    <arrive-day v-show="search_EQ_dateType==='day'"
                                @openArr="v=>arriveDetailOpen(v.day,'get','day')"></arrive-day>
                    <arrive-month v-show="search_EQ_dateType==='month'"
                                  @openArr="v=>arriveDetailOpen(v.month,'get','month')"></arrive-month>
                </el-col>
                <el-col :span="12">
                    <h3>发送量</h3>
                    <div class="clear1"></div>
                    <el-radio v-model="search_EQ_dateType1" :label="'month'">按月</el-radio>
                    <el-radio v-model="search_EQ_dateType1" :label="'day'">按日</el-radio>
                    <div class="clear1"></div>
                    <send-day v-show="search_EQ_dateType1==='day'"
                              @openArr="v=>arriveDetailOpen(v.day,'send','day')"></send-day>
                    <send-month v-show="search_EQ_dateType1==='month'"
                                @openArr="v=>arriveDetailOpen(v.month,'send','month')"></send-month>
                </el-col>
            </el-row>
            <div class="clear1"></div>
            <div class="clear1"></div>
        </template>
        <template>
            <el-tabs v-model="panelName" type="card" @tab-click="handleClick">
                <el-tab-pane label="到达" name="arrive"
                             v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_TRAIN_ARRIVE')!==-1">

                    <el-row>
                        <el-col :span="24">
                            <el-button icon="el-icon-search" type="primary" @click="handleDialogFormOpen"
                                       v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_TRAIN_ARRIVE:ADD')!==-1">
                                到达确报录入
                            </el-button>
                            <el-button type="primary" @click="checkPickUp"
                                       v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_TRAIN_ARRIVE:CONFIRM')!==-1">
                                接车确认
                            </el-button>
                            <el-button type="primary" class="el-icon-refresh" @click="loadData">
                                刷 新
                            </el-button>
                        </el-col>
                    </el-row>

                    <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form"
                             label-width="110px">


                        <base-list ref="portList" :condition="condition" :datas.sync="portList"
                                   :pageSearch="pageSearch">

                            <el-table slot="list" :data="portList2" border stripe max-height="500"
                                      :span-method="objectSpanMethod" @selection-change="handleSelectionChange">
                                <!--<el-table :data="form.data" border-->
                                <!--@selection-change="handleSelectionChange">-->
                                <el-table-column type="selection" prop="id" width="50"></el-table-column>
                                <el-table-column fixed="left" prop="wagonNo" label="车皮号" min-width="120">
                                    <template slot-scope="scope">
                                        <el-input v-model.trim="scope.row.wagonNo"
                                                  @keyup.enter.native="keyEnter"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="shipper" label="托运人" min-width="120">
                                    <template slot-scope="scope">
                                        <!--<input @keyup.enter="submit" />-->
                                        <el-input v-model.trim="scope.row.shipper"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="shipperTel" label="联系电话" min-width="135">
                                    <template slot-scope="scope">
                                        <el-input v-model.trim="scope.row.shipperTel" clearable></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="consignee" label="收货人" min-width="120">
                                    <template slot-scope="scope">
                                        <el-input v-model.trim="scope.row.consignee" clearable></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="consigneeTel" label="联系电话" min-width="135">
                                    <template slot-scope="scope">
                                        <el-input v-model.trim="scope.row.consigneeTel" clearable></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="containerNo" label="箱号" min-width="150">
                                    <template slot-scope="scope">
                                        <el-input v-model.trim="scope.row.containerNo" clearable></el-input>
                                    </template>
                                </el-table-column>
                                <!--<el-table-column prop="caseType" label="箱型" min-width="154">-->
                                <!--<template slot-scope="scope">-->
                                <!--<el-input v-model.trim="scope.row.caseType" clearable></el-input>-->
                                <!--&lt;!&ndash;<el-select v-model="scope.row.caseType">&ndash;&gt;-->
                                <!--&lt;!&ndash;<el-option v-for="[key, val] of _dictIfHeavyType" :label="val" :value="key"&ndash;&gt;-->
                                <!--&lt;!&ndash;:key="key"></el-option>&ndash;&gt;-->
                                <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
                                <!--</template>-->

                                <!--</el-table-column>-->
                                <el-table-column prop="containerSize" label="尺寸" min-width="100">
                                    <template slot-scope="scope">
                                        <auto-search-size v-model.trim="scope.row.containerSize"
                                                          :name="scope.row.containerSize"></auto-search-size>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="ifHeavy" label="空重" min-width="100">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.ifHeavy">
                                            <el-option v-for="[key, val] of _dictIfHeavyType" :label="val" :value="key"
                                                       :key="key"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="tradeType" label="内外贸" min-width="120">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.tradeType">
                                            <el-option v-for="[key, val] of _dictTradeType" :label="val" :value="key"
                                                       :key="key"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="ownerName" label="箱主" min-width="180">
                                    <template slot-scope="scope">
                                        <auto-search-custom v-model.trim="scope.row.ownerName"
                                                            :name="scope.row.ownerName"
                                                            :isOwner='true'></auto-search-custom>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="stratStationName" label="发站" min-width="150">
                                    <template slot-scope="scope">
                                        <auto-search-port-station v-model="scope.row.stratStationName"
                                                                  :name="scope.row.stratStationName"></auto-search-port-station>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="endStationName" label="到站" min-width="150">
                                    <template slot-scope="scope">
                                        <auto-search-port-station v-model="scope.row.endStationName"
                                                                  :name="scope.row.endStationName"></auto-search-port-station>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="cargoName" label="货名" min-width="150">
                                    <template slot-scope="scope">
                                        <el-input v-model.trim="scope.row.cargoName" clearable></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="cargoWeight" label="货重" min-width="100">
                                    <template slot-scope="scope">
                                        <!--<el-input v-model.trim="scope.row.cargoWeight" clearable></el-input>-->
                                        <input-numbers v-model.trim="scope.row.cargoWeight"
                                                       :name="scope.row.cargoWeight"></input-numbers>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="options" fixed="right" align="center" label="操作" sortable
                                                 width="80" :colpan="1" :rowspan="2">
                                    <template slot-scope="scope">
                                        <el-button type="text" class="danger" size="small"
                                                   @click="handleRemove(scope.row.planNo)"
                                                   v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_TRAIN_ARRIVE:DEL')!==-1">
                                            删除
                                        </el-button>
                                    </template>
                                </el-table-column>

                            </el-table>

                        </base-list>

                    </el-form>
                </el-tab-pane>

                <el-tab-pane label="发送" name="send"
                             v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_TRAIN_DISPATCH')!==-1">
                    <base-list ref="sendList" :condition="condition2" :datas.sync="sendList" :pageSearch="pageSearch2">

                        <el-form :inline="true" :model="condition" class="search-form" slot="search"
                                 label-width="110px">
                            <el-row>
                                <el-col :span="12">

                                    <el-row>
                                        <el-col :span="18">
                                            <el-form-item label="车皮号">
                                                <el-input v-model="condition2['search_LIKE_wagonNo']" clearable></el-input>

                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-button icon="el-icon-search" type="primary" @click="loadData2"
                                                       v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_TRAIN_DISPATCH:QUERY')!==-1">
                                                查 询
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                </el-col>

                                <el-col :span="12">
                                    <el-button type="primary" @click="sendUpDialog = true"
                                               v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_TRAIN_DISPATCH:SEND')!==-1">
                                        发 送
                                    </el-button>
                                </el-col>

                            </el-row>

                        </el-form>

                        <el-table slot="list" :data="sendList" border stripe max-height="500"
                                  @selection-change="handleSelectionChange2">
                            <el-table-column type="selection" prop="id" width="55"></el-table-column>
                            <el-table-column fixed="left" prop="wagonNo" label="车皮号" sortable
                                             min-width="180"></el-table-column>
                            <el-table-column prop="containerNo" label="集装箱号" sortable min-width="120"></el-table-column>
                            <!--<el-table-column prop="caseType" label="箱型" sortable min-width="200">-->
                            <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->
                            <!--&lt;!&ndash;<a style="color: blue" @click="handleLookUp(scope.row)">{{ scope.row.name }}</a>&ndash;&gt;-->
                            <!--&lt;!&ndash;</template>&ndash;&gt;-->
                            <!--</el-table-column>-->
                            <el-table-column prop="containerSize" label="尺寸" sortable min-width="120">
                                <!--<template slot-scope="scope">-->
                                <!--{{ scope.row.customerType | _filterCustomType }}-->
                                <!--</template>-->
                            </el-table-column>
                            <el-table-column prop="ifHeavy" label="空重" sortable min-width="120">
                                <!--<template slot-scope="scope">-->
                                <!--{{ scope.row.entNature | _filterCompanyNature }}-->
                                <!--</template>-->
                            </el-table-column>
                            <el-table-column prop="cargoName" label="品名" sortable min-width="150"></el-table-column>
                            <el-table-column prop="stratStationName" label="发站" sortable
                                             min-width="150"></el-table-column>
                            <el-table-column prop="endStationName" label="到站" sortable
                                             min-width="150"></el-table-column>

                        </el-table>
                    </base-list>

                </el-tab-pane>
            </el-tabs>
        </template>

        <arrive-form ref="arriveForm" @savesuccess="_savesuccess"></arrive-form>

        <arrive-detail ref="arriveDetail"></arrive-detail>

        <el-dialog title="确认弹窗" :visible.sync="pickUpDialog" :modal="false" :modal-append-to-body="false" width="30%"
                   style="margin-top: 8vh;">

            <el-row>
                <el-col :span="24">
                    <label>接车时间：</label>
                    <el-date-picker v-model="startRecord" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"
                                    placeholder="选择日期"></el-date-picker>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="pickUpDialog = false">取 消</el-button>
                <el-button type="primary" @click="pickUp">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="确认弹窗" :visible.sync="sendUpDialog" :modal="false" :modal-append-to-body="false" width="50%"
                   style="margin-top: 8vh;">

            <el-row>
                <el-col :span="24">
                    <label>发送时间：</label>
                    <el-date-picker v-model="sendDate" value-format="yyyy-MM-dd hh:mm:ss" type="datetime"
                                    placeholder="选择日期"></el-date-picker>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="sendUpDialog = false">取 消</el-button>
                <el-button type="primary" @click="sendArr">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<style>
    /*
        calendar css
        */

    .cj-bor {
        border: 1px solid #dcdfe6
    }

    .cj-bgTitle {
        background-color: #ecf0fd
    }

    .cj-bgBlue {
        background-color: #4e76ea
    }

    .cj-bgRed {
        background-color: #ff310f
    }

    .cj-bgGreen {
        background-color: #45c986
    }

    .wb100 {
        width: 100%;
    }

    .clear1 {
        clear: both;
        height: 15px;
    }

    .cal-title {
        height: 40px;
        line-height: 40px;
        background: #ecf0fd;
        border: 1px solid #429e6c;
        color: #333;
        padding: 0 10px;
        clear: both;
    }

    .cal-content {
        text-align: center;
        width: 313px;
        padding: 10px;
        border-right: 1px solid #429e6c;
        border-left: 1px solid #429e6c;
        border-bottom: 1px solid #429e6c;
    }

    .cal-month {
        width: 580px;
        font-size: 12px;
        margin: 8px 0 0 15px
    }

    .month-item {
        width: 45px;
        float: left;
        margin: 3px;
    }

    .month-s {
        margin-top: 5px;
        margin-bottom: 15px;
    }

    .month-m {
        width: 45px;
        height: 20px;
        background-color: #cccccc;
    }

    .cal-title select {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        position: absolute;
        z-index: 9;
        -webkit-appearance: none;
        padding: 5px 20px;
    }

    body,
    td,
    .p1,
    .p2,
    .i {
        font-family: arial
    }

    body {
        margin: 6px 0 0 0;
        background-color: #f3f3f3;
        color: #000;
    }

    table {
        border: 0
    }

    .cal {
        width: 608px;
        font-size: 12px;
        margin: 8px 0 0 15px;
    }

    .cal .top {
        height: 40px;
        line-height: 40px;
        border: 1px solid #eff2f6;
        color: #333;
        padding: 0 10px;
        clear: both;
        position: relative;;
    }

    .cal .top select {
        font-size: 14px
    }

    .cal .top input {
        padding: 0
    }

    .cal ul.wk {
        margin: 0;
        padding: 0 9px;
        height: 50px;
        color: #888;
        font-size: 16px;
        border-left: 1px solid #eff2f6;
        border-right: 1px solid #eff2f6;
    }

    .cal ul.wk li {
        float: left;
        width: 80px;
        text-align: center;
        line-height: 50px;
        list-style: none
    }

    .cal ul.wk li b {
        font-weight: normal;
        color: #429e6c;
    }

    .cal .cm {
        clear: left;
        position: relative;
        border-left: 1px solid #eff2f6;
        border-right: 1px solid #eff2f6;
        border-bottom: 1px solid #eff2f6;
    }

    .cell2 {
        width: 94px;
        height: 80px;
        float: left;
        text-align: center;
        padding: 10px 0;
        margin: 0;
        cursor: pointer;
        border: 1px solid #eff2f6;
    }

    .cell2 .so {
        text-align: center;
        height: 20px;
        line-height: 20px;
        font: 20px arial;
    }

    .cell2 .do {
        text-align: center;
        height: 40px;
        line-height: 20px;
        font: 12px arial;
    }

    .cell2 .do b {
        width: 20px;
        height: 20px;
        line-height: 20px;
        background-color: #FF4045;
        text-align: center;
        color: #ffffff;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        border-radius: 50%;
        position: absolute;
        top: 5px;
        right: 5px;
        font-weight: normal;
    }

    .cal .cm .cell {
        position: absolute;
        width: 80px;
        height: 60px;
        text-align: center;
        padding: 10px 0;
        margin: 0 0 0 9px;
        cursor: pointer;
        border: 1px solid #eff2f6;
    }

    .cal .cm .cell .so {
        text-align: center;
        height: 20px;
        line-height: 20px;
        font: 20px arial;
    }

    .cal .cm .cell .do {
        text-align: center;
        height: 40px;
        line-height: 20px;
        font: 12px arial;
    }

    .cal .cm .cell .do b {
        width: 20px;
        height: 20px;
        line-height: 20px;
        background-color: #FF4045;
        text-align: center;
        color: #ffffff;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        border-radius: 50%;
        position: absolute;
        top: 5px;
        right: 5px;
        font-weight: normal;
    }

    .cal .bm {
        text-align: right;
        height: 30px;
        line-height: 30px;
        padding: 0 13px 0 0;
        border: 1px solid #eff2f6;
        border-top: 1px dashed #eee;
        clear: both;
        padding: 0 10px;
        font-size: 14px;
    }

    .cal .bm .heavenly-branch {
        color: #429e6c;
        float: left;
    }

    .cal .fd {
        display: none;
        position: absolute;
        border: 1px solid #dddddf;
        background: #fff;
        color: #333;
        padding: 10px;
        line-height: 21px;
        width: 150px;
        border-radius: 10px;
    }

    .cal .fd:before {
        content: '';
        position: absolute;
        left: -8px;
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-right: 8px solid #dddddf;
        border-bottom: 8px solid transparent;
    }

    .cal .fd:after {
        content: '';
        position: absolute;
        left: -6px;
        top: 10px;
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-right: 8px solid #fff;
        border-bottom: 8px solid transparent;
    }

    .cal .fd b {
        font-weight: normal;
        color: #429e6c;
    }

    .cal .step {
        float: right;
        font-size: 16px;
    }

    .cal .step span {
        cursor: pointer;
    }

    .cal .step .prev {
        margin-right: 10px;
    }

    .cal .select {
        width: 200px;
        height: 40px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        position: absolute;
    }

    .cal .select select {
        -webkit-appearance: none;
        padding: 5px 20px;
    }

    .cal .now-date {
        float: right;
        padding: 0px 10px;
        background-color: #429e6c;
        color: #fff;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        margin-top: 6px;
        text-decoration: none;
    }

</style>

<script>
    import arriveForm from './arriveForm'
    import arriveDetail from './arriveDetail'
    import {
        acceptanceConfirmation,
        arrive,
        arriveList,
        delArrive,
        depart,
        receive,
        sendList,
        sendOut
    } from "@/api/gatePanel/gatePanel";
    import { approval } from "@/api/workflow/workflow";
    import searchCustom from '@/components/autocomplete/autoSearchCustom'
    import autoSearchCustom from '@/components/autocomplete/autoSearchCustom'
    import { PUBLIC_LIMIT, REG_TEXT } from "@/utils/Reg";
    import { sortLength } from "@/utils/rules";
    import { getLocalTime } from "@/utils/dateFormat";
    import { companyNature, customType } from "@/assets/dict";
    import autoSearchPortStation from '@/components/autocomplete/autoSearchPortStation'
    import autoSearchSize from '@/components/autocomplete/autoSearchSize'
    import autoSearchEntrust from '@/components/autocomplete/autoSearchEntrust'
    import arriveDay from './arriveDay'
    import arriveMonth from './arriveMonth'
    import sendDay from './sendDay'
    import sendMonth from './sendMonth'

    export default {
        name: "gatePanelPage",
        components: {
            arriveForm,
            searchCustom,
            arriveDetail,
            autoSearchPortStation,
            autoSearchSize,
            autoSearchEntrust,
            autoSearchCustom,
            arriveDay,
            arriveMonth,
            sendDay,
            sendMonth
        },
        data() {
            return {
                pickUpDialog: false, // 接车录入弹窗
                sendUpDialog: false, // 发送弹窗
                condition: {
                    search_IN_status: 'NOOPERATE,OPERATE'
                }, // 查询条件
                pageSearch: arriveList, // 分页查询api接口,
                portList: [],
                portList2: [],
                condition2: {}, // 查询条件
                pageSearch2: sendList, // 分页查询api接口,
                sendList: [],
                startRecord: '', //接车时间
                sendDate: '', //发送时间
                form: {},
                panelName: 'arrive', //tab name
                dateType: true,
                search_EQ_dateType: 'day',
                search_GTE_dateTime: '',
                search_EQ_dateType1: 'day',
                search_GTE_dateTime1: '',
                selectDate: '',
                years: [],
                year: 0, //接运量（按日） 年
                month: 0, //接运量（按日） 月
                day: 1,     //日
                year1: 0, //发送量（按日） 年
                month1: 0, //发送量（按日） 月
                year2: 0, //接运量（按月） 年
                year3: 0, //发送量（按月） 年
                calendarData: [], //接运量（按月）日历数据
                calendarData1: [], //发送量（按月）日历数据

                multipleSelection: [],
                multipleSelection2: [],
                rules: {},

            }
        },
        mounted() {
            this.loadData()
        },
        methods: {

            _savesuccess() {
                //监听子弹窗保存成功
                this.loadData()
            },

            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (column.property == 'id' || column.property == 'wagonNo' || column.property == 'shipper' || column.property ==
                    'shipperTel' || column.property == 'consignee' || column.property == 'consigneeTel' || column.property == 'options') {

                    if (row.merge) {
                        //合并当前行
                        return {
                            rowspan: 2,
                            colspan: 1
                        };

                    } else if (row.merged) {
                        //标记当前为已合并
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            },

            formatMonth(month) {
                if (month == 0) return '一'
                if (month == 1) return '二'
                if (month == 2) return '三'
                if (month == 3) return '四'
                if (month == 4) return '五'
                if (month == 5) return '六'
                if (month == 6) return '七'
                if (month == 7) return '八'
                if (month == 8) return '九'
                if (month == 9) return '十'
                if (month == 10) return '十一'
                if (month == 11) return '十二'
            },


            nextYear(i) {
                if (i == 0) {
                    this.year2++
                    if (this.year2 > 2050)
                        this.year2 = 2050
                } else {
                    this.year3++
                    if (this.year3 > 2050)
                        this.year3 = 2050
                }
                this.calendarYearChange(i)
            },

            prevYear(i) {
                if (i == 0) {
                    this.year2--
                    if (this.year2 < 1900)
                        this.year2 = 1900
                } else {
                    this.year3--
                    if (this.year3 < 1900)
                        this.year3 = 1900
                }
                this.calendarYearChange(i)
            },

            changeYear(i) {

                this.calendarYearChange(i)
            },

            calendarYearChange(i) {

                if (i == 0) {
                    let _date = this.addZero(this.year2) + '-01-01'
                    receive(this.search_EQ_dateType, _date).then(res => {
                        let _tmp = res.data.aaData //数据
                        let __tmp = []
                        //初始数据
                        for (let i = 1; i < 13; i++) {
                            __tmp.push({
                                date: this.addZero(this.year) + '-' + this.addZero(i) + '-01',
                                wagonNum: '',
                                teu: '',
                                noJobPlan: '',
                            })
                        }
                        //重组该数据
                        if (_tmp.length) {
                            for (let i = 0; i < __tmp.length; i++) {
                                for (let j = 0; j < _tmp.length; j++) {
                                    if (_tmp[j].date.substring(5, 8) == __tmp[i].date.substring(5, 8)) {
                                        __tmp[i] = _tmp[j]
                                    }
                                }
                            }
                        }
                        this.calendarData = __tmp
                    })
                } else {
                    let _date = this.addZero(this.year3) + '-01-01'
                    sendOut(this.search_EQ_dateType1, _date).then(res => {

                        let _tmp = res.data.aaData //数据
                        let __tmp = []
                        //初始数据
                        for (let i = 1; i < 13; i++) {
                            __tmp.push({
                                date: this.addZero(this.year) + '-' + this.addZero(i) + '-01',
                                wagonNum: '',
                                teu: '',
                                noJobPlan: '',
                            })
                        }
                        //重组该数据
                        if (_tmp.length) {

                            for (let i = 0; i < __tmp.length; i++) {
                                for (let j = 0; j < _tmp.length; j++) {
                                    if (_tmp[j].date.substring(5, 8) == __tmp[i].date.substring(5, 8)) {
                                        __tmp[i] = _tmp[j]
                                    }
                                }
                            }
                        }
                        this.calendarData1 = __tmp
                    })
                }
            },

            calendarPrev(i) {

                if (i == 0) {
                    this.month--
                    if (this.month == 0) {
                        this.month = 12
                        this.year--
                    }
                    this.calendarChange(i)
                } else {
                    this.month1--
                    if (this.month1 == 0) {
                        this.month1 = 12
                        this.year1--
                    }
                    this.calendarChange(i)
                }

            },
            calendarNext(i) {
                if (i == 0) {
                    this.month++
                    if (this.month == 13) {
                        this.month = 1
                        this.year++
                    }
                    this.calendarChange(i)
                } else {
                    this.month1++
                    if (this.month1 == 13) {
                        this.month1 = 1
                        this.year1++
                    }
                    this.calendarChange(i)
                }
            },
            addZero(str) {
                str = str + ''
                if (str.length == 1)
                    return '0' + str
                return str
            },
            calendarChange(i) {
                if (i == 0) {
                    this.search_GTE_dateTime = this.addZero(this.year) + '-' + this.addZero(this.month) + '-01'
                    receive(this.search_EQ_dateType, this.search_GTE_dateTime).then(res => {
                        calendar.reDraw(0, res.data.aaData)
                    })
                } else {
                    this.search_GTE_dateTime1 = this.addZero(this.year1) + '-' + this.addZero(this.month1) + '-01'
                    sendOut(this.search_EQ_dateType1, this.search_GTE_dateTime1).then(res => {
                        calendar2.reDraw(1, res.data.aaData)
                    })
                }
            },
            loadData() {
                this.$refs.portList.loadData().then(res => {
                    // 公共组件提供了promise 5-29
                    //-- 2018-5-27 12：47 更改
                    // 设置2条数据的planNo相同时，合并行
                    // 不会影响其他功能
                    let _tmp = res.aaData
                    for (let i = 0; i < _tmp.length; i++) {
                        //默认只有2条会重复
                        if (i % 2 == 1) {
                            //查询前一条数据
                            if (_tmp[i - 1].planNo == _tmp[i].planNo) {
                                //标记前一条数据为合并
                                _tmp[i - 1].merge = true;
                                //标记当前数据为已合并数据
                                _tmp[i].merged = true;
                            }
                            //查询后一条数据
                            if (_tmp[i + 1]) {
                                if (_tmp[i + 1].planNo == _tmp[i].planNo) {
                                    //标记当前数据为合并
                                    _tmp[i].merge = true;
                                    //标记后一条数据为已合并数据
                                    _tmp[i + 1].merged = true;
                                }
                            }
                        }
                        //- 2018-5-27 18：23 更改
                        //- 追加options参数,判断最后是否有操作按钮
                        _tmp[i].options = ''
                    }
                    this.portList = _tmp
                    this.portList2 = _tmp
                })
            },
            loadData2() {
                this.$refs.sendList.loadData()
            },
            checkPickUp() {
                let _arr = this.multipleSelection;
                if (!_arr.length) {
                    this.$message({
                        message: '至少选择一条数据!',
                        type: 'error'
                    })
                    return
                }
                this.pickUpDialog = true
            },
            pickUp() {
                let _arr = this.multipleSelection;
                let __arr = []
                for (let i = 0; i < _arr.length; i++) {
                    let _no = _arr[i].planNo

                    __arr.push(_arr[i]);
                    //存在合并项
                    if (_arr[i].merge) {
                        let ___arr = this.portList2.filter((item) => {
                            return item.planNo == _no
                        })
                        if (___arr.length > 0) {
                            __arr.push(___arr[___arr.length - 1])
                        }
                    }
                }
                if (!_arr.length) {
                    this.$message({
                        message: '至少选择一条数据!',
                        type: 'error'
                    })
                    return
                }
                let _data = {}
                _data.startRecord = this.startRecord
                _data.container = []
                for (let i = 0; i < __arr.length; i++) {
                    _data.container.push({
                        planNo: __arr[i].planNo,
                        planDetailId: __arr[i].planDetailId,
                        wagonNo: __arr[i].wagonNo,
                        shipper: __arr[i].shipper,
                        shipperTel: __arr[i].shipperTel,
                        consignee: __arr[i].consignee,
                        consigneeTel: __arr[i].consigneeTel,
                        containerNo: __arr[i].containerNo,
                        containerSize: __arr[i].containerSize,
                        containerType: __arr[i].containerType,
                        ifHeavy: __arr[i].ifHeavy,
                        tradeType: __arr[i].tradeType,
                        sealNumber: __arr[i].sealNumber,
                        stratStationCode: __arr[i].stratStationCode,
                        stratStationName: __arr[i].stratStationName,
                        endStationCode: __arr[i].endStationCode,
                        endStationName: __arr[i].endStationName,
                        cargoName: __arr[i].cargoName,
                        cargoWeight: __arr[i].cargoWeight,
                        ownerName: __arr[i].ownerName,
                        ownerId: __arr[i].ownerId,
                    })
                }
                acceptanceConfirmation(_data).then(res => {
                    this.$message({ message: '接车成功!', type: 'success' })
                    this.loadData()
                    this.pickUpDialog = false
                })
            },
            handleRemove(id) {
                this.$confirm(`是否删除该条数据?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delArrive(id).then(res => {
                        this.$message({
                            message: '删除成功!',
                            type: 'success'
                        })
                        this.loadData()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            // get selections
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            // get selections
            handleSelectionChange2(val) {
                this.multipleSelection2 = val
            },
            sendArr() {
                //批量发送
                if (this.multipleSelection2.length < 1) {
                    this.$message({
                        message: `请先选择一条数据`,
                        type: 'error'
                    })
                    return
                }
                console.log(this.multipleSelection2);
                let data = {}
                data.sendDate = this.sendDate
                data.container = []
                for (let i = 0; i < this.multipleSelection2.length; i++) {
                    data.container.push({
                        planNo: this.multipleSelection2[i].planNo,
                        wagonNo: this.multipleSelection2[i].wagonNo,
                        containerNo: this.multipleSelection2[i].containerNo,
                        containerSize: this.multipleSelection2[i].containerSize,
                        ifHeavy: this.multipleSelection2[i].ifHeavy,
                        stratStationName: this.multipleSelection2[i].stratStationName,
                        endStationName: this.multipleSelection2[i].endStationName,
                        cargoName: this.multipleSelection2[i].cargoName,
                        containerType: this.multipleSelection2[i].containerType,
                    })
                }
                depart(data).then(res => {
                    this.$message({ message: '发送成功!', type: 'success' })
                    this.sendUpDialog = false
                    this.loadData2()
                })
            },
            keyEnter(i, e) {
                // console.log('--------- keyEnter -----------')
                // console.log(i)
                // console.log(e)
            },
            // del row
            handleDelTable() {
                if (this.multipleSelection.length > 0) {
                    this.form.contractCargo = this.form.contractCargo.filter(f => {
                        return !this.multipleSelection.includes(f)
                    })
                } else {
                    this.$message({
                        message: `请先选择一条数据`,
                        type: 'error'
                    })
                }
            },
            //- click tabs
            handleClick(tab, event) {
                if (tab.name == 'send') {
                    this.loadData2()
                } else {
                    this.loadData()
                }
            },
            // 打开日历 （按日）
            arriveDetailOpen(date, type, method) {
                this.$refs.arriveDetail.dialogForm = true
                this.$refs.arriveDetail.loadData(date, date, type, method)
            },
            // 打开日历 （按日）
            opencalendar(item, type) {
                let _lastDay = 0
                let month = item.date.substring(5, 7)
                let year = Number.parseInt(item.date.substring(0, 4))
                if (month == '01' || month == '03' || month == '05' || month == '07' || month == '08' || month == '10' ||
                    month == '12')
                    _lastDay = 31
                else if (month == '02') {
                    if (year % 4 == 0) {
                        _lastDay = 29
                    } else {
                        _lastDay = 28
                    }
                } else {
                    _lastDay = 30
                }
                let _d1 = item.date.substring(0, 8) + '01'
                let _d2 = item.date.substring(0, 8) + _lastDay
                this.$refs.arriveDetail.dialogForm = true
                this.$refs.arriveDetail.loadData(_d1, _d2, type)
            },
            // click open
            handleDialogFormOpen() {
                this.$refs.arriveForm.dialogForm = true
            },
            // click close
            handleDialogFormClose() {
                this.$refs.arriveForm.dialogForm = false
            },
        },
        watch: {
            //接运量 按月|日 改变
            search_EQ_dateType(val) {
                // console.log(val)
            },
            //发送量 按月|日 改变
            search_EQ_dateType1(val) {
                // console.log(val)
            },
        }
    }

</script>

<style>


</style>
