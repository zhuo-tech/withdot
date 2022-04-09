<script lang="ts" setup>
import StageLayer from './components/StageLayer.vue'
import ControlLayer from './components/ControlLayer.vue'
import { getLogger } from '@/main'
import { onMounted, onUnmounted, provide, reactive } from 'vue'
import VideoWrapperLayer from './components/VideoWrapperLayer.vue'
import { PlayerContext, PlayerResizeEvent } from './context/PlayerContext'

/**
 * 播放器
 * @props aspectRatio {{width: number, height: number}} 播放器宽高比
 * @props pointList {Array<CoreDot>} 需要渲染的小组件列表
 * @provide {@link PlayerContext.INJECTION_KEY}
 */
const service = reactive(new PlayerContext())
provide(PlayerContext.INJECTION_KEY, service as any)

const props = defineProps({
    aspectRatio: {
        type: Object,
        default: () => ({width: 16, height: 9}),
    },
    pointList: {
        type: Array,
        default: () => ([]),
    },
})
const log = getLogger('VideoPlayer')

function resize() {
    const {width, height} = props.aspectRatio
    service.playerBoxElement.resizeHeight(width, height)
    const rectangle = service.playerBoxElement.realWidthHeight
    // log.trace('#player resize', rectangle)
    service.eventCenter.push(new PlayerResizeEvent(rectangle.width, rectangle.height))
}

service.playerBoxElement.onInitializeFinish(() => window.addEventListener('resize', resize, {passive: true}))
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
