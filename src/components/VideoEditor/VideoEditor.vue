<script lang="ts" setup>
import IconLabel from '@/components/IconLabel/IconLabel'
import List from '@/components/List/List.vue'
import { ControlModel } from '@/components/VideoPlayer/hooks/useVideo'
import VideoPlayer from '@/components/VideoPlayer/index.vue'
import CoreMaterial from '@/model/entity/CoreMaterial'
import { CoreWork } from '@/model/entity/CoreWork'
import { FileService, INJECT_KEY_FILE_SERVICE } from '@/service/FileService'
import { Edit } from '@element-plus/icons-vue'
import { computed, inject, reactive, Ref, ref, unref } from 'vue'
import AddPoint from './components/AddPoint.vue'
import StageLayer from './components/Stage/StageLayer.vue'
import TimeBubble from './components/TimeBubble'
import Timeline from './components/Timeline'
import Toolbar from './components/Toolbar.vue'
import { DotTypeIconShow, VideoEditorContext } from './context/VideoEditorContext'

/**
 * 编辑器
 */
const props = defineProps<{ data: CoreWork & { material: CoreMaterial } }>()
const fileService: FileService = inject(INJECT_KEY_FILE_SERVICE) as FileService

const playerRef: Ref<ControlModel> = ref({} as any)
const timelineRef = ref({})

const context = reactive(new VideoEditorContext(props))

const displayDot = computed(
    () => context.pointList.filter(dot => {
        const {start, end} = dot
        const playTime = unref(playerRef.value.playTime)
        return playTime >= start && playTime <= (end ?? 0)
    }),
)
</script>

<template>
<div class="video-editor-box">

    <AddPoint :current-play-time="playerRef.playTime" @submit="formData => context.createDot(formData)" />

    <!-- 播放器 -->
    <!--suppress JSUndeclaredVariable -->
    <VideoPlayer :ref="(el) => playerRef = el.value"
                 :point-list="displayDot"
                 :show-control="false"
                 :src="fileService.showUrl(data.material?.href)">
        <template v-slot:stage="{list, box}">
            <StageLayer :list="list" @drag="dot => context.update(dot)" />
        </template>
    </VideoPlayer>

    <Toolbar :player-ref="playerRef" />

    <!-- timeline -->
    <TimeBubble :container-width="timelineRef['containerWidth']"
                :list="context.pointList"
                :time-period="{start: playerRef.minTime, end: playerRef.maxDuration}"
                @select="time => playerRef.setPlayTime(time)">
        <Timeline ref="timelineRef"
                  :current="playerRef.playTime"
                  :end="playerRef.maxDuration"
                  :start="playerRef.minTime"
                  @drag="time => playerRef.setPlayTime(time)"
                  @select="time => playerRef.setPlayTime(time)" />
    </TimeBubble>

    <!-- 底部列表 -->
    <List :list="context.pointList">
        <template v-slot:prefix="{item}">
            <IconLabel :icon="DotTypeIconShow[item.type]" />
        </template>
        <template v-slot:content="{item, index}">
            {{ item.label }}
        </template>
        <template v-slot:operating="{item, index}">
            <AddPoint :current-play-time="playerRef.playTime" @submit="dot => context.editSubmit(dot)">
                <template v-slot="{edit: editAction}">
                    <el-button :icon="Edit" type="text" @click="editAction(item)">
                        编辑
                    </el-button>
                </template>
            </AddPoint>

        </template>
    </List>

</div>

</template>
