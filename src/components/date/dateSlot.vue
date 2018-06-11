<template>
    <div>
        <el-date-picker v-model="selfStartDate" :picker-options="startPickerOptions" type="date" placeholder="起始日期"
                        format="yyyy-MM-dd" :value-format="dateType"></el-date-picker>
        {{ middle }}
        <el-date-picker v-model="selfEndDate" :picker-options="endPickerOptions" type="date" placeholder="结束日期"
                        @change="handleChangeEnd"
                        format="yyyy-MM-dd" :value-format="dateType"></el-date-picker>
    </div>
</template>

<script>
    import { getLocalTime } from "@/utils/dateFormat";

    export default {
        props: {
            startDate: {
                type: String,
                require: true
            },
            endDate: {
                type: String,
                require: true
            },
            rangeSeparator: {
                type: String,
                default: () => '-'
            },
            // yyyy-MM-dd或者yyyy-MM-dd HH:mm:ss两种
            dateType: {
                type: String,
                default: 'yyyy-MM-dd HH:mm:ss'
            },
            middle: {
                type: String,
                default: '-'
            }
        },
        data() {
            return {}
        },
        methods: {
            handleChangeEnd(val) {
                let setVal = val
                if (val && this.dateType.length > 11) {
                    setVal = val.split(' ')[0] + ' 23:59:59'
                }
                this.$emit('update:endDate', setVal)
            }
        },
        computed: {
            selfStartDate: {
                set(val) {
                    this.$emit('update:startDate', val)
                },
                get() {
                    return this.startDate
                }
            },
            selfEndDate: {
                set(val) {
                    this.$emit('update:endDate', val)
                    this.$emit('afterChoice', val)
                },
                get() {
                    return this.endDate
                }
            },
            startPickerOptions() {
                let endDate = this.endDate
                return {
                    disabledDate(time) {
                        if (endDate) {
                            return time.getTime() > new Date(endDate).getTime()
                        } else {
                            return false
                        }
                    }
                }
            },
            endPickerOptions() {
                let startDate = this.startDate
                return {
                    disabledDate(time) {
                        if (startDate) {
                            return time.getTime() < new Date(startDate).getTime()
                        } else {
                            return false
                        }
                    }
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 140px;
    }
</style>
