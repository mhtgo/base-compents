<template>
    <div>
        <div v-for="(item,index) in file" :key="item.id">
            <span v-if="showFileName">文件名：{{ item.fileName }}</span>
            <a v-if="showDownload" @click="handleDownload(item)"> 下载</a>
            <a v-if="showPreview" @click="handlePreview(item)" v-loading.fullscreen.lock="fullscreenLoading"> 预览</a>
        </div>
        <el-dialog title="预览" :visible.sync="dialogForm" :modal="false" width="95%"
                   style="margin-top: 5vh;text-align: left">
            <div v-html="preview">

            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { downloadFile, preview } from "@/api/attachment/attachment";

    export default {
        model: {
            prop: 'file',
            event: 'upload'
        },
        name: "download",
        props: {
            file: {
                type: Array,
                default: () => [],
            },
            // 是否显示下载按钮,默认为true
            showDownload: {
                type: Boolean,
                default: true,
            },
            // 是否显示预览按钮,默认为true
            showPreview: {
                type: Boolean,
                default: true,
            },
            showFileName: {
                type: Boolean,
                default: true,
            }
        },
        data() {
            return {
                preview: '',
                dialogForm: false,
                fullscreenLoading: false
            }
        },
        methods: {
            handleDownload(item) {
                // 下载后端返回的二进制流
                downloadFile(item.id).then(res => {
                    //这里res是返回的blob对象
                    var blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' }); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob); //创建下载的链接
                    downloadElement.href = href;
                    downloadElement.download = item.fileName; //下载后文件名
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); //点击下载
                    document.body.removeChild(downloadElement); //下载完成移除元素
                    window.URL.revokeObjectURL(href); //释放掉blob对象
                })
            },
            // 预览
            handlePreview(item) {
                // this.fullscreenLoading = true;
                // preview(item.id).then(res => {
                //     this.preview = res.data
                //     this.dialogForm = true
                //     this.fullscreenLoading =false
                // })
                const origin = window.location.origin
                window.open(origin + '/#/Preview?id=' + item.id)
            }
        }
    }
</script>

<style scoped>

</style>
