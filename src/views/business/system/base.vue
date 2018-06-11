<template>
    <div style="width:100%">
        <el-row>
            <el-col :span="6">
                <div class="modules">
                    <div class="title">
                        <span>港口及站点管理</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li @click="handleDialogFormOpen">
                                <i class="iconfont icon-xinzeng"></i>
                                <span>新增</span>
                            </li>
                            <li @click="portSearch">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
        </el-row>
        <port-form ref="portForm"></port-form>
    </div>
</template>

<script>
    import portForm from '../port/portForm'
    export default {
        name: "base",
        components: { portForm },
        data() {
            return {

            }
        },
        mounted() {

        },
        methods: {
            portSearch() {
                this.$router.push('/Home/SystemBase/port')
            },
            handleDialogFormOpen() {
                this.$refs.portForm.dialogForm = true
            },
        }
    }

</script>

<style scoped lang="scss">
    .modules {
        min-width: 200px;
        max-width: 270px;
        width: 90%;
        height: 150px;
        border: 1px solid #e4e7ed;
        border-radius: 10px;
        overflow: hidden;
        margin: 0 auto;
    }

    .title {
        width: 100%;
        height: 45px;
        background: #ecf0fd;
        text-align: center;
        overflow: hidden;
        border-top-left-radius:10px;
        border-top-right-radius:10px;
        span {
            font-size: 18px;
            color: black;
            font-weight: 600;
            display: block;
            margin-top: 10px;
        }
    }

    .handle {
        ul {
            list-style: none; // display: inline-block;
            width: 100%;
            text-align: center;
            li {
                display: inline-block;
                width: 45px;
                margin-top: 6px;
                width: 25%;
                text-align: center;
                i {
                    font-size: 45px;
                    color: #4c62e2;
                }
                span {
                    display: inherit;
                }
            }
        }
    }

</style>
