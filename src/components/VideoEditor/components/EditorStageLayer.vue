<script lang="ts" setup>
import Resizable from '@/components/VideoEditor/components/Resizable.vue'
import { CoreDot } from '@/model/entity/CoreDot'
import { reactive } from 'vue'
import { EditorStageLayerContext } from '../context/EditorStageLayerContext'
import Draggable from './Draggable.vue'

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

const context = reactive(new EditorStageLayerContext(props, emits))

</script>

<template>
<div :ref="el => context.stageLayerRef = el"
     class="stage-box"
     @mousemove="context.onMouseMove"
     @mouseup="event => context.onMouseUp(event)" @click.stop.prevent="() => {}">

    <Resizable v-for="(item, index) in list"
               :key="item._id" :style="context.styleMap[index]"
               @mousedown="event => context.onMouseDown(event, index)">
        <Draggable
            :index="index"
            :item="item"
            @setZIndex="action => context.setZIndex(action, index)" />
    </Resizable>
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
