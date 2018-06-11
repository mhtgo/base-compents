<template>
    <base-list ref="boxChoose" :condition="condition" :datas.sync="container" :pageSearch="pageSearch">
        <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="箱号:" prop="name">
                        <el-input type="text" class="searchWidth" v-model="condition['search_LIKE_containerNo']" clearable @change="upCase"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="货名:" prop="name">
                        <el-input type="text" class="searchWidth" v-model="condition['search_LIKE_cargoName']" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="箱主:">
                        <!-- <autoSearchCustom v-model="condition['search_EQ_ownerId']"></autoSearchCustom> -->
                        <autoSearchCustom v-model="condition['search_EQ_ownerId']" :isOwner="true"></autoSearchCustom>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="空重:" prop="name">
                        <el-select v-model="condition['search_EQ_ifHeavy']" placeholder="请选择空重" clearable >
                            <el-option v-for="[key, val] in _dictIfHeavyType" :key="key" :label="val" :value="key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-button type="primary" class="ml-80" icon="el-icon-search" @click="loadData">查 询</el-button>
            <el-button type="primary" @click="handleChoice">选 择</el-button>
            <el-button type="primary" @click="handleCancel">取 消</el-button>
        </el-form>

        <el-table slot="list" :data="container" border stripe max-height="500"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="箱号" prop="containerNo" width="130"></el-table-column>
            <el-table-column label="箱型" prop="containerType" width="60"></el-table-column>
            <el-table-column label="尺寸" prop="containerSize" width="60"></el-table-column>
            <el-table-column label="内外贸" prop="tradeType">
                <template slot-scope="scope">
                    {{scope.row.tradeType|_filterTradeType}}
                </template>
            </el-table-column>
            <el-table-column label="空重" prop="ifHeavy" width="60">
                <template slot-scope="scope">
                    {{scope.row.ifHeavy|_filterIfHeavyType}}
                </template>
            </el-table-column>
            <el-table-column label="铅封号" prop="sealNumber"></el-table-column>
            <el-table-column label="箱主" prop="ownerName"></el-table-column>
            <el-table-column label="货名" prop="cargoName"></el-table-column>
            <el-table-column label="货重" prop="cargoWeight"></el-table-column>
            <el-table-column label="货主" prop="cargoOwnerName"></el-table-column>
        </el-table>
    </base-list>
</template>

<script>
    import { getContainerPort } from "@/api/containerType/containerType";
    import autoSearchCustom from '@/components/autocomplete/autoSearchCustom'

    export default {
        name: "containerChoice",
        components: { autoSearchCustom },
        data() {
            return {
                condition: {},
                choiceArr: [],       // 选择的数组
                container: [],       // 数据源
                pageSearch: getContainerPort,
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            upCase(){
              this.condition['search_LIKE_containerNo'] = this.condition['search_LIKE_containerNo'].toUpperCase()
            },
            loadData() {
                this.$refs.boxChoose.loadData()
            },
            handleChoice() {
                this.container = this.choiceArr
                this.$emit('updata',this.container)
                this.handleCancel()
            },
            handleCancel() {
                this.choiceArr = []
                // 关闭父组件的弹窗
                this.$emit('visible', false)
            },
            handleSelectionChange(val) {
                this.choiceArr = val
            }
        }
    }
</script>

<style scoped lang="scss">
  .searchWidth{
      width: 165px;
  }
</style>
