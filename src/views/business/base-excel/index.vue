<template>
  <section>
    <base-list ref="excel" :condition="condition" :datas.sync="excelTemplates" :pageSearch="pageSearch" class="alone-row">
      <el-form :inline="true" slot="search" :model="condition" class="search-form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="模版名称:">
              <el-input v-model.trim="condition['search_LIKE_name']"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="模板代码:">
              <el-input v-model.trim="condition['search_LIKE_code']"></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="loadData">查 询</el-button>
            <el-button icon="el-icon-plus" @click="formVisible=true"
            v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_EXCEL:ADD')!==-1">模板新增</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table slot="list" :data="excelTemplates" border stripe max-height="500">
        <el-table-column type="index" label="序号" width="50" align="center">
        </el-table-column>
        <el-table-column prop="name" label="模板名称">
        </el-table-column>
        <el-table-column prop="code" label="模板代码">
        </el-table-column>
        <el-table-column prop="downloadNum" label="下载量">
        </el-table-column>
        <el-table-column prop="createTime" label="上传时间">
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="260" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleExportExcel(scope.row)">下载</el-button>
            <el-dropdown style="margin-left:10px">
              <span class="el-dropdown-link">
                <el-button size="small" type="text">更多
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button type="text" size="small" @click="excelTemplate=JSON.parse(JSON.stringify(scope.row));formVisible=true"
                  v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_EXCEL:UPD')!==-1">编辑</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" size="small" class="danger" @click="handleDelete(scope.$index, scope.row)"
                  v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_EXCEL:DEL')!==-1">删除</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </base-list>

    <el-dialog :title="title" :visible.sync="formVisible" :before-close="handleCancel" :close-on-click-modal="false" width="1020px"
      top="2vh">
      <el-form ref="form" :model="excelTemplate" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="模板名称：" prop="name">
              <el-input v-model="excelTemplate.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模板代码：" prop="code">
              <el-input v-model="excelTemplate.code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注：" prop="remark">
              <el-input v-model="excelTemplate.remark" type="textarea" :autosize="{ minRows: 3 }"  :maxlength="$length"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <section>
          <div style="margin-bottom: 20px">
            <h3>物资信息</h3>
            <div>
              <el-button @click="excelTemplate.excelModelRules.push({})" icon="el-icon-plus">增加</el-button>
            </div>
          </div>
          <el-table :data="excelTemplate.excelModelRules" border max-height="300">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column label="字段名" width="140">
              <template slot-scope="scope">
                <el-input v-model="scope.row.chineseTitle"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="字段代码" width="160">
              <template slot-scope="scope">
                <el-input v-model="scope.row.englishTitle"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="必须">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.isMust"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="参数类型" width="120">
              <template slot-scope="scope">
                <el-select v-model="scope.row.type" placeholder="状态选择">
                  <el-option v-for="[key, val] of _dictExcelFieldTypes" :label="val" :value="key" :key="key"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="demo" label="示例字段" width="160">
              <template slot-scope="scope">
                <el-input type="textarea" :maxlength="$length"  :rows="2" v-model="scope.row.demo"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="pack" label="校验规则" width="160">
              <template slot-scope="scope">
                <el-input type="textarea" :maxlength="$length"  :rows="2" v-model="scope.row.rule"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="140" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button size="small" class="danger" type="text" @click="removeField(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </section>
      </el-form>
      <div slot="footer">
        <el-button @click.native="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSubmitExcelTemplate">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  // 导入查看页面
  import {
    getExcelTemplates,
    delExcelTemplate,
    saveExcelTemplate,
    updateExcelTemplate,
    dolNum
  } from '@/api/excel/index'
  import {
    exportExcel
  } from '@/utils/excel-export'

  export default {
    name:"excel模板",
    computed: {
      title () {
        return this.excelTemplate.id ? '编辑模板' : '新增模板'
      }
    },
    data () {
      return {
        condition: {},
        pageSearch: getExcelTemplates,
        excelTemplate: this.initExcelTemplate(),
        excelTemplates: [],
        formVisible: false,
        exportExcel: exportExcel
      }
    },
    mounted () {
      this.loadData()
    },
    methods: {
      loadData () {
        this.$refs.excel.loadData()
      },
      initExcelTemplate () {
        return {
          excelModelRules: []
        }
      },
      // 删除
      handleDelete (index, row) {
        this.$confirm('确定删除该模板?', '提示', {
          type: 'warning'
        }).then(() => {
          delExcelTemplate(row).then(() => {
            this.loadData()
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          })
        })
      },
      handleCancel () {
        if (!this.excelTemplate.id) {
          this.$confirm('此次新增未保存是否关闭').then(_ => {
            this.cleanForm(true)
          }).catch(_ => {})
        } else {
          this.cleanForm(true)
        }
      },
      removeField (index) {
        this.excelTemplate.excelModelRules.splice(index, 1)
      },
      cleanForm (isRefresh) {
        if (!isRefresh) {
          this.loadData()
        }
        this.excelTemplate = this.initExcelTemplate()
        this.formVisible = false
      },
      handleExportExcel (info) {
        let cols = []
        info.excelModelRules.forEach(item => {
          cols.push(item.chineseTitle)
        })
        exportExcel(info.name, cols, [])
  
        // dolNum(info.id).then(res => {
        //   this.loadData()
        // })
      },
      handleSubmitExcelTemplate () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              if (!this.excelTemplate.id) {
                saveExcelTemplate(this.excelTemplate).then(() => {
                  this.$message({
                    message: '新增excel模板成功',
                    type: 'success'
                  })
                  this.cleanForm()
                })
              } else {
                this.excelTemplate.excelModelRules.forEach(item => {
                  delete item['excelModelId']
                  delete item['excelModel']
                })
                updateExcelTemplate(this.excelTemplate.id, this.$assist.cleanHasFields(this.excelTemplate, [
                  'id', 'orgId', 'busType', 'createDateTime', 'createTime', 'lastModifiedDateTime'
                ])).then(() => {
                  this.$message({
                    message: '编辑excel模板成功',
                    type: 'success'
                  })
                  this.cleanForm()
                })
              }
            })
          } else {
            this.$message({
              message: '请检查表单数据',
              type: 'error'
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.el-form-item{
  .el-input{
    width: 220px;
  }
  .el-textarea{
    width:220px;
  }
}
  .dialog-footer {
    margin-top: 20px;
  }
</style>