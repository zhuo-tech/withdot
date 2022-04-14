<script lang="ts">
import { PayNotifyRecord } from "@/model/entity/PayNotifyRecord";
import { ElMessage } from 'element-plus'
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { PayNotifyRecordService } from "@/pages/pay/service/PayNotifyRecordService";
import { getLogger } from "@/main";
import { PayNotifyQo } from "@/pages/pay/service/model/PayNotifyQo";

export default defineComponent({
    setup() {
        const log = getLogger("支付通知");
        const service = new PayNotifyRecordService();
        const query = new PayNotifyQo(1, 10, '')
        const notify = reactive({
            tableKey: 0,
            list: Array<PayNotifyRecord>(),
            total: 0,
            listLoading: true,
            queryParam: query,
            genSn(index: number) {
                return (index += 1)
            },
            async handleDelete(index: number, obj: PayNotifyRecord,) {
                await service.deleteById(obj._id)
                ElMessage.success({
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                })
            },
            handleCurrentChange(current: number) {
                log.debug(`current -> ${current} `)
                notify.queryParam.current = current
                notify.getList(notify.queryParam.current, notify.queryParam.size, notify.queryParam.orderNo)
            },
            handleSizeChange(size: number) {
                notify.queryParam.size = size
                log.debug(`size -> ${size} `)
                notify.getList(notify.queryParam.current, notify.queryParam.size, notify.queryParam.orderNo)
            },
            async getList(current: number, size: number, orderNo: string) {
                notify.listLoading = true
                const res = await service.pageByParams(current, size, orderNo);
                notify.list = res.record ?? []
                notify.total = res.total ?? 0
                setTimeout(() => { notify.listLoading = false }, 0.5 * 1000)
            },
            handleSearch() {
                notify.getList(
                    notify.queryParam.current,
                    notify.queryParam.size,
                    notify.queryParam.orderNo
                )
            }
        })
        onMounted(() => {
            notify.getList(1, 10, notify.queryParam.orderNo)
        })
        return {
            ...toRefs(notify)
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
                        <el-input v-model="queryParam.orderNo" />
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="6" :offset="0">
                <el-button type="primary" icon="Search" @click="handleSearch()">查询</el-button>
            </el-col>
        </el-row>
        <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row
            style="width: 100%">
            <el-table-column label="序号" type="index" :sn="genSn" width="60" />
            <el-table-column label="订单号码" prop="orderNo" width="180" />
            <el-table-column label="响应通知" prop="notifyId" />
            <el-table-column label="回调报文" prop="request" show-overflow-tooltip />
            <el-table-column label="响应报文" prop="response" />
            <el-table-column label="创建时间" prop="createTime" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-divider direction="vertical" />
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