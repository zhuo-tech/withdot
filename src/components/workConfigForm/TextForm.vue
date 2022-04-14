<script lang="ts" setup>
import { reactive } from 'vue'
import Editor from '@/components/editor/Editor.vue'

const config = reactive({
    text: '',
    switch: false,
    time:3,
    pause:true
})
const changeValue = (value: any) => {
    config.text = value
}
</script>

<template>
    <el-form ref="form" :model="config" label-width="80px">
        <el-form-item label="文本内容">
            <Editor v-model:value="config.text" @changeValue="changeValue" />
        </el-form-item>
        <el-row>
            <el-col :span="12">
                <el-form-item label="设置时长">
                    <el-switch v-model="config.switch"></el-switch>
                </el-form-item>
            </el-col>
            <el-col :span="12" v-if="config.switch">
                <el-form-item label="时长">
                    <el-input-number v-model="config.time" :min="1"></el-input-number>&nbsp;&nbsp;&nbsp;秒
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="是否暂停">
            <el-switch v-model="config.pause" ></el-switch>
        </el-form-item>
    </el-form>
</template>

<style lang="less" scoped></style>
