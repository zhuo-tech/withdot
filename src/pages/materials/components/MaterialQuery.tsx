// noinspection JSXNamespaceValidation

import MaterialService from '@/pages/materials/MaterialService'
import { CirclePlusFilled, Refresh, Search } from '@element-plus/icons-vue'
import { defineComponent } from 'vue'

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
                            <el-select v-model={ service.queryData.tag } default-first-option multiple placeholder="选择">
                                {
                                    // @ts-ignore
                                    service.tagOption?.map((tag, index) => (<el-option key={ index } label={ tag } value={ tag }></el-option>))
                                }
                            </el-select>
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
                    <el-button icon={ CirclePlusFilled } type="primary" onClick={ service.readyAdd }>新增</el-button>
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
