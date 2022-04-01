<script lang="ts" setup>
import { TabsPaneContext } from 'element-plus'
import { ref } from 'vue'

defineProps({
    detailMessage: Object,
})
const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
}
</script>

<template>
    <el-dialog v-model="detailMessage.visible"
               :title="detailMessage.title">
        <el-row :gutter="10" align="middle" class="top" type="flex">
            <el-col :offset="1" :span="2">
                <div class="avatar">
                    <img alt="" src="">
                </div>
            </el-col>
            <el-col :span="20" class="topMessage">
                <div>{{ detailMessage.name }}
                    <span>ID:{{ detailMessage.studentId }}</span>
                </div>
                <div>注册时间:{{ detailMessage.createTime }}</div>
            </el-col>
        </el-row>
        <el-row :gutter="10" align="middle" class="recording" type="flex">
            <el-col :span="1" class="left">记录</el-col>
            <el-col :offset="1" :span="22">
                <el-row :gutter="10">
                    <el-col :span="6" class="right">
                        <el-row :gutter="10">
                            <el-col :span="24">购买专辑</el-col>
                        </el-row>
                        <el-row :gutter="10" class="rightBottom">
                            <el-col :span="24">10</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="6" class="right">
                        <el-row :gutter="10">
                            <el-col :span="24">累计消费</el-col>
                        </el-row>
                        <el-row :gutter="10" class="rightBottom">
                            <el-col :span="24">10元</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="6" class="right">
                        <el-row :gutter="10">
                            <el-col :span="24">累计观看</el-col>
                        </el-row>
                        <el-row :gutter="10" class="rightBottom">
                            <el-col :span="24">10作品</el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
            <el-col :span="24">
                <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                    <el-tab-pane label="消费记录" name="first">
                        <el-table :data="detailMessage.data" style="width: 100%">
                            <el-table-column label="时间" prop="date" width="180"></el-table-column>
                            <el-table-column label="专辑" prop="name" width="180"></el-table-column>
                            <el-table-column label="价格(元)" prop="address"></el-table-column>
                            <el-table-column label="购买金额(元)" prop="address"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="浏览记录" name="second">
                        <el-table :data="detailMessage.data" style="width: 100%">
                            <el-table-column label="时间" prop="date" width="180"></el-table-column>
                            <el-table-column label="专辑" prop="name" width="180"></el-table-column>
                            <el-table-column label="价格(元)" prop="address"></el-table-column>
                            <el-table-column label="购买金额(元)" prop="address"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<style lang="less" scoped>
.top {
    background-color: #F3F6FF;
    height: 88px;

    .avatar {
        width: 50px;
        height: 50px;
        background-color: #D1D1D1;
        border-radius: 50%;
    }

    .topMessage {
        font-family: SourceHanSansSC-regular;

        > div:nth-of-type(1) {
            color: #000000;
            font-weight: bold;
            font-size: 14px;

            > span {
                margin-left: 10px;
                color: #000000;
                font-weight: normal;
                font-size: 12px;
            }
        }

        > div:nth-of-type(2) {
            margin-top: 10px;
            color: #000000;
            font-weight: normal;
            font-size: 12px;
        }
    }
}

.recording {
    height: 100px;

    > .left {
        color: #FFFFFF;
        background-color: #5AC8FA;
        height: 100px;
        display: flex;
        align-items: center;
        font-size: 12px;
    }
}

.right {
    .rightBottom {
        margin-top: 30px;
    }
}

</style>
