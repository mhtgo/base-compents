<template>
  <base-list ref="xmsearch" :condition="condition" :datas.sync="contracts" :pageSearch="pageSearch">
    <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="箱号" prop="name">
            <el-input type="text" v-model="condition['search_LIKE-containerNo']" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="品名" prop="name">
            <el-input type="text" v-model="condition['search_LIKE_cargoName']" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="箱属">
            <el-select v-model="condition['search_EQ_ownerId']" placeholder="请选择" clearable>
              <el-option v-for="[key, val] in _dictBusinessModel" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="8">
          <el-form-item label="项目类型">
            <el-select v-model="condition['search_EQ_projectType']" placeholder="请选择" clearable>
              <el-option v-for="[key, val] in _dictProjectType" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="项目名称" prop="name">
            <el-input type="text" v-model="condition['search_LIKE_name']" clearable></el-input>
          </el-form-item>
        </el-col>



        <el-col :span="8">
          <el-form-item label="项目状态">
            <el-select v-model="condition['search_EQ_projectStatus']" placeholder="请选择" clearable>
              <el-option v-for="[key, val] in _dictProjectStatus" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="创建时间">
            <date-slot :startDate.sync="condition.startDate" :endDate.sync="condition.endDate"></date-slot>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button type="primary" icon="el-icon-search" @click="loadData" class="ml-80">查 询</el-button>
          <el-button type="primary" class="ml-80" @click="btnYes">确定</el-button>
          <el-button type="danger" @click="reSet">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table slot="list" :data="contracts" border stripe max-height="500">
      <el-table-column fixed="left" label="选择" width="50">
        <template slot-scope="scope">
          <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.row)"></el-radio>
        </template>
      </el-table-column>

      <el-table-column prop="code" label="项目编号" min-width="180">
        <template slot-scope="scope">
          <a style="color: blue" v-if="scope.row.projectType==='NORMAL'">{{ scope.row.code }}</a>
          <span v-else>{{ scope.row.code }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="项目名称" min-width="180"></el-table-column>

      <el-table-column prop="customerName" label="客户名称" min-width="160">
        <template slot-scope="scope">
          <a style="color: blue" @click="_toOpenCustomerDetail(scope.row.customerId)">
            {{ scope.row.customerName }}
          </a>
        </template>
      </el-table-column>

      <el-table-column prop="businessMode" label="业务模式" sortable min-width="120">
        <template slot-scope="scope">
          {{ scope.row.businessMode | _filterBusinessModel }}
        </template>
      </el-table-column>

      <el-table-column prop="projectType" label="项目类型" sortable min-width="120">
        <template slot-scope="scope">
          {{ scope.row.projectType | _filterProjectType }}
        </template>
      </el-table-column>

      <el-table-column prop="startDate" label="有效期起" min-width="120"></el-table-column>
      <el-table-column prop="endDate" label="有效期止" min-width="120"></el-table-column>
      <el-table-column prop="projectStatus" label="项目状态" min-width="120">
        <template slot-scope="scope">
          {{ scope.row.projectStatus | _filterProjectStatus }}
        </template>
      </el-table-column>
      <el-table-column prop="createBy" label="创建人" min-width="120"></el-table-column>

    </el-table>
  </base-list>
</template>

<script>
  import {
    projectList
  } from "@/api/project/project";
  import {
    companyNature,
    customType
  } from "@/assets/dict"
  import dateSlot from '@/components/date/dateSlot'

  export default {
    name: "btnGroup",
    props: ['forms'],
    components: {
      dateSlot
    },
    data() {
      return {
        radio: '', // 分页查询api接口
        row: '',
        condition: {
          search_EQ_partyId: this.forms.entrustOrgId
        }, // 查询条件
        contracts: [], // table数组
        pageSearch: projectList
      }
    },
    mounted() {
      this.loadData()
    },
    methods: {
      loadData() {
        this.$refs.xmsearch.loadData()
      },
      getCurrentRow(row) { // zhuimeikeji 选择项目
        this.row = row
      },
      reSet() { // zhuimeikeji 取消选择
        this.radio = ''
        this.row = ''
      },
      btnYes() { // zhuimeikeji 确定选择
        this.forms.projectId = this.row.id
        this.forms.projectName = this.row.name
        this.$parent.$parent.dialogForm = false
      }
    }
  }

</script>

<style scoped>


</style>
