<script lang="ts" setup>
import { ObjectUtil } from 'typescript-util'
import { onMounted, Ref, ref } from 'vue'
import { ResizableType, useResizable } from '../../hooks/useResizable'
import { useRightMenu } from '../../hooks/useRightMenu'

/**
 * 可拖动 + 可调整大小 + 可设置层级的容器
 */
type RightMenuAction = '+1' | '-1' | 'max' | 'min'

const props = defineProps<{
    location: {
        width: number
        height: number
        left: number
        top: number
        zIndex: number
    }
    boxRect: () => DOMRect
}>()

const emits = defineEmits<{ (event: 'update:location', location: any): void }>()

// 父容器变化时, 重设样式
const reset = () => resizable.reset(resizable.location)
const updateLocation = () => emits('update:location', resizable.location)

// 拖动和缩放
const resizableRef: Ref<HTMLDivElement> = ref({} as any)
const resizable = useResizable(resizableRef, props.boxRect, props.location, updateLocation)

// 右键菜单 设置 zIndex
const rightMenuRef: Ref<HTMLDivElement> = ref({} as any)
const contentRef: Ref<HTMLDivElement> = ref({} as any)
const rightMenu = useRightMenu(rightMenuRef, () => contentRef.value.getBoundingClientRect(), props.location, updateLocation)

onMounted(resizable.reset)

defineExpose({reset})
</script>

<template>
<!-- 可拖动 + 可调整大小 + 可设置层级的容器 -->
<div ref="resizableRef"
     :class="{'dotted-border': resizable.isShowResizable['value']}"
     class="stage-item"
     tabindex="-1"
     @blur="resizable.closeResizable()"
     @focus="resizable.showResizable()"
     @mousedown="resizable.startDraggable"
     @contextmenu.prevent.stop="rightMenu.show">
    <!-- 容器的 控制按钮 -->
    <div v-for="(item) in ObjectUtil.toArray(ResizableType)"
         v-show="resizable.isShowResizable['value']"
         :key="item.key"
         :class="`controls ${item.value}`"
         @mousedown.stop="event => resizable.startResizable(event, item.value)" />

    <div ref="contentRef" class="content">
        <!-- 右键菜单 -->
        <el-collapse-transition>
            <div v-show="rightMenu.isShow['value']"
                 ref="rightMenuRef"
                 class="draggable-right-menu"
                 @click="rightMenu.close()"
                 @mouseleave="rightMenu.close()">
                <ul>
                    <li @click="rightMenu.setZIndex('+1')">上移一层</li>
                    <li @click="rightMenu.setZIndex('-1')">下移一层</li>
                    <li @click="rightMenu.setZIndex('max')">置于顶层</li>
                    <li @click="rightMenu.setZIndex('min')">置于底层</li>
                </ul>
            </div>
        </el-collapse-transition>

        <!-- 真正被包裹的内容 -->
        <div class="config">
            <slot></slot>
        </div>
    </div>
</div>
</template>

<style lang="sass" scoped src="../../style/StageItemStyle.sass"></style>
