<template>
    <div class="admin-form">
        <p class="card-title">国家认证</p>
        <basic-info :items="items" :models="models" :radio-index="2"></basic-info>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'

export default {
    components: {
        BasicInfo
    },

    data () {
        let types = [
            {value: '羊只生产照片'},
            {value: '羊只生产视频'},
            {value: '营业执照'},
            {value: '土壤检测报告'},
            {value: '水质检测报告'},
            {value: 'ISO质量管理体系认证'},
            {value: '食品安全管理体系认证'},
            {value: '空气检测报告'}
        ]
        let getType = (q, cb) => {
            cb(types)
        }


        return {
            items: [{
                label: '图片视频类型',
                model: 'type',
                type: 'select',
                fetchSuggestions: getType,
            }, {
                label: '上传图片或视频',
                model: 'file',
                type: 'file',
                fetchSuggestions: getType
            }],
            models: {
                type: null,
                file: null
            }
        }
    },

    methods: {
        submit () {
            if ( !this.beforeUpload ( this.models.file ) ) {
                return false;
            }

            let form = new FormData()
            Object.keys(this.models).forEach(v =>{
                form.append(v, this.models[v])
            })
            let headers = {}
            headers[authStr] = window.localStorage.getItem(tokenStr)
            window.fetch(baseUrl + '/uploadFile/upload', {
                method: 'POST',
                headers,
                body: form
            }).then(async res => {
                    let body = await res.json()
                    if (isReqSuccessful(body)) {
                        this.$message.success('提交成功')
                    }
                }, _ => {
                    this.$message.error('提交失败')
                })
        },

        beforeUpload ( file ) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < config.imageSize;
            if (isJPG && !isLt2M) {
                this.$message.error(`上传图片大小不能超过 ${config.imageSize} MB!`);
                return false;
            } else {
                return true;
            }
        }
    }
}
</script>

<style lang="stylus">

</style>
