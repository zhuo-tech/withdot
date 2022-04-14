<script lang="ts" setup>
import { reactive } from 'vue'

const config = reactive({
    url: '',
    switch: false,
    time: 3,
    pause: true,
})
const rules = reactive({
    url: [
        {required: true, message: '请输入链接地址', trigger: 'blur'},
        {
            pattern: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/,
            message: '请输入合法的地址',
            trigger: 'blur',
        },
    ],
})
</script>

<template>
    <el-form ref="form" :model="config" :rules="rules" label-width="80px">
        <el-form-item label="链接地址" prop="url">
            <el-input v-model="config.url" placeholder="请输入链接地址 如:http:/https:"></el-input>
        </el-form-item>
        <el-row>
            <el-col :span="12">
                <el-form-item label="设置时长">
                    <el-switch v-model="config.switch"></el-switch>
                </el-form-item>
            </el-col>
            <el-col v-if="config.switch" :span="12">
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

<style lang="less" scoped>

</style>
