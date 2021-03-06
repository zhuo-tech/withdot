
<script lang="ts">
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref, toRefs } from "vue";
import { PayTradeOrderService } from "@/pages/pay/order/PayTradeOrderService";
import { getLogger } from "@/main";
import { PayTradeOrderQo } from "@/pages/pay/order/PayTradeOrderQo";
import { PayTradeOrder } from '@/model/entity/PayTradeOrder';
import { getPayStatLabel, StatusOptions } from '@/model/PayStatusEnum';
const NAME = PayTradeOrder.name
export default {
    name:NAME,
    setup() {
        const L = getLogger("交易记录");
        const S = new PayTradeOrderService();
        const Q = new PayTradeOrderQo(1, 10)
        const state = reactive({
            data: Array<PayTradeOrder>(),
            total: 0,
            listLoading: true,
            queryParam: Q,
            statusOptions: StatusOptions,
        })
        L.debug(`[state] -> ${JSON.stringify(state)}`)
        const handleSn = (index: number): number => {
            return (index += 1)
        }
        const handlePayStatus = (row: PayTradeOrder): string => {
            return getPayStatLabel(row.status)
        }
        const handleDelete = async (index: number, obj: PayTradeOrder):Promise<void> => {
            L.debug(`delete obj by id [index]-> ${index} [id]-> ${obj._id}`)
            await S.removeById(obj._id)
            ElMessage.success({
                message: '删除成功',
                type: 'success',
                duration: 2000
            })
            handlePage(state.queryParam)
        }
        const handleCurrentChange = (current: number): void => {
            L.debug(`current -> ${current} `)
            state.queryParam.current = current
            handlePage(state.queryParam)
        }
        const handleSizeChange = (size: number): void => {
            state.queryParam.size = size
            L.debug(`size -> ${size} `)
            handlePage(state.queryParam)
        }
        const handlePage = async (queryParam: PayTradeOrderQo): Promise<void> => {
            state.listLoading = true
            const res = await S.page(queryParam);
            state.data = res.record ?? []
            state.total = res.total ?? 0
            state.listLoading = false
        }
        const handleSearch = () => {
            handlePage(state.queryParam)
        }
        onMounted(() => {
            handlePage(state.queryParam)
        })
        return {
            ...toRefs(state),
            handleSearch,
            handlePage,
            handleSizeChange,
            handleCurrentChange,
            handleDelete,
            handleSn,
            handlePayStatus
        }
    }
}
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
                        <el-input v-model="queryParam.orderNo" clearable />
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
        <el-table v-loading="listLoading" :data="data" :border="true" fit highlight-current-row style="width: 100%">
            <el-table-column label="序号" type="index" :sn="handleSn" width="60" />
            <el-table-column prop="orderId" label="订单号" />
            <el-table-column prop="channelId" label="支付渠道" />
            <el-table-column prop="channelMchId" label="渠道商户" />
            <el-table-column prop="channelOrderNo" label="渠道订单" />
            <el-table-column prop="body" label="商品描述" />
            <el-table-column prop="amount" label="金额" />
            <el-table-column prop="currency" label="币种" />
            <el-table-column prop="status" :formatter="handlePayStatus" label="支付状态" />
            <el-table-column prop="clientIp" label="客户端IP" />
            <el-table-column prop="paySucTime" label="成功时间" />
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-popconfirm icon="Warning" cancel-button-text="手滑了" confirm-button-text="确认删除" icon-color="red"
                        title=" 操作无法撤销, 确定要删除吗 ？" @click="handleDelete(scope.$index, scope.row)">
                        <template #reference>
                            <el-button icon="Delete" link size="small">删除</el-button>
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
