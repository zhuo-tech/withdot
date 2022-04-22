<script lang="ts" setup>
import { CoreDotType, DotTypeConfigMapping } from '@/model/entity/CoreDot'
import { FileService, INJECT_KEY_FILE_SERVICE } from '@/service/FileService'
import { inject } from 'vue'

/**
 * 显示 coreDot config 中的 图片
 * @props data
 * @inject FileService
 */
const props = defineProps<{
    data: DotTypeConfigMapping[CoreDotType.图片]
}>()

const fileService: FileService = inject(INJECT_KEY_FILE_SERVICE) as FileService

const empty = () => {
}

</script>

<template>
<img :src="fileService.showUrl(data.url)" alt="预览" style="height: 100px" @mousedown="empty" @mouseup="empty" @mousemove.prevent="empty">
</template>

