<template>
  <div>
    <h2 class="page-title" v-html="titleType"></h2>
    <base-info :forms="forms"></base-info>
    <desc-info :forms="forms" :pageType="pageType" :isTransportMode="isTransportMode"></desc-info>

    <div class="desc-list">
      <div class="header">委托信息</div>
      <btn-group :show-box="true" :show-add="false"></btn-group>
        <el-table
          ref="multipleTable"
          :data="forms.containerCargo"
          border
          stripe
          style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
            label="箱号"
            width="120">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.containerNo" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="箱型">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.containerType" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="尺寸">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.containerSize" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="空重">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.ifHeavy" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="铅封号">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.sealNumber" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="内外贸">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.tradeType" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="箱主">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.owner" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="货名">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.cargoName" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="货重">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.cargoWeight" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="货主">
            <template slot-scope="scope">
              <el-input type="text" auto-complete="off" v-model="scope.row.cargoOwner" disabled></el-input>
            </template>
          </el-table-column>
      </el-table>
      <el-row class="mt-16">
        <el-button type="primary" @click.native="addsubmit()">确定</el-button>
        <el-button type="primary" @click.native="$router.push({ name: 'home' })">取消</el-button>
      </el-row>
    </div>

    <btn-dialog ref="btnDialog"></btn-dialog>
  </div>
</template>

<script>
import { addEntrust } from '@/api/entrust'
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
  data () {
    return {
      titleType: '拆箱委托新增',
      pageType: 'takeApart',  // zhuimeikeji 类型调用
      isTransportMode: false, // zhuimeikeji 运输方式是否可选
      multipleSelection: [],
      forms: {
        entrustName: '',
        entrustOrgId: '',
        entrustOrgName: '',
        entrustType: 'CXWT',
        entrustTypeText: '拆箱',
        projectId: '',
        projectName: '',
        entrustDesc: '',
        jobDate: '',
        containerNum: 0,
        containerCargo:[]
      }
    }
  },
  mounted () {

    if(this.$route.query.id) { // 检测编辑页面
      this.titleType = '拆箱委托编辑'
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

    handleSelectionChange(val) { // zhuimeikeji 选择行
      this.multipleSelection = val
    },
    addsubmit () { // zhuimeikeji 提交接口
      if (this.$route.query.id) {

        let specify = ''
        if(this.forms.specify === '1') {
          specify = true
        } else if(this.forms.specify === '2') {
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
          containerNum: this.forms.containerNum,
          containerCargo: this.forms.containerCargo
        }
        editEntrust(datas, this.$route.query.id, datas.entrustType).then(res => {
          console.log("添加成功")
        })

      } else { // zhuimeikeji 新增

        let specify = ''
        if(this.forms.specify === '1') {
          specify = true
        } else if(this.forms.specify === '2') {
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
          containerNum: this.forms.containerNum,
          containerCargo: this.forms.containerCargo
        }
        addEntrust(datas, datas.entrustType).then(res => {
          console.log("添加成功")
        })

      }
    },
    addEntrust () { // zhuimeikeji 新增箱型信息
      let datas = {}
      if(this.trafficType === 'TR' && this.specify === '1') {
        datas = {              // 集装箱信息 运输方式为火车出库方式为指定箱
          groupNo: '',                      // 配组号
          containerNo: '',               
          containerType: '',
          containerSize: '',               // 尺寸
          ifHeavy: '',                      // 空重
          sealNumber: '',
          tradeType: '',                    // 内外贸
          owner: '',                        // 箱主ID
          cargoName: '',
          cargoOwner: '',                   // 货主ID
          cargoWeight: '',                // 货重
        }
      } else if(this.trafficType === 'TR' && this.specify === '2') {
        datas = {              // 集装箱信息 运输方式为火车出库方式为大堆箱
          containerType: '',
          containerSize: '',               // 尺寸
          ifHeavy: '',                      // 空重
          tradeType: '',                    // 内外贸
          owner: '',                        // 箱主ID
          cargoName: '',
          cargoCount: '',                 // 箱数
        }
      } else if(this.trafficType === 'CR' && this.specify === '1') {
        datas = {              // 集装箱信息 运输方式为汽车出库方式为指定箱
          plateNum: '',                      // 车牌号
          containerNo: '',               
          containerType: '',
          containerSize: '',               // 尺寸
          ifHeavy: '',                      // 空重
          sealNumber: '',
          tradeType: '',                    // 内外贸
          owner: '',                        // 箱主ID
          cargoName: '',
          cargoOwner: '',                   // 货主ID
          cargoWeight: '',                // 货重
        }
      } else if(this.trafficType === 'CR' && this.specify === '1') {
        datas = {              // 集装箱信息 运输方式为汽车出库方式为大堆箱
          containerType: '',
          containerSize: '',               // 尺寸
          ifHeavy: '',                      // 空重
          tradeType: '',                    // 内外贸
          owner: '',                        // 箱主ID
          cargoName: '',
          cargoCount: '',                 // 箱数
        }
      }
      this.forms.containerCargo.push(datas)
      this.forms.containerNum = this.forms.containerCargo.length
    },
    chooseBox () { // zhuimeikeji 选择集装箱
      this.$refs.btnDialog.dialogForm = true
    },
    delEntrust () { // zhuimeikeji 删除选中的行
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
