export default {
    model: {
        prop: 'id',
        event: 'select'
    },
    props: {
        name: {
            type: String,
            default: ''
        },
        id: {
            // type: Number
            default: 0
        },
        placeholder: {
            type: String,
            default: ''
        },
        projectid: {
            default: ''
        },
        iDisplayLength: {
            default: 65535
        },
        disabled:{
            default:false
        }
    },
    data() {
        return {
            infoName: this.name,
            isMouseEnter:false,
        }
    },
    watch: {
        name(newVal) {
            this.infoName = newVal
        },
        id(newVal) {
            if (!newVal) {
                this.infoName = ''
            }
        }
    },
    methods: {
        handleSelect(item) {
            this.$emit('matchRecord', Object.assign({}, item))
            this.$emit('select', item.id)
            this.$emit('selectName', item.name)
            this.$emit('change', item.id)
        },
        checkCurrentId() {
            if (!this.id) {
                this.infoName = ''
            }
        }
    }
}
