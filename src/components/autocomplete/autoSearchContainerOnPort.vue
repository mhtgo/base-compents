<template>
    <el-autocomplete v-model="infoName"
                     valueKey="name"
                     value="id"
                     @blur="checkCurrentContainerNo"
                     :trigger-on-focus="true"
                     :fetch-suggestions="querySearchAsync"
                     @mouseenter.native="isMouseEnter=true"
                     @mouseleave.native="isMouseEnter=false"
                     :placeholder="placeholder" @select="handleSelectContainerNo" clearable>
        <i class="el-input__icon" :class="infoName&&isMouseEnter?'el-icon-error':'el-icon-edit'" @click="handleClear"
           slot="suffix"></i>
        <template slot-scope="props">
            <div class="name">{{ props.item.containerNo }}</div>
        </template>
    </el-autocomplete>
</template>

<script>
    import {getContainerPort} from "@/api/containerType/containerType";
    // 此组件用于委托的明细箱
    export default {
        model: {
            prop: 'containerNo',
            event: 'select'
        },
        props: {
            containerNo: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            projectid: {
                default: ''
            },
            iDisplayLength: {
                default: 65535
            },
            disabled: {
                default: false
            }
        },
        data() {
            return {
                infoName: this.name,
                isMouseEnter: false,
            }
        },
        methods: {
            // 异步搜索信息
            querySearchAsync(queryString, cb) {
                getContainerPort({
                    search_LIKE_containerNo: queryString,
                    'iDisplayLength': this.iDisplayLength
                }).then((res) => {
                    cb(res.data.aaData)
                })
            },
            handleClear() {
                if (this.infoName) {
                    this.infoName = ''
                    this.$emit('select', '')
                    this.$emit('selectName', '')
                }
            },
            // 选择某一条数据
            handleSelectContainerNo(item) {
                this.infoName = item.containerNo
                this.$emit('matchRecord', Object.assign({}, item))
                this.$emit('select', item.containerNo)
            },
            // 焦点
            checkCurrentContainerNo() {
                if (!this.containerNo) {
                    this.infoName = ''
                }
            }
        },
        watch: {
            name(newVal) {
                this.infoName = newVal
            },
            containerNo(newVal) {
                if (!newVal) {
                    this.infoName = ''
                }
            }
        },
        beforeDestroy() {
            this.$emit('select', '')
            this.$emit('selectName', '')
        },
        destroyed() {
            this.$emit('select', '')
            this.$emit('selectName', '')
        }
    }
</script>
