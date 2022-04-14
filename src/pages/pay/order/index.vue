<script lang="ts">
import { ElMessage } from 'element-plus'
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { PayTradeOrderService } from "@/pages/pay/service/PayTradeOrderService";
import { getLogger } from "@/main";
import { PayTradeOrderQo } from "@/pages/pay/service/model/PayTradeOrderQo";
import { PayTradeOrder } from '@/model/entity/PayTradeOrder';

export default defineComponent({
    setup() {
        const log = getLogger("交易记录");
        const service = new PayTradeOrderService();
        const query = new PayTradeOrderQo(1, 10)
        const statusOptions = [
            { value: '0', label: '待支付' },
            { value: '1', label: '支付成功' },
            { value: '2', label: '支付完成' },
            { value: '-1', label: '支付失败' },
            { value: '-2', label: '支付取消' }
        ]
        const trade = reactive({
            tableKey: 0,
            list: Array<PayTradeOrder>(),
            total: 0,
            listLoading: true,
            queryParam: query,
            statusOptions: statusOptions,
            genSn(index: number) {
                return (index += 1)
            },
            fmtPayStatus(row: PayTradeOrder): string {
                const o = statusOptions.find(item => item.value === row.status)
                return o ? o.label : '-'
            },
            async handleDelete(index: number, obj: PayTradeOrder) {
                await service.removeById(obj._id)
                ElMessage.success({
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                })
            },
            handleCurrentChange(current: number) {
                log.debug(`current -> ${current} `)
                trade.queryParam.current = current
                trade.getList(trade.queryParam)
            },
            handleSizeChange(size: number) {
                trade.queryParam.size = size
                log.debug(`size -> ${size} `)
                trade.getList(trade.queryParam)
            },
            async getList(queryParam: PayTradeOrderQo) {
                trade.listLoading = true
                const res = await service.page(queryParam);
                trade.list = res.record ?? []
                trade.total = res.total ?? 0
                setTimeout(() => { trade.listLoading = false }, 0.5 * 1000)
            },
            handleSearch() {
                trade.getList(trade.queryParam)
            }
        })
        onMounted(() => {
            trade.getList(trade.queryParam)
        })
        return {
            ...toRefs(trade)
        }
    }
})
</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <h1>交易订单</h1>
            </div>
        </template>
        <el-row :gutter="24">
            <el-form v-model="queryParam" ref="queryParamRef">
                <el-col :span="12">
                    <el-form-item label="订单号">
                        <el-input v-model="queryParam.orderNo" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="订单状态">
                        <el-select v-model="queryParam.status" clearable class="filter-item">
                            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="0">
                    <el-button type="primary" icon="Search" @click="handleSearch()">查询</el-button>
                </el-col>
            </el-form>
        </el-row>
        <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row
            style="width: 100%">
            <el-table-column label="序号" type="index" :sn="genSn" width="60" />
            <el-table-column prop="orderId" label="订单号" />
            <el-table-column prop="channelId" label="渠道ID" />
            <el-table-column prop="channelMchId" label="渠道商户" />
            <el-table-column prop="channelOrderNo" label="渠道订单" />
            <el-table-column prop="body" label="商品描述" />
            <el-table-column prop="amount" label="金额" />
            <el-table-column prop="currency" label="币种" />
            <el-table-column prop="status" :formatter="fmtPayStatus" label="支付状态" />
            <el-table-column prop="clientIp" label="客户端IP" />
            <el-table-column prop="paySucTime" label="成功时间" />
            <el-table-column prop="createTime" label="创建时间" />
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
