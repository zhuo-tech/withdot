<script lang="ts" setup>
import UploadFile from '@/components/upload/UploadFile.vue'
import { reactive } from 'vue'

const config = reactive({
    url: '',
    switch: false,
    time: 3,
    pause: true,
})
</script>
<template>
    <el-form ref="form" :model="config" label-width="80px">
        <el-form-item label="图片">
            <UploadFile v-model:href="config.url"
                        :drag="true"
                        :limit="1"
                        listType="picture" />
        </el-form-item>
        <el-row>
            <el-col :span="8">
                <el-form-item label="设置时长">
                    <el-switch v-model="config.switch"></el-switch>
                </el-form-item>
            </el-col>
            <el-col v-if="config.switch" :span="16">
                <el-form-item label="时长">
                    <el-input-number v-model="config.time" :min="1"></el-input-number>&nbsp;&nbsp;&nbsp;秒
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="是否暂停">
            <el-switch v-model="config.pause"></el-switch>
        </el-form-item>
    </el-form>
</template>

<style lang="less" scoped></style>
