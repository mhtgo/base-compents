<template>
    <div>
        <NavItem></NavItem>
        <el-container class="elContainer">
            <app-header></app-header>
            <div style="width: 100%;background-color: #f3f3f3">
                <div class="contentRoute">
                    <div class="mainBackground">
                        <transition name="fade-transform" mode="out-in">
                            <keep-alive :include="cachedViewsName">
                                <router-view></router-view>
                            </keep-alive>
                        </transition>
                    </div>
                </div>
            </div>
        </el-container>
    </div>
</template>

<script>
    import NavItem from './navItem'
    import AppHeader from './appHeader'

    export default {
        name: "index",
        components: {
            AppHeader,
            NavItem
        },
        computed: {
            cachedViewsName() {
                console.log(this.$store.state.tagsView.cachedViewsName)
                return this.$store.state.tagsView.cachedViewsName
            }
        }
    }

</script>

<style scoped>
    .elContainer {
        display: flex;
        flex-wrap: wrap;
        position: absolute;
        left: 200px;
        top: 0;
        width: calc(100% - 200px);
    }

    .contentRoute {
        padding: 15px;
    }

    .mainBackground {
        padding: 15px 20px;
        background-color: #fff;
        box-shadow: 0 1px 1px 0px rgba(0, 34, 77, 0.06);
    }

</style>
