<script lang="ts" setup>
import ShowFile from '@/components/Upload/ShowFile'
import { CoreDotType, DotTypeConfigMapping } from '@/model/entity/CoreDot'

const props = defineProps<{
    data: DotTypeConfigMapping[CoreDotType.图片]
}>()

</script>

<template>
<ShowFile :href="data.url" />
</template>
