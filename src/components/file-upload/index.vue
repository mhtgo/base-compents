<template>
    <div>
        <el-upload ref="upL" :action="action" :http-request="uploadSectionFile" :on-preview="handlePreview"
                   :on-remove="handleRemove"
                   :file-list="fileList" :before-upload="handleBefore" multiple>
            <el-button type="primary" plain>{{ btnName }}</el-button>
            <div slot="tip"></div>
        </el-upload>
        <el-progress v-show="showProgress" :status="upStatus" :percentage="uploadPercent"></el-progress>
    </div>
</template>
<script>
    import { getCookie, Token } from '@/utils/cookie'
    import { uploadFileMulti, uploadFileSingle } from "@/api/attachment/attachment";

    export default {
        model: {
            prop: 'attachments',
            event: 'upload'
        },
        props: {
            attachments: {
                type: Array,
                default: () => []
            },
            btnName: {
                default: '上传附件'
            }
        },
        data() {
            return {
                action: '/attachments/uploadMulti',
                headers: {
                    'Authorization': getCookie(Token),
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                uploadPercent: 0,
                upStatus: '',
                showProgress: false,
            }
        },
        mounted() {
        },
        methods: {
            // cleanFiles() {
            //     this.attachments.splice(0, this.attachments.length)
            // },
            // 覆盖element组件自带上传事件
            uploadSectionFile(param) {
                let fileObj = param.file;

                // FormData 对象
                let form = new FormData();
                // 文件对象
                form.append("file", fileObj);
                uploadFileSingle(form).then(res => {
                    this.attachments.push(res.data)
                    this.$emit('upload', this.attachments)
                    this.uploadPercent = 100
                    this.showProgress = false
                })

                // 原生上传
                // 接收上传文件的后台地址
                // let FileController = "/api/attachments/uploadSigle";
                // var xhr = new XMLHttpRequest();
                // xhr.open("post", FileController, true);
                // xhr.setRequestHeader('Authorization', getCookie(Token))
                // this.$store.commit('SET_LOADING_STATUS', true)
                // console.log(this.$store.getters.loadingBtn)
                // // xhr.upload.addEventListener("progress", this.progressFunction, false); //监听上传进度
                // xhr.onload = () => {
                //     let res = JSON.parse(xhr.response)
                //     console.log(res)
                //     this.$store.commit('SET_LOADING_STATUS', false)
                //     console.log(this.$store.getters.loadingBtn)
                //     this.attachments.push(res.data)
                //     this.$emit('upload', this.attachments)
                //     this.uploadPercent = 100
                //     this.showProgress = false
                // };
                // xhr.send(form);
            },
            progressFunction() {
                this.showProgress = true
            },
            handleBefore(file) {
                console.log(file)
            },
            handleRemove(file, fileList) {
                console.log(file, fileList)
                this.attachments = this.attachments.filter(attachment => attachment.filePath !== file.url)
                this.$emit('upload', this.attachments)
            },
            handlePreview(file) {
                console.log(file)
            },
        },
        watch: {},
        computed: {
            fileList() {
                let fileList = []
                console.log(this.attachments)
                if (this.attachments&&this.attachments.length > 0) {
                    this.attachments.forEach((attachment) => {
                        if(attachment.fileName.length>20){
                            attachment.fileName=attachment.fileName.substr(0,20)+'...'
                        }
                        fileList.push({
                            name: attachment.fileName,
                            url: attachment.filePath
                        })
                    })
                }
                return fileList
            }
        },
    }
</script>
