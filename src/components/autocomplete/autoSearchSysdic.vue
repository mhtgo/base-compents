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
            <div class="name">{{ props.item.dicValue }}</div>
        </template>
    </el-autocomplete>
</template>

<script>
    import CommonSearchInput from './common'
    import { getSystemDictionaryList } from "@/api/system/systemDictionary";

    export default {
        mixins: [CommonSearchInput],
        props: {},
        methods: {
            // 异步搜索信息
            querySearchAsync(queryString, cb) {
                let condition = {
                    'search_EQ_org.id': this.$store.state.user.currentUser.org.id,
                    // 'search_LIKE_dicValue': queryString,
                    'search_EQ_dicCode':'entrust_from',
                }
                getSystemDictionaryList(condition).then((reponse) => {
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
                this.$emit('select', item.id)
                this.$emit('selectName', item.dicValue)
                this.infoName=item.dicValue
            },
        },
    }
</script>
