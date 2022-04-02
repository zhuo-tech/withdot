// noinspection JSXNamespaceValidation

import { ConfigProviderProps } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { defineComponent } from 'vue'

export default defineComponent({
    computed: {
        config(): Partial<ConfigProviderProps> {
            return {
                locale: zhCn,
                size: 'large',
                keyboardNavigation: true,
                button: {autoInsertSpace: true},
                message: {max: 10},
            }
        },
    },
    render() {
        return (
            <el-config-provider { ...this.config }>
                <router-view></router-view>
            </el-config-provider>
        )
    },
})
