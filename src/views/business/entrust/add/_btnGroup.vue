<template>
    <div class="btn-group">
        <div class="header">集装箱信息</div>
        <el-row class="boxMenue">
            <el-form :model="condition" v-if="isAdd!=='1'&&(status==='ACCEPTED'||status==='OPERATE')" label-width="50px">
                <el-row>
                    <el-col :span="4">
                        <el-form-item label="箱号:">
                            <el-input v-model="changeNo" placeholder="" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="作业状态:" label-width="100px">
                            <el-select v-model="changeStatus" placeholder="" clearable>
                                <el-option v-for="[key, val] in _dictPlanStatus" :key="key" :value="key" :label="val"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div>
                    <el-button size="mini" @click="checkDea">查询</el-button>
                    <el-button size="mini" @click="failThrough">落空</el-button>
                </div>
            </el-form>
            <div v-if="isAdd==='1'||status==='NOACCEPT'">
                <excel-import code="WTMX" @getUploadData="data=>containerCargo=data" v-if="!(entrustType==='THCK'&&!specify)"></excel-import>
                <el-button size="mini" @click.native="addEntrust()" icon="el-icon-plus" v-if="entrustType==='JCRK'||(entrustType==='THCK'&&!specify)">增加</el-button>
                <el-button size="mini" @click.native="chooseBox()" icon="el-icon-view" v-if="entrustType!=='JCRK'&&!(entrustType==='THCK'&&!specify)">箱选择</el-button>
                <el-button size="mini" @click.native="delEntrust()" icon="el-icon-delete">删除</el-button>
            </div>
        </el-row>

        <div v-show="trafficType">
            <el-table ref="multipleTable" :data="containerCargo" border stripe style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <!-- <el-table-column type="index" width="55" label="序号">
                    <template slot-scope="scope">
                        {{}}
                    </template>
                </el-table-column> -->
                <el-table-column prop="name" label="车牌号" v-if="trafficType==='CR'">
                    <template slot-scope="scope">
                        <el-input type="text" v-model="scope.row.plateNumber"></el-input>
                        <!-- <span v-else>{{scope.row.plateNumber}}</span> -->
                    </template>
                </el-table-column>
                <el-table-column prop="groupNo" label="配组号" width="120" v-if="trafficType==='TR'&&entrustType !=='JCRK'">
                    <template slot-scope="scope">
                        <!--<el-input type="text" v-model="scope.row.groupNo"></el-input>-->
                        <el-input-number style="width: 100px" :controls="false" v-model="scope.row.groupNo"></el-input-number>
                        <!-- <span>{{scope.row.groupNo}}</span> -->
                    </template>
                </el-table-column>
                <el-table-column prop="jobStatus" label="作业状态" v-if="containerCargo[0]&&containerCargo[0].jobStatus" width="120">
                    <template slot-scope="scope">
                        {{scope.row.jobStatus|_filterJobStatus}}
                    </template>
                </el-table-column>
                <el-table-column prop="containerNo" label="箱号" width="150">
                    <template slot-scope="scope">
                        <el-input type="text" v-model="scope.row.containerNo" @change="upCase(scope.row)" v-if="((entrustType==='JCRK'||(entrustType==='THCK'&&!specify))&&(isAdd==1||(isAdd==2&&status==='NOACCEPT')))"></el-input>
                        <span v-else>{{scope.row.containerNo}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="箱型" width="150">
                    <template slot-scope="scope">
                        <autoSearchEntrust v-model="scope.row.containerType" :name="scope.row.containerType" v-if="((entrustType==='JCRK'||(entrustType==='THCK'&&!specify))&&(isAdd==1||(isAdd==2&&status==='NOACCEPT')))"></autoSearchEntrust>
                        <span v-else>{{scope.row.containerType}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="尺寸" width="100">
                    <template slot-scope="scope">
                        <autoSearchSize v-model="scope.row.containerSize" :name="scope.row.containerSize" v-if="((entrustType==='JCRK'||(entrustType==='THCK'&&!specify))&&(isAdd==1||(isAdd==2&&status==='NOACCEPT')))"></autoSearchSize>
                        <span v-else>{{scope.row.containerSize}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="内外贸" width="100">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.tradeType" placeholder="请选择内外贸" @change="chooiceTradeType" v-if="((entrustType==='JCRK'||(entrustType==='THCK'&&!specify))&&(isAdd==1||(isAdd==2&&status==='NOACCEPT')))">
                            <el-option v-for="[key, val] in _dictTradeType" :key="key" :label="val" :value="key">
                            </el-option>
                        </el-select>
                        <span v-else>{{scope.row.tradeType|_filterTradeType}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ifHeavy" label="空重" width="100">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.ifHeavy" placeholder="请选择空重" v-if="((entrustType==='JCRK'||(entrustType==='THCK'&&!specify))&&(isAdd==1||(isAdd==2&&status==='NOACCEPT')))">
                            <el-option v-for="[key, val] in _dictIfHeavyType" :key="key" :label="val" :value="key">
                            </el-option>
                        </el-select>
                        <span v-else>{{scope.row.ifHeavy|_filterIfHeavyType}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="箱主" width="150">
                    <template slot-scope="scope">
                        <autoSearchCustom v-model="scope.row.owner" :isOwner="true" :name="scope.row.ownerName" v-if="((entrustType==='BCWT'||entrustType==='JCRK'||(entrustType==='THCK'&&!specify))&&(isAdd==1||(isAdd==2&&status==='NOACCEPT')))"></autoSearchCustom>
                        <span v-else>{{scope.row.ownerName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cargoName" label="货名">
                    <template slot-scope="scope">
                        <el-input type="text" v-model="scope.row.cargoName" :disabled="scope.row.ifHeavy === 'E'" v-if="((entrustType==='JCRK'||(entrustType==='THCK'&&!specify))&&(isAdd==1||(isAdd==2&&status==='NOACCEPT')))"></el-input>
                        <span v-else>{{scope.row.cargoName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cargoOwner" label="货主" width="150">
                    <template slot-scope="scope">
                        <autoSearchCustom :disabled="scope.row.ifHeavy === 'E'" v-model="scope.row.cargoOwner" :isCargoOwner="true" :name="scope.row.cargoOwnerName" @matchRecord="item=>{scope.row.cargoOwnerName=item.name}"
                            v-if="((entrustType==='BCWT'||entrustType==='JCRK'||(entrustType==='THCK'&&!specify))&&(isAdd==1||(isAdd==2&&status==='NOACCEPT')))"></autoSearchCustom>
                        <span v-else>{{scope.row.cargoOwnerName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cargoWeight" label="货重">
                    <template slot-scope="scope">
                        <el-input type="text" v-model="scope.row.cargoWeight" :disabled="scope.row.ifHeavy === 'E'" v-if="((entrustType==='JCRK'||(entrustType==='THCK'&&!specify))&&(isAdd==1||(isAdd==2&&status==='NOACCEPT')))"></el-input>
                        <span v-else>{{scope.row.cargoWeight}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="sealNumber" label="铅封号">
                    <template slot-scope="scope">
                        <el-input type="text" v-model="scope.row.sealNumber" :disabled="scope.row.ifHeavy === 'E'" v-if="((entrustType==='JCRK'||(entrustType==='THCK'&&!specify))&&(isAdd==1||(isAdd==2&&status==='NOACCEPT')))"></el-input>
                        <span v-else>{{scope.row.sealNumber}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 提货出库大堆箱 -->
        <div v-if="!specify&&!trafficType&&entrustType==='THCK'">
            <el-table ref="multipleTable" :data="containerCargo" border stripe style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <!-- <el-table-column type="index" width="55" label="序号">
                </el-table-column> -->
                <el-table-column prop="address" label="箱型">
                    <template slot-scope="scope">
                        <autoSearchEntrust v-model="scope.row.containerType" :name="scope.row.containerType"></autoSearchEntrust>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="尺寸">
                    <template slot-scope="scope">
                        <autoSearchSize v-model="scope.row.containerSize" :name="scope.row.containerSize"></autoSearchSize>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="空重">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.ifHeavy" placeholder="请选择空重">
                            <el-option v-for="[key, val] in _dictIfHeavyType" :key="key" :label="val" :value="key">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="内外贸">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.tradeType" placeholder="请选择内外贸">
                            <el-option v-for="[key, val] in _dictTradeType" :key="key" :label="val" :value="key">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="num" label="箱数">
                    <template slot-scope="scope">
                        <el-input type="text" v-model="scope.row.num"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="箱主">
                    <template slot-scope="scope">
                        <autoSearchCustom v-model="scope.row.owner" :isOwner="true" :name="scope.row.ownerName"></autoSearchCustom>
                    </template>
                </el-table-column>
                <el-table-column label="操作" v-if="!this.specify&&isAdd==2">
                    <template slot-scope="scope">
                        <el-button type="text" @click="failThroughBigger(scope.row)">落空</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-if="entrustType !== 'CXWT'">
            <el-dialog title="箱选择" :visible.sync="visible" width="900px" :modal="false" :close-on-click-modal="false">
                <container-choice ref="boxChoose" @updata="getBoxDea" @visible="visible=false"></container-choice>
            </el-dialog>
        </div>
        <div v-else>
            <el-dialog title="箱选择" :visible.sync="visible" width="900px" :modal="false" :close-on-click-modal="false">
                <container-choice2 ref="boxChoose" @updata="getBoxDea" @visible="visible=false"></container-choice2>
            </el-dialog>
        </div>
        <el-dialog title="箱选择" :visible.sync="visibleRight" width="900px" :modal="false" :close-on-click-modal="false">
            <rightList ref="boxChooseRight" @chooisRight="getBoxDea" @visible="visibleRight=false"></rightList>
        </el-dialog>
    </div>
</template>

<script>
    import autoSearchEntrust from '@/components/autocomplete/autoSearchEntrust'
    import autoSearchSize from '@/components/autocomplete/autoSearchSize'
    import autoSearchCustom from '@/components/autocomplete/autoSearchCustom'
    import containerChoice from '@/views/business/common/containerChoice'
    import containerChoice2 from '@/views/business/common/containerChoice2'
    import rightList from '@/views/business/common/rightList'
    import excelImport from '@/components/excel/import'
    import {
        getContainerList
    } from '@/api/container'
    import {
        getEntrustDetail,
        goFail
    } from "@/api/entrust"

    export default {
        components: {
            autoSearchEntrust,
            autoSearchSize,
            autoSearchCustom,
            containerChoice,
            containerChoice2,
            excelImport,
            rightList
        },
        props: {
            trafficType: {},
            isAdd: '',
            entrustType: '',
            specify: {},
            id: '',
            status: '',
        },
        data() {
            return {
                containerCargo: [],
                copyArry: [], // 全部的箱明细，用来保存筛选之前的全部
                condition: {},
                condition2: {},
                delArray: [],
                box: [],
                pageSearch: getContainerList,
                visible: false,
                visibleRight: false,
                nowCon: [],
                changeNo: '',
                changeStatus: ''
            }
        },
        mounted() {
            this.setTitle()
        },
        methods: {
            getBoxDea(v) {
                this.containerCargo = v
                this.containerCargo.forEach(element => {
                    element.owner = element.ownerId
                })
            },
            checkDea() {
                let a = JSON.parse(JSON.stringify(this.copyArry))
                if (!this.changeStatus && !this.changeNo) {
                    this.containerCargo = this.copyArry
                } else {
                    this.containerCargo = []
                    for (let index = 0; index < a.length; index++) {
                        if (this.changeNo && !this.changeStatus) {
                            if (a[index].containerNo == this.changeNo) {
                                this.containerCargo.push(a[index])
                            }
                        } else if (this.changeStatus && !this.changeNo) {
                            if (a[index].jobStatus == this.changeStatus) {
                                this.containerCargo.push(a[index])
                            }
                        } else if (this.changeStatus && this.changeNo) {
                            if (a[index].jobStatus == this.changeStatus && a[index].containerNo == this.changeNo) {
                                this.containerCargo.push(a[index])
                            }
                        }
                    }
                }
            },
            handleSelectionChange(val) { //  选择行
                this.delArray = val
            },
            handleSelectionChange2(val) {
                this.nowCon = val
            },
            addEntrust() {
                let index
                index = this.containerCargo.length === 0 ? 0 : this.containerCargo.length
                this.containerCargo.push({
                    'index': index
                })
            },
            chooseBox() {
                if (this.entrustType === 'BCWT') {
                    this.visibleRight = true
                    this.$nextTick(() => {
                        this.$refs.boxChooseRight.loadData()
                    })
                } else {
                    this.visible = true
                    this.$nextTick(() => {
                        this.$refs.boxChoose.loadData()
                    })
                }
            },
            delEntrust() {
                this.containerCargo = this.containerCargo.filter(f => {
                    return !this.delArray.includes(f)
                })
            },
            rightBox() {
                this.containerCargo.push(...this.nowCon)
                this.visible = false
                this.nowCon = []
            },
            cancel() {
                this.visible = false
                this.nowCon = []
            },
            setTitle() { // zhuimeikeji 设置标题红点
                let thArr = ['箱号', '箱型', '尺寸', '空重', '铅封号', '内外贸', '箱主', '货名']
                let th = document.getElementsByClassName('is-leaf')
                const red = '<a style="color:red;">*</a>'
                for (let i = 0; i < th.length; i++) {
                    if (thArr.indexOf(th[i].innerText) !== -1) {
                        th[i].innerHTML = '<div class="cell">' + th[i].innerText + red + '</div>'
                    }
                }
            },
            failThrough() {
                let a = {}
                let container = []
                for (let index = 0; index < this.delArray.length; index++) {
                    let b = {
                        'id': this.delArray[index].id
                    }
                    container.push(b)
                }
                a = {
                    'container': container
                }
                goFail(this.id, a).then(res => {
                    this.$message({
                        message: '落空成功',
                        type: 'success'
                    })
                    this.$emit('upFall')
                    // this.$router.go(-1)
                })
            },
            failThroughBigger(row) {
                this.$prompt('请输入落空数量', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputType: 'textarea',
                    inputValidator: function (v) {
                        return !!v
                    },
                    inputErrorMessage: '请输入落空数量'
                }).then(({
                    value
                }) => {
                    let a = [{
                        id: row.containerNo,
                        num: value
                    }]
                    goFail(this.id, a).then(res => {
                        this.$message({
                            message: '落空成功',
                            type: 'success'
                        })
                        this.$emit('upFall')
                    })
                })
            },
            upCase(row) {
                let a = row.containerNo.toUpperCase()
                this.$nextTick(() => {
                    row.containerNo = a
                })
            }
        },
        watch: {
            containerCargo(newVal) {
                if (newVal) {
                    this.$emit('deaLength', this.containerCargo.length)
                }
            }
        }
    }

</script>

<style scoped>
    .btn-group {
        margin: 15px 0;
    }

    .boxMenue {
        margin-top: 14px;
        margin-bottom: 23px;
    }

    .el-form-item {
        width: 140px;
    }

</style>
