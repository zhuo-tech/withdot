<script lang="ts" setup>
import { Delete, Warning } from '@element-plus/icons-vue'
import { reactive, toRefs } from 'vue'
import Dialog from './components/Dialog.vue'
import Form from './components/Form.vue'
import EditService from './EditService'
import { filterTime } from '@/utils/utils'

const service = reactive(new EditService())

const {albumsDetail, subassembly, getWorkListData, Editform} = toRefs(service)

service.getAlbumsList()
</script>
<template>
    <el-card class="box-card">
        <template #header>
            <div>专辑编辑</div>
        </template>
        <el-row :gutter="10" justify="space-between" style="height: 181px;margin-bottom:40px " type="flex">
            <el-col :span="12">
                <el-row :gutter="10">
                    <el-col :span="6">
                        <el-image class="img"></el-image>
                    </el-col>
                    <el-col :span="6" class="albumsDetail">
                        <div>{{ albumsDetail.title }}</div>
                        <div>价格
                            <span>{{ albumsDetail.sellingPrice }}</span>
                            元
                        </div>
                        <div>创建时间
                            <span>{{ filterTime(albumsDetail.createTime) }}</span>
                        </div>
                        <div>播放次数
                            <span>12.5万</span>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :offset="6" :span="6" class="buttonBox">
                <el-button @click="Editform.show()">编辑专辑</el-button>
                <el-button @click="subassembly.show()">添加作品</el-button>
            </el-col>
        </el-row>
        <el-row v-if="albumsDetail.desc" class="desc">
            <el-col :span="24">{{ albumsDetail.desc }}</el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="tableHeader">
                    <div>作品列表(201)</div>
                    <div>正序</div>
                    <div>|</div>
                    <div>倒序</div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="24">
                <el-table
                    :data="albumsDetail.workList"
                    style="width: 100%">
                    <el-table-column type="index" width="100"></el-table-column>
                    <el-table-column label="作品名" prop="name" width="180"></el-table-column>
                    <el-table-column label="视频大小" prop="size" width="180"></el-table-column>
                    <el-table-column label="时长" prop="address"></el-table-column>
                    <el-table-column label="是否收费" prop="address"></el-table-column>
                    <el-table-column label="发布时间" prop="address"></el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template #default="scope">
                            <el-popconfirm :icon="Warning"
                                           cancel-button-text="手滑了"
                                           confirm-button-text="确认删除"
                                           icon-color="red"
                                           title=" 操作无法撤销, 确定要删除吗 ？"
                                           @confirm="service.handleDelete(scope.row)">
                                <template #reference>
                                    <el-button :icon="Delete" type="text">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </el-card>
    <Dialog :getWorkListData="getWorkListData" :service="service" :subassembly="subassembly"></Dialog>
    <Form :service="service"></Form>
</template>
<style lang="less" scoped>
.buttonBox {
    display: flex;
    justify-content: flex-end;

    .el-button {
        color: white;
        border: 0;
    }

    .el-button:nth-of-type(1) {
        background-color: #c6c6c6;
    }

    .el-button:nth-of-type(2) {
        background-color: #6e6e6f;
    }
}

.albumsDetail {
    > div:nth-of-type(1) {
        font-size: 18px;
        color: #000000;
        height: 60px;
        line-height: 60px;
    }

    > div {
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        font-family: SourceHanSansSC-regular;
        color: #8A7F7F;
    }
}

.img {
    width: 154px;
    object-fit: cover;
    height: 100%;
}

.desc {
    margin: 0 0 40px 0;
    padding: 13px 0;
    border-top: 2px solid #BBBBBB;
    border-bottom: 2px solid #BBBBBB;
    font-size: 14px;
    line-height: 20px;
    color: #8A7F7F;
    font-family: SourceHanSansSC-regular;
}

.tableHeader {
    font-family: SourceHanSansSC-regular;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 2px solid #BBBBBB;
    margin-left: 20px;
    padding-bottom: 10px;

    > div:nth-of-type(1) {
        margin-left: 0;
        font-size: 18px;
    }

    > div {
        color: #8A7F7F;
        margin-left: 20px;
        font-size: 14px;
    }

    > div:nth-of-type(2) {
        cursor: pointer;
    }

    > div:nth-of-type(3) {
        margin-left: 10px;
    }

    > div:nth-of-type(4) {
        margin-left: 10px;
        cursor: pointer;
    }
}
</style>
