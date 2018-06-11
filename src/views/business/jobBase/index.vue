<template>
    <div style="width:100%">
        <!-- <el-input  placeholder=""></el-input> -->
        <el-row>
            <el-col :span="6"
                    v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_BASEMGR_ENTRUSTSPLIT')!==-1">
                <div class="modules">
                    <div class="title">
                        <span>委托拆分计划规则</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li @click="handleDialogFormOpen"
                                v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_BASEMGR_ENTRUSTSPLIT:ADD')!==-1">
                                <i class="iconfont icon-xinzeng"></i>
                                <span>新增</span>
                            </li>
                            <li @click="handleOpen({path:'/Home/SystemBase/EntrustSplitRule',name:'委托拆分计划规则'})"
                                v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_BASEMGR_ENTRUSTSPLIT:QUERY')!==-1">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
            <el-col :span="6"
                    v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_BASEMGR_CONTAINERTYPE')!==-1">
                <div class="modules">
                    <div class="title">
                        <span>箱型管理</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li @click="handleTypeForm"
                                v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_BASEMGR_CONTAINERTYPE:ADD')!==-1">
                                <i class="iconfont icon-xinzeng"></i>
                                <span>新增</span>
                            </li>
                            <li @click="handleOpen({path:'/Home/SystemBase/ContainerType',name:'箱类型管理'})"
                                v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_BASEMGR_CONTAINERTYPE:QUERY')!==-1">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
            <el-col :span="6"
                    v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_BASEMGR_PORT')!==-1">
                <div class="modules">
                    <div class="title">
                        <span>港口及站点管理</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li @click="handleDialogPort"
                                v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_BASEMGR_PORT:ADD')!==-1">
                                <i class="iconfont icon-xinzeng"></i>
                                <span>新增</span>
                            </li>
                            <li @click="handleOpen({path:'/Home/SystemBase/Port',name:'港口管理'})"
                                v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_BASEMGR_PORT:QUERY')!==-1">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
            <el-col :span="6"
                    v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_BASEMGR_CONTAINERTYPE')!==-1">
                <div class="modules">
                    <div class="title">
                        <span>箱尺寸管理</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li @click="handleSizeForm"
                                v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_BASEMGR_CONTAINERTYPE:ADD')!==-1">
                                <i class="iconfont icon-xinzeng"></i>
                                <span>新增</span>
                            </li>
                            <li @click="handleOpen({path:'/Home/SystemBase/ContainerSize',name:'箱尺寸管理'})"
                                v-if="$store.state.user.currentUser.securityPermissions&&$store.state.user.currentUser.securityPermissions.length>0&&$store.state.user.currentUser.securityPermissions.indexOf('WJOB_BASEMGR_CONTAINERTYPE:QUERY')!==-1">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-dialog title="新增委托拆分计划规则" :visible.sync="dialogForm" width="1000px">
            <entrustSplitRule-form ref="entrustSplitRuleForm"></entrustSplitRule-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogForm = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit">保 存</el-button>
            </div>
        </el-dialog>
        <container-type-form ref="containerTypeForm"></container-type-form>
        <port-form ref="portForm"></port-form>
        <container-size-form ref="containerSizeForm"></container-size-form>
    </div>
</template>

<script>
    import entrustSplitRuleForm from '../entrustSplitRule/entrustSplitRuleForm'
    import containerTypeForm from '../containerType/containerTypeForm'
    import portForm from '../port/portForm'
    import containerSizeForm from '../containerSize/containerSizeForm'

    export default {
        name: "jobBase",
        components: { entrustSplitRuleForm, containerTypeForm, portForm, containerSizeForm },
        data() {
            return {
                dialogForm: false,
            }
        },
        mounted() {

        },
        methods: {
            handleOpen(val) {
                // this.$router.push('/Home/SystemBase/'+val)
                this.$store.commit('ADD_CACHED_VIEWS', val)
                this.$router.push(val.path)
            },
            handleDialogFormOpen() {
                this.dialogForm = true
                // this.$nextTick(()=>{
                //     this.$refs.entrustSplitRuleForm.getQuery()
                // })
            },
            handleSubmit() {
                this.$refs.entrustSplitRuleForm.handleSubmit(false)
            },
            handleTypeForm() {
                this.$refs.containerTypeForm.dialogForm = true
            },
            handleDialogPort() {
                this.$refs.portForm.dialogForm = true
            },
            handleSizeForm() {
                this.$refs.containerSizeForm.dialogForm = true
            }
        },
        watch: {
            dialogForm(bool) {
                if (!bool) {
                    this.$refs.entrustSplitRuleForm.form = this.$refs.entrustSplitRuleForm.clearForm()
                    this.$refs.entrustSplitRuleForm.$refs.form.resetFields()
                }
            }
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
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
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
