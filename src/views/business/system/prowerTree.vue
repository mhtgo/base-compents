<template>
    <div>
        <el-dialog title="分配权限" :modal="false" :visible.sync="showTree" width="400px">
            <el-tree ref="tree" node-key="id" v-if="showTree" :data="nowTree" @check-change="getCheckedNodes" :default-expand-all='false'
                :default-checked-keys="defCheck" show-checkbox>
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="handleSubmit" :loading="$store.getters.loadingBtn">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        permissions,
        getID
    } from "@/router/route"
    import {
        disPower,
        getRoleListOne
    } from "@/api/system/role";

    export default {
        props: {
            id: {}
        },
        mounted() {},
        data() {
            return {
                showTree: false,
                systems: [{
                    name: "系统支撑",
                    id: 'system'
                }, {
                    name: "商务管理",
                    id: 'business'
                }, {
                    name: "现场作业",
                    id: 'work'
                }],
                defCheck: [],
                after: [],
                nowTree: [],
                subPower: [],
                noSplice: "WJOB_TRAIN_STATISTICALQUERY','WJOB_CONTAINERPLANJOB_STATISTICALQUERY'"
            }
        },
        methods: {
            load() {
                this.after = this.$store.state.user.currentUser.securityPermissions
                this.nowTree = this.canDisPower(permissions, this.after)
            },
            canDisPower(routes, permissions) {
                let resultRoutes = routes.filter(route => {
                    if (route.children && route.children.length) {
                        route.children = this.canDisPower(route.children, this.after)
                        if (route.children && route.children.length) {
                            return true
                        }
                    } else {
                        return this.hasPermission(this.after, route)
                    }
                })
                return resultRoutes
            },
            hasPermission(permissions, route) {
                let nowPer = permissions
                if (route.id) {
                    let a = []
                    for (let index = 0; index < route.id.length; index++) {
                        if (nowPer.indexOf(route.id[index]) !== -1) {
                            a.push(route.id[index])
                        }
                    }
                    route.id = a
                    return permissions.some(permission => route.id.indexOf(permission) >= 0)
                } else {
                    return true
                }
            },
            getSpc() {
                let a = []
                getRoleListOne(this.id).then(res => {
                    a = res.data.securityPermissions
                    this.$nextTick(() => {
                        for (let index = a.length - 1; index >= 0; index--) {
                            if (a[index].indexOf(':') === -1) {
                                if (a[index] != 'WJOB_TRAIN_STATISTICALQUERY' && a[index] !=
                                    'WJOB_CONTAINERPLANJOB_STATISTICALQUERY' && a[index] !=
                                    'WJOB_CONTAINERPLANJOB_ARRIVECONFIRMQUERY' && a[index] !=
                                    'WJOB_CONTAINERPLANJOB_CXRECORDQUERY' && a[index] !=
                                    'WJOB_CONTAINERPLANJOB_CONTAINERINPORTQUERY' && a[index] !=
                                    'WJOB_CONTAINERPLANJOB_CONTAINERTRACKING') {
                                    a.splice(index, 1)
                                }
                            }
                        }
                        this.defCheck = a
                        this.showTree = true
                    })
                })
            },
            getCheckedNodes(val) {
                let unwind = []
                // console.log(this.$refs.tree.getCheckedKeys())
                // console.log(this.$refs.tree.getHalfCheckedKeys())
                if (this.$refs.tree.getHalfCheckedKeys().length !== 0) {
                    this.$refs.tree.getHalfCheckedKeys().forEach(element => {
                        unwind = unwind.concat(element)
                    })
                }
                if (this.$refs.tree.getCheckedKeys().length !== 0) {
                    this.$refs.tree.getCheckedKeys().forEach(element => {
                        unwind = unwind.concat(element)
                    })
                }
                this.subPower = unwind
            },
            handleSubmit() {
                let lingshi = {
                    "securityPermissions": this.subPower
                }
                disPower(this.id, lingshi).then(res => {
                    this.$message({
                        type: 'success',
                        message: `分配成功`
                    })
                    this.defCheck = []
                    this.showTree = false
                    this.$emit('load')
                })
            },
            cancel() {
                this.defCheck = []
                this.showTree = false
            }
        }
    }

</script>
