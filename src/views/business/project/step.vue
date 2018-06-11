<template>
    <div>
        <el-steps :active="active" finish-status="success" simple>
            <el-step v-for="(item,index) in steps" :title="item.title" :key="item.component"
                     @click.native="handleToStep(index)"></el-step>
        </el-steps>
        <div class="step-bottom">
            <!-- 执行视图渲染 -->
            <component :id="id" :is="currentView"></component>
        </div>
    </div>
</template>

<script>
    import baseInfo from './baseInfo'
    import contract from './contract'
    import { getStep } from "@/api/project/project";

    export default {
        name: "项目操作",
        components: { baseInfo, contract },
        data() {
            return {
                steps: [{ component: 'baseInfo', title: '基本信息' }],
                model: '',
            }
        },
        created() {
            this.model = this.$route.params.model// 获取是否是正式项目
            if (this.id !== 0) {
                getStep(this.id).then(res => {
                    this.$store.commit('SET_CURRENT', res.data)
                })
            } else {
                this.$store.commit('SET_CURRENT', 0) // 如果ID为0跳转到立项基础信息
            }
        },
        mounted() {
        },
        methods: {
            handleToStep(index) {
                getStep(this.id).then(res => {
                    let maxStep = Number(res.data)
                    if (index <= maxStep) {
                        this.$store.commit('SET_CURRENT', index) // 如果向前跳转则允许随意跳转
                    } else {
                        this.$message({ message: '请按照步骤立项', type: 'error' })
                    }
                }).catch(err => {
                    this.$message({ message: '请按照步骤立项', type: 'error' })
                })
            },
        },
        watch: {
            model(val){
                console.log(val)
                if(val==='TEMP'){
                    this.steps=[{ component: 'baseInfo', title: '基本信息' },
                        { component: 'contract', title: '客户信息' }]
                }
                if(val==='NORMAL'){
                    this.steps=[{ component: 'baseInfo', title: '基本信息' },
                        { component: 'contract', title: '基础合同' }]
                }
            }
        },
        computed: {
            id() {
                return Number(this.$route.params.id)// 获取当前项目ID
            },
            active() {
                return this.$store.getters.current
            },
            currentView() {
                if (this.active > this.steps.length - 1) {
                    this.$store.commit('SET_CURRENT', this.steps.length - 1)
                    return this.steps[this.steps.length - 1].component
                } else {
                    return this.steps[this.active].component // 根据vuex的当前执行步骤来跳转
                }
            },
        }
    }
</script>

<style scoped>
    .step-bottom {
        margin-top: 20px;
    }
</style>
