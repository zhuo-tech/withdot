// noinspection JSXNamespaceValidation

import { StrUtil } from 'typescript-util'
import { defineComponent } from 'vue'

export default defineComponent({

    computed: {
        pathMatch(): Array<string> {
            return (this.$route.params.pathMatch ?? []) as Array<string>
        },
    },
    render() {
        const resultSlots = {
            extra: () => (
                <div>
                    <el-button type="primary" onClick={() => this.$router.back()}>返回上一页</el-button>
                    <el-button type="primary" onClick={() => this.$router.push({path: '/'})}>返回首页</el-button>
                </div>
            )
        }

        const errPath = StrUtil.PATH_INTEGRAL + this.pathMatch.join(StrUtil.PATH_INTEGRAL)
        return (
            <div style={{height: '100vh', paddingTop: '15vh'}}>
                <el-result icon="error" title={`页面 ${errPath} 不存在`} sub-title="可能真的不存在 或者您木的权限..." v-slots={resultSlots}></el-result>
            </div>
        )
    },

})
