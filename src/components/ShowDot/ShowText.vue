<script lang="ts" setup>
import { CoreDotType, DotTypeConfigMapping } from '@/model/entity/CoreDot'

const props = defineProps<{
    data: DotTypeConfigMapping[CoreDotType.文本]
}>()
</script>

<template>
<div v-html="data.text"></div>
</template>
