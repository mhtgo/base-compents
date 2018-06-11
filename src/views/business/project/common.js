export default {
    computed: {
        id() {
            return Number(this.$route.params.id)
        },
        model() {
            return this.$route.params.model
        },
        busmodelId() {
            return Number(this.$route.params.model)
        },
    },
    mounted() {
        if (this.id) {
            this.loadData()
        }
    }
}
