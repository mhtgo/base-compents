<template>
    <el-dialog :title="isEdit?'编辑字典':'新增字典'" :visible.sync="dialogForm" width="80%">
        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="140px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="字典名称:" prop="dicName">
                        <el-input v-model="form.dicName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="字典代码:" prop="dicCode">
                        <el-input v-model="form.dicCode"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="所属单位:">
                        <!--<el-input v-model="form.orgId"></el-input>-->
                        <!-- <auto-search-org v-model="form.orgId"
                                         @select="v=>form.orgId=v"
                                         @selectName="v=>form.orgName=v"
                                         :name="form.orgName"></auto-search-org> -->
                        <!-- {{$store.state.user.currentUser.org.name}} -->
                        {{form.orgName}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="字典描述:" prop="remark">
                        <el-input type="textarea" :rows="3" style="width: 188px" placeholder="请输入内容"
                                  :maxLength="$maxLength"
                                  v-model="form.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="字典类型:">
                        <el-select v-model="form.dicType" placeholder="请选择">
                            <el-option v-for="[key, val] in _dictDicType" :key="key" :label="val"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-button v-if="form.dicType==='A'" @click="handleDicPush">新增子项
            </el-button>
            <el-row v-if="form.dicType==='A'">
                <el-col :span="24">
                    <el-table :data="form.dicArr" border stripe max-height="500">
                        <el-table-column prop="sortNo" label="排序" sortable min-width="120">
                            <template slot-scope="scope">
                                {{ scope.$index+1 }}
                                <!--<el-input-number :controls="false" v-model.trim="scope.row.sortNo"></el-input-number>-->
                            </template>
                        </el-table-column>
                        <el-table-column prop="dicCode" label="字典代码" sortable min-width="120">
                            <template slot-scope="scope">
                                <el-input maxlength="32" v-model.trim="scope.row.dicCode"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="dicName" label="字典名称" sortable min-width="120">
                            <template slot-scope="scope">
                                <el-input maxlength="32" v-model.trim="scope.row.dicName"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="dicValue" label="字典值" sortable min-width="120">
                            <template slot-scope="scope">
                                <el-input maxlength="32" v-model.trim="scope.row.dicValue"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" sortable min-width="120">
                            <template slot-scope="scope">
                                <el-button type="text" class="danger" size="small" @click="handleRemove(scope.$index)">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogForm = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="$store.getters.loadingBtn">保 存</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import { addSystemDictionary, updateSystemDictionary } from "@/api/system/systemDictionary";
    import autoSearchOrg from '@/components/autocomplete/autoSearchOrg'
    import { maxLength, sortLength } from "@/utils/rules";

    export default {
        name: "systemDictionaryForm",
        components: { autoSearchOrg },
        data() {
            return {
                form: this.clearForm(),
                rules: {
                    dicName: [{ required: true, message: '请输入字典名称', trigger: 'change' }, sortLength],
                    dicCode: [{ required: true, message: '请输入字典代码', trigger: 'change' }, sortLength],
                },
                dialogForm: false,
                isEdit: false,
            }
        },
        methods: {
            clearForm() {
                return {
                    dicName: '',
                    dicCode: '',
                    remark: '',
                    dicType: 'A',
                    dicArr: [{
                        sortNo: '',
                        dicCode: '',
                        dicName: '',
                        dicValue: '',
                        dicType: 'D',
                        org: {
                            id: this.$store.state.user.currentUser.org && this.$store.state.user.currentUser.org.id
                        },
                    }],
                    orgName: this.$store.state.user.currentUser.org && this.$store.state.user.currentUser.org.name,
                    orgId: this.$store.state.user.currentUser.org && this.$store.state.user.currentUser.org.id
                }
            },
            // 保存
            handleSubmit() {
                let dicType = this.form.dicType
                let dicArr = this.form.dicArr
                if (dicType === 'A') {
                    for (let i = 0; i < dicArr.length; i++) {
                        // if (!dicArr[i].sortNo) {
                        //     this.$message({ message: '请输入排序', type: 'error' })
                        //     return
                        // }
                        if (!dicArr[i].dicCode) {
                            this.$message({ message: '请输入字典代码', type: 'error' })
                            return
                        }
                        if (!dicArr[i].dicName) {
                            this.$message({ message: '请输入字典名称', type: 'error' })
                            return
                        }
                        if (!dicArr[i].dicValue) {
                            this.$message({ message: '请输入字典值', type: 'error' })
                            return
                        }
                    }
                }
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.form.firstRoot = true
                        this.isEdit ? this.handleToEdit() : this.handleToAdd()
                    } else {
                        this.$message({
                            message: '请检查表单',
                            type: 'error'
                        })
                    }
                })
            },
            handleDicPush() {
                this.form.dicArr.push({
                    org: {
                        id: this.$store.state.user.currentUser.org && this.$store.state.user.currentUser.org.id
                    },
                })
            },
            // 新增
            handleToAdd() {
                addSystemDictionary(this.form).then(res => {
                    this.$message({ message: '新增成功!', type: 'success' })
                    this.dialogForm = false
                    this.$emit('load')
                })
            },
            // 编辑
            handleToEdit() {
                updateSystemDictionary(this.form.id, this.form).then(res => {
                    this.$message({ message: '编辑成功!', type: 'success' })
                    this.dialogForm = false
                    this.$emit('load')
                })
            },
            // 删除
            handleRemove(index) {
                this.form.dicArr.splice(index, 1)
            }
        },
        watch: {
            dialogForm(bool) {
                if (!bool) {
                    this.$refs.form.resetFields()
                    this.isEdit = false
                    this.form = this.clearForm()
                }
            },
            type(val) {
                this.form.dicArr = []
            }
        },
        computed: {
            type() {
                return this.form.dicType
            }
        }
    }
</script>

<style scoped>

</style>
