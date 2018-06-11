<!-- 模糊查询车皮号 -->
<template>
    <el-autocomplete v-model="infoName"
                     valueKey="name"
                     value="id"
                     @blur="checkCurrentId"
                     :trigger-on-focus="true"
                     :fetch-suggestions="querySearchAsync"
                     @mouseenter.native="isMouseEnter=true"
                     @mouseleave.native="isMouseEnter=false"
                     :disabled="disabled"
                     :placeholder="placeholder" @select="handleContainerSelect" clearable>
        <i class="el-input__icon" :class="infoName&&isMouseEnter?'el-icon-error':'el-icon-edit'" @click="handleClear"
           slot="suffix"></i>
        <template slot-scope="props">
            <div class="name">{{ props.item.containerNo }}</div>
        </template>
    </el-autocomplete>
</template>

<script>
    import CommonSearchInput from './common'
    import { wagonInPortInfo } from "@/api/gatePanel/gatePanel";

    export default {
        mixins: [CommonSearchInput],
        // props: {
        //     containerNo: '',
        // },
        methods: {
            // 异步搜索信息
            querySearchAsync(queryString, cb) {

                // console.log(queryString)

                wagonInPortInfo(queryString || '').then((reponse) => {
                    // let matchRecords = reponse.data.aaData.filter((record) => record.name === queryString)
                    // if (matchRecords.length !== 0) {
                    //     this.$emit('select', matchRecords[0].containerNo)
                    // } else if (reponse.data.aaData.length === 1 && this.infoName.length !== 0) {
                    //     this.$emit('select', reponse.data.aaData[0].containerNo)
                    //     this.infoName = reponse.data.aaData[0].containerNo
                    // } else {
                    //     this.$emit('select', undefined)
                    // }
                    cb(reponse.data.aaData)
                })
            },
            handleContainerSelect(item){
                this.$emit('matchRecord', Object.assign({}, item))
                this.$emit('select', item.containerNo)
                this.$emit('selectName', item.containerNo)
            },
            handleClear() {
                if (this.infoName) {
                    this.infoName = ''
                    this.$emit('select', '')
                    this.$emit('selectName', '')
                }
            }
        },
    }
</script>
