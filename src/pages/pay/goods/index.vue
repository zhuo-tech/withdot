<script lang="ts">
import { ElMessage } from 'element-plus'
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { PayGoodsOrderService } from "@/pages/pay/service/PayGoodsOrderService";
import { getLogger } from "@/main";
import { PayGoodsOrderQo } from "@/pages/pay/service/qo/PayGoodsOrderQo";
import { PayGoodsOrder } from '@/model/entity/PayGoodsOrder';
import { getPayStatLabel, StatusOptions } from '@/model/PayStatusEnum';

export default defineComponent({
    setup() {
        const L = getLogger("交易记录");
        const S = new PayGoodsOrderService();
        const Q = new PayGoodsOrderQo(1, 10)
        const R = reactive({
            tableKey: 0,
            list: Array<PayGoodsOrder>(),
            total: 0,
            listLoading: true,
            queryParam: Q,
            statusOptions: StatusOptions,
            genSn(index: number) {
                return (index += 1)
            },
            fmtPayStatus(row: PayGoodsOrder): string {
                return getPayStatLabel(row.status)
            },
            async handleDelete(index: number, obj: PayGoodsOrder) {
                await S.removeById(obj._id)
                ElMessage.success({
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                })
            },
            handleCurrentChange(current: number) {
                L.debug(`current -> ${current} `)
                R.queryParam.current = current
                R.getList(R.queryParam)
            },
            handleSizeChange(size: number) {
                R.queryParam.size = size
                L.debug(`size -> ${size} `)
                R.getList(R.queryParam)
            },
            async getList(queryParam: PayGoodsOrderQo) {
                R.listLoading = true
                const res = await S.page(queryParam);
                R.list = res.record ?? []
                R.total = res.total ?? 0
                setTimeout(() => { R.listLoading = false }, 0.5 * 1000)
            },
            handleSearch() {
                R.getList(R.queryParam)
            }
        })
        onMounted(() => {
            R.getList(R.queryParam)
        })
        return {
            ...toRefs(R)
        }
    }
})
</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <h1>商品订单</h1>
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
        <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row
            style="width: 100%">
            <el-table-column label="序号" type="index" :sn="genSn" width="60" />
            <el-table-column prop="goodsName" label="商品名称" />
            <el-table-column prop="amount" label="金额/元" />
            <el-table-column prop="status" label="订单状态" :formatter="fmtPayStatus" />
            <el-table-column prop="payOrderId" label="支付单号" />
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
