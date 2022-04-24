<script lang="ts" setup>
import ShowDotSwitch from '@/components/VideoEditor/components/ShowDotSwitch'
import StageItem from '@/components/VideoEditor/components/Stage/StageItem.vue'
import { CoreDot } from '@/model/entity/CoreDot'
import { CoreDotPosition } from '@/model/entity/Dot/CoreDotPosition'
import { Ref, ref } from 'vue'

/**
 * "舞台" 可互动元素的父容器
 * @props list {Array<CoreDot>}
 */
const props = defineProps<{ list: Array<CoreDot> }>()
const emits = defineEmits<{
    (event: 'drag', index: CoreDot): void
}>()

const stageBoxRef: Ref<HTMLDivElement> = ref({} as any)

const updatePosition = (item: CoreDot, location: any) => {
    const {width, height, top, left, zIndex} = location
    item.position.width = width
    item.position.height = height
    item.position.x = left
    item.position.y = top
    item.position.z = zIndex
    emits('drag', item)
}
</script>

<template>
<div ref="stageBoxRef" class="stage-box">
    <StageItem v-for="item in list" :key="item._id"
               :boxRect="() => stageBoxRef.getBoundingClientRect()"
               :location="CoreDotPosition.toLocation(item.position)"
               @update:location="location => updatePosition(item, location)">
        <ShowDotSwitch :data="item" />
    </StageItem>
</div>
</template>

<style lang="sass" scoped>
.stage-box > *
    position: absolute

.stage-box
    pointer-events: none
    width: 100%
    height: 100%
    position: relative
    overflow: hidden
</style>
