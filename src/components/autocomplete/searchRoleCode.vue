<template>
    <el-autocomplete v-model="infoName"
                     valueKey="name"
                     value="id"
                     @blur="checkCurrentId"
                     :trigger-on-focus="true"
                     :fetch-suggestions="querySearchAsync"
                     @mouseenter.native="isMouseEnter=true"
                     @mouseleave.native="isMouseEnter=false"
                     :placeholder="placeholder" @select="handleSelectCode" clearable>
        <i class="el-input__icon" :class="infoName&&isMouseEnter?'el-icon-error':'el-icon-edit'" @click="handleClear"
           slot="suffix"></i>
        <template slot-scope="props">
            <div class="name">{{ props.item.roleCode }}</div>
        </template>
    </el-autocomplete>
</template>

<script>
    import CommonSearchInput from './common'
    import { getRoleList, } from "@/api/system/role";

    export default {
        mixins: [CommonSearchInput],
        props: {
            orgStatus: {
                type: Boolean,
                default: true,
            },
        },
        methods: {
            // 异步搜索信息
            querySearchAsync(queryString, cb) {
                let params = {
                    search_LIKE_roleCode: queryString,
                    'iDisplayLength': this.iDisplayLength
                }
                getRoleList(params).then((reponse) => {
                    let matchRecords = reponse.data.aaData.filter((record) => record.name === queryString)
                    // if (matchRecords.length !== 0) {
                    //     this.$emit('select', matchRecords[0].id)
                    // } else if (reponse.data.aaData.length === 1 && this.infoName.length !== 0) {
                    //     // this.$emit('select', reponse.data.aaData[0].id)
                    //     // this.infoName = reponse.data.aaData[0].name
                    // } else {
                    //     this.$emit('select', undefined)
                    // }
                    cb(reponse.data.aaData)
                })
            },
            handleClear() {
                if (this.infoName) {
                    this.infoName = ''
                    this.$emit('select', '')
                    this.$emit('selectName', '')
                }
            },
            handleSelectCode(item) {
                this.$emit('matchRecord', Object.assign({}, item))
                this.$emit('select', item.roleCode)
                this.$emit('selectName', item.roleCode)
                this.infoName = item.roleCode
            }
        },
    }
</script>
