<template>
  <div>
    <h2 class="page-title" v-html="titleType"></h2>
    <base-info :forms="forms"></base-info>
    <desc-info :forms="forms" ref="descInfo" :pageType="pageType" :isTransportMode="isTransportMode"></desc-info>

    <div class="desc-list">
      <div class="header">集装箱信息</div>
      <div v-show="trafficType === 'CR' && specify === '1'">
        <btn-group :show-box="true" :show-add="false"></btn-group>
        <el-table ref="multipleTable" :data="forms.containerCargo" border stripe style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="箱号" width="120">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.containerNo" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="车牌号">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.plateNum"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="箱型">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.containerType" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="尺寸">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.containerSize" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="空重">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.ifHeavy" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="铅封号">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.sealNumber" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="内外贸">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.tradeType" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="箱主">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.owner" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="货名">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.cargoName" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="货重">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.cargoWeight" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="货主">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.cargoOwner" disabled></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-show="trafficType === 'CR' && specify === '2'">
        <btn-group :show-box="false" :show-add="true"></btn-group>
        <el-table ref="multipleTable" :data="forms.containerCargo" border stripe style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="address" label="箱型">
            <template slot-scope="scope">
              <el-select v-model="scope.row.containerType" placeholder="请选择箱型">
                <el-option v-for="item in select.boxType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="尺寸">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.containerSize"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="空重">
            <template slot-scope="scope">
              <el-select v-model="scope.row.ifHeavy" placeholder="请选择空重">
                <el-option v-for="item in select.HeavyType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="内外贸">
            <template slot-scope="scope">
              <el-select v-model="scope.row.tradeType" placeholder="请选择内外贸">
                <el-option v-for="item in select.tradeType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="箱数">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.cargoCount"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="货名">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.cargoName"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="箱主">
            <template slot-scope="scope">
              <el-select v-model="scope.row.owner" placeholder="请选择箱主">
                <el-option v-for="item in select.belong" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-show="trafficType === 'TR' && specify === '1'">
        <btn-group :show-box="true" :show-add="false"></btn-group>
        <el-table ref="multipleTable" :data="forms.containerCargo" border stripe style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="address" label="配组号" width="120">
            <template slot-scope="scope">
              <el-input-number style="width: 100px" :controls="false" v-model="scope.row.groupNo"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="箱号" width="120">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.containerNo" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="箱型">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.containerType" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="尺寸">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.containerSize" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="空重">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.ifHeavy" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="铅封号">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.sealNumber" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="内外贸">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.tradeType" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="箱主">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.owner" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="货名">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.cargoName" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="货重">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.cargoWeight" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="货主">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.cargoOwner" disabled></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-show="trafficType === 'TR' && specify === '2'">
        <btn-group :show-box="false" :show-add="true"></btn-group>
        <el-table ref="multipleTable" :data="forms.containerCargo" border stripe style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="address" label="箱型">
            <template slot-scope="scope">
              <el-select v-model="scope.row.containerType" placeholder="请选择箱型">
                <el-option v-for="item in select.boxType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="尺寸">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.containerSize"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="空重">
            <template slot-scope="scope">
              <el-select v-model="scope.row.ifHeavy" placeholder="请选择空重">
                <el-option v-for="item in select.HeavyType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="内外贸">
            <template slot-scope="scope">
              <el-select v-model="scope.row.tradeType" placeholder="请选择内外贸">
                <el-option v-for="item in select.tradeType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="箱数">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.cargoCount"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="货名">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.cargoName"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="箱主">
            <template slot-scope="scope">
              <el-select v-model="scope.row.owner" placeholder="请选择箱主">
                <el-option v-for="item in select.belong" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row class="mt-16">
        <el-button type="primary" @click.native="addsubmit()">确定</el-button>
        <el-button type="primary" @click.native="$router.push({ name: 'home' })">取消</el-button>
      </el-row>
    </div>

  </div>
</template>

<script>
  import {
    addEntrust
  } from '@/api/entrust'
  import {
    getCustomList
  } from '@/api/custom/customList'
  import baseInfo from './_baseInfo.vue'
  import descInfo from './_descInfo.vue'
  import btnGroup from './_btnGroup.vue'
  import btnDialog from './_btnDialog.vue'
  export default {
    components: {
      baseInfo,
      descInfo,
      btnGroup,
      btnDialog
    },
    data() {
      return {
        titleType: '提货出库委托新增',
        pageType: 'takeOut', // zhuimeikeji 类型调用
        isTransportMode: false, // zhuimeikeji 运输方式是否可选
        trafficType: '',
        specify: '',
        multipleSelection: [],
        select: {
          boxType: [{
            label: '箱型1',
            value: '箱型'
          }],
          HeavyType: [{
            label: '空',
            value: 'E'
          }, {
            label: '重',
            value: 'F'
          }],
          belong: [],
          cargo: [],
          boxSize: [{
            label: '20',
            value: '20'
          }, {
            label: '40',
            value: '40'
          }, {
            label: '45',
            value: '45'
          }],
          tradeType: [{
            label: '内贸',
            value: 'I'
          }, {
            label: '外贸',
            value: 'O'
          }]
        },
        forms: {
          entrustNo: '',
          entrustName: '',
          entrustOrgId: '',
          entrustOrgName: '',
          entrustType: 'THCK',
          entrustTypeText: '提货出库',
          projectId: '',
          projectName: '',
          entrustDesc: '',
          specify: '',
          jobDate: '',
          transportMode: '',
          packingWay: 'C',
          packingWayText: '集装箱',
          originName: '',
          originCode: '',
          endCode: '',
          endName: '',
          containerNum: 0,
          containerCargo: []
        }
      }
    },
    mounted() {
      this.getCustom()
      this.getCustomList()

      if (this.$route.query.id) { // 检测编辑页面
        this.titleType = '提货出库委托编辑'
        this.getEntrustDetail()
      }
    },
    methods: {
      getEntrustDetail() { // zhuimeikeji 获取详情
        getEntrustDetail(this.$route.query.id, this.forms.entrustType).then(res => {
          this.forms.entrustNo = res.data.entrustNo
          this.forms.entrustName = res.data.entrustName
          this.forms.entrustOrgId = res.data.entrustOrg.entrustOrgId
          this.forms.entrustOrgName = res.data.entrustOrg.entrustOrgName
          this.forms.projectId = res.data.projectId
          this.forms.projectName = res.data.projectName
          this.forms.entrustDesc = res.data.entrustDesc
          this.forms.specify = res.data.specify,
            this.forms.jobDate = res.data.jobDate
          this.forms.transportMode = res.data.transportMode
          this.forms.packingWay = res.data.packingWay
          this.forms.originName = res.data.originName
          this.forms.originCode = res.data.originCode
          this.forms.endCode = res.data.endCode
          this.forms.endName = res.data.endName
          this.forms.containerNum = res.data.containerNum
          this.forms.containerCargo = res.data.containerCargo
        })
      },

      getCustom() { // zhuimeikeji 加载货主列表
        getCustomList({
          'search_EQ_custBusAttribute.isCargoOwner': true
        }).then(res => {
          this.select.cargo = res.data.aaData
        })
      },
      getCustomList() { // zhuimeikeji 加载箱主列表
        getCustomList({
          'search_EQ_custBusAttribute.isOwner': true
        }).then(res => {
          this.select.belong = res.data.aaData
        })
      },
      containerType() { // zhuimeikeji 加载箱号列表
        getContainerTypeList().then(res => {
          this.select.boxType = res.data.aaData
        })
      },
      changeTraffic(val) { // zhuimeikeji 改变运输方式
        this.trafficType = val
        this.specify = ''
        this.forms.specify = ''
      },
      changeSpecify(val) { // zhuimeikeji 改变出库方式
        this.specify = val
        this.forms.containerCargo = []
        this.addEntrust()
      },
      handleSelectionChange(val) { // zhuimeikeji 选择行
        this.multipleSelection = val
      },
      addsubmit() { // zhuimeikeji 提交接口
        if (this.$route.query.id) {

          let specify = ''
          if (this.forms.specify === '1') {
            specify = true
          } else if (this.forms.specify === '2') {
            specify = false
          }
          let datas = {
            entrustName: this.forms.entrustName,
            entrustOrgId: this.forms.entrustOrgId,
            entrustOrgName: this.forms.entrustOrgName,
            entrustType: this.forms.entrustType,
            projectId: this.forms.projectId,
            projectName: this.forms.projectName,
            entrustDesc: this.forms.entrustDesc,
            jobDate: this.forms.jobDate,
            transportMode: this.forms.transportMode,
            packingWay: this.forms.packingWay,
            specify: specify,
            originName: this.forms.originName,
            originCode: this.forms.originCode,
            endCode: this.forms.endCode,
            endName: this.forms.endName,
            containerNum: this.forms.containerNum,
            containerCargo: this.forms.containerCargo
          }
          editEntrust(datas, this.$route.query.id, datas.entrustType).then(res => {
            console.log("添加成功")
          })

        } else { // zhuimeikeji 新增

          let specify = ''
          if (this.forms.specify === '1') {
            specify = true
          } else if (this.forms.specify === '2') {
            specify = false
          }
          let datas = {
            entrustName: this.forms.entrustName,
            entrustOrgId: this.forms.entrustOrgId,
            entrustOrgName: this.forms.entrustOrgName,
            entrustType: this.forms.entrustType,
            projectId: this.forms.projectId,
            projectName: this.forms.projectName,
            entrustDesc: this.forms.entrustDesc,
            jobDate: this.forms.jobDate,
            transportMode: this.forms.transportMode,
            packingWay: this.forms.packingWay,
            specify: specify,
            originName: this.forms.originName,
            originCode: this.forms.originCode,
            endCode: this.forms.endCode,
            endName: this.forms.endName,
            containerNum: this.forms.containerNum,
            containerCargo: this.forms.containerCargo
          }
          addEntrust(datas, datas.entrustType).then(res => {
            console.log("添加成功")
          })

        }

      },
      addEntrust() { // zhuimeikeji 新增箱型信息
        let datas = {}
        if (this.trafficType === 'TR' && this.specify === '1') {
          datas = { // 集装箱信息 运输方式为火车出库方式为指定箱
            groupNo: '', // 配组号
            containerNo: '',
            containerType: '',
            containerSize: '', // 尺寸
            ifHeavy: '', // 空重
            sealNumber: '',
            tradeType: '', // 内外贸
            owner: '', // 箱主ID
            cargoName: '',
            cargoOwner: '', // 货主ID
            cargoWeight: '', // 货重
          }
        } else if (this.trafficType === 'TR' && this.specify === '2') {
          datas = { // 集装箱信息 运输方式为火车出库方式为大堆箱
            containerType: '',
            containerSize: '', // 尺寸
            ifHeavy: '', // 空重
            tradeType: '', // 内外贸
            owner: '', // 箱主ID
            cargoName: '',
            cargoCount: '', // 箱数
          }
        } else if (this.trafficType === 'CR' && this.specify === '1') {
          datas = { // 集装箱信息 运输方式为汽车出库方式为指定箱
            plateNum: '', // 车牌号
            containerNo: '',
            containerType: '',
            containerSize: '', // 尺寸
            ifHeavy: '', // 空重
            sealNumber: '',
            tradeType: '', // 内外贸
            owner: '', // 箱主ID
            cargoName: '',
            cargoOwner: '', // 货主ID
            cargoWeight: '', // 货重
          }
        } else if (this.trafficType === 'CR' && this.specify === '1') {
          datas = { // 集装箱信息 运输方式为汽车出库方式为大堆箱
            containerType: '',
            containerSize: '', // 尺寸
            ifHeavy: '', // 空重
            tradeType: '', // 内外贸
            owner: '', // 箱主ID
            cargoName: '',
            cargoCount: '', // 箱数
          }
        }
        this.forms.containerCargo.push(datas)
        this.forms.containerNum = this.forms.containerCargo.length
      },
      chooseBox() { // zhuimeikeji 选择集装箱
        this.$refs.descInfo.dialogForm = true
      },
      delEntrust() { // zhuimeikeji 删除选中的行
        if (this.multipleSelection.length > 0) {
          this.forms.containerCargo = this.forms.containerCargo.filter(res => {
            return !this.multipleSelection.includes(res)
          })
        } else {
          this.$message({
            message: `请先选择一条数据`,
            type: 'error'
          })
        }
      }
    }
  }

</script>

<style scoped>


</style>
