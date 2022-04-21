<script lang="ts" setup>
import { CoreDotType, DotTypeConfigMapping } from '@/model/entity/CoreDot'

const props = defineProps<{
    data: DotTypeConfigMapping[CoreDotType.链接]
}>()
</script>

<template>
<el-link :href="data.url" target="_blank">{{ data.url }}</el-link>
</template>

<style scoped>

</style>
