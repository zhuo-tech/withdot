<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { shortcuts } from './checkData'
import { QuestionFilled } from '@element-plus/icons-vue'

const timeData = ref()
const checkAlbum = ref()
const selectAlbumList = reactive([
    {value: 11111, label: '22222'},
])
const tabelData = reactive([
    { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
    { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' }
])
const page = reactive({
    total:100,
    current:1,
    size:5,
})

const pageSizeChange=()=>{}
const currentPageChange=()=>{}
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
                        <div class="titleItem">
                            <div class="title">播放量</div>
                            <el-icon>
                                <question-filled />
                            </el-icon>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="10" style="margin-top: 37px">
                    <el-col :span="6">
                        <div>
                            <div class="parameter">3212</div>
                            <div class="name">总播放量</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div>
                            <div class="parameter">3212</div>
                            <div class="name">总播放量</div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-row :gutter="10">
                    <el-col :span="6">
                        <div class="titleItem">
                            <div class="title">订阅量</div>
                            <el-icon>
                                <question-filled />
                            </el-icon>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="10" style="margin-top: 37px">
                    <el-col :span="6">
                        <div>
                            <div class="parameter">3212</div>
                            <div class="name">总播放量</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div>
                            <div class="parameter">3212</div>
                            <div class="name">总播放量</div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-row :gutter="10">
                    <el-col :span="6">
                        <div class="titleItem">
                            <div class="title">收入</div>
                            <el-icon>
                                <question-filled />
                            </el-icon>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="10" style="margin-top: 37px">
                    <el-col :span="6">
                        <div>
                            <div class="parameter">3212</div>
                            <div class="name">总播放量</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div>
                            <div class="parameter">3212</div>
                            <div class="name">总播放量</div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top: 37px">
            <el-col :span="6" class="details">专辑收入明细</el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top: 32px" class="detailsTitle">
            <el-col :span="24">
                总计:
                <span class="number">614<span>笔,</span></span>
                收入:
                <span class="number">153.08<span>元</span></span>
            </el-col>
        </el-row>
        <el-table :data="tabelData" style="width: 100%">
            <el-table-column prop="date" label="时间" width="280"></el-table-column>
            <el-table-column prop="name" label="专辑名称" width="380"></el-table-column>
            <el-table-column prop="address" label="金额(元)" width="280"></el-table-column>
            <el-table-column prop="name" label="付费用户" width="280"></el-table-column>
            <el-table-column prop="address" label="状态"></el-table-column>
        </el-table>
        <el-row justify="end" style="padding-top: 20px" type="flex">
            <el-col :span="6">
                <el-row justify="end" type="flex">
                    <el-pagination
                        :current-page="page.current"
                        :page-size="page.size"
                        :page-sizes="[10, 20, 50, 100]"
                        :total="page.total"
                        layout="total, sizes, prev, pager, next"
                        @size-change="pageSizeChange"
                        @current-change="currentPageChange">
                    </el-pagination>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
</template>

<style lang="less" scoped>
.titleItem {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .el-icon {
        margin-left: 10px;
    }

    .title {
        font-family: SourceHanSansSC-bold;
        font-weight: bolder;
        font-size: 14px;
        color: #8A7F7F;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}

.parameter {
    font-family: SourceHanSansSC-bold;
    font-weight: bolder;
    font-size: 16px;
    color: #8A7F7F;
}

.name {
    font-family: SourceHanSansSC-bold;
    font-size: 12px;
    color: #999999;
}

.details {
    font-family: SourceHanSansSC-bold;
    font-weight: bolder;
    font-size: 14px;
    color: #101010;
}
.detailsTitle{
    font-family: SourceHanSansSC-bold;
    font-size: 14px;
    background-color: #3569FD;
    height: 35px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #FFFFFF;
    .number{
        font-weight: bolder;
        >span{
            color: #999999;
            font-weight: normal;
            margin-left: 5px;
        }
    }
}
</style>
