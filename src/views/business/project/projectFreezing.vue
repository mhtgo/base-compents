<template>
    <el-dialog title="项目冻结" :visible.sync="dialogForm" width="400px">
        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="90px">
            <el-row>
                <el-form-item label="项目名称" prop="name">
                    <!--<search-project v-model="form.customerId" :name="form.contractName"></search-project>-->
                    <div style="display: flex;align-items: center">
                        <el-input v-model="form.name" :disabled="true"></el-input>
                        <i @click="handleSelectProject" class="el-icon-search"
                           style="margin-left: 5px;font-size: 20px;cursor: pointer"></i>
                    </div>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="冻结原因" prop="frozenReason">
                    <el-input type="textarea" :rows="5" placeholder="请输入冻结原因" v-model="form.frozenReason"></el-input>
                </el-form-item>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
            <el-button @click="dialogForm = false">取 消</el-button>
        </span>
        <el-dialog title="选择项目" :visible="dialogProject" :modal="false" :modal-append-to-body="false"
                   :before-close="handleCancel"
                   :close-on-click-modal="true"
                   width="90%">
            <project ref="project" @select="handleSelect"></project>
            <!--<span slot="footer" class="dialog-footer">-->
            <!--<el-button type="primary" @click="handleMakeSure">确定</el-button>-->
            <!--<el-button @click="dialogProject = false">取 消</el-button>-->
            <!--</span>-->
        </el-dialog>
    </el-dialog>
</template>

<script>
    import searchProject from '@/components/autocomplete/autoSearchProject'
    import project from './index'
    import { freezeProject } from "@/api/project/project";

    export default {
        name: "projectFreezing",
        components: { searchProject, project },
        data() {
            return {
                dialogForm: false,
                form: {
                    name: '',
                    frozenReason: ''
                },
                project: {},
                rules: {
                    name: [{ required: true, message: '请选择一个项目', trigger: 'change' }],
                    frozenReason: [{ required: true, message: '请输入冻结原因', trigger: 'change' }],
                },
                chooseProject: [{ name: 'xxxxxxxx', id: 1 }, { name: 'zz', id: 2 }],
                dialogProject: false,
            }
        },
        methods: {
            handleClose(index) {
                this.chooseProject.splice(index, 1);
            },
            handleSelectProject() {
                this.dialogProject = true
                this.$nextTick(() => {
                    console.log(this.$refs)
                    this.$refs.project.condition['search_EQ_projectStatus'] = 'C'
                    this.$refs.project.isSelect = true
                    setTimeout(()=>{
                        this.$refs.project.loadData()
                    },100)
                })
            },
            handleSubmit() {
                this.$refs.form.validate((valid) => {
                    if(valid){
                        freezeProject(this.form.id, { }).then(res => {
                            this.$message({ message: `冻结成功!`, type: 'success' })
                            this.dialogForm = false
                            this.$emit('load')
                            this.$storageMsg('loadData')
                        })
                    }else {
                        this.$message({
                            type: 'error',
                            message: '请检查表单!'
                        });
                    }
                })
            },
            // 选择合同
            handleSelect(val) {
                console.log(val)
                this.project = JSON.parse(JSON.stringify(val))
                this.handleMakeSure()
            },
            handleMakeSure() {
                this.dialogProject = false
                this.form.name = this.project.name
                this.form.id = this.project.id
            },
            handleCancel(v){
                this.dialogProject = false
            }
        },
        watch: {
            dialogForm(bool) {
                if (!bool) {
                    this.form.name = ''
                    this.form.id = ''
                    this.form.frozenReason = ''
                    this.$refs.form.resetFields()
                }
            }
        }
    }
</script>

<style scoped>
    .el-textarea {
        width: 188px !important;
    }

    .tags {
        border: 1px solid #e5e5e5;
        padding: 10px;
        min-height: 10px;
        width: 168px;
        border-radius: 4px;
    }

    .el-tag + .el-tag {
        margin-left: 10px;
    }
</style>
