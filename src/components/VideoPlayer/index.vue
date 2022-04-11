<script lang="ts" setup>
import { onMounted, onUnmounted, provide, reactive } from 'vue'
import ControlLayer from './components/ControlLayer.vue'
import StageLayer from './components/StageLayer.vue'
import VideoWrapperLayer from './components/VideoWrapperLayer.vue'
import { PlayerContext } from './context/PlayerContext'
import { AspectRatio } from './service/AspectRatio'

/**
 * 播放器
 * @props aspectRatio 播放器宽高比 {@link AspectRatio}
 * @props pointList 需要渲染的小组件列表 {@link Array<CoreDot>}
 * @provide {@link PlayerContext.INJECTION_KEY}
 */
const service = reactive(new PlayerContext())
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

const resize = () => service.resizePlayer(props.aspectRatio)
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
        <StageLayer :list="pointList" />
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
