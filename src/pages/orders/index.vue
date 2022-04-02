<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { shortcuts } from './checkData'
import { QuestionFilled } from '@element-plus/icons-vue'

const timeData = ref()
const checkAlbum = ref()
const selectAlbumList = reactive([
    {value:11111,label:'22222'}
])
</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <h1>财务管理</h1>
            </div>
        </template>
        <el-row :gutter="10">
            <el-col :span="3">
                <el-select v-model="checkAlbum" placeholder="请选择专辑">
                    <el-option
                        v-for="item in selectAlbumList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="8">
                    <el-date-picker
                        v-model="timeData"
                        :shortcuts="shortcuts"
                        end-placeholder="结束时间"
                        range-separator="至"
                        start-placeholder="开始时间"
                        type="datetimerange" />
            </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top: 20px">
            <el-col :span="8">
                <el-row :gutter="10">
                    <el-col :span="6">
                        <div class="title">
                            <div>播放量</div>
                            <el-icon>
                                <question-filled />
                            </el-icon>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="6">10</el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-row :gutter="10">
                    <el-col :span="6">
                        <div class="title">
                            <div>订阅量</div>
                            <el-icon>
                                <question-filled />
                            </el-icon>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="6">10</el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-row :gutter="10">
                    <el-col :span="6">
                        <div class="title">
                            <div>收入</div>
                            <el-icon>
                                <question-filled />
                            </el-icon>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="6">10</el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
</template>

<style lang="less" scoped>
.title {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .el-icon {
        margin-left: 10px;
    }
}
</style>
