
<script lang="ts">
import { PayNotifyRecord } from "@/model/entity/PayNotifyRecord";
import { ElMessage } from 'element-plus'
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { PayNotifyRecordService } from "@/pages/pay/service/PayNotifyRecordService";
import { getLogger } from "@/main";
import { PayNotifyRecordQo } from "@/pages/pay/service/qo/PayNotifyRecordQo";
const L = getLogger("支付通知");
const S = new PayNotifyRecordService();
const Q = new PayNotifyRecordQo(1, 10);
export default defineComponent({
    setup() {
        const state = reactive({
            tableKey: 0,
            list: Array<PayNotifyRecord>(),
            total: 0,
            listLoading: true,
            queryParam: Q
        })
        onMounted(() => {
            handlePage(state.queryParam)
        })
        const handleSn = (index: number): number => {
            return (index += 1)
        }
        const handleCurrentChange = (current: number) => {
            L.debug(`current -> ${current} `)
            state.queryParam.current = current
            handlePage(state.queryParam)
        }
        const handleSizeChange = (size: number) => {
            state.queryParam.size = size
            L.debug(`size -> ${size} `)
            handlePage(state.queryParam)
        }
        const handleSearch = () => {
            handlePage(state.queryParam)
        }
        const handleDelete = async (index: number, obj: PayNotifyRecord) => {
            L.debug(`delete obj by id [index]-> ${index} [id]-> ${obj._id}`)
            const ok = await S.deleteById(obj._id)
            if (!ok) {
                ElMessage.error({
                    message: '删除失败',
                    type: 'warning',
                    duration: 2000
                })
            }
            ElMessage.success({
                message: '删除成功',
                type: 'success',
                duration: 2000
            })
            handlePage(state.queryParam)
        }
        const handlePage = async (params: PayNotifyRecordQo): Promise<void> => {
            state.listLoading = true
            const res = await S.pageByParams(params);
            state.list = res.record ?? []
            state.total = res.total ?? 0
            state.listLoading = false
        }
        return {
            ...toRefs(state),
            handleSearch,
            handlePage,
            handleSizeChange,
            handleCurrentChange,
            handleDelete,
            handleSn
        }
    }
})
</script>
<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <h1>支付通知</h1>
            </div>
        </template>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form v-model="queryParam" ref="queryParamRef">
                    <el-form-item label="订单号">
                        <el-input v-model="queryParam.orderNo" clearable />
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="6" :offset="0">
                <el-button type="primary" icon="Search" @click="handleSearch()">查询</el-button>
            </el-col>
        </el-row>
        <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row
            style="width: 100%">
            <el-table-column label="序号" type="index" :sn="handleSn" width="60" />
            <el-table-column label="订单号码" prop="orderNo" width="180" />
            <el-table-column label="响应通知" prop="notifyId" />
            <el-table-column label="回调报文" prop="request" show-overflow-tooltip />
            <el-table-column label="响应报文" prop="response" />
            <el-table-column label="创建时间" prop="createTime" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-popconfirm icon="Warning" cancel-button-text="手滑了" confirm-button-text="确认删除" icon-color="red"
                        title=" 操作无法撤销, 确定要删除吗 ？" @click="handleDelete(scope.$index, scope.row)">
                        <template #reference>
                            <el-button size="small" type="text" icon="Delete"
                                @click="handleDelete(scope.$index, scope.row)">
                                删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pages" :total="total" v-show="total > 0" v-model:page="queryParam.current"
            v-model:limit="queryParam.size" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" />
    </el-card>
</template>
<style lang="less" scoped>
.pages {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
}
</style>