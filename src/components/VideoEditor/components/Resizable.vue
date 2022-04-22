<script lang="ts" setup>
import { ResizableContext, ResizableType } from '@/components/VideoEditor/context/ResizableContext'
import { ObjectUtil } from 'typescript-util'
import { onMounted, onUnmounted, reactive } from 'vue'

/**
 * 可以调整大小的容器
 */
const context = reactive(new ResizableContext())

let listener = () => {
    if (context.controlIsShow) {
        context.controlClose()
    }
}

onMounted((() => document.addEventListener('click', listener, {passive: false})))
onUnmounted(() => document.removeEventListener('click', listener))
</script>

<template>
<div :ref="el => context.resizableRef = el"
     :class="{'dotted-border': context.controlIsShow}"
     class="resizable"
     @click.stop="context.controlShow()">
    <!-- 控制按钮 -->
    <div v-for="(item) in ObjectUtil.toArray(ResizableType)"
         v-show="context.controlIsShow"
         :key="item.key"
         :class="`controls ${item.value}`"
         @mousedown.stop="event => context.controlMouseDown(event, item.value)" />
    <!-- 内容区 -->
    <div class="content">
        <slot></slot>
    </div>
</div>
</template>

<style lang="sass" scoped src="../style/ResizableStyle.sass"></style>
