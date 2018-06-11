<template>
    <!-- 批量进场 -->
    <el-dialog title="批量进场" :visible.sync="dialogForm" width="600px">
        <el-row>
            <el-col :span="24">
                <excel-import :code="code" @getUploadData="handleImport"></excel-import>
            </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
            <el-col :span="24">
                <el-table :data="data" border max-height="300">
                    <el-table-column prop="id" label="序号" min-width="50"></el-table-column>
                    <el-table-column prop="containerNo" label="箱号" min-width="200"></el-table-column>
                    <el-table-column v-if="code==='QCPLJC'" prop="plateNumber" label="车牌号" min-width="200"></el-table-column>
                    <el-table-column v-if="code==='HCPLJC'" prop="wagonNo" label="车皮号" min-width="200"></el-table-column>
                    <el-table-column prop="options" fixed="right" align="center" label="操作" sortable
                                     width="80" :colpan="1" :rowspan="2">
                        <template slot-scope="scope">
                            <el-button type="text" class="danger" size="small"
                                       @click="handleRemove(scope.row.id)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <!--<div style="clear: both; height: 30px"></div>-->
        <el-form :rules="rules" ref="form" :model="form" label-width="100px" style="margin-top: 15px">
            <el-row>
                <el-col :span="14">
                    <el-form-item label="进场时间：" prop="conDate">
                        <el-date-picker v-model="form.conDate" value-format="yyyy-MM-dd" type="date"
                                        placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSavePLJC" :loading="$store.getters.loadingBtn">确定</el-button>
            <el-button @click="handleCancel">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
    // import { addContract, contractApprovalPass, updateContract } from "@/api/contract/contract";
    import { enterBatch } from "@/api/containerJob/containerJob";
    import ExcelImport from '@/components/excel/import'

    export default {
        name: "PLJC",
        components: { ExcelImport },
        props: { code: '' },
        data() {
            return {
                dialogForm: false,
                multipleSelection: [],               // 选择的行
                data: [],
                conDate: '',
                rules: {
                    conDate: [{ required: true, message: '请选择入场时间!', trigger: 'change' }],
                },
                form: {
                    conDate: ''
                }
            }
        },
        methods: {
            handleImport(v) {
                this.data = []
                for (let i = 0; i < v.length; i++) {
                    v[i].id = i + 1
                    this.data.push(v[i])
                }
            },
            handleSavePLJC() {
                if (this.data.length < 1) {
                    this.$message({
                        message: '请添加一条数据!',
                        type: 'error'
                    })
                    return
                }
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let _tmp = {}
                        _tmp.enterDate = this.form.conDate
                        _tmp.container = []
                        _tmp.transportMode=this.code==='QCPLJC'?'CR':'TR'
                        for (let i = 0; i < this.data.length; i++) {
                            _tmp.container.push({
                                containerNo: this.data[i].containerNo,
                                id: this.data[i].id,
                                planNo: this.data[i].planNo,
                                wagonNo: this.data[i].wagonNo,
                                plateNumber: this.data[i].plateNumber,
                            })
                        }
                        enterBatch(_tmp).then(res => {
                            this.$message({
                                message: '批量进场成功!',
                                type: 'success'
                            })
                            this.$emit('loadData')
                            this.handleCancel()
                        })
                    } else {
                        this.$message({ message: '请检查表单!', type: 'error' })
                    }
                })
            },
            handleRemove(id) {
                this.$confirm(`是否删除该条数据?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let _tmp = this.data.filter((t) => {
                        return t.id != id
                    })
                    this.data = _tmp
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            handleCancel() {
                this.dialogForm = false
                this.data = []
                this.$refs.form.resetFields()
            }
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    /*.dialog-footer {*/
    /*display: flex;*/
    /*justify-content: flex-start;*/
    /*}*/
</style>
