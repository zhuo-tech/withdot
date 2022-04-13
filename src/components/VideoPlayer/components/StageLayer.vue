<script lang="ts" setup>
import { StageLayerContext } from '@/components/VideoPlayer/context/StageLayerContext'
import { CoreDot } from '@/model/entity/CoreDot'
import { onMounted, reactive } from 'vue'
import Draggable from './Draggable.vue'

/**
 * "舞台" 可互动元素的父容器
 * 所有子元素都应该是 可拖动的盒子 Draggable
 * @props list {Array<CoreDot>}
 */
const props = defineProps<{
    list: Array<CoreDot>
}>()

const emits = defineEmits<{
    /**
     * 通知有鼠标离开了拖动容器
     */
    (event: 'leave', time: number): void

}>()

const context = reactive(new StageLayerContext())

onMounted(() => context.updateReferencePoint())
</script>

<template>
<div class="stage-box" @mousemove="event => event" :ref="el => context.stageLayerRef = el">
    <Draggable v-for="(item, index) in list"
               :key="index"
               :index="index"
               :item="item"
               @mousedown="event => event"
               @mouseleave="emits('leave', Date.now())"
               @mouseup="event => event " />
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
