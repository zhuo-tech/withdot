<script lang="ts" setup>
import { CoreDot } from '@/model/entity/CoreDot'
import Draggable from './components/Draggable.vue'

/**
 * "舞台" 可互动元素的父容器
 * 所有子元素都应该是 可拖动的盒子 Draggable
 * @props list {Array<CoreDot>}
 */
const props = defineProps<{
    list: Array<CoreDot>
}>()
</script>

<template>
<div class="stage-box">
    <Draggable v-for="(item, index) in list" :key="index" :index="index" :item="item" />
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
