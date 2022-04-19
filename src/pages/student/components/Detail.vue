<script lang="ts" setup>
import ShowFile from '@/components/Upload/ShowFile'
import StudentService from '@/pages/student/StudentService'
import { filterTime } from '@/utils/utils'

const props = defineProps({
    service: StudentService,
})

</script>

<template>
    <el-dialog
        v-model="service.detail.visible"
        title="学员详情"
        width="70%">
        <el-row :gutter="10">
            <el-col :span="5">
                <ShowFile :href="service.detail.data.avatar" style="height: 150px"/>
            </el-col>
            <el-col :span="18" class="introduction">
                <div>名称:<span>{{ service.detail.data.name }}</span></div>
                <div>电话:<span>{{ service.detail.data.phone }}</span></div>
                <div>注册时间:<span>{{ filterTime(service.detail.data.createTime )}}</span></div>
            </el-col>
        </el-row>
        <el-collapse v-model="service.detail.collapseActiveName" accordion>
            <el-collapse-item title="购买记录" name="1">
                <div>
                    <el-table
                        :data="[{ date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }, { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' }]"
                        style="width: 100%">
                        <el-table-column
                            prop="date"
                            label="日期"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="地址">
                        </el-table-column>
                    </el-table>
                </div>
            </el-collapse-item>
            <el-collapse-item title="浏览记录" name="2">
                <div>
                    Operation feedback: enable the users to clearly perceive their
                    operations by style updates and interactive effects;
                </div>
                <div>
                    Visual feedback: reflect current state by updating or rearranging
                    elements of the page.
                </div>
            </el-collapse-item>
        </el-collapse>
    </el-dialog>
</template>

<style lang="less" scoped>
.introduction{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    >div{
        font-size: 20px;
        >span{
            font-weight: bolder;
            margin-left: 10px;
        }
    }
}
</style>
