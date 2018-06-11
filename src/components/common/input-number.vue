<template>
    <el-input type="text" v-model="infoName" @blur="handleBlurNum"
              clearable></el-input>
</template>

<script>
    const reg = /(?=(?!\b)(?:\d{3})+(?!\d))/g
    const regNum = /^[1-9]\d*$/
    export default {
        model: {
            prop: 'val',
            event: 'select'
        },
        props: {
            val: '',
            name: '',
        },
        name: "input-numbers",
        data() {
            return {
                num: '',
                logName:''
            }
        },
        methods: {
            handleBlurNum(event) {
                let val = event.target.value + ''
                this.num = val
                val = val.replace(/,/g, "")
                let emitVal = val.replace(/,/g, "")
                if (regNum.test(val)) {
                    console.log('1')
                    this.infoName = val.replace(reg, ',');
                    this.logName = val.replace(reg, ',');
                    console.log(this.infoName)
                    this.$emit('select', emitVal)
                } else {
                    console.log('2')
                    this.infoName = val.replace(reg, ',');
                    this.logName = val.replace(reg, ',');
                    console.log(emitVal)
                    this.$emit('select', emitVal)

                }
            }
        },
        watch: {
            val(v) {
                if (v === '') {
                    console.log('3')
                    this.infoName = ''
                    this.num = ''
                    this.logName = ''
                }
            },
        },
        computed: {
            infoName: {
                get() {
                    if (this.num === ''&&this.name) {
                        let val = this.name + ''
                        val = val.replace(/,/g, "")
                        let emitVal = val.replace(/,/g, "")
                        if (regNum.test(val)) {
                            console.log('5')
                            return val.replace(reg, ',');
                        } else {
                            console.log('6')
                            this.$emit('select', emitVal)
                            return val
                        }
                    }else {
                        return this.logName
                    }
                },
                set() {

                }
            }
        }
    }
</script>

<style scoped>

</style>
