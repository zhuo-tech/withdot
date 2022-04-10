<script lang="ts" setup>
import VideoPlayer from '@/components/VideoPlayer/index.vue'
import { CoreDot, CoreDotType, DotDisplayType } from '@/model/entity/CoreDot'
import { ObjectUtil } from 'typescript-util'
import { reactive } from 'vue'

const list: Array<CoreDot> = reactive([])

ObjectUtil.toArray(CoreDotType)
    .filter((t, i) => i < 3)
    .forEach((kv, index) => {
        let dot = new CoreDot()
        dot.type = kv.value
        dot._id = kv.key
        dot.label = kv.key
        dot.display = index % 2 === 0 ? DotDisplayType.BUTTON : DotDisplayType.EXPANDED
        dot.createTime = Date.now()
        list.push(dot)
    })
</script>

<template>
<div style="max-width: 80vw; max-height: 60vh; margin: 0 auto">
    <VideoPlayer :point-list="list"></VideoPlayer>
</div>
</template>
