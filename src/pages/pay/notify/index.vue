<script lang="ts" setup>
import { PayNotifyRecord } from '@/model/entity/PayNotifyRecord';
import { ref } from 'vue'
import { PayNotifyRecordService } from '../service/PayNotifyRecordService';

const service = new PayNotifyRecordService()
let notifyList = ref<PayNotifyRecord[]>([])
const total = ref(0)
const size = ref(10)
const current = ref(1)

/**
 * 生成序列号
 * @param index 序号
 * @returns 递增序号
 */
const genSn = (index: number) => {
    return index += 1
}

/**
 * 统计汇总
 */
const count = async () => {
    total.value = await service.count()
}
/**
 * 分页查询支付渠道列表
 * @param current  当前页
 * @param size  分页大小
 */
const page = async (current: number, size: number) => {
    notifyList.value = await service.page(current, size)
}
/**
 * 分页处理
 * @param current 当前页
 */
const handleCurrentChange = async (current: number) => {
    notifyList.value = await service.page(current, size.value)
}

/**
 * 逻辑删除
 * @param index 下标
 * @param row  记录
 */
const handleDelete = async (index: number, row: PayNotifyRecord) => {
    console.log(index, row)
    await service.deleteById(row._id)
    notifyList.value = await service.page(current.value, size.value)
}
const init = () => {
    count()
    page(current.value, size.value)
}
init()
</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <h1>支付通知</h1>
            </div>
        </template>
        <el-table :data="notifyList" style="width: 100%">
            <el-table-column label="序号" type="index" :sn="genSn" width="60" />
            <el-table-column label="订单号码" prop="orderNo" />
            <el-table-column label="响应通知" prop="notifyId" />
            <el-table-column label="回调报文" prop="request" show-overflow-tooltip />
            <el-table-column label="响应报文" prop="response" />
            <el-table-column label="创建时间" prop="createTime" />
            <el-table-column align="right">
                <template #header>
                    <el-input size="large" />
                </template>
                <template #default="scope">
                    <el-button 
                        size="small" 
                        type="text" 
                        icon="Delete"
                        @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pages">
            <el-pagination :total="total" :page-size="10" @current-change="handleCurrentChange" background
                layout="total, prev, pager, next, jumper" />
        </div>
    </el-card>
</template>

<style lang="less" scoped>
.pages {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
}
</style>
