<template>
    <el-dialog :title="title" :visible.sync="addVisible" width="1200px" top="6vh" :before-close="cancel">
        <div ref="dd">
            <!-- <h2 class="page-title" v-html="titleType"></h2> -->
            <base-info :forms.sync="forms" ref="baseinfo" :isAdd="isAdd" :entrustType="entrustType" :status="status" :id="id"></base-info>
            <desc-info :forms.sync="forms" ref="descinfo" :isAdd="isAdd" :entrustType="entrustType" :status="status" :id="id" :MXlenght="MXlenght"
            @changeTraffic="changeTraffic" @changeSpecify="changeSpecify"></desc-info>
            <btn-group :specify="specify" :trafficType="isTarin" ref="btnGroup" :id="id" :status="status" :isAdd="isAdd" :entrustType="entrustType"
                @deaLength="deaLength" @upFall="addOrEdit"></btn-group>
            <el-row class="mt-16">
                <el-button type="primary" @click.native="addsubmit()" :loading="$store.getters.loadingBtn">确定</el-button>
                <el-button type="primary" @click.native="cancel">取消</el-button>
            </el-row>
        </div>
    </el-dialog>
</template>

<script>
    import baseInfo from './add/_baseInfo.vue'
    import descInfo from './add/_descInfo.vue'
    import btnGroup from './add/_btnGroup.vue'
    import {
        getEntrustDetail
    } from "@/api/entrust"
    import {
        addEntrust,
        editEntrust
    } from "@/api/entrust"
    export default {
        components: {
            baseInfo,
            descInfo,
            btnGroup
        },
        props: {
            entrustType: {},
            isAdd: {},
            status: {},
            id: {}
        },
        data() {
            return {
                title: this.isAdd=='1'?'新增':'编辑',
                addVisible: false,
                // titleType: '新增',
                forms: {},
                isTarin: '',
                // entrustType: this.$route.query.entrustType,
                // isAdd: this.$route.query.isAdd,
                // status: '',
                // id: '',
                MXlenght: '',
                specify: ''
            }
        },
        created() {
            this.addOrEdit()
        },
        watch:{
            entrustType(newVal){
               if(newVal){
                  if (!this.id) {
                    if (this.entrustType === 'CXWT' || this.entrustType === 'BCWT') {
                        this.isTarin = 'TR'
                    }
                  }
               }
            }
        },
        mounted() {
        },
        methods: {
            addOrEdit() {
                if (this.id) {
                    getEntrustDetail(this.id, this.entrustType).then(res => {
                        this.forms = res.data
                        this.status = res.data.entrustStatus
                        this.isTarin = res.data.transportMode
                        if (res.data.entrustType === "CXWT") {
                            this.isTarin = "TR"
                        }
                        if (res.data.entrustType === "THCK") {
                            this.specify = res.data.specify
                            if (!this.specify) {
                                this.isTarin = ""
                            }
                        } else {
                            this.specify = false
                        }
                        let clearStar = res.data.containerCargo
                        for (let index = 0; index < clearStar.length; index++) {
                            if (clearStar[index].containerNo&&clearStar[index].containerNo.indexOf("*") !== -1) {
                                let content
                                content = clearStar[index].containerNo.substring(0, clearStar[index].containerNo
                                    .length -
                                    1)
                                clearStar[index].containerNo = content
                            }
                        }
                        this.$refs.btnGroup.containerCargo = clearStar
                        this.$refs.btnGroup.copyArry = clearStar
                    })
                } else {
                    // if (this.$route.query.status) {
                    //     this.status = this.$route.query.status
                    // }
                    if (this.entrustType === 'CXWT' || this.entrustType === 'BCWT') {
                        this.isTarin = 'TR'
                    }
                }
            },
            addsubmit() {
                this.forms.containerCargo = this.$refs.btnGroup.containerCargo
                this.forms.entrustType = this.entrustType
                if (this.entrustType === 'BCWT') {
                    this.forms.entrustType = 'JCRK'
                    this.forms.transportMode = 'TR'
                }
                this.forms.packingWay = 'C'
                if(this.forms.transportMode === 'TR'){
                   if(!(this.forms.originCode&&this.forms.endCode)){
                        this.$message({
                            message: '运输方式为火车时,起运地和 目的地必填',
                            type: 'warn'
                        })
                       return
                   }
                }
                if (this.isAdd === '1') {
                    addEntrust(this.forms, this.entrustType).then(res => {
                        this.$message({
                            message: '新增委托成功',
                            type: 'success'
                        })
                        this.cancel()
                    })
                } else {
                    editEntrust(this.forms, this.id, this.entrustType).then(res => {
                        this.$message({
                            message: '编辑委托成功',
                            type: 'success'
                        })
                        this.cancel()
                    })
                }
            },
            cancel() {
                this.forms = {}
                this.$refs.baseinfo.$refs.forms.resetFields()
                this.isTarin = ''
                this.addVisible = false
                this.$refs.btnGroup.containerCargo=[]
                this.$emit('upData')
            },
            deaLength(val) {
                this.MXlenght = val
            },
            changeTraffic(val){
              this.isTarin = val
            },
            changeSpecify(val){
              this.$refs.btnGroup.containerCargo = []
              this.specify = val
              this.isTarin = ''
            }
        }
    }

</script>
