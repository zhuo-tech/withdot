<script lang="ts" setup>
import { Delete, Warning } from '@element-plus/icons-vue'
import { reactive, toRefs } from 'vue'
import Dialog from './components/Dialog.vue'
import Form from './components/Form.vue'
import EditService from './hooks/editService'
import { filterTime } from '@/utils/utils'
import ShowFile from '@/components/Upload/ShowFile'

const service = reactive(new EditService())

const {albumsDetail, subassembly, Editform} = toRefs(service)

service.getAlbumsList()
</script>
<template>
    <el-card class="box-card">
        <template #header>
            <div>专辑编辑</div>
        </template>
        <div style="display: flex;height: 181px;margin-bottom: 40px">
            <!--<el-col>-->
            <!--    <el-row type="flex" justify="flex-start">-->
            <div>
                <ShowFile :file="albumsDetail.cover" style="height: 200px;border-radius: 5px" />
            </div>
            <div class="albumsDetail">
                <div>{{ albumsDetail.title }}</div>
                <el-row>
                    <el-col style="display: flex">
                        <div v-if="albumsDetail.sellingPrice" style="margin-right: 20px">价格
                            <span>{{ albumsDetail.sellingPrice }}</span>
                            元
                        </div>
                        <div>创建时间
                            <span>{{ filterTime(albumsDetail.createTime) }}</span>
                        </div>
                        <div style="margin-left: 20px">播放次数
                            <span>12.5万</span>
                        </div>
                    </el-col>
                </el-row>
                <el-col v-if="albumsDetail.desc" class="desc">
                    {{ albumsDetail.desc }}
                </el-col>
            </div>
            <!--</el-row>-->
            <!--</el-col>-->
            <div class="buttonBox">
                <el-row :gutter="10" justify="end" type="flex">
                    <el-button style="margin-top: 10px" type="primary" @click="Editform.show()">编辑专辑</el-button>
                    <el-button style="margin-top: 10px" type="primary" @click="subassembly.show()">添加作品</el-button>
                </el-row>
            </div>
        </div>
        <el-row>
            <el-col :span="24">
                <div class="tableHeader">
                    <div>作品列表
                        <span v-if="albumsDetail.workList?.length">({{ albumsDetail.workList?.length }})</span>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="24">
                <el-table
                    :data="albumsDetail.workList"
                    style="width: 100%">
                    <el-table-column type="index" width="100"></el-table-column>
                    <el-table-column label="作品名" prop="name" width="300"></el-table-column>
                    <el-table-column label="是否收费" prop="isPay" width="300">
                        <template #default="{row}">
                            <el-switch v-model="row.isPay"
                                       :active-value="0"
                                       :inactive-value="1"
                                       active-color="#13ce66"
                                       inactive-color="#ff4949"
                                       @change="service.changeSwitch(row)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="试看时长" prop="trialTime" width="300">
                        <template #default="{ row}">
                            <el-input-number v-if="row.isPay === 0" v-model="row.trialTime" :controls="false" :min="1" size="small" @change="service.changeSwitch(row)"/>
                            <div v-if="row.isPay === 0" style="display: inline-block">秒</div>
                            <div v-if="row.isPay === 1">/</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="发布时间" min-width="200" prop="createTime">
                        <template #default="scope">
                            <span>{{ filterTime(scope.row.createTime) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template #default="scope">
                            <el-popconfirm :icon="Warning"
                                           cancel-button-text="手滑了"
                                           confirm-button-text="确认删除"
                                           icon-color="red"
                                           title=" 操作无法撤销, 确定要删除吗 ？"
                                           @confirm="service.deleteWork(scope.row)">
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
    <Dialog :alreadyWorkList="albumsDetail.workList" :service="service" :subassembly="subassembly" @getNewList="service.getAlbumsList()"></Dialog>
    <Form :service="service"></Form>
</template>
<style lang="less" scoped>
.buttonBox {
    margin-left: auto;
}

.albumsDetail {
    margin-left: 20px;

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
