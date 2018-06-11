<template>
    <el-dialog title="到达确报" :visible.sync="dialogForm" width="90%">

        <h3>基础信息</h3>
        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="110px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="车皮号" prop="wagonNo">
                        <el-input type="text" v-model.trim="form.wagonNo" :ref="'input0'"
                                  @keyup.enter.native="keyEnter(0)"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="发站" prop="stratStationCode">
                        <auto-search-port-station v-model="form.stratStationCode" @matchRecord='mySelect'
                                                  :ref="'input1'"
                                                  @keyup.enter.native="keyEnter(1)"></auto-search-port-station>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="到站" prop="endStationCode">
                        <auto-search-port-station v-model="form.endStationCode" @matchRecord='mySelect2' :ref="'input2'"
                                                  @keyup.enter.native="keyEnter(2)"></auto-search-port-station>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="托运人" prop="shipper">
                        <el-input type="text" v-model.trim="form.shipper" @matchRecord='mySelect2' :ref="'input3'"
                                  @keyup.enter.native="keyEnter(3)"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系电话" prop="shipperTel">
                        <el-input type="text" v-model.trim="form.shipperTel" @matchRecord='mySelect2' :ref="'input4'"
                                  @keyup.enter.native="keyEnter(4)"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>

            <el-row>

                <el-col :span="8">
                    <el-form-item label="收货人" prop="consignee">
                        <!--<search-custom v-model="form.partyAId"-->
                        <!--@matchRecord="v=>{form.partyAId=v.id;form.partyAName=v.name}"-->
                        <!--:name="form.partyAName"></search-custom>-->
                        <el-input type="text" v-model.trim="form.consignee" :ref="'input5'"
                                  @keyup.enter.native="keyEnter(5)"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系电话" prop="consigneeTel">
                        <!--<search-custom v-model="form.partyBId"-->
                        <!--@matchRecord="v=>{form.partyBId=v.id;form.partyBName=v.name}"-->
                        <!--:name="form.partyBName"></search-custom>-->
                        <el-input type="text" v-model.trim="form.consigneeTel" :ref="'input6'"
                                  @keyup.enter.native="keyEnter(6)"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <h3>集装箱信息</h3>
            <el-row type="flex" justify="end">
                <!--<el-button type="primary" @click="handleAddCargo" class="ml-80">增 加</el-button>-->
                <!--<el-button type="danger" @click="handleDelTable">删 除</el-button>-->

            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label=" " class="flexCenter">
                        <el-table :data="form.container" border max-height="300">
                            <el-table-column prop="containerNo" label="箱号" min-width="200">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.index == 1">
                                        <template v-if="form.container[0].containerSize == 20">

                                            <!-- 2018-6-3 15:30 -->
                                            <el-input v-model.trim="scope.row.containerNo"
                                                      @change='containerNoChange(scope.row.containerNo, scope.row.index)'
                                                      clearable></el-input>

                                            <!--<auto-search-container v-model.trim="scope.row.containerNo" :name="scope.row.containerNo" @matchRecord='v=>searchContainer(v, scope.row.index)' @change="v=>containerNoChange(v, scope.row.index)"></auto-search-container>-->
                                        </template>
                                        <template v-else>
                                            <el-input disabled=""></el-input>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <!-- 2018-6-3 15:30 -->
                                        <el-input v-model.trim="scope.row.containerNo"
                                                  @change='containerNoChange(scope.row.containerNo, scope.row.index)'
                                                  clearable></el-input>

                                        <!--<el-input v-model.trim="scope.row.containerNo" @change='containerNoChange(scope.row.containerNo, scope.row.index)' clearable></el-input>-->
                                    </template>
                                </template>
                            </el-table-column>
                            <el-table-column prop="containerSize" label="尺寸" min-width="80">
                                <template slot-scope="scope">
                                    <!-- <auto-search-size v-model.trim="scope.row.containerSize" @matchRecord='sizeChange' @change='sizeChangeIndex(scope.row.index)' ></auto-search-size> -->
                                    <template v-if="scope.row.index == 1">
                                        <template v-if="form.container[0].containerSize == 20">
                                            <el-input value="20" disabled=""></el-input>
                                        </template>
                                        <template v-else>
                                            <auto-search-size v-model.trim="scope.row.containerSize"
                                                              :name="scope.row.containerSize" :disabled="true"
                                                              width="width:68px"></auto-search-size>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <auto-search-size v-model.trim="scope.row.containerSize"
                                                          :name="scope.row.containerSize" :disabled="setSize"
                                                          width="width:68px"></auto-search-size>
                                    </template>
                                </template>
                            </el-table-column>
                            <el-table-column prop="containerType" label="箱型" min-width="120">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.index == 1">
                                        <template v-if="form.container[0].containerSize == 20">
                                            <auto-search-entrust v-model.trim="scope.row.containerType"
                                                                 :name="scope.row.containerType"
                                                                 width="width:105px"></auto-search-entrust>
                                        </template>
                                        <template v-else>
                                            <el-input disabled=""></el-input>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <auto-search-entrust v-model.trim="scope.row.containerType"
                                                             :name="scope.row.containerType"
                                                             width="width:105px"></auto-search-entrust>
                                    </template>
                                </template>
                            </el-table-column>


                            <el-table-column prop="tradeType" label="内外贸" min-width="100">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.index == 1">
                                        <template v-if="form.container[0].containerSize == 20">
                                            <el-select v-model="scope.row.tradeType" style="width: 88px">
                                                <el-option v-for="[key, val] of _dictTradeType" :label="val"
                                                           :value="key"
                                                           :key="key"></el-option>
                                            </el-select>
                                        </template>
                                        <template v-else>
                                            <el-select v-model="scope.row.tradeType" disabled="" style="width: 88px">
                                                <el-option v-for="[key, val] of _dictTradeType" :label="val"
                                                           :value="key"

                                                           :key="key"></el-option>
                                            </el-select>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <el-select v-model="scope.row.tradeType" style="width: 88px">
                                            <el-option v-for="[key, val] of _dictTradeType" :label="val" :value="key"
                                                       :key="key"></el-option>
                                        </el-select>
                                    </template>
                                </template>
                            </el-table-column>
                            <el-table-column prop="ownerId" label="箱主" min-width="200">
                                <template slot-scope="scope">
                                    <!-- <auto-search-custom v-model.trim="scope.row.ownerId" @matchRecord='ownerChange' @change='ownerChangeIndex(scope.row.index)' :isOwner='true'></auto-search-custom> -->
                                    <template v-if="scope.row.index == 1">
                                        <template v-if="form.container[0].containerSize == 20">
                                            <auto-search-custom v-model.trim="scope.row.ownerId"
                                                                :name="scope.row.ownerName" :disabled="true"
                                                                :isOwner='true'></auto-search-custom>
                                        </template>
                                        <template v-else>
                                            <el-input disabled=""></el-input>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <auto-search-custom v-model.trim="scope.row.ownerId" :name="scope.row.ownerName"
                                                            :disabled="true" :isOwner='true'></auto-search-custom>
                                    </template>
                                </template>
                            </el-table-column>
                            <el-table-column prop="ifHeavy" label="空重" min-width="100">
                                <template slot-scope="scope">

                                    <template v-if="scope.row.index == 1">
                                        <template v-if="form.container[0].containerSize == 20">
                                            <el-select v-model="scope.row.ifHeavy" style="width: 88px">
                                                <el-option v-for="[key, val] of _dictIfHeavyType" :label="val"
                                                           :value="key"
                                                           :key="key"></el-option>
                                            </el-select>
                                        </template>
                                        <template v-else>
                                            <el-select v-model="scope.row.ifHeavy" disabled="" style="width: 88px">
                                                <el-option v-for="[key, val] of _dictIfHeavyType" :label="val"
                                                           :value="key"
                                                           :key="key"></el-option>
                                            </el-select>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <el-select v-model="scope.row.ifHeavy" style="width: 88px">
                                            <el-option v-for="[key, val] of _dictIfHeavyType" :label="val" :value="key"
                                                       :key="key"></el-option>
                                        </el-select>
                                    </template>
                                </template>
                            </el-table-column>
                            <el-table-column prop="cargoName" label="货名" min-width="180">
                                <template slot-scope="scope">
                                    <!--<el-input v-model.trim="scope.row.price" clearable></el-input>-->
                                    <template v-if="scope.row.index == 1">
                                        <template v-if="form.container[0].containerSize == 20">
                                            <el-input :controls="false" v-model.trim="scope.row.cargoName"></el-input>
                                        </template>
                                        <template v-else>
                                            <el-input disabled=""></el-input>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <el-input :controls="false" v-model.trim="scope.row.cargoName"></el-input>
                                    </template>
                                </template>
                            </el-table-column>
                            <el-table-column prop="cargoWeight" label="货重" min-width="120">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.index == 1">
                                        <template v-if="form.container[0].containerSize == 20">
                                            <!--<el-input v-model.trim="scope.row.cargoWeight"></el-input>-->
                                            <input-numbers v-model.trim="scope.row.cargoWeight"
                                                           :name="scope.row.cargoWeight"></input-numbers>
                                        </template>
                                        <template v-else>
                                            <el-input disabled=""></el-input>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <!--<el-input v-model.trim="scope.row.cargoWeight"></el-input>-->
                                        <input-numbers v-model.trim="scope.row.cargoWeight"
                                                       :name="scope.row.cargoWeight"></input-numbers>
                                    </template>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleApproval(true)">确定</el-button>
            <el-button @click="dialogForm = false">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
    // import { addContract, contractApprovalPass, updateContract } from "@/api/contract/contract";
    import { PUBLIC_CHINESE, PUBLIC_NOT_CHINESE, PUBLIC_PHONE } from "@/utils/Reg";
    import { sortLength } from "@/utils/rules";
    import searchCustom from '@/components/autocomplete/autoSearchCustom'
    import autoSearchCustom from '@/components/autocomplete/autoSearchCustom'
    import autoSearchPortStation from '@/components/autocomplete/autoSearchPortStation'
    import autoSearchContainer from '@/components/autocomplete/autoSearchContainer'
    import autoSearchSize from '@/components/autocomplete/autoSearchSize'
    import autoSearchEntrust from '@/components/autocomplete/autoSearchEntrust'

    import { arrive, searchArrive } from "@/api/gatePanel/gatePanel";

    export default {
        name: "arriveForm",
        components: {
            searchCustom,
            autoSearchPortStation,
            autoSearchContainer,
            autoSearchSize,
            autoSearchEntrust,
            autoSearchCustom
        },
        data() {
            return {
                isEdit: false,
                dialogForm: false,
                form: this.clearForm(),
                //临时bus
                bus: {
                    containerSize: '',
                    ownerId: '',
                },
                rules: {
                    wagonNo: [{
                        required: true,
                        message: '请输入车皮号',
                        pattern: PUBLIC_NOT_CHINESE,
                        trigger: 'change'
                    }, sortLength],
                    stratStationCode: [{ required: true, message: '请选择发站', trigger: 'change' }],
                    endStationCode: [{ required: true, message: '请选择到站', trigger: 'change' }],
                    shipper: [{ required: true, message: '请输入托运人', pattern: PUBLIC_CHINESE, trigger: 'change' }],
                    shipperTel: [{ required: true, message: '请输入托运人手机号', pattern: PUBLIC_PHONE, trigger: 'change' }],
                    consignee: [{ required: true, message: '请输入收货人', pattern: PUBLIC_CHINESE, trigger: 'change' }],
                    consigneeTel: [{ required: true, message: '请输入收货人手机号', pattern: PUBLIC_PHONE, trigger: 'change' }],
                    containerNo: [{ required: true, message: '请输入箱号', trigger: 'change' }],

                },
                multipleSelection: [],               // 选择的行
                setSize: false,
            }
        },
        methods: {

            containerNoChange(e, i) {
                if (i === 0) {
                    this.setSize = false
                }
                if (!e.length)
                    return

                this.form.container[i].containerNo = e.toUpperCase()


                //查询数据
                searchArrive(e.toUpperCase()).then(res => {

                    let _res = res.data.aaData

                    if (!_res.length) {
                        //空数据
                        // this.$message({ message: `没有找到该箱号的明细数据`, type: 'info' })
                    } else {
                        //多个取第一个
                        this.form.container[i].containerType = _res[0].containerType
                        this.form.container[i].containerSize = _res[0].containerSize
                        this.form.container[i].tradeType = _res[0].tradeType
                        this.form.container[i].ownerId = _res[0].ownerId
                        this.form.container[i].ownerName = _res[0].ownerName
                        this.form.container[i].ifHeavy = _res[0].ifHeavy
                        this.form.container[i].cargoName = _res[0].cargoName
                        this.form.container[i].cargoWeight = _res[0].cargoWeight

                        this.form.container[i].entrustNo = _res[0].entrustNo
                        this.form.container[i].entrustOrgId = _res[0].entrustOrgId
                        this.form.container[i].entrustOrgName = _res[0].entrustOrgName
                        this.form.container[i].entrustOrgCode = _res[0].entrustOrgCode
                        if (i === 0) {
                            this.setSize = true
                        }
                        this.$message({ message: `已为您找到该箱的明细数据`, type: 'success' })

                    }

                })


            },

            keyEnter(i) {
                this.$refs['input' + i].$el.querySelector('input').blur();
                this.$refs['input' + (i + 1)].$el.querySelector('input').focus();
            },

            mySelect(e) {
                this.form.stratStationCode = e.pasCode
                this.form.stratStationName = e.pasName
            },

            mySelect2(e) {
                this.form.endStationCode = e.pasCode
                this.form.endStationName = e.pasName
            },

            searchContainer(e, i) {

                if (e) {
                    //替换当前数据
                    // this.form.container[i].containerNo = e.containerNo
                    this.form.container[i].tradeType = e.tradeType
                    this.form.container[i].ownerId = e.ownerId
                    this.form.container[i].ownerName = e.ownerName
                    this.form.container[i].ifHeavy = e.ifHeavy
                    this.form.container[i].cargoName = e.cargoName
                    this.form.container[i].cargoWeight = e.cargoWeight

                    this.form.container[i].entrustNo = e.entrustNo
                    this.form.container[i].entrustOrgId = e.entrustOrgId
                    this.form.container[i].entrustOrgName = e.entrustOrgName
                    this.form.container[i].entrustOrgCode = e.entrustOrgCode
                }
            },

            checkContainer(checkType) {

                let _i = 0

                if (checkType == 40) {
                    checkType == 0
                } else {
                    checkType == 1
                }

                // 验证结果 true | false
                let _flag = true

                let container = this.form.container

                if (!(container[_i].containerNo)) {
                    this.$message({ message: `请输入箱号`, type: 'error' })
                    _flag = false
                } else if (!(container[_i].containerSize)) {
                    this.$message({ message: `请输入尺寸`, type: 'error' })
                    _flag = false
                } else if (!(container[_i].containerType)) {
                    this.$message({ message: `请输入箱型`, type: 'error' })
                    _flag = false
                } else if (!(container[_i].tradeType)) {
                    this.$message({ message: `请选择内外贸`, type: 'error' })
                    _flag = false
                }
                // else if(!(container[_i].ownerId)){
                //     this.$message({ message: `请选择箱主`, type: 'error' })
                //     _flag = false
                // }

                if (container[_i].ifHeavy == 'E') {
                    //空
                } else if (container[_i].ifHeavy == 'F') {
                    //重
                    //货名、货重为必填
                    if (!(container[_i].cargoName)) {
                        this.$message({ message: `请输入货名`, type: 'error' })
                        _flag = false
                    } else if (!(container[_i].cargoWeight)) {
                        this.$message({ message: `请输入货重`, type: 'error' })
                        _flag = false
                    }

                } else {
                    this.$message({ message: `请选择空重`, type: 'error' })
                    _flag = false
                }

                return _flag

            },


            // 提交到达确认
            handleApproval() {
                console.log(this.form.container)
                //验证录入
                let container = this.form.container

                if (container[0].containerSize == 40) {
                    //只有一个箱
                    if (!this.checkContainer(40)) {
                        return
                    }
                } else {
                    //验证两个箱
                    if (!this.checkContainer(40)) {
                        return
                    }
                    if (!this.checkContainer(20)) {
                        return
                    }
                }

                this.$refs.form.validate((valid) => {
                    if (valid) {
                        //提交数据验证
                        let _tmp = JSON.parse(JSON.stringify(this.form))
                        if (this.form.container[0].containerSize == 40) {
                            //只传1个箱
                            _tmp.container.splice(1, 1)
                        }
                        if(this.form.container[0].containerSize==20){
                            if(!this.form.container[1].containerNo){
                                _tmp.container.splice(1, 1)
                            }
                        }
                        arrive(_tmp).then(response => {
                            this.$message({ message: '提交成功!', type: 'success' })
                            // 保留弹窗
                            // this.dialogForm = false
                            //刷新父级数据
                            this.$emit('savesuccess')
                            this.form.wagonNo = ''
                            this.form.container[0].containerNo = ''
                            this.form.container[1].containerNo = ''
                        })
                    } else {
                        this.$message({ message: '请检查表单', type: 'error' })
                        return
                    }
                })


            },

            clearForm() {
                return {
                    wagonNo: '',
                    stratStationCode: '',
                    // id: '',
                    stratStationName: '',
                    endStationCode: '',
                    endStationName: '',
                    shipper: '',
                    shipperTel: '',
                    consignee: '',
                    container: [{
                        index: 0,
                        containerType: 'GP',
                        containerSize: 20,
                        containerNo: '',
                        tradeType: 'I',
                        ownerId: '',
                        ifHeavy: '',
                        cargoName: '',
                        cargoWeight: '',
                        entrustNo: '',
                        entrustOrgId: '',
                        entrustOrgName: '',
                        entrustOrgCode: '',
                    }, {
                        index: 1,
                        containerType: 'GP',
                        containerSize: 20,
                        containerNo: '',
                        tradeType: 'I',
                        ownerId: '',
                        ifHeavy: '',
                        cargoName: '',
                        cargoWeight: '',
                        entrustNo: '',
                        entrustOrgId: '',
                        entrustOrgName: '',
                        entrustOrgCode: '',
                    },],
                    // attachments: []
                }
            }
        },
        watch: {
            dialogForm(val) {
                if (!val) {
                    this.form = this.clearForm()
                    this.$refs.form.resetFields()
                }
            }
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    /*.dialog-footer {*/
    /*display: flex;*/
    /*justify-content: flex-start;*/
    /*}*/
</style>
