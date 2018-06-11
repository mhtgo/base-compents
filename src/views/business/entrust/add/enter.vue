<template>
  <div ref="dd">
    <h2 class="page-title" v-html="titleType"></h2>
    <base-info :forms="forms" ref="baseinfo"></base-info>
    <desc-info :forms="forms" ref="descinfo" :pageType="pageType" :isTransportMode="isTransportMode"></desc-info>

    <div class="desc-list">
      <div class="header">集装箱信息</div>
      <div v-show="trafficType === 'CR'">
        <btn-group :show-box="false" :show-add="true"></btn-group>
        <el-table ref="multipleTable" :data="forms.containerCargo" border stripe style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="箱号" width="120">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.containerNo"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="车牌号" width="120">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.plateNumber"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="箱型">
            <template slot-scope="scope">
              <el-select v-model="scope.row.containerType" placeholder="请选择箱型">
                <el-option v-for="item in select.boxType" :key="item.containerType" :label="item.containerType" :value="item.containerType">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="尺寸">
            <template slot-scope="scope">
              <el-select v-model="scope.row.containerSize" placeholder="请选择尺寸">
                <el-option v-for="item in select.boxSize" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
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

      <div v-show="trafficType === 'TR'">
        <btn-group :show-box="false" :show-add="true"></btn-group>
        <el-table ref="multipleTable" :data="forms.containerCargo" border stripe style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="name" label="箱号" width="120">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.containerNo"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="箱型">
            <template slot-scope="scope">
              <el-select v-model="scope.row.containerType" placeholder="请选择箱型">
                <el-option v-for="item in select.boxType" :key="item.containerType" :label="item.containerType" :value="item.containerType">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="尺寸">
            <template slot-scope="scope">
              <el-select v-model="scope.row.containerSize" placeholder="请选择尺寸">
                <el-option v-for="item in select.boxSize" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
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
          <el-table-column prop="address" label="铅封号">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.sealNumber"></el-input>
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
          <el-table-column prop="address" label="箱主">
            <template slot-scope="scope">
              <el-select v-model="scope.row.owner" placeholder="请选择箱主">
                <el-option v-for="item in select.belong" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="货名">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.cargoName"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="货主">
            <template slot-scope="scope">
              <el-select v-model="scope.row.cargoOwner" placeholder="请选择货主">
                <el-option v-for="item in select.cargo" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="货重">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.cargoWeight"></el-input>
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
    addEntrust,
    getEntrustDetail,
    editEntrust
  } from '@/api/entrust'
  import {
    getContainerTypeList
  } from '@/api/containerType/containerType'
  import {
    getCustomList
  } from '@/api/custom/customList'
  import {
    ifHeavyType
  } from '@/assets/dict'
  import baseInfo from './_baseInfo.vue'
  import descInfo from './_descInfo.vue'
  import btnGroup from './_btnGroup.vue'
  export default {
    components: {
      baseInfo,
      descInfo,
      btnGroup
    },
    data() {
      return {
        ispost: false,
        titleType: '进场入库委托新增',
        pageType: 'enter', // zhuimeikeji 类型调用
        isTransportMode: false, // zhuimeikeji 运输方式是否可选
        trafficType: '',
        multipleSelection: [],
        select: {
          boxType: [],
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
          entrustNo: '', // zhuimeikeji 编辑的时候才存在
          entrustName: '',
          entrustOrgId: '',
          entrustOrgName: '',
          entrustType: 'JCRK',
          entrustTypeText: '进场入库',
          projectId: '',
          projectName: '',
          entrustDesc: '',
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
      this.containerType()

      if (this.$route.query.id) { // 检测编辑页面
        this.titleType = '进场入库委托编辑'
        this.getEntrustDetail()
      }
    },
    methods: {
      getEntrustDetail() { // zhuimeikeji 获取详情
        getEntrustDetail(this.$route.query.id, this.forms.entrustType).then(res => {
          this.trafficType = res.data.transportMode
          this.forms.entrustNo = res.data.entrustNo
          this.forms.entrustName = res.data.entrustName
          this.forms.entrustOrgId = res.data.entrustOrgId
          this.forms.entrustOrgName = res.data.entrustOrgName
          this.forms.projectId = res.data.projectId
          this.forms.projectName = res.data.projectName
          this.forms.entrustDesc = res.data.entrustDesc
          this.forms.jobDate = res.data.jobDate
          this.forms.transportMode = res.data.transportMode
          this.forms.packingWay = res.data.packingWay
          this.forms.originName = res.data.originName
          this.forms.originCode = res.data.originCode
          this.forms.endCode = res.data.endCode
          this.forms.endName = res.data.endName
          this.forms.containerNum = res.data.containerNum
          this.forms.containerCargo = []
          for (let i = 0; i < res.data.containerCargo.length; i++) {
            let datas = {}
            if (this.trafficType === 'TR') {
              datas = { // 集装箱信息 运输方式为火车时
                containerNo: res.data.containerCargo[i].containerNo,
                containerType: res.data.containerCargo[i].containerType,
                containerSize: res.data.containerCargo[i].containerNo,
                ifHeavy: res.data.containerCargo[i].containerSize,
                sealNumber: res.data.containerCargo[i].sealNumber,
                tradeType: res.data.containerCargo[i].tradeType,
                owner: res.data.containerCargo[i].owner,
                cargoName: res.data.containerCargo[i].cargoName,
                cargoOwner: res.data.containerCargo[i].cargoOwner,
                cargoWeight: res.data.containerCargo[i].cargoWeight
              }
            } else if (this.trafficType === 'CR') {
              datas = { // 集装箱信息 运输方式为火车时
                containerNo: res.data.containerCargo[i].containerNo,
                plateNumber: res.data.containerCargo[i].plateNumber,
                containerType: res.data.containerCargo[i].containerType,
                containerSize: res.data.containerCargo[i].containerSize,
                ifHeavy: res.data.containerCargo[i].ifHeavy,
                owner: res.data.containerCargo[i].owner
              }
            }
            this.forms.containerCargo.push(datas)
          }
        })
      },

      setTitle() { // zhuimeikeji 设置标题红点
        let thArr = ['箱号', '车牌号', '箱型', '尺寸', '空重', '铅封号', '内外贸', '箱主', '货名']
        let th = document.getElementsByClassName('is-leaf')
        const red = '<a style="color:red;">*</a>'
        for (let i = 0; i < th.length; i++) {
          if (thArr.indexOf(th[i].innerText) !== -1) {
            th[i].innerHTML = '<div class="cell">' + th[i].innerText + red + '</div>'
          }
        }
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
          console.log(res.data.aaData)
          this.select.boxType = res.data.aaData
        })
      },
      changeTraffic(val) { // zhuimeikeji 改变运输方式
        this.trafficType = val
        this.forms.containerCargo = []
        this.addEntrust()
        this.setTitle()
      },
      handleSelectionChange(val) { // zhuimeikeji 选择行
        this.multipleSelection = val
      },
      addsubmit() { // zhuimeikeji 提交接口
        this.$refs.baseinfo.formvalidate()
        this.$refs.descinfo.formvalidate()
        if (!this.ispost) {
          return false
        }

        if (this.forms.containerCargo && this.forms.containerCargo.length === 0) {
          this.$message({
            message: `至少一条集装箱信息`,
            type: 'error'
          })
          return false
        }
        for (let i = 0; i < this.forms.containerCargo.length; i++) {
          if (!this.forms.containerCargo[i].containerNo) {
            this.$message({
              message: `请输入箱号`,
              type: 'error'
            })
            return false
          }
          if (this.forms.transportMode === 'CR' && !this.forms.containerCargo[i].plateNumber) {
            this.$message({
              message: `请输入车牌号`,
              type: 'error'
            })
            return false
          }
          if (!this.forms.containerCargo[i].containerType) {
            this.$message({
              message: `请选择箱型`,
              type: 'error'
            })
            return false
          }
          if (!this.forms.containerCargo[i].containerSize) {
            this.$message({
              message: `请输入尺寸`,
              type: 'error'
            })
            return false
          }
          if (!this.forms.containerCargo[i].ifHeavy) {
            this.$message({
              message: `请选择空重`,
              type: 'error'
            })
            return false
          }
          if (this.forms.transportMode === 'TR' && !this.forms.containerCargo[i].sealNumber) {
            this.$message({
              message: `请输入铅封号`,
              type: 'error'
            })
            return false
          }
          if (this.forms.transportMode === 'TR' && !this.forms.containerCargo[i].tradeType) {
            this.$message({
              message: `请选择内外贸`,
              type: 'error'
            })
            return false
          }
          if (!this.forms.containerCargo[i].owner) {
            this.$message({
              message: `请选择箱主`,
              type: 'error'
            })
            return false
          }
          if (this.forms.transportMode === 'TR' && !this.forms.containerCargo[i].cargoName) {
            this.$message({
              message: `请输入货名`,
              type: 'error'
            })
            return false
          }
        }
        if (this.$route.query.id) {
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
            originName: this.forms.originName,
            originCode: this.forms.originCode,
            endCode: this.forms.endCode,
            endName: this.forms.endName,
            containerNum: this.forms.containerNum,
            containerCargo: this.forms.containerCargo
          }
          editEntrust(datas, this.$route.query.id, datas.entrustType).then(res => {
            this.$message({
              message: `编辑成功`,
              type: 'error'
            })
            this.$router.go(-1)
          })
        } else { // zhuimeikeji 新增
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
            originName: this.forms.originName,
            originCode: this.forms.originCode,
            endCode: this.forms.endCode,
            endName: this.forms.endName,
            containerNum: this.forms.containerNum,
            containerCargo: this.forms.containerCargo
          }

          addEntrust(datas, datas.entrustType).then(res => {
            this.$message({
              message: `添加成功`,
              type: 'error'
            })
            this.$router.go(-1)
          })
        }

      },
      addEntrust() { // zhuimeikeji 新增箱型信息
        let datas = {}
        if (this.trafficType === 'TR') {
          datas = { // 集装箱信息 运输方式为火车时
            containerNo: '',
            containerType: '',
            containerSize: '',
            ifHeavy: '',
            sealNumber: '',
            tradeType: '',
            owner: '',
            cargoName: '',
            cargoOwner: '',
            cargoWeight: ''
          }
        } else if (this.trafficType === 'CR') {
          datas = { // 集装箱信息 运输方式为火车时
            containerNo: '',
            plateNumber: '',
            containerType: '',
            containerSize: '',
            ifHeavy: '',
            owner: ''
          }
        }
        this.forms.containerCargo.push(datas)
        this.forms.containerNum = this.forms.containerCargo.length
      },
      delEntrust() { // zhuimeikeji 删除选中的行
        if (this.multipleSelection.length > 0) {
          this.forms.containerCargo = this.forms.containerCargo.filter(res => {
            return !this.multipleSelection.includes(res)
          })
          this.forms.containerNum = this.forms.containerCargo.length
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
