<script lang="ts">
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref, toRefs } from "vue";
import { PayChannelService } from "@/pages/pay/channel/PayChannelService";
import { getLogger } from "@/main";
import { PayChannelQo } from "@/pages/pay/channel/PayChannelQo";
import { PayChannel } from '@/model/entity/PayChannel';
import { PayChannelOptions } from '@/model/PayChannelEnum';
import { getJustLabel } from '@/model/CommonEnum';
import { useRouter } from 'vue-router'
const NAME = PayChannel.name
export default {
    name: NAME,
    setup() {
        const router = useRouter()
        const L = getLogger("支付渠道");
        const S = new PayChannelService();
        const Q = new PayChannelQo(1, 10)
        const ADD_ROUTER = '/pay/channel/addPayChannel'
        const EDIT_ROUTER = '/pay/channel/editPayChannel'
        const state = reactive({
            tableKey: 0,
            list: Array<PayChannel>(),
            total: 0,
            listLoading: true,
            queryParam: Q,
            payChannelOptions: PayChannelOptions
        })
        const genSn = (index: number): number => {
            return (index += 1)
        }
        const handleState = (row: PayChannel): string => {
            return getJustLabel(row.state)
        }
        const handlePayParam = (row: PayChannel): string => {
            return JSON.stringify(row.param)
        }
        const handleAdd = () => {
            router.push({ path: ADD_ROUTER })
        }
        const handleEdit = (id: string) => {
            router.push({ path: EDIT_ROUTER, query: { id } })
        }
        const handleDelete = async (obj: PayChannel) => {
            await S.removeById(obj._id)
            ElMessage.success({
                message: '删除成功',
                type: 'success',
                duration: 2000
            })
            handlePage(state.queryParam)
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
        const handlePage = async (queryParam: PayChannelQo) => {
            state.listLoading = true
            const res = await S.page(queryParam);
            state.list = res.record ?? []
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
            genSn,
            handleAdd,
            handleEdit,
            handleState,
            handlePayParam,
            handleSearch,
            handlePage,
            handleSizeChange,
            handleCurrentChange,
            handleDelete,
        }
    }
}
</script>
<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <h1>支付渠道</h1>
            </div>
        </template>
        <el-row :gutter="24">
            <el-form v-model="queryParam" ref="queryParamRef">
                <el-col :span="12">
                    <el-form-item label="商户号">
                        <el-input v-model="queryParam.channelMchId" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="支付渠道">
                        <el-select v-model="queryParam.channelId" clearable class="filter-item">
                            <el-option v-for="item in payChannelOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="0">
                    <el-button type="primary" icon="Search" @click="handleSearch()">查询</el-button>
                </el-col>
            </el-form>
        </el-row>
        <el-row justify="end" type="flex">
            <el-button icon="Plus" class="add-channel-btn" type="primary" @click="handleAdd">新增</el-button>
        </el-row>
        <el-table :key="tableKey" v-loading="listLoading" :data="list" :border="true" fit highlight-current-row
            style="width: 100%">
            <el-table-column label="序号" type="index" :sn="genSn" width="60" />
            <el-table-column label="应用标识" prop="appId" />
            <el-table-column label="渠道名称" prop="channelName" />
            <el-table-column label="商户号" prop="channelMchId" />
            <el-table-column label="渠道状态" prop="state" :formatter="handleState" />
            <el-table-column label="备注" prop="remark" />
            <el-table-column label="配置参数" prop="param" :show-overflow-tooltip="true" :formatter="handlePayParam" />
            <el-table-column label="创建时间" prop="createTime" />
            <el-table-column label="操作" prop="operation">
                <template #default="scope">
                    <el-button icon="Edit" link @click="handleEdit(scope.row._id)">编辑</el-button>
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

.add-channel-btn {
    margin-bottom: 20px;
}
</style>
