<script lang="ts" setup>
import AlbumsService from '@/pages/albums/hooks/AlbumsService'
import { Refresh, Search, Plus } from '@element-plus/icons-vue'

const props = defineProps<{
    service: AlbumsService
}>()

</script>

<template>
    <el-row justify="end" type="flex">
        <el-collapse-transition>
            <el-col v-show="service.queryData.visible">
                <el-row :gutter="10" justify="end" type="flex">
                    <el-col>
                        <el-form ref="queryFormRef" :model="service.queryData" inline>
                            <el-form-item style="width: 200px">
                                <el-input v-model="service.queryData.label" clearable placeholder="请输入专辑名称"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button :icon="Search" type="primary" @click="service.getAlbumList()"></el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </el-col>
        </el-collapse-transition>
        <el-col :span="24">
            <el-row justify="end" type="flex">
                <div>
                    <el-button :icon="Plus" type="primary" @click="service.clickAddForm()">新增</el-button>
                    <el-button :icon="Search" type="primary" @click="service.queryData.visible = !service.queryData.visible;service.queryData.init()" />
                    <el-button v-loading="service.addFormData.addFormIsLoading"
                               :disabled="service.addFormData.addFormIsLoading"
                               :icon="Refresh"
                               type="primary"
                               @click="service.getAlbumList()"></el-button>
                </div>
            </el-row>
        </el-col>
    </el-row>
</template>

<style lang="less" scoped>
.addButton {
    width: 50px;
    margin: 0 25px 0 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
}
</style>
