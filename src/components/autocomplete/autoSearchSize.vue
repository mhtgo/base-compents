<template>
    <el-autocomplete :style="width"
                     v-model="infoName"
                     valueKey="containerSize"
                     value="containerSize"
                     @blur="checkCurrentId"
                     :trigger-on-focus="true"
                     :disabled="disabled"
                     :fetch-suggestions="querySearchAsync"
                     @mouseenter.native="isMouseEnter=true"
                     @mouseleave.native="isMouseEnter=false"
                     :placeholder="placeholder"
                     @select="handleSelectAn" clearable>
        <i class="el-input__icon" :class="infoName&&isMouseEnter&&!disabled?'el-icon-error':'el-icon-edit'" @click="handleClear"
           slot="suffix"></i>
        <template slot-scope="props">
            <div class="name">{{ props.item.containerSize }}</div>
        </template>
    </el-autocomplete>
</template>

<script>
    import CommonSearchInput from './common'
    import { getContainerSize } from "@/api/containerType/containerType";

    export default {
        mixins: [CommonSearchInput],
        props: {
            width: '',
            disabled:false
        },
        methods: {
            // 异步搜索信息
            querySearchAsync(queryString, cb) {
                getContainerSize({
                    search_LIKE_containerSize: queryString,
                    'iDisplayLength': this.iDisplayLength
                }).then((reponse) => {
                    let matchRecords = reponse.data.aaData.filter((record) => record.containerSize === queryString)
                    if (matchRecords.length !== 0) {
                        this.$emit('select', matchRecords[0].containerSize)
                    } else if (reponse.data.aaData.length === 1 && this.infoName.length !== 0) {
                        // this.$emit('select', reponse.data.aaData[0].id)
                        // this.infoName = reponse.data.aaData[0].name
                    } else {
                        this.$emit('select', undefined)
                    }
                    cb(reponse.data.aaData)
                })
            },
            handleClear() {
                if (this.infoName&&!this.disabled) {
                    this.infoName = ''
                    this.$emit('select', '')
                    this.$emit('selectName', '')
                }
            },
            handleSelectAn(item) {
                this.$emit('matchRecord', Object.assign({}, item))
                this.$emit('select', item.containerSize)
                this.$emit('change', item.containerSize)
                this.$emit('selectName', item.containerSize)
            }
        }
    }

</script>
