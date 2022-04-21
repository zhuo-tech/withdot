<script lang="ts" setup>
import { CoreDot } from '@/model/entity/CoreDot'
import { reactive } from 'vue'
import { EditorStageLayerContext } from '../context/EditorStageLayerContext'
import Draggable from './Draggable.vue'

/**
 * "舞台" 可互动元素的父容器
 * 所有子元素都应该是 可拖动的盒子 Draggable
 * @props list {Array<CoreDot>}
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

const context = reactive(new EditorStageLayerContext(props, emits))

</script>

<template>
<div :ref="el => context.stageLayerRef = el"
     class="stage-box"
     @mousemove="context.onMouseMove"
     @mouseup="event => context.onMouseUp(event) ">

    <Draggable v-for="(item, index) in list"
               :key="index"
               :index="index"
               :item="item"
               :style="context.styleMap[index]"
               @mousedown="event => context.onMouseDown(event, index)"
               @setZIndex="action => context.setZIndex(action, index)" />
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
