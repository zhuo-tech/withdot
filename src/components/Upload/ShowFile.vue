<script setup lang="ts">
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { ImageProps } from 'element-plus'

const propsValue = defineProps<ImageProps>()

</script>

<template>
<el-image>
    <template #error>
        <div class="image-slot">
            <el-icon><IconPicture/></el-icon>
        </div>
    </template>
</el-image>
</template>

<style scoped>

</style>
