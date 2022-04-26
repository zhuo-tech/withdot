<script lang="ts" setup>

const props = defineProps({
    value: {
        type: Object,
        required: true,
    },
})

</script>

<template>
    <el-form ref="form" :model="value" class="box" label-width="80px" style="width: 100%">
        <el-form-item label="文本内容">
            <el-input v-model="value.text"
                      :autosize="{minRows: 2, maxRows: 6,}"
                      placeholder="请输入内容"
                      type="textarea"></el-input>
        </el-form-item>
        <el-row style="margin-top: 20px">
            <el-col :span="12">
                <el-form-item label="设置时长">
                    <el-switch v-model="value.switch"></el-switch>
                </el-form-item>
            </el-col>
            <el-col v-if="value.switch" :span="12">
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
:deep(.el-form-item__label) {
    z-index: 0;
}
</style>
