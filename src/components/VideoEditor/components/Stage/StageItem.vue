<script lang="ts" setup>
import { ObjectUtil } from 'typescript-util'
import { Ref, ref } from 'vue'
import { useDraggable } from './hooks/useDraggable'
import { ResizableType, useResizable } from './hooks/useResizable'
import { useRightMenu } from './hooks/useRightMenu'

/**
 * 可拖动 + 可调整大小 + 可设置层级的容器
 */
type RightMenuAction = '+1' | '-1' | 'max' | 'min'

const props = defineProps<{
    boxRect: () => DOMRect
}>()

const emits = defineEmits<{
    (event: 'setZIndex', action: RightMenuAction): void
}>()

const resizableRef: Ref<HTMLDivElement> = ref({} as any)
const resizable = useResizable(resizableRef)
const draggable = useDraggable(resizableRef, props.boxRect)

const rightMenuRef: Ref<HTMLDivElement> = ref({} as any)
const rightMenu = useRightMenu(rightMenuRef)

</script>

<template>
<!-- 可拖动 + 可调整大小 + 可设置层级的容器 -->
<div ref="resizableRef"
     :class="{'dotted-border': resizable.isShow}"
     class="resizable"
     @click="resizable.show()"
     @mousedown="draggable.start"
     @mouseup="draggable.stop"
     @contextmenu.prevent.stop="rightMenu.show">
    <!-- 容器的 控制按钮 -->
    <div v-for="(item) in ObjectUtil.toArray(ResizableType)"
         v-show="resizable.isShow"
         :key="item.key"
         :class="`controls ${item.value}`"
         @mousedown.stop="event => resizable.start(event, item.value)" />

    <div class="content draggable">
        <!-- 右键菜单 -->
        <el-collapse-transition>
            <div v-show="rightMenu.isShow.value"
                 ref="rightMenuRef"
                 class="draggable-right-menu"
                 @click="rightMenu.close()"
                 @mouseleave="rightMenu.close()">
                <ul>
                    <li @click="emits('setZIndex','+1')">上移一层</li>
                    <li @click="emits('setZIndex','-1')">下移一层</li>
                    <li @click="emits('setZIndex','max')">置于顶层</li>
                    <li @click="emits('setZIndex','min')">置于底层</li>
                </ul>
            </div>
        </el-collapse-transition>

        <!-- 真正被包裹的内容 -->
        <div>
            <slot></slot>
        </div>
    </div>
</div>
</template>

<style lang="sass" scoped src="../../style/ResizableStyle.sass"></style>
<style lang="sass" scoped src="../../style/DraggableStyle.sass"></style>
