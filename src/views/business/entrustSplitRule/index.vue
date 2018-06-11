<template>
    <div>
        <base-list ref="entrustSplitRule" :condition="condition" :datas.sync="entrustSplitRule"
                   :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="100px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="计划分发规则">
                            <el-input v-model="condition['search_LIKE_ruleName']" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="委托类型名称">
                            <el-select v-model="condition['search_EQ_entrustType']" placeholder="请选择" clearable>
                                <el-option v-for="[key, val] in _dictEntrustType" :key="key" :label="val"
                                           :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <!--<el-form-item label="运输方式">-->
                            <!--<el-select v-model="condition['search_EQ_transportMode']" placeholder="请选择" clearable>-->
                                <!--<el-option v-for="[key, val] in _dictTransportModeType" :key="key" :label="val"-->
                                           <!--:value="key"></el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                        <el-form-item label="状态">
                            <el-select v-model="condition['search_EQ_valid']" placeholder="请选择" clearable>
                                <el-option v-for="[key, val] in _dictValidType" :key="key" :label="val"
                                           :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="创建时间">
                            <date-slot :startDate.sync="condition['search_GTE_createDateTime']"
                                       :endDate.sync="condition['search_LTE_createDateTime']"></date-slot>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" icon="el-icon-search" @click="loadData" class="ml-100">查 询</el-button>
                        <el-button formVisible="true" icon="el-icon-plus" @click="handleDialogFormOpen(false)">新增
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="entrustSplitRule" border stripe max-height="500">
                <!--<el-table-column prop="id" fixed="left" label="规则编号" sortable width="115">-->
                    <!---->
                <!--</el-table-column>-->
                <el-table-column label="序号" min-width="50">
                    <template slot-scope="scope">
                        {{ scope.$index+1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="ruleName" label="计划分发规则名称" sortable min-width="300">
                    <template slot-scope="scope">
                        <a style="color: blue" @click="handleOpenDetail(scope.row.id)">{{ scope.row.ruleName }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="entrustType" label="委托类型名称" sortable min-width="140">
                    <template slot-scope="scope">
                        {{ scope.row.entrustType | _filterEntrustType }}
                    </template>
                </el-table-column>
                <el-table-column prop="orgName" label="所属单位" sortable min-width="200"></el-table-column>
                <el-table-column prop="valid" label="是否有效" sortable min-width="110">
                    <template slot-scope="scope">
                        {{ scope.row.valid | _filterValidType }}
                    </template>
                </el-table-column>
                <el-table-column prop="validDate.startDate" label="有效期起" sortable min-width="120"></el-table-column>
                <el-table-column prop="validDate.endDate" label="有效期止" sortable min-width="120"></el-table-column>
                <el-table-column prop="createBy" label="创建人" sortable width="100"></el-table-column>
                <el-table-column prop="createDateTime" label="创建时间" sortable min-width="120"></el-table-column>
                <el-table-column fixed="right" align="center" label="操作" sortable width="140">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="handleDialogFormOpen(true,scope.row)">编辑</el-button>
                        <el-button type="text" class="danger" size="small" @click="handleRemove(scope.row.id)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <el-dialog :title="isEdit?'编辑委托拆分计划规则':'新增委托拆分计划规则'" :visible.sync="dialogForm" width="1100px">
            <entrustSplitRule-form ref="entrustSplitRuleForm" @load="loadData"></entrustSplitRule-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogForm = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit">保 存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="查询委托拆分计划规则" :visible.sync="dialogFormDetail" width="1000px">
            <entrust-split-rule-detail ref="entrustSplitRuleDetail"></entrust-split-rule-detail>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormDetail = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { deleteEntrustSplitRule, getEntrustSplitRuleList } from "@/api/entrustSplitRule/entrustSplitRule";
    import entrustSplitRuleForm from './entrustSplitRuleForm'
    import entrustSplitRuleDetail from './entrustSplitRuleDetail'
    import dateSlot from '@/components/date/dateSlot'

    export default {
        name: "委托拆分计划规则",
        components: { entrustSplitRuleForm, entrustSplitRuleDetail, dateSlot },
        data() {
            return {
                condition: {},                      // 查询条件
                entrustSplitRule: [],                      // table数组
                pageSearch: getEntrustSplitRuleList,          // 分页查询api接口
                dialogForm: false,
                isEdit: false,                       // 是否编辑状态
                dialogFormDetail: false,
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            loadData() {
                console.log('111')
                this.dialogForm = false
                this.isEdit = false
                this.$refs.entrustSplitRule.loadData()
            },
            handleOpenDetail(id) {
                this.dialogFormDetail = true
                this.$nextTick(()=>{
                    this.$refs.entrustSplitRuleDetail.getData(id)
                })
            },
            handleDialogFormOpen(bool, item) {
                if (bool) {
                    this.dialogForm = true
                    this.isEdit = true
                    this.$nextTick(() => {
                        this.$refs.entrustSplitRuleForm.getData(item.id)
                        this.$refs.entrustSplitRuleForm.isEdit = true
                    })
                } else {
                    this.dialogForm = true
                }
            },
            handleRemove(id) {
                deleteEntrustSplitRule(id).then(res => {
                    this.$message({ message: '删除成功!', type: 'success' });
                    this.loadData()
                })
            },
            handleSubmit() {
                this.$refs.entrustSplitRuleForm.handleSubmit(this.isEdit)
            }
        },
        watch: {
            dialogForm(bool) {
                if (!bool) {
                    this.isEdit = false
                    this.$refs.entrustSplitRuleForm.form = this.$refs.entrustSplitRuleForm.clearForm()
                    this.$refs.entrustSplitRuleForm.checkedCondition = []
                    this.$refs.entrustSplitRuleForm.isCheck = []
                    this.$refs.entrustSplitRuleForm.isIndeterminate =false
                    this.$refs.entrustSplitRuleForm.$refs.form.resetFields()
                }
            }
        }
    }
</script>

<style scoped>

</style>
