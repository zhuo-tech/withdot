<script lang="ts" setup>
import { CoreDot } from '@/model/entity/CoreDot'
import { computed, inject, onMounted, onUnmounted, provide, reactive } from 'vue'
import ControlLayer from './components/ControlLayer.vue'
import StageLayer from './components/StageLayer.vue'
import VideoWrapperLayer from './components/VideoWrapperLayer.vue'
import { PlayerContext } from './context/PlayerContext'
import { AspectRatio } from './service/AspectRatio'

/**
 * 播放器
 * @props aspectRatio 播放器宽高比 {@link AspectRatio}
 * @props pointList 需要渲染的小组件列表 {@link Array<CoreDot>}
 * @inject {@link PlayerContext} 如果有提供注入, 使用注入的上下文(编辑模式); 如果没有, 新建一个 (纯播放模式)
 * @provide {@link PlayerContext.INJECTION_KEY} 继续向下提供上下文注入
 */
const service = inject(PlayerContext.INJECTION_KEY, reactive(new PlayerContext()) as any)
provide(PlayerContext.INJECTION_KEY, service as any)

const props = defineProps({
    aspectRatio: {
        type: AspectRatio,
        default: () => AspectRatio.DEFAULT,
    },
    pointList: {
        type: Array,
        default: () => ([]),
    },
})

const showList = computed(() => props.pointList.filter(dot => {
    const {start, end = 0} = dot as CoreDot
    const ct = service.videoElement.playTime
    // return ct >= start && ct <= start + end
    return true
}))

const resize = () => service.resizePlayer(<AspectRatio>props.aspectRatio)
const addWindowListener = () => window.addEventListener('resize', resize, {passive: true})

// resize 中 resizePlayer 依赖 playerBoxElement 的属性, 故监听器延迟到DOM初始化后添加. mounted 同理.
service.playerBoxElement.onInitializeFinish(addWindowListener)
onMounted(resize)
onUnmounted(() => window.removeEventListener('resize', resize))

</script>

<template>
<!-- 最外层容器 -->
<div class="player-wrap">
    <!-- 持有绝对宽高 -->
    <div id="player" :ref="el => service.playerBoxElement.setElement(el)">
        <VideoWrapperLayer />
        <ControlLayer />
        <StageLayer :list="showList" />
    </div>
</div>
</template>

<style lang="sass" scoped>
.player-wrap
    height: 100%

#player
    position: relative

#player > *
    position: absolute
    width: 100%
    height: 100%
    top: 0
    left: 0

</style>
