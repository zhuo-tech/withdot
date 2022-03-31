<script lang="ts" setup>
import { reactive } from 'vue'

const props=defineProps({
    subassembly:Object                             //父组件传值参数  显示隐藏(visible)  抽屉名称(title)
})

const form=reactive({
    name:'',

})

</script>

<template>
    <el-dialog v-model="subassembly.visible" :title="subassembly.title">
        <el-form :model="form">
            <el-form-item  label="作品名称" >
                <el-input v-model="form.name" placeholder="请输入作品名称"/>
            </el-form-item>
                <el-form-item  label="视频素材">
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
              <el-button @click="subassembly.visible = false">取消</el-button>
              <el-button type="primary" @click="subassembly.visible = false">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="less" scoped></style>
