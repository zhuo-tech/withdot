<script lang="ts" setup>
import { ObjectUtil } from 'typescript-util'

const props = defineProps({
    value: {
        type: Number,
        default: 1,
    },
})
const emits = defineEmits<{
    (event: 'update:value', value: number): void
}>()

const optionMapping = {
    '0.5x': 0.5,
    '1.0x': 1,
    '1.25x': 1.25,
    '1.5x': 1.5,
    '1.75x': 1.75,
    '2x': 2,
    '3x': 3,
}
const option = ObjectUtil.toArray(optionMapping).reverse()

function selectOption(value: number) {
    emits('update:value', value)
}

function showSpeed() {
    if (props.value === optionMapping['1.0x']) {
        return '倍速'
    }
    return ObjectUtil.keyValueReverse(optionMapping)[props.value]
}

</script>

<template>
<el-tooltip placement="top">
    <span class="double-speed">
        {{ showSpeed() }}
    </span>
    <template #content>
        <ul class="speed-option">
            <li v-for="kv in option" :key="kv.value" :class="{'selected': value === kv.value}" @click="selectOption(kv.value)">{{ kv.key }}</li>
        </ul>
    </template>
</el-tooltip>
</template>

<style lang="sass" scoped>
.double-speed
    cursor: pointer

.speed-option
    li
        font-size: 18px
        padding: 5px 10px
        cursor: pointer


.selected
    font-weight: bold
    background-color: #000
</style>
