<template>
    <div v-html="preview">

    </div>
</template>

<script>
    import { preview } from "@/api/attachment/attachment";

    export default {
        name: "preview",
        data() {
            return {
                preview: '',
            }
        },
        mounted() {
            preview(this.$route.query.id).then(res => {
                this.preview = res.data
            })
        }
    }
</script>

<style scoped>

</style>
