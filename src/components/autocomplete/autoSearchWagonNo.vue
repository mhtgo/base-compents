<template>
    <el-autocomplete v-model="infoName"
                     valueKey="name"
                     value="id"
                     @blur="checkCurrentId"
                     :trigger-on-focus="true"
                     :fetch-suggestions="querySearchAsync"
                     @mouseenter.native="isMouseEnter=true"
                     @mouseleave.native="isMouseEnter=false"
                     :placeholder="placeholder" @select="handleSelectWagonNo" clearable>
        <i class="el-input__icon" :class="infoName&&isMouseEnter?'el-icon-error':'el-icon-edit'" @click="handleClear"
           slot="suffix"></i>
        <template slot-scope="props">
            <div class="name">{{ props.item.wagonNo }}</div>
        </template>
    </el-autocomplete>
</template>

<script>
    import CommonSearchInput from './common'
    import { onPortWagonNo } from "@/api/containerJob/containerJob";

    export default {
        mixins: [CommonSearchInput],
        methods: {
            // 异步搜索信息
            querySearchAsync(queryString, cb) {
                let condition = {
                    'iDisplayLength': this.iDisplayLength,
                    'search_ISNULL_leaveTime':'',
                }
                if (queryString !== '') {
                    condition['search_LIKE_wagonNo'] = queryString
                }
                onPortWagonNo(condition).then((reponse) => {
                    let matchRecords = reponse.data.aaData.filter((record) => record.name === queryString)

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
            handleSelectWagonNo(item) {
                console.log(item)
                this.$emit('select', item.id)
                this.$emit('selectName', item.wagonNo)
                this.infoName=item.wagonNo
            }
        },
    }
</script>
