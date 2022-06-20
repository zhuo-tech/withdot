<script lang="ts" setup>
import ShowFile from '@/components/Upload/ShowFile'
import StudentService, { StatusType, StudyType } from '@/pages/student/StudentService'
import { filterTime } from '@/utils/utils'
import { ref } from 'vue'

const props = defineProps<{
    service: StudentService,
    id: string
}>()

const isShow = ref(false)

const show = () => {
    props.service.handleClick(props.id)
    isShow.value = true
}

</script>

<template>
    <el-button link size="small" @click="show">查看</el-button>
    <el-dialog
        v-model="isShow"
        append-to-body
        custom-class=""
        modal-append-to-body
        title="学员详情"
        width="70%">
        <el-row :gutter="10" style="margin-bottom: 20px">
            <el-col :span="5">
                <ShowFile :href="service.detail.data.avatar" style="height: 150px;border-radius: 5px" />
            </el-col>
            <el-col :span="18" class="introduction">
                <div>名称:
                    <span>{{ service.detail.data.name }}</span>
                </div>
                <div>电话:
                    <span>{{ service.detail.data.phone }}</span>
                </div>
                <div>注册时间:
                    <span>{{ filterTime(service.detail.data.createTime) }}</span>
                </div>
            </el-col>
        </el-row>
        <el-collapse v-model="service.detail.collapseActiveName" accordion>
            <el-collapse-item v-if="service.detail.data.isPay === '0'" name="1" title="购买记录">
                <el-table
                    :data="service.detail.data.payData"
                    style="width: 100%">
                    <el-table-column label="商品名称" prop="goodsName" width="280"></el-table-column>
                    <el-table-column label="金额" prop="amount" width="180"></el-table-column>
                    <el-table-column label="支付订单号" min-width="250" prop="payOrderId"></el-table-column>
                    <el-table-column label="订单状态" prop="columnProp" width="200">
                        <template #default="{ row}">{{ StatusType[row.status] }}</template>
                    </el-table-column>
                    <el-table-column label="创建时间" min-width="300" prop="createTime">
                        <template #default="{row}">{{ filterTime(row.createTime) }}</template>
                    </el-table-column>
                </el-table>
            </el-collapse-item>
            <el-collapse-item name="2" title="浏览记录">
                <el-table
                    :data="service.detail.data.schedules"
                    style="width: 100%">
                    <el-table-column label="专辑名称" width="280">
                        <template #default="{ row }">{{ row.albumName.title }}</template>
                    </el-table-column>
                    <el-table-column label="作品名称" width="180">
                        <template #default="{ row }">{{ row.workName?.name }}</template>
                    </el-table-column>
                    <el-table-column label="专辑学习状态" prop="status" width="200">
                        <template #default="{ row }">{{ StudyType[row.status] }}</template>
                    </el-table-column>
                    <el-table-column label="作品学习状态" prop="workStatus" width="200">
                        <template #default="{ row}">{{ StudyType[row.workStatus] }}</template>
                    </el-table-column>
                    <el-table-column label="学习进度" prop="ratio" width="200"></el-table-column>
                    <el-table-column label="完成时间" min-width="200" prop="lastTime">
                        <template #default="{row}">{{ filterTime(row.createTime) }}</template>
                    </el-table-column>
                </el-table>
                <el-row justify="end" style="padding-top: 20px" type="flex">
                    <el-col :span="6">
                        <el-row justify="end" type="flex">
                            <el-pagination
                                :current-page="service.detail.watchHistoryPage.current"
                                :page-size="service.detail.watchHistoryPage.size"
                                :page-sizes="[5, 10, 20, 50]"
                                :total="service.detail.watchHistoryPage.total"
                                layout="total, sizes, prev, pager, next"
                                @size-change="service.watchHistoryPageSizeChange"
                                @current-change="service.watchHistoryCurrentPageChange">
                            </el-pagination>
                        </el-row>
                    </el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>
    </el-dialog>
</template>

<style lang="less" scoped>
.introduction {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    > div {
        font-size: 20px;
        font-weight: bolder;

        > span {
            font-size: 18px;
            font-weight: normal;
            margin-left: 10px;
        }
    }
}
</style>
