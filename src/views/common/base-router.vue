<template>
    <div class="router-view">
        <transition name="fade" mode="out-in">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>


</script>

<style rel="stylesheet/scss" lang="scss" scoped>


</style>
