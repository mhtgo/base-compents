<template>
    <div style="width:100%">
        <!-- <el-input  placeholder=""></el-input> -->
        <el-row>
            <!-- <el-col :span="6">
                <div class="modules">
                    <div class="title">
                        <span>日志管理</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li>
                                <i class="iconfont icon-xitong"></i>
                                <span>系统</span>
                            </li>
                            <li>
                                <i class="iconfont icon-denglu"></i>
                                <span>登陆</span>
                            </li>
                            <li>
                                <i class="iconfont icon-jiekou"></i>
                                <span>接口</span>
                            </li>
                            <li>
                                <i class="iconfont icon-yewu"></i>
                                <span>业务</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col> -->
            <!-- <el-col :span="6">
                <div class="modules">
                    <div class="title">
                        <span>通知消息</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li>
                                <i class="iconfont icon-fajian"></i>
                                <span>发件</span>
                            </li>
                            <li @click="handleWindowOpen('')">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col> -->
            <!-- <el-col :span="6">
                <div class="modules">
                    <div class="title">
                        <span>工作流</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li>
                                <i class="iconfont icon-xinzeng icon-xinzengdianji"></i>
                                <span>新增</span>
                            </li>
                            <li @click="handleWindowOpen('')">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                            <li @click="handleWindowOpen('')">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                        <span class="flow flow-left">流程部署</span>
                        <span class="flow flow-right">流程配置</span>
                    </div>
                </div>
            </el-col> -->
            <el-col :span="6" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_ORGMGR')!==-1">
                <div class="modules">
                    <div class="title">
                        <span>使用单位</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li @click="handleDialogFormOpen('orgForm')" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_ORGMGR:ADD')!==-1">
                                <i class="iconfont icon-xinzeng"></i>
                                <span>新增</span>
                            </li>
                            <li @click="handleWindowOpen({path:'/Home/SystemS/Org',name:'使用单位'})" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_ORGMGR:QUERY')!==-1">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_ROLEMGR')!==-1">
                <div class="modules">
                    <div class="title">
                        <span>角色管理</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li @click="handleDialogFormOpen('roleForm')" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_ROLEMGR:ADD')!==-1">
                                <i class="iconfont icon-xinzeng icon-xinzengdianji"></i>
                                <span>新增</span>
                            </li>
                            <li @click="handleWindowOpen({path:'/Home/SystemS/Role',name:'角色管理'})" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_ROLEMGR:QUERY')!==-1">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_DEPTMGR')!==-1">
                <div class="modules">
                    <div class="title">
                        <span>部门管理</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li @click="handleDialogFormOpen('departmentForm')" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_DEPTMGR:ADD')!==-1">
                                <i class="iconfont icon-xinzeng icon-xinzengdianji"></i>
                                <span>新增</span>
                            </li>
                            <li @click="handleWindowOpen({path:'/Home/SystemS/Department',name:'部门管理'})" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_DEPTMGR:QUERY')!==-1">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_EXCEL')!==-1">
                <div class="modules">
                    <div class="title">
                        <span>EXCEL导入模板下载</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li @click="handleDialogFormOpen('Excel')">
                                <i class="iconfont icon-xinzeng icon-xinzengdianji" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_EXCEL:ADD')!==-1"></i>
                                <span>新增</span>
                            </li>
                            <li @click="handleWindowOpen({path:'/Home/SystemS/excel',name:'excel模板'})" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_EXCEL:QUERY')!==-1">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row class="rowTop">
            <!-- <el-col :span="6">
                <div class="modules">
                    <div class="title">
                        <span>角色管理</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li @click="handleDialogFormOpen('roleForm')">
                                <i class="iconfont icon-xinzeng icon-xinzengdianji"></i>
                                <span>新增</span>
                            </li>
                            <li @click="handleWindowOpen('/Home/Role')">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col> -->
            <!-- <el-col :span="6">
                <div class="modules">
                    <div class="title">
                        <span>部门管理</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li @click="handleDialogFormOpen('departmentForm')">
                                <i class="iconfont icon-xinzeng icon-xinzengdianji"></i>
                                <span>新增</span>
                            </li>
                            <li @click="handleWindowOpen('/Home/Department')">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col> -->
            <el-col :span="6" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_PERSONMGR')!==-1">
                <div class="modules">
                    <div class="title">
                        <span>用户管理</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li @click="handleDialogFormOpen('personForm')" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_PERSONMGR:ADD')!==-1">
                                <i class="iconfont icon-xinzeng icon-xinzengdianji"></i>
                                <span>新增</span>
                            </li>
                            <li @click="handleWindowOpen({path:'/Home/SystemS/Person',name:'用户管理'})" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_PERSONMGR:QUERY')!==-1">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_PARAMETER')!==-1">
                <div class="modules">
                    <div class="title">
                        <span>系统参数设置</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li @click="handleDialogFormOpen('systemParameterForm')" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_PARAMETER:ADD')!==-1">
                                <i class="iconfont icon-xinzeng icon-xinzengdianji"></i>
                                <span>新增</span>
                            </li>
                            <li @click="handleWindowOpen({path:'/Home/SystemS/SystemParameter',name:'系统参数管理'})" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_PARAMETER:QUERY')!==-1">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_DICTIONARY')!==-1">
                <div class="modules">
                    <div class="title">
                        <span>系统字典管理</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li @click="handleDialogFormOpen('systemDictionaryForm')" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_DICTIONARY:ADD')!==-1">
                                <i class="iconfont icon-xinzeng icon-xinzengdianji"></i>
                                <span>新增</span>
                            </li>
                            <li @click="handleWindowOpen({path:'/Home/SystemS/SystemDictionary',name:'系统字典'})" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_DICTIONARY:QUERY')!==-1">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_SECURITYGROUP')!==-1">
                <div class="modules">
                    <div class="title">
                        <span>安全组</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li @click="handleDialogFormOpen('securityGroupForm')" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_SECURITYGROUP:ADD')!==-1">
                                <i class="iconfont icon-xinzeng icon-xinzengdianji"></i>
                                <span>新增</span>
                            </li>
                            <li @click="handleWindowOpen({path:'/Home/SystemS/SecurityGroup',name:'安全组'})" v-if="$store.state.user.currentUser.securityPermissions.indexOf('WPTMGR_SYSMGR_SECURITYGROUP:QUERY')!==-1">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row class="rowTop">
            <!-- <el-col :span="6">
                <div class="modules">
                    <div class="title">
                        <span>系统字典管理</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li @click="handleDialogFormOpen('systemDictionaryForm')">
                                <i class="iconfont icon-xinzeng icon-xinzengdianji"></i>
                                <span>新增</span>
                            </li>
                            <li @click="handleWindowOpen('/Home/SystemDictionary')">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="modules">
                    <div class="title">
                        <span>安全组</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li @click="handleDialogFormOpen('securityGroupForm')">
                                <i class="iconfont icon-xinzeng icon-xinzengdianji"></i>
                                <span>新增</span>
                            </li>
                            <li @click="handleWindowOpen('/Home/SecurityGroup')">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col> -->
            <!-- <el-col :span="6">
                <div class="modules">
                    <div class="title">
                        <span>接口管理</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li>
                                <i class="iconfont icon-xinzeng icon-xinzengdianji"></i>
                                <span>新增</span>
                            </li>
                            <li @click="handleWindowOpen('')">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col> -->
            <!-- <el-col :span="6">
                <div class="modules">
                    <div class="title">
                        <span>EXCEL导入模板下载</span>
                    </div>
                    <div class="handle">
                        <ul>
                            <li>
                                <i class="iconfont icon-xinzeng icon-xinzengdianji"></i>
                                <span>新增</span>
                            </li>
                            <li @click="handleWindowOpen('')">
                                <i class="iconfont icon-chaxun"></i>
                                <span>查询</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col> -->
        </el-row>
        <org-form ref="orgForm"></org-form>
        <role-form ref="roleForm"></role-form>
        <department-form ref="departmentForm"></department-form>
        <person-form ref="personForm"></person-form>
        <system-parameter-form ref="systemParameterForm"></system-parameter-form>
        <system-dictionary-form ref="systemDictionaryForm"></system-dictionary-form>
        <security-group-form ref="securityGroupForm"></security-group-form>
        <!-- excel新增 -->
        <el-dialog title="excel新增" :visible.sync="formVisible" :before-close="handleCancel" :close-on-click-modal="false" width="1020px"
            top="2vh" class="excelO">
            <el-form ref="form" :model="excelTemplate" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="模板名称：" prop="name">
                            <el-input v-model="excelTemplate.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="模板代码：" prop="code">
                            <el-input v-model="excelTemplate.code"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注：" prop="remark">
                            <el-input v-model="excelTemplate.remark" type="textarea" :autosize="{ minRows: 3 }" :maxlength="$length"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <section>
                    <div style="margin-bottom: 20px">
                        <h3>物资信息</h3>
                        <div>
                            <el-button @click="excelTemplate.excelModelRules.push({})" icon="el-icon-plus">增加</el-button>
                        </div>
                    </div>
                    <el-table :data="excelTemplate.excelModelRules" border max-height="300">
                        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                        <el-table-column label="字段名" width="140">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.chineseTitle"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="字段代码" width="160">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.englishTitle"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="必须">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.isMust"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column prop="type" label="参数类型" width="120">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.type" placeholder="状态选择">
                                    <el-option v-for="[key, val] of _dictExcelFieldTypes" :label="val" :value="key" :key="key"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="demo" label="示例字段" width="160">
                            <template slot-scope="scope">
                                <el-input type="textarea" :maxlength="$length" :rows="2" v-model="scope.row.demo"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="pack" label="校验规则" width="160">
                            <template slot-scope="scope">
                                <el-input type="textarea" :maxlength="$length" :rows="2" v-model="scope.row.rule"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="140" align="center" fixed="right">
                            <template slot-scope="scope">
                                <el-button size="small" class="danger" type="text" @click="removeField(scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </section>
            </el-form>
            <div slot="footer">
                <el-button @click.native="handleCancel">取消</el-button>
                <el-button type="primary" @click="handleSubmitExcelTemplate">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import orgForm from '../system/orgForm'
    import roleForm from '../system/roleForm'
    import departmentForm from '../system/departmentForm'
    import personForm from '../system/personForm'
    import systemParameterForm from '../system/systemParameterForm'
    import systemDictionaryForm from '../system/systemDictionaryForm'
    import securityGroupForm from '../system/securityGroupForm'
    import {
        saveExcelTemplate
    } from '@/api/excel/index'

    export default {
        name: "index",
        components: {
            orgForm,
            roleForm,
            departmentForm,
            personForm,
            systemParameterForm,
            systemDictionaryForm,
            securityGroupForm,
        },
        data() {
            return {
                formVisible: false,
                excelTemplate: this.initExcelTemplate(),
            }
        },
        mounted() {

        },
        methods: {
            portSearch() {
                // window.open("http://localhost:8080/#/Home/port")
            },
            handleDialogFormOpen(val) {
                if (val !== 'Excel') {
                    this.$refs[val].dialogForm = true
                } else {
                    this.formVisible = true
                }
            },
            handleWindowOpen(url) {
                // this.$router.push(url)
                this.$store.commit('ADD_CACHED_VIEWS', url)
                this.$router.push(url.path)
            },
            handleCancel() {
                this.excelTemplate = this.initExcelTemplate()
                this.formVisible = false
            },
            initExcelTemplate() {
                return {
                    excelModelRules: []
                }
            },
            handleSubmitExcelTemplate() {
                saveExcelTemplate(this.excelTemplate).then(() => {
                    this.$message({
                        message: '新增excel模板成功',
                        type: 'success'
                    })
                    this.handleCancel()
                })
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
            font-weight: 500;
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
                width: 23%;
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

    .flow {
        font-size: 11px;
        color: #9b9b9b;
    }

    .flow-left {
        float: left;
        margin-left: 73px;
    }

    .flow-right {
        float: right;
        margin-right: 45px;
    }

    .rowTop {
        margin-top: 22px;
    }

    .excelO {
        .el-form-item {
            .el-input {
                width: 220px;
            }
            .el-textarea {
                width: 220px;
            }
        }
        .dialog-footer {
            margin-top: 20px;
        }
    }

</style>
