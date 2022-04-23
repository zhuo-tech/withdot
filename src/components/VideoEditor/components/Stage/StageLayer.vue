<script lang="ts" setup>
import StageItem from '@/components/VideoEditor/components/Stage/StageItem.vue'
import { CoreDot } from '@/model/entity/CoreDot'
import { Ref, ref } from 'vue'

/**
 * "舞台" 可互动元素的父容器
 * @props list {Array<CoreDot>}
 * @props box {{width: number, height: number}} 容器宽高
 */
const props = defineProps<{
    list: Array<CoreDot>,
    box: {
        width: number,
        height: number,
    }
}>()

const emits = defineEmits<{
    (event: 'drag', index: CoreDot): void
}>()

// const context = reactive(new EditorStageLayerContext(props, emits))

const stageBoxRef: Ref<HTMLDivElement> = ref({} as any)
</script>

<template>
<div ref="stageBoxRef" class="stage-box">
    <StageItem v-for="(item, index) in list" :key="item._id" :boxRect="() => stageBoxRef.getBoundingClientRect()" @setZIndex="action => {}">
        <div style="min-width: 100px; min-height: 100px; background-color:#fff;">
            2333333333333333
        </div>
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
