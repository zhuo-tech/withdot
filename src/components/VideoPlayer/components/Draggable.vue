<script lang="ts" setup>
import { CoreDot } from '@/model/entity/CoreDot'
import { reactive } from 'vue'
import { DraggableContext } from '../context/DraggableContext'

/**
 * @props {{item: any, index: number}}
 */
const prop = defineProps({
    item: {
        type: CoreDot,
        required: false,
        default: () => (new CoreDot()),
    },
    index: {
        type: Number,
        default: 0,
    },
})

const context = reactive(new DraggableContext(prop))

</script>
<template>
<div class="draggable">

    <!-- 收起模式: button -->
    <div v-show="!context.expectToExpand" class="label-mode" @click.stop="context.showDetail()">
        {{ item.label }}
    </div>

    <!-- 展开模式: 又称"海报" -->
    <div v-show="context.expectToExpand" class="details-mode" @dblclick.stop="context.showLabel()">
        {{ item }}
    </div>

</div>
</template>

<style lang="sass" scoped src="../style/DraggableStyle.sass"></style>
