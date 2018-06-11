<template>

    <!-- 提箱 -->
    <el-dialog title="提箱" :visible.sync="dialogForm" width="90%">

        <el-form :inline="true" ref="form" :model="form" class="add-form" label-width="110px">
            <el-row>
                <el-col :span="24">
                    <el-form-item label=" " class="flexCenter">
                        <el-table :data="formData" border max-height="300">

                            <el-table-column prop="containerNo" label="箱号" min-width="220">
                            </el-table-column>
                            <el-table-column prop="containerType" label="箱型/尺寸" min-width="220">
                            </el-table-column>
                            <el-table-column prop="ifHeavy" label="空重" min-width="220">
                            </el-table-column>
                            <el-table-column prop="cargoName" label="货名" min-width="220">
                            </el-table-column>

                                <!--<el-table-column prop="containerType" label="箱型/尺寸" min-width="204">-->
                            <!--</el-table-column>-->
                            <!--<el-table-column prop="containerNo" label="空重" min-width="220">-->
                            <!--</el-table-column>-->
                            <!--<el-table-column prop="spec2" label="内外贸" min-width="220">-->
                            <!--</el-table-column>-->
                            <!--<el-table-column prop="ownerId" label="箱主" min-width="220">-->
                            <!--</el-table-column>-->
                            <!--<el-table-column prop="ifHeavy" label="空重" min-width="180">-->

                            <!--</el-table-column>-->
                            <!--<el-table-column prop="cargoName" label="货名" min-width="154">-->

                            <!--</el-table-column>-->
                            <!--<el-table-column prop="cargoWeight" label="货重" min-width="180">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input v-model.trim="scope.row.cargoWeight" clearable></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                        </el-table>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="车皮号">
                        <auto-search-wagon-in-port-info v-model.trim="data.wagonNo"></auto-search-wagon-in-port-info>
                    </el-form-item>
                </el-col>

                 <el-col :span="12">
                    <el-form-item label="提箱时间">
                        <el-date-picker v-model="data.suitcaseDate"
                              value-format="yyyy-MM-dd"
                              type="date"
                              placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>

            </el-row>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSaveArrive(true)">确定</el-button>
            <el-button @click="dialogForm = false">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import { approval } from "@/api/workflow/workflow";
    import searchCustom from '@/components/autocomplete/autoSearchCustom'
    import { PUBLIC_LIMIT, REG_TEXT } from "@/utils/Reg";
    import { sortLength } from "@/utils/rules";
    import { getLocalTime } from "@/utils/dateFormat";

    import autoSearchPortStation from '@/components/autocomplete/autoSearchPortStation'
    import autoSearchSize from '@/components/autocomplete/autoSearchSize'
    import autoSearchEntrust from '@/components/autocomplete/autoSearchEntrust'
    import autoSearchWagonInPortInfo from '@/components/autocomplete/autoSearchWagonInPortInfo'

    import { suitcaseChoice } from '@/api/containerJob/containerJob'

    export default {
        name: "TX",
        components: { searchCustom, autoSearchPortStation, autoSearchSize, autoSearchEntrust, autoSearchWagonInPortInfo },
        data() {
            return {
                dialogForm: false,
                form: {},
                formData: {},
                data: {
                    container: [],
                    wagonNo: '',                    //车皮号
                    suitcaseDate: '',               //提车时间
                },
                multipleSelection: [],               // 选择的行
            }
        },
        methods: {

        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    /*.dialog-footer {*/
    /*display: flex;*/
    /*justify-content: flex-start;*/
    /*}*/
</style>
