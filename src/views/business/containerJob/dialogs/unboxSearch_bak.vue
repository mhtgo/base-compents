<template>
    <!-- 拆箱记录查询 -->
    <el-dialog title="拆箱记录查询" :visible.sync="dialogForm" width="90%">

      <h3>基础信息</h3>


        <el-form :inline="true" ref="form" :model="form" class="add-form" label-width="110px">
            <el-row>
                <el-col :span="8">
                     <el-form-item label="上传时间">
                        <date-slot :startDate.sync="form.search_GTE_date"
                                    :endDate.sync="form.search_LTE_date"></date-slot>
                    </el-form-item>
                </el-col>
                 <el-col :span="8">
                    <el-button icon="el-icon-search" type="primary">查询</el-button>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-form-item label=" " class="flexCenter">
                        <el-table :data="form.container" border max-height="300">
                            <el-table-column prop="containerType" label="序号" min-width="204">
                            </el-table-column>
                            <el-table-column prop="containerNo" label="记录上传时间" min-width="220">
                            </el-table-column>
                            <el-table-column prop="spec2" label="记录名称" min-width="220">
                            </el-table-column>
                          操作
                        </el-table>
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
    // import { addContract, contractApprovalPass, updateContract } from "@/api/contract/contract";
    import { approval } from "@/api/workflow/workflow";
    import searchCustom from '@/components/autocomplete/autoSearchCustom'
    import { PUBLIC_LIMIT, REG_TEXT } from "@/utils/Reg";
    import { sortLength } from "@/utils/rules";
    import { getLocalTime } from "@/utils/dateFormat";

    import autoSearchPortStation from '@/components/autocomplete/autoSearchPortStation'
    import autoSearchSize from '@/components/autocomplete/autoSearchSize'
    import autoSearchEntrust from '@/components/autocomplete/autoSearchEntrust'
    import autoSearchCustom from '@/components/autocomplete/autoSearchCustom'

    import { unboxRecords } from '@/api/containerJob/containerJob'

    import dateSlot from '@/components/date/dateSlot'

    export default {
        name: "unboxSearch",
        components: { searchCustom, autoSearchPortStation, autoSearchSize, autoSearchEntrust, autoSearchCustom, dateSlot },
        data() {
            return {
                condition: {},                      // 查询条件
                recordList: [],                      // table数组
                recordList2: [],                      // table数组
                pageSearch: unboxRecords,          // 分页查询api接口
                dialogForm: false,
                type: '',
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
