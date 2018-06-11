<template>

    <!-- 批量拆箱 -->
    <el-dialog title="批量拆箱" :visible.sync="dialogForm" width="600px">

        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="110px">
            <el-row>
                <el-col :span="8">
                    <excel-import code="PLCX" @getUploadData="handleImport"></excel-import>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label=" " class="flexCenter">
                        <el-table :data="form.container" border max-height="300">
                            <el-table-column label="序号" min-width="80">
                                <template slot-scope="scope">
                                    {{ scope.$index+1 }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="containerNo" label="箱号" min-width="220"></el-table-column>
                            <el-table-column prop="plateNumber" label="车牌号" min-width="220"></el-table-column>
                            <el-table-column prop="options" fixed="right" align="center" label="操作" sortable
                                             width="80" :colpan="1" :rowspan="2">
                                <template slot-scope="scope">
                                    <el-button type="text" class="danger" size="small"
                                               @click="form.container.splice(scope.$index,1)">
                                        删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-form-item label="拆箱时间" prop="unboxDate">
                        <el-date-picker v-model="form.unboxDate"
                                        value-format="yyyy-MM-dd"
                                        type="date"
                                        placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>

            </el-row>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSubmit" :loading="$store.getters.loadingBtn">确定</el-button>
            <el-button @click="dialogForm = false">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import ExcelImport from '@/components/excel/import'
    import { unboxBatch } from '@/api/containerJob/containerJob'

    export default {
        name: "PLCX",
        components: { ExcelImport },
        data() {
            return {
                isEdit: false,
                dialogForm: false,
                form: {
                    unboxDate: '',
                    container: [],
                },
                rules: {
                    unboxDate: [{ required: true, message: '请选择拆箱时间', trigger: 'change' }],
                },
                multipleSelection: [],               // 选择的行
            }
        },
        methods: {
            handleImport(val) {
                this.form.container.push(...val)
            },
            handleSubmit() {
                if (this.form.container.length < 1) {
                    this.$message({ message: '至少添加一条数据!', type: 'error' })
                    return
                }
                this.$refs.form.validate(valid => {
                    if (valid) {
                        unboxBatch(this.form).then(res => {
                            console.log(res)
                            this.$message({ message: '批量拆箱成功!', type: 'success' })
                            this.$emit('loadData')
                            this.dialogForm = false
                        })
                    } else {
                        this.$message({ message: '请检查表单!', type: 'error' })
                    }
                })
            }
        },
        watch: {
            dialogForm(bool){
                if(!bool){
                    this.form={ container:[], unboxDate:'' }
                    this.$refs.form.resetFields()
                }
            }
        },
        computed: {}
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    /*.dialog-footer {*/
    /*display: flex;*/
    /*justify-content: flex-start;*/
    /*}*/
</style>
