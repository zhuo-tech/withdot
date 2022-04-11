<script lang="ts" setup>
import EditService from '@/pages/albums/editService'

const props = defineProps({
    service: {
        type: [EditService, Object],
        required: true,
    },
})
</script>
<template>
    <el-dialog v-model="service.Editform.visible" title="编辑专辑" width="40%">
        <el-form ref="form" :model="service.Editform.form" label-width="80px">
            <el-form-item label="专辑名称">
                <el-input v-model="service.Editform.form.title" placeholder="请输入专辑名称"></el-input>
            </el-form-item>
            <el-form-item label="专辑描述">
                <el-input v-model="service.Editform.form.desc" placeholder="请输入专辑名称"></el-input>
            </el-form-item>
            <el-form-item label="封面图">
                <el-input v-model="service.Editform.form.cover" placeholder="请输入专辑名称"></el-input>
            </el-form-item>
            <el-form-item label="销售价">
                <el-input v-model="service.Editform.form.sellingPrice" placeholder="请输入专辑名称"></el-input>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<style lang="less" scoped>
</style>
