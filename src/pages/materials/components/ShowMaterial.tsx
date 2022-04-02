// noinspection JSXNamespaceValidation

import ShowFile from '@/components/Upload/ShowFile'
import CoreMaterial from '@/model/entity/CoreMaterial'
import { FileType } from '@/model/FileType'
import { StrUtil } from 'typescript-util'
import { defineComponent } from 'vue'

// noinspection JSUnusedLocalSymbols
export default defineComponent({
    props: {
        list: {
            type: Array,
            default: () => ({}),
        },
        queryType: {
            type: String,
            default: StrUtil.EMPTY,
        },
        select: {
            type: Function,
            default: (item: CoreMaterial, index: number) => {
            },
        },
    },
    render() {
        const {queryType} = this
        let isAudio = queryType === FileType.AUDIO
        // 防止类型切换时内容闪烁
        const queryTypeRexExp = new RegExp(`^${queryType}`)
        const renderList = (this.$props.list as Array<CoreMaterial>)?.filter(i => queryTypeRexExp.test(i.type))

        // 渲染一个内容卡片
        const renderItem = (item: CoreMaterial, index: number) => {
            return (
                <el-card className="box-card" onClick={ () => this.$props.select?.(item, index) } shadow={'always'}>
                    <div class="material-box">
                        <ShowFile file={ item.file } style={ {width: '100%', maxWidth: '800px'} }></ShowFile>
                    </div>
                    <div class="material-footer">
                        <span>{ item.title }</span>
                    </div>
                </el-card>
            )
        }

        if (isAudio) {
            return (
                <div>
                    {renderList.map((item, index) => (renderItem(item, index)))}
                </div>
            )
        }

        // 渲染栅格内的卡片
        return (
            <el-row gutter={ 10 } type={'flex'} >
                {
                    renderList.map((item, index) => (
                            <el-col key={ index } { ...{md: 6, xl: 4} }>
                                {renderItem(item, index)}
                            </el-col>
                        ))
                }
            </el-row>
        )
    },
})
