<template>
  <el-autocomplete :style="width" v-model="infoName" valueKey="containerType" value="containerType" @blur="checkCurrentId" :trigger-on-focus="true"
    :fetch-suggestions="querySearchAsync" @mouseenter.native="isMouseEnter=true" @mouseleave.native="isMouseEnter=false" :placeholder="placeholder"
    @select="handleSelectAn" clearable>
    <i class="el-input__icon" :class="infoName&&isMouseEnter?'el-icon-error':'el-icon-edit'" @click="handleClear" slot="suffix"></i>
    <template slot-scope="props">
      <div class="name">{{ props.item.containerType }}</div>
    </template>
  </el-autocomplete>
</template>

<script>
  import CommonSearchInput from './common'
  import {
    getContainerTypeList
  } from "@/api/containerType/containerType";

  export default {
    mixins: [CommonSearchInput],
    props: {
        width:''
    },
    methods: {
      // 异步搜索信息
      querySearchAsync(queryString, cb) {
        getContainerTypeList({
          search_LIKE_containerType: queryString,
          'iDisplayLength': this.iDisplayLength
        }).then((reponse) => {
          let matchRecords = reponse.data.aaData.filter((record) => record.containerType === queryString)
          if (matchRecords.length !== 0) {
            this.$emit('select', matchRecords[0].containerType)
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
        if (this.infoName) {
          this.infoName = ''
          this.$emit('select', '')
          this.$emit('selectName', '')
        }
      },
      handleSelectAn(item) {
        this.$emit('matchRecord', Object.assign({}, item))
        this.$emit('select', item.containerType)
        this.$emit('change', item.containerType)
      }
    }

  }

</script>
