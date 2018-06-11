<template>

    <!-- 批量提箱 -->
    <el-dialog title="批量提箱" :visible.sync="dialogForm" width="860px">

        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="110px">
            <el-row>
                <el-col :span="8">
                    <excel-import :code="code" @getUploadData="handleImport"></excel-import>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-form-item label=" " class="flexCenter">
                        <el-table :data="form.container" border max-height="300">
                            <!--<el-table-column label="序号">-->
                                <!--<template slot-scope="scope">-->
                                    <!--{{ scope.$index }}-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <el-table-column prop="containerNo" label="箱号" min-width="220"></el-table-column>
                            <el-table-column v-if="code==='TRPLTX'" prop="wagonNo" label="车皮号" min-width="140"></el-table-column>
                            <el-table-column v-if="code==='TRPLTX'" prop="cargoWeight" label="货重" min-width="120"></el-table-column>
                            <el-table-column v-if="code==='CRPLTX'" prop="plateNumber" label="车牌号" min-width="120"></el-table-column>
                        </el-table>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-form-item label="提箱时间" prop="suitcaseDate">
                        <el-date-picker v-model="form.suitcaseDate"
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
    // import { addContract, contractApprovalPass, updateContract } from "@/api/contract/contract";
    import ExcelImport from '@/components/excel/import'
    import { suitcaseBatch } from '@/api/containerJob/containerJob'

    export default {
        name: "PLTX",
        components: { ExcelImport },
        props:{
            code:''
        },
        data() {
            return {
                dialogForm: false,
                form: {
                    suitcaseDate: '',
                    transportMode: 'TR',
                    container: [],
                },
                rules: {
                    suitcaseDate: [{ required: true, message: '请选择提箱时间!', trigger: 'change' }],
                },
            }
        },
        methods: {
            handleSubmit() {
                if (this.form.container.length < 1) {
                    this.$message({ message: '请添加至少一条数据!', type: 'error' })
                    return
                }
                this.$refs.form.validate(valid => {
                    if (valid) {
                        suitcaseBatch(this.form).then(res => {
                            this.$message({ message: '批量提箱成功!', type: 'success' })
                            this.$emit('loadData')
                            this.dialogForm = false
                        })
                    } else {
                        this.$message({ message: '请检查表单!', type: 'error' })
                    }
                })
            },
            handleImport(item){
                this.form.container.push(...item)
            }
        },
        watch: {
            dialogForm(bool) {
                if (!bool) {
                    this.form = { container: [], suitcaseDate: '',transportMode:'TR' }
                    this.$refs.form.resetFields()
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    /*.dialog-footer {*/
    /*display: flex;*/
    /*justify-content: flex-start;*/
    /*}*/
</style>
