<script lang="ts" setup>

import { reactive, ref } from 'vue'

const prop = defineProps({
    value: {
        type: Number,
        default: 0,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    max: {
        type: Number,
        default: 0,
    },
    min: {
        type: Number,
        default: 0,
    },
    height: {
        type: Number,
        default: 5,
    },
    tipsFormat: {
        type: Function,
        required: false,
    },
    vertical: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits<{
    (event: 'update:value', value: number): void
    (event: 'change', value: number): void
}>()

const rangeRef = ref<HTMLInputElement>()

const inputProp = reactive({
    onInput() {
        let value = rangeRef.value?.valueAsNumber as number
        const {max, min} = prop
        if (value > max) {
            value = max
        }
        if (value < min) {
            value = min
        }
        emits('change', value)
        emits('update:value', value)
    },

    get percentage() {
        return (prop.value / prop.max * 100).toFixed(2)
    },

    get tipsDisplay() {
        if (prop.tipsFormat) {
            return prop.tipsFormat(prop.value)
        }
        return prop.value
    },
})

</script>

<template>
<div :class="{'vertical': vertical}" class="progress-bar">
    <!-- TIPS -->
    <div :style="`left: ${inputProp.percentage}%`" class="tips-box">
        <div class="tips">
            {{ inputProp.tipsDisplay }}
        </div>
    </div>
    <div class="track">
        <slot></slot>
    </div>
    <input ref="rangeRef"
           :disabled="disabled"
           :max="max"
           :min="min"
           :value="value"
           alt="alt"
           placeholder="placeholder"
           type="range"
           @input="inputProp.onInput">
</div>
</template>

<style scoped>
.progress-bar {
    /*noinspection CssInvalidFunction*/
    height: v-bind(height+ "px")
}

</style>

<style lang="sass" scoped src="../style/ProgressBarStyle.sass" />
