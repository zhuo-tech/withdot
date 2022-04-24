<script lang="ts" setup>
import { CoreDotType, DotTypeConfigMapping } from '@/model/entity/CoreDot'
import { StrUtil } from 'typescript-util'
import { computed } from 'vue'

const props = defineProps<{
    data: DotTypeConfigMapping[CoreDotType.文本]
}>()

const showText = computed(() => {
    let str = props.data.text
    if (StrUtil.isEmpty(str)) {
        return StrUtil.EMPTY
    }
    return str.replaceAll('\n', '<br>')
})

</script>

<template>
<div v-html="showText"></div>
</template>

<style lang="sass" scoped>
div
    background-color: rgba(255, 255, 255, .2)
    backdrop-filter: blur(10px)
    padding: 5px 10px
    border-radius: 3px
</style>
