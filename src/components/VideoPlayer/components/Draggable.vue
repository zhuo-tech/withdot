<script lang="ts" setup>
import { CoreDot } from '@/model/entity/CoreDot'
import { inject, onMounted, onUnmounted, reactive } from 'vue'
import { DraggableContext } from '../context/DraggableContext'
import { PlayerContext } from '../context/PlayerContext'
import { PlayerResizeEvent } from '../service/PlayerResizeEvent'

/**
 * 可拖动的盒子容器
 * 功能:
 * - 可拖动位置, 维护 {@link CoreDot.position} 中的 x y, 监听父容器变化, 按比例缩放
 * - TODO: 可缩放, 维护 {@link CoreDot.position} 中的 width height
 *
 * @inject service {@link PlayerContext}
 * @props {{item: any, index: number}}
 */
const service = inject(PlayerContext.INJECTION_KEY) as PlayerContext

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

onMounted(() => {
    const listenerKey = service.eventCenter
        .addEventListener(PlayerResizeEvent.NAME, context.resizeRelocate)

    onUnmounted(() => {
        service.eventCenter.removeEventListener(PlayerResizeEvent.NAME, listenerKey)
    })
})

// 快速拖动时, 因为 mouse move 的延迟, 鼠标指针会移出容器范围 无法触发 mouseup 来清除 Adsorption 状态
const mouseLeave = () => {
    service.pushDraggableLeaveEvent(Date.now())
    context.closeAdsorption()
}

</script>
<template>
<div :ref="el => context.divRef = el"
     class="draggable"
     @mouseleave="mouseLeave"
     @contextmenu.prevent.stop="context.rightMenuShow"
     @mousemove.prevent="event => context.dragReLocate(event)"
     @mouseup.prevent="context.closeAdsorption()"
     @mousedown.prevent="event => context.onMouseDown(event)">

    <!-- 右键菜单 -->
    <el-collapse-transition>
        <div v-show="context.rightClickMenuIsShow"
             :ref="el => context.rightMenuRef = el"
             class="draggable-right-menu"
             @mouseleave="context.rightMenuClose()">
            <ul>
                <li @click="context.rightMenuOnClick('+1')">上移一层</li>
                <li @click="context.rightMenuOnClick('-1')">下移一层</li>
                <li @click="context.rightMenuOnClick('max')">置于顶层</li>
                <li @click="context.rightMenuOnClick('min')">置于底层</li>
            </ul>
        </div>
    </el-collapse-transition>

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
