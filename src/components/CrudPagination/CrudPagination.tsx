// noinspection JSXNamespaceValidation

import BasisCrud from '@/mixin/BasisCrud'
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        service: {
            type: [BasisCrud],
            required: true,
        },
    },
    render() {
        const {page, pageSizeChange, currentPageChange} = this.$props.service
        return (
            <el-row justify="end" type={ 'flex' } { ...this.$attrs }>
                <el-col span={ 6 }>
                    <el-row justify="end" type={ 'flex' }>
                        <el-pagination
                            current-page={ page.currentPage }
                            page-size={ page.pageSize }
                            page-sizes={ [10, 20, 50, 100] }
                            total={ page.total }
                            layout="total, sizes, prev, pager, next"
                            onSizeChange={ pageSizeChange }
                            onCurrentChange={ currentPageChange }>
                        </el-pagination>
                    </el-row>
                </el-col>
            </el-row>
        )
    },
})
