// noinspection JSXNamespaceValidation

import { StrUtil } from 'typescript-util'
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        icon: {
            type: [Object],
            required: true,
        },
        label: {
            type: String,
            required: false,
        },
    },
    render() {
        const {icon, label} = this.$props
        // noinspection UnnecessaryLocalVariableJS
        const Icon = icon
        return (
            <span>
                {
                    // @ts-ignore
                    Icon && <el-icon><Icon></Icon></el-icon>
                }
                {
                    StrUtil.isNotEmpty(label) && (
                        <span style={ {paddingLeft: '5px'} }>
                            { label }
                        </span>
                    )
                }
            </span>
        )
    },
})
