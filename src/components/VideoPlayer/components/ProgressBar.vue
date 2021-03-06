<script lang="ts" setup>
import { Ref, ref } from 'vue'
import { useProgressBar } from '../hooks/useProgressBar'

/**
 * 自定义进度条
 * @props value {number} 进度条当前值 默认0
 * @props bufferValue {number} 进度条缓冲值 默认 0
 * @props min {number}
 * @props max {number}
 * @props formatTips {(value: number) => string} 格式化函数
 */
const props = defineProps({
    value: {type: Number, default: 20},
    bufferValue: {type: Number, default: 0},
    min: {type: Number, default: 0},
    max: {type: Number, default: 100},
    formatTips: {type: Function, required: false},
})

const emits = defineEmits<{
    (event: 'update:value', value: number): void,
    (event: 'change', value: number): void,
}>()

const trackRef: Ref<HTMLDivElement> = ref({} as any)
const tipsRef: Ref<HTMLDivElement> = ref({} as any)
const data = useProgressBar(trackRef, tipsRef, props as any, emits)

</script>

<template>
<div class="progress-bar" @mouseleave="data.buttonMouseUp" @mousemove="data.trackMouseMove">
    <div ref="trackRef" class="track" @click="data.trackOnClick">
        <div ref="tipsRef" class="tips">
            {{ data.showTipsValue }}
        </div>
    </div>
    <!-- 缓冲进度层 -->
    <div :style="`width: ${data.bufferPercentage};`" class="buffer-layer linear-animation"></div>
    <!-- 着色层 -->
    <div :class="{'linear-animation': !data.buttonAdsorption}" :style="`width: ${data.percentage};`" class="display-layer">
        <!-- 控制按钮 -->
        <div :ref="el => data.progressButtonRef = el" class="progress-button" @mousedown="data.buttonMouseDown" @mouseup="data.buttonMouseUp"></div>
    </div>
</div>
</template>

<style lang="sass" scoped src="../style/ProgressBarStyle.sass"></style>
