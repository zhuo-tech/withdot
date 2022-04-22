<script lang="ts" setup>
import ShowDotSwitch from '@/components/VideoEditor/components/ShowDotSwitch'
import { DraggableContext } from '@/components/VideoEditor/context/DraggableContext'
import { CoreDot } from '@/model/entity/CoreDot'
import { reactive } from 'vue'

type RightMenuAction = '+1' | '-1' | 'max' | 'min'

/**
 * @props {{item: any, index: number}}
 */
const prop = defineProps({
    item: {
        type: [CoreDot, Object],
        required: false,
        default: () => (new CoreDot()),
    },
    index: {
        type: Number,
        default: 0,
    },
})

const emits = defineEmits<{
    (event: 'setZIndex', action: RightMenuAction): void
}>()

const context = reactive(new DraggableContext(prop as any))

const rightMenuClick = (action: RightMenuAction) => {
    emits('setZIndex', action)
    context.rightMenuClose()
}

</script>
<template>
<div class="draggable" @contextmenu.prevent.stop="context.rightMenuShow">

    <!-- 右键菜单 -->
    <el-collapse-transition>
        <div v-show="context.rightClickMenuIsShow"
             :ref="el => context.rightMenuRef = el"
             class="draggable-right-menu"
             @mouseleave="context.rightMenuClose()">
            <ul>
                <li @click="rightMenuClick('+1')">上移一层</li>
                <li @click="rightMenuClick('-1')">下移一层</li>
                <li @click="rightMenuClick('max')">置于顶层</li>
                <li @click="rightMenuClick('min')">置于底层</li>
            </ul>
        </div>
    </el-collapse-transition>

    <!-- 收起模式: button -->
    <div v-show="!context.expectToExpand" class="label-mode" @click="context.showDetail()">
        {{ item.label }}
    </div>

    <!-- 展开模式: 又称"海报" -->
    <div v-show="context.expectToExpand" class="details-mode" @dblclick.stop="context.showLabel()">
        <ShowDotSwitch :data="item" />
    </div>

</div>
</template>

<style lang="sass" scoped src="../style/DraggableStyle.sass"></style>
