<template>
    <div>
        <base-list ref="portList" :condition="condition" :datas.sync="portList" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="箱号" prop="name">
                            <el-input type="text" class="searchWidth" v-model="condition['search_LIKE_containerNo']" clearable @change="upCase"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="货名" prop="name">
                            <el-input type="text" class="searchWidth" v-model="condition['search_LIKE_cargoName']" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="空重" prop="name">
                            <el-select v-model="condition['search_EQ_ifHeavy']" placeholder="请选择空重" clearable>
                                <el-option v-for="[key, val] in _dictIfHeavyType" :key="key" :label="val" :value="key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-button type="primary" class="ml-80" icon="el-icon-search" @click="loadData">查 询</el-button>
                <el-button type="primary" @click="handleChoice">选 择</el-button>
            </el-form>
            <el-table slot="list" :data="portList" border stripe max-height="500" @selection-change="handleSelectionChange">
                <el-table-column type="selection" prop="id" width="50"></el-table-column>
                <el-table-column fixed="left" prop="wagonNo" label="车皮号" min-width="120">
                    <template slot-scope="scope">
                        {{scope.row.wagonNo}}
                    </template>
                </el-table-column>
                <el-table-column prop="shipper" label="托运人" min-width="120">
                    <template slot-scope="scope">
                        {{scope.row.shipper}}
                    </template>
                </el-table-column>
                <el-table-column prop="shipperTel" label="联系电话" min-width="135">
                    <template slot-scope="scope">
                        {{scope.row.shipperTel}}
                    </template>
                </el-table-column>
                <el-table-column prop="consignee" label="收货人" min-width="120">
                    <template slot-scope="scope">
                        {{scope.row.consignee}}
                    </template>
                </el-table-column>
                <el-table-column prop="consigneeTel" label="联系电话" min-width="135">
                    <template slot-scope="scope">
                        {{scope.row.consigneeTel}}
                    </template>
                </el-table-column>

                <el-table-column prop="containerNo" label="箱号" min-width="150">
                    <template slot-scope="scope">
                        {{scope.row.containerNo}}
                    </template>
                </el-table-column>
                <el-table-column prop="containerSize" label="尺寸" min-width="100">
                    <template slot-scope="scope">
                        {{scope.row.containerSize}}
                    </template>
                </el-table-column>
                <el-table-column prop="tradeType" label="内外贸" min-width="120">
                    <template slot-scope="scope">
                        {{scope.row.tradeType|_filterTradeType}}
                    </template>
                </el-table-column>
                <el-table-column prop="ifHeavy" label="空重" min-width="100">
                    <template slot-scope="scope">
                        {{scope.row.ifHeavy|_filterIfHeavyType}}
                    </template>
                </el-table-column>

                <el-table-column prop="ownerName" label="箱主" min-width="180">
                    <template slot-scope="scope">
                        {{scope.row.ownerName}}
                    </template>
                </el-table-column>

                <el-table-column prop="stratStationName" label="发站" min-width="150">
                    <template slot-scope="scope">
                        {{scope.row.stratStationName}}
                    </template>
                </el-table-column>

                <el-table-column prop="endStationName" label="到站" min-width="150">
                    <template slot-scope="scope">
                        {{scope.row.endStationName}}
                    </template>
                </el-table-column>

                <el-table-column prop="cargoName" label="货名" min-width="150">
                    <template slot-scope="scope">
                        {{scope.row.cargoName}}
                    </template>
                </el-table-column>

                <el-table-column prop="cargoWeight" label="货重" min-width="100">
                    <template slot-scope="scope">
                        {{scope.row.cargoWeight}}
                    </template>
                </el-table-column>

                <!-- <el-table-column prop="options" fixed="right" align="center" label="操作" sortable width="60" :colpan="1" :rowspan="2">
                    <template slot-scope="scope">
                        <el-button type="text" class="danger" size="small" @click="handleRemove(scope.row.planNo)">删除
                        </el-button>
                    </template>
                </el-table-column> -->

            </el-table>

        </base-list>
    </div>
</template>
<script>
    import {
        arriveList
    } from "@/api/gatePanel/gatePanel";

    import autoSearchPortStation from '@/components/autocomplete/autoSearchPortStation'
    import autoSearchSize from '@/components/autocomplete/autoSearchSize'
    import autoSearchEntrust from '@/components/autocomplete/autoSearchEntrust'
    import autoSearchCustom from '@/components/autocomplete/autoSearchCustom'
    export default {
        components: {
            autoSearchPortStation,
            autoSearchSize,
            autoSearchEntrust,
            autoSearchCustom
        },
        data() {
            return {
                condition: {
                    "search_EQ_status":"COMPLETED"
                }, // 查询条件
                pageSearch: arriveList, // 分页查询api接口,
                portList: [],
                chooisRight:[]
            }
        },
        methods:{
            upCase(){
              this.condition['search_LIKE_containerNo'] = this.condition['search_LIKE_containerNo'].toUpperCase()
            },
            loadData() {
                this.$refs.portList.loadData()
            },
            handleSelectionChange(val){
                this.chooisRight = val
            },
            handleChoice(){
               this.$emit('chooisRight', this.chooisRight)
               this.handleCancel()
            },
            handleCancel() {
                this.chooisRight = []
                // 关闭父组件的弹窗
                this.$emit('visible', false)
            }
        }
    }

</script>
<style lang="scss" scoped>


  .searchWidth{
      width: 165px;
  }
</style>
