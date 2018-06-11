<template>
    <el-autocomplete v-model="infoName"
                     valueKey="pasName"
                     value="pasName"
                     @blur="checkCurrentId"
                     :trigger-on-focus="true"
                     :fetch-suggestions="querySearchAsync"
                     @mouseenter.native="isMouseEnter=true"
                     @mouseleave.native="isMouseEnter=false"
                     :placeholder="placeholder" @select="handlePortSelect" clearable>
        <i class="el-input__icon" :class="infoName&&isMouseEnter?'el-icon-error':'el-icon-edit'" @click="handleClear"
           slot="suffix"></i>
        <template slot-scope="props">
            <div class="name">{{ props.item.pasName }}</div>
        </template>
    </el-autocomplete>
</template>

<script>
    import CommonSearchInput from './common'
    import { getPortList } from "@/api/port/port";

    export default {
        mixins: [CommonSearchInput],
        props: {
        },
        methods: {
            // 异步搜索信息
            querySearchAsync(queryString, cb) {
                getPortList({
                    search_LIKE_pasName: queryString,
                    'iDisplayLength': this.iDisplayLength
                }).then((reponse) => {
                    let matchRecords = reponse.data.aaData.filter((record) => record.name === queryString)
                    if (matchRecords.length !== 0) {
                        this.$emit('select', matchRecords[0].id)
                    } else if (reponse.data.aaData.length === 1 && this.infoName.length !== 0) {
                        this.$emit('select', reponse.data.aaData[0].pasName)

                        // this.infoName = reponse.data.aaData[0].pasName
                    } else {
                        this.$emit('select', undefined)
                    }
                    cb(reponse.data.aaData)
                })
            },
            handlePortSelect(item){
                this.$emit('matchRecord', Object.assign({}, item))
                this.$emit('select', item.pasName)
                this.$emit('selectName', item.pasName)
                this.$emit('change', item.id)
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
