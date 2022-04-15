<script lang="ts" setup>
import { reactive } from 'vue'


const props = defineProps({
    value: {
        type: Object,
        required: true,
        default:()=>({
            switch: false,
            time: 3,
            pause: true,
        })
    },
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
    <el-form ref="form" :model="value" :rules="rules" label-width="80px">
        <el-row>
            <el-col :span="24">
                <el-form-item label="链接地址" prop="url">
                    <el-input v-model="value.url" placeholder="请输入链接地址"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row style="margin-top: 20px">
            <el-col :span="6">
                <el-form-item label="设置时长">
                    <el-switch v-model="value.switch"></el-switch>
                </el-form-item>
            </el-col>
            <el-col v-if="value.switch" :span="18">
                <el-form-item label="时长">
                    <el-input-number v-model="value.time" :min="1"></el-input-number>&nbsp;&nbsp;&nbsp;秒
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="是否暂停">
            <el-switch v-model="value.pause"></el-switch>
        </el-form-item>
    </el-form>
</template>

<style lang="less" scoped>

</style>
