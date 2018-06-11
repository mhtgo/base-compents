<template>
    <el-form :inline="true" :model="form" class="search-form" label-width="110px">
        <el-row>
            <el-col :span="8">
                <el-form-item label="计划单号：">
                    {{ form.planNo }}
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="计划状态：">
                    {{ form.planStatus | _filterPlanStatus }}
                </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
                <el-form-item label="包装状态：">
                    {{ form.packingWay | _filterPackingWay }}
                </el-form-item>
            </el-col> -->
            <el-col :span="8" v-if="form.planType">
                <el-form-item label="出库类型：">
                    {{ form.planType | _filterPlanType }}
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="预计作业数量：">
                    {{ form.containerNum }}
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="预计作业日期：">
                    {{ form.planJobDate }}
                </el-form-item>
            </el-col>
            <el-col :span="8" v-if="form.transportMode">
                <el-form-item label="运输方式：">
                    {{ form.transportMode | _filterTransportModeType }}
                </el-form-item>
            </el-col>
        </el-row>
        <!-- <el-row>
            <el-col :span="8" v-if="form.transportMode">
                <el-form-item label="运输方式：">
                    {{ form.transportMode | _filterTransportModeType }}
                </el-form-item>
            </el-col>
        </el-row> -->
    </el-form>
</template>

<script>
    export default {
        name: "baseInfo",
        props: {
            form: {
                type: Object,
                default: () => {
                },
            }
        },
        data() {
            return {}
        }
    }
</script>

<style scoped>

</style>
