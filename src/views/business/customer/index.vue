<template>
    <div>
        <base-list ref="customer" :condition="condition" :isShowClose="true" :datas.sync="customers" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="客户类型">
                            <el-select v-model="condition['search_EQ_customerType']" placeholder="请选择" clearable>
                                <el-option v-for="[key, val] in _dictCustomType" :key="key" :label="val"
                                           :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="企业性质">
                            <el-select v-model="condition['search_EQ_entNature']" placeholder="请选择" clearable>
                                <el-option v-for="[key, val] in _dictCompanyNature" :key="key" :label="val"
                                           :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="客户名称">
                            <search-custom @selectName="v=>condition['search_LIKE_name']=v"></search-custom>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" icon="el-icon-search" @click="loadData" class="ml-80">查 询</el-button>
                        <el-button type="primary" @click="loadData">刷 新</el-button>
                        <el-button formVisible="true" icon="el-icon-plus" @click="handleDialogFormOpen(false)"
                        v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_CUSTOM:ADD')!==-1">新增
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="customers" border stripe max-height="500">
                <el-table-column fixed="left" prop="customerCode" label="客户单位代码" sortable min-width="130"></el-table-column>
                <el-table-column prop="shortName" label="客户简称" sortable min-width="120"></el-table-column>
                <el-table-column prop="name" label="客户名称" sortable min-width="200">
                    <template slot-scope="scope">
                        <a style="color: blue" @click="handleLookUp(scope.row)">{{ scope.row.name }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="customerType" label="客户类型" sortable min-width="120">
                    <template slot-scope="scope">
                        {{ scope.row.customerType | _filterCustomType }}
                    </template>
                </el-table-column>
                <el-table-column prop="creditCode" label="社会信用代码" sortable
                                 min-width="180"></el-table-column>
                <el-table-column prop="entNature" label="企业性质" sortable min-width="120">
                    <template slot-scope="scope">
                        {{ scope.row.entNature | _filterCompanyNature }}
                    </template>
                </el-table-column>
                <el-table-column prop="linkMan" label="联系人" sortable min-width="120"></el-table-column>
                <el-table-column prop="linkTel" label="联系电话" sortable min-width="150"></el-table-column>
                <el-table-column fixed="right" align="center" label="操作" sortable width="140">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="handleDialogFormOpen(true,scope.row)"
                        v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_CUSTOM:UPD')!==-1">编辑</el-button>
                        <el-button type="text" class="danger" size="small" @click="handleRemove(scope.row.id)"
                        v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WBUSMGR_BUSMGR_CUSTOM:DEL')!==-1">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <custom-form ref="customForm" @load="loadData"></custom-form>
        <custom-detail ref="customDetail"></custom-detail>
    </div>
</template>

<script>
    import { delCustomer, getCustomList } from "@/api/custom/customList";
    import CustomForm from './customForm'
    import CustomDetail from './customDetail'
    import { companyNature, customType } from "@/assets/dict";
    import { MessageBox } from 'element-ui';
    import searchCustom from '@/components/autocomplete/autoSearchCustom'

    export default {
        name:"客户管理",
        components: { CustomForm, CustomDetail, searchCustom },
        data() {
            return {
                condition: {},                      // 查询条件
                customers: [],                      // table数组
                pageSearch: getCustomList,          // 分页查询api接口
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            loadData() {
                this.$refs.customer.loadData()
            },
            // 打开开户form表单,如果是编辑,则给form赋值
            handleDialogFormOpen(isEdit, item) {
                if (isEdit) {
                    this.$refs.customForm.isEdit = true
                    this.$refs.customForm.form = JSON.parse(JSON.stringify(item))
                }else {
                    this.$refs.customForm.form.entNature = 'GYQY'
                }
                this.$refs.customForm.dialogForm = true
            },
            // 通过ID删除
            handleRemove(id) {
                MessageBox.confirm('此操作将永久删除该客户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delCustomer(id).then(res => {
                        this.$message({
                            message: `删除成功!`,
                            type: 'success'
                        })
                        this.$storageMsg('loadData')
                        this.loadData()
                    })
                })
            },
            // 查看表单
            handleLookUp(item) {
                this.$refs.customDetail.form = JSON.parse(JSON.stringify(item))
                this.$refs.customDetail.dialogForm = true
            },
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
