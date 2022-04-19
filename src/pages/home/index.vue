<script lang="ts" setup>
import { ref } from "vue";
const tableData = [
    {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
    },
    {
        date: "2016-05-02",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
    },
    {
        date: "2016-05-04",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
    },
    {
        date: "2016-05-01",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
    },
];
const value2 = ref("");
</script>

<template>
    <el-card style="margin: 0 0 20px 0">
        <div class="top">
            <div class="card">
                <div class="text">总播放量</div>
                <div style="color: rgba(255, 77, 79, 1)" class="number">
                    2100
                </div>
            </div>
            <div class="card">
                <div class="text">总播放量</div>
                <div style="color: rgba(255, 149, 2, 1)" class="number">
                    2100
                </div>
            </div>
            <div class="card">
                <div class="text">总播放量</div>
                <div style="color: rgba(255, 203, 1, 1)" class="number">
                    2100
                </div>
            </div>
            <div class="card">
                <div class="text">总播放量</div>
                <div style="color: rgba(255, 77, 79, 1)" class="number">
                    2100
                </div>
            </div>
        </div>
    </el-card>
    <el-card>
        <div class="title">
            <div class="tableName">收入明细</div>
            <div class="picker">
                <el-date-picker
                    v-model="value2"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-value="[
                        new Date(2010, 9, 1),
                        new Date(2010, 10, 1),
                    ]"
                />
            </div>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="专辑" width="180" />
            <el-table-column prop="name" label="金额" width="180" />
            <el-table-column prop="name" label="日期" width="180" />
            <el-table-column prop="name" label="时间" width="180" />

            <el-table-column label="状态" width="180">
                <template #default="scope">
                    <el-tag
                        :type="scope.row.tag === 'Home' ? 'success' : ''"
                        disable-transitions
                        >{{ scope.row.name }}</el-tag
                    >
                </template>
            </el-table-column>
        </el-table>
        <div class="paging">
            <el-pagination background layout="prev, pager, next" :total="100" />
        </div>
    </el-card>
</template>

<style lang="less" scoped>
.top {
    margin: 0 0 20px 0;
    display: flex;
    justify-content: space-around;
    .card {
        width: 200px;
        height: 172px;
        box-shadow: rgb(152 152 152 / 12%) 0px 0px 12px 0px;
        border-radius: 20px;
        .text {
            text-align: center;
            padding: 30px 0 0 0px;
            font-weight: 700;
            font-size: 18px;
            color: rgb(25, 39, 48);
        }
        .number {
            font-weight: 400;
            font-size: 48px;
            text-align: center;
            margin: 20px 0 0 0;
        }
    }
}
.title {
    display: flex;
    justify-content: space-between;
    margin: 0 0 20px 0;
    .tableName {
        font-weight: 700;
        font-size: 18px;
        color: rgb(25, 39, 48);
    }
    .picker {
        margin: 0 120px 0 0px;
    }
}
.paging {
    display: flex;
    justify-content: end;
    margin: 20px 0 0 0;
}
</style>
