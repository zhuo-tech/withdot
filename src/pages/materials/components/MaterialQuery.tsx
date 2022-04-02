// noinspection JSXNamespaceValidation

import { FileType } from '@/model/FileType'
import MaterialService from '@/pages/materials/MaterialService'
import { CirclePlusFilled, Refresh, Search } from '@element-plus/icons-vue'
import { ObjectUtil } from 'typescript-util'
import { defineComponent } from 'vue'

const FileTypeDisplay: Record<string, typeof FileType[keyof typeof FileType]> = {
    '图片': FileType.IMAGE,
    '视频': FileType.VIDEO,
    '音频': FileType.AUDIO,
}
const FileTypeOption = ObjectUtil.toArray(FileTypeDisplay).map(kv => ({label: kv.key, value: kv.value}))

export default defineComponent({
    name: 'MaterialQuery',
    props: {
        service: {
            type: [MaterialService],
            required: true,
        },
    },
    methods: {
        renderQueryForm() {
            const {service} = this
            if (!service.showQuery) {
                return <span></span>
            }
            return (
                <el-col>
                    <el-form ref="queryFormRef" model={ service.queryData } inline label-width={ '80px' }>
                        <el-form-item>
                            <el-input v-model={ service.queryData.title } clearable placeholder="标题"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model={ service.queryData.tag } default-first-option multiple placeholder="选择标签" clearable>
                                {
                                    // @ts-ignore
                                    service.tagOption?.map((tag, index) => (<el-option key={ index } label={ tag } value={ tag }></el-option>))
                                }
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-radio-group v-model={service.queryData.type} onChange={service.listUpdate}>
                                {
                                    FileTypeOption.map(option => (<el-radio-button label={option.value} > {option.label} </el-radio-button>))
                                }
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button icon={ Search } type="primary" onClick={ service.queryFormSubmit }></el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            )
        },

        renderFunctionButtons() {
            const {service} = this
            return (
                <el-row justify="end" type={ 'flex' }>
                    <el-button icon={ CirclePlusFilled } type="primary" onClick={ service.readyAdd }>上传素材</el-button>
                    <el-button icon={ Search } type="primary" onClick={ () => {
                        // @ts-ignore
                        service.showQuery = !(service.showQuery)
                    } } />
                    <el-button v-loading={ service.tableIsLoading }
                               disabled={ service.tableIsLoading }
                               icon={ Refresh }
                               type="primary"
                               onClick={ service.listUpdate }></el-button>
                </el-row>
            )
        },
    },
    render() {
        // noinspection JSUnusedLocalSymbols
        const {service} = this.$props

        return (
            <div>
                <el-row justify="end" type={ 'flex' }>
                    <el-collapse-transition>
                        { this.renderQueryForm() }
                    </el-collapse-transition>
                    <el-col span={ 6 }>
                        { this.renderFunctionButtons() }
                    </el-col>
                </el-row>
            </div>
        )
    },
})
