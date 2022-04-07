<script lang="ts" setup>
import { reactive, ref } from 'vue'
import OperationService from './OperationService'
import ECharts from './components/Echarts.vue'

const service = reactive(new OperationService())
const starTime = ref('')
const endTime = ref('')

const {publicList} = service

publicList()
</script>
<template>
    <el-card class="box-card">
        <template #header>
            <div>运营管理</div>
        </template>
        <!--    左侧筛选-->
        <el-row :gutter="10">
            <el-col :span="4">
                <el-row>
                    <el-col :span="24">
                        <el-date-picker
                            v-model="starTime"
                            placeholder="请选择开始时间"
                            style="width: 100%"
                            type="datetime" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" style="margin-top: 20px">
                        <el-date-picker
                            v-model="endTime"
                            placeholder="请选择结束时间"
                            style="width: 100%"
                            type="datetime" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" style="margin-top: 20px">
                        <el-input v-model="service.queryData"
                                  clearable
                                  placeholder="请选择筛选条件" style="width: 100%"
                                  @change="publicList">
                        </el-input>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 20px">
                    <el-col v-for="(item,index) in service.publicNameList" :key="index" :span="24">
                        <div :class="[index === service.isActive ? 'bg':'','publicName']" @click="service.changeStyle(index)">{{ item.name }}</div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="20">
                <el-row :gutter="10">
                    <el-col v-for="(item,index) in 4" :key="index" :span="12">
                        <ECharts :dataIndex="index" class="echartsBox" />
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
</template>
<style lang="less" scoped>
.publicName {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    margin-left: 20px;

    &:hover {
        background-color: #f5f7fa;
        cursor: pointer;
    }
}

.bg {
    background-color: #f0f7ff;
}

.echartsBox {
    height: calc((100vh - 200px) / 2);
}
</style>
