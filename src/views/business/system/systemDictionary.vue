<template>
    <div>
        <base-list ref="systemDictionary" :condition="condition" :datas.sync="systemDictionary" :pageSearch="pageSearch">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="字典代码">
                            <el-input v-model.trim="condition['search_LIKE_dicCode']" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="字典名称">
                            <el-input v-model.trim="condition['search_LIKE_dicName']" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="字典类型">
                            <el-select v-model="condition['search_EQ_dicType']" placeholder="请选择" clearable>
                                <el-option v-for="[key, val] in _dictDicType" :key="key" :label="val" :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" icon="el-icon-search" @click="loadData" class="ml-80">查 询</el-button>
                        <el-button formVisible="true" icon="el-icon-plus" @click="handleDialogFormOpen(false)" v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_DICTIONARY:ADD')!==-1">新增
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table slot="list" :data="systemDictionary" border stripe max-height="500">
                <el-table-column prop="dicCode" label="字典代码" sortable min-width="120"></el-table-column>
                <el-table-column prop="dicName" label="字典名称" sortable min-width="200"></el-table-column>
                <el-table-column prop="dicType" label="字典类型" sortable min-width="200">
                    <template slot-scope="scope">
                        {{ scope.row.dicType | _filterDicType }}
                    </template>
                </el-table-column>
                <el-table-column prop="dicValue" label="字典值" sortable min-width="200"></el-table-column>
                <el-table-column prop="remark" label="备注" sortable min-width="200"></el-table-column>
                <el-table-column fixed="right" align="center" label="操作" sortable width="140">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="handleDialogFormOpen(true,scope.row)" v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_DICTIONARY:UPD')!==-1">编辑</el-button>
                        <el-button type="text" class="danger" size="small" @click="handleRemove(scope.row)" v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_DICTIONARY:DEL')!==-1">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <systemDictionary-form ref="systemDictionaryForm" @load="loadData"></systemDictionary-form>
    </div>
</template>

<script>
    import {
        deleteSystemDictionary,
        getSystemDictionaryList
    } from "@/api/system/systemDictionary";
    import systemDictionaryForm from './systemDictionaryForm'

    export default {
        name: "系统字典",
        components: {
            systemDictionaryForm
        },
        data() {
            return {
                condition: {
                    'search_EQ_firstRoot': '1'
                }, // 查询条件
                systemDictionary: [], // table数组
                pageSearch: getSystemDictionaryList, // 分页查询api接口
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            loadData() {
                this.$refs.systemDictionary.loadData()
            },
            handleDialogFormOpen(bool, item) {
                if (bool) {
                    let form = JSON.parse(JSON.stringify(item))
                    this.$refs.systemDictionaryForm.form = {
                        id: form.id,
                        dicName: form.dicName,
                        dicCode: form.dicCode,
                        remark: form.remark,
                        dicType: form.dicType,
                        dicArr: form.dicArr,
                        orgId: form.org.id,
                        orgName: form.org.name,
                    }
                    this.$refs.systemDictionaryForm.isEdit = true
                    this.$refs.systemDictionaryForm.dialogForm = true
                } else {
                    this.$refs.systemDictionaryForm.dialogForm = true
                }
            },
            handleRemove(item) {
                deleteSystemDictionary(item.id).then(res => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.loadData()
                })
            }
        },
    }

</script>

<style scoped>


</style>
