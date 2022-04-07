<script lang="ts" setup>

import { nextTick, onMounted, reactive, ref, watchEffect } from 'vue'

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
    }
})

const emits = defineEmits<{
    (event: 'update', value: number): void
    (event: 'update:value', value: number): void
}>()

const rangeRef = ref<HTMLInputElement>()

const inputProp = reactive({
    _value: prop.value,
    get value() {
        return this._value
    },
    set value(value: number) {
        const {max, min} = prop
        if (value > max) {
            value = max
        }
        if (value < min) {
            value = min
        }
        this._value = value

        emits('update', this.value)
        emits('update:value', this.value)
    },
    onInput() {
        console.debug('输入:', rangeRef.value?.valueAsNumber)
        this.value = rangeRef.value?.valueAsNumber as number
    },

    get percentage() {
        return (this.value / prop.max * 100).toFixed(2)
    },

    get tipsDisplay() {
        if (prop.tipsFormat) {
            return prop.tipsFormat(this.value)
        }
        return this.value
    },
})

watchEffect(() => {
    nextTick(() => {
        inputProp.value = prop.value
    })
})

</script>

<template>
<div class="progress-bar" :class="{'vertical': vertical}">
    <!-- TIPS -->
    <div class="tips-box" :style="`left: ${inputProp.percentage}%`">
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
           :value="inputProp.value"
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

<style lang="sass" scoped>
.progress-bar
    width: 100%
    position: relative

    input
        -webkit-appearance: none
        width: 100%
        height: 100%
        position: absolute
        background: none

    .track
        position: absolute
        width: 100%
        height: 100%
        overflow: hidden

        background-color: #fff

    .tips-box
        display: none
        position: absolute
        width: 50px
        height: 50px
        top: -55px
        z-index: 10000


        .tips
            width: 50px
            height: 30px
            padding: 5px
            border-radius: 5px
            line-height: 30px
            position: absolute
            left: -20px
            bottom: 0
            background-color: rgba(104,104,104,0.4)

.progress-bar:hover .tips-box
    display: block
        //background-color: rgba(104, 104, 104, 0.4)


.vertical
    transform-origin: 75px 75px
    transform: rotate(-90deg)
</style>
