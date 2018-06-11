<template>
    <div>
        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="search-form" label-width="110px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="预计内转时间" prop="nzDate">
                        <el-date-picker v-model="form.nzDate" value-format="yyyy-MM-dd" type="date"
                                        placeholder="选择内转日期"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="委托单位" prop="entrustOrgId">
                        <search-custom v-model="form.entrustOrgId"></search-custom>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div>
            <el-button type="primary" @click="visible=true">箱筛选</el-button>
            <excel-import code="NZCCXZ" @getUploadData="handleImport"></excel-import>
            <el-button type="primary" @click="handleDel">删 除</el-button>
        </div>
        <el-table :data="form.container" border stripe max-height="500" style="margin: 15px 0"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="containerNo" label="箱号" sortable min-width="130"></el-table-column>
            <el-table-column prop="containerType" label="箱型" sortable min-width="130"></el-table-column>
            <el-table-column prop="containerSize" label="尺寸" sortable min-width="130"></el-table-column>
            <el-table-column prop="ifHeavy" label="空重" sortable min-width="130">
                <template slot-scope="scope">
                    {{ scope.row.ifHeavy | _filterIfHeavyType }}
                </template>
            </el-table-column>
            <el-table-column prop="tradeType" label="内外贸" sortable min-width="130">
                <template slot-scope="scope">
                    {{ scope.row.tradeType | _filterTradeType }}
                </template>
            </el-table-column>
            <el-table-column prop="stratStationName" label="发站" sortable min-width="130"></el-table-column>
            <el-table-column prop="endStationName" label="到站" sortable min-width="130"></el-table-column>
            <el-table-column prop="ownerName" label="箱主" sortable min-width="130"></el-table-column>
            <el-table-column prop="cargoName" label="货名" sortable min-width="130"></el-table-column>
            <el-table-column prop="cargoWeight" label="货重" sortable min-width="130"></el-table-column>
        </el-table>
        <el-dialog title="箱选择" :visible.sync="visible" width="900px" :modal="false" :close-on-click-modal="false">
            <container-choice @updata="handleImport" @visible="visible=false"></container-choice>
        </el-dialog>
    </div>
</template>

<script>
    import containerChoice from '@/views/business/common/containerChoice'
    import searchCustom from '@/components/autocomplete/autoSearchCustom'
    import excelImport from '@/components/excel/import'
    import { addJobPlanNZCC } from "@/api/jobPlan/jobPlan";

    export default {
        name: "nzccAdd",
        components: { containerChoice, searchCustom, excelImport },
        data() {
            return {
                form: this.clearForm(),
                rules: {
                    nzDate: [{ required: true, message: '请选择内转时间', trigger: 'change' }],
                    entrustOrgId: [{ required: true, message: '请选择委托单位', trigger: 'change' }],
                },
                visible: false,
                multipleSelection: [],
            }
        },
        methods: {
            handleSubmit() {
                if (this.form.container.length < 1) {
                    this.$message({ message: `请先添加一条数据!`, type: 'error' })
                    return
                }
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        addJobPlanNZCC(this.form).then(res=>{
                            this.$message({ message: `新增成功`, type: 'success' })
                            this.$emit('loadData')
                        })
                    } else {
                        this.$message({ message: `请检查表单!`, type: 'error' })
                    }
                })
            },
            clearForm() {
                this.$nextTick(()=>{
                    this.$refs.form.resetFields()
                })
                return {
                    container: [],
                    nzDate: '',
                    entrustOrgName: '',
                    entrustOrgId: '',
                }
            },
            handleImport(item) {
                this.form.container.push(...item)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            handleDel() {
                if (this.multipleSelection.length > 0) {
                    this.form.container = this.form.container.filter(f => {
                        return !this.multipleSelection.includes(f)
                    })
                } else {
                    this.$message({ message: `请先选择一条数据`, type: 'error' })
                }
            }
        }
    }
</script>

<style scoped>

</style>
