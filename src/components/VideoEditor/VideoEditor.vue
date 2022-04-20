<script lang="ts" setup>
import DoubleSpeed from '@/components/VideoPlayer/components/DoubleSpeed.vue'
import VideoPlayer from '@/components/VideoPlayer/index.vue'
import { ControlModel } from '@/components/VideoPlayer/service/ControlModel'
import CoreMaterial from '@/model/entity/CoreMaterial'
import { CoreWork } from '@/model/entity/CoreWork'
import { FileService, INJECT_KEY_FILE_SERVICE } from '@/service/FileService'
import { Edit } from '@element-plus/icons-vue'
import { TimeUnit } from 'typescript-util'
import { inject, reactive, Ref, ref } from 'vue'
import AddPoint from './components/AddPoint.vue'
import EditorStageLayer from './components/EditorStageLayer.vue'
import List from './components/List.vue'
import TimeBubble from './components/TimeBubble'
import Timeline from './components/Timeline'
import { VideoEditorContext } from './context/VideoEditorContext'

/**
 * 编辑器
 */
const props = defineProps<{
    data: CoreWork & { material: CoreMaterial }
}>()

const fileService: FileService = inject(INJECT_KEY_FILE_SERVICE) as FileService

const context = reactive(new VideoEditorContext(props))

const playerRef: Ref<ControlModel> = ref({} as any)
const setPlayerRef = (el: Ref<ControlModel>) => playerRef.value = el?.value

const timelineRef = ref({})
</script>

<template>
<div class="video-editor-box">

    <AddPoint :current-play-time="playerRef.time" @submit="formData => context.createDot(formData)" />

    <!-- 播放器 -->
    <VideoPlayer :ref="setPlayerRef" :point-list="context.pointList" :show-control="false" :src="fileService.showUrl(data.material?.href)">
        <template v-slot:stage="{list, box}">
            <EditorStageLayer :box="box" :list="list" @drag="index => context.update(index)" />
        </template>
    </VideoPlayer>

    <div class="toolbar">
        <!-- 播放按钮 -->
        <el-tooltip placement="top">
            <el-icon @click.stop="playerRef.togglePlaybackStatus()">
                <video-play v-show="!playerRef.playing" />
                <video-pause v-show="playerRef.playing" />
            </el-icon>
            <template #content>
                <span v-show="!playerRef.playing">播放</span>
                <span v-show="playerRef.playing">暂停</span>
            </template>
        </el-tooltip>
        <!-- 时间 -->
        <div class="time">
            {{ TimeUnit.SECOND.display(playerRef.time) }} /
            {{ TimeUnit.SECOND.display(playerRef.maxTime) }}
        </div>
        <!-- 倍速 -->
        <DoubleSpeed v-model:value="playerRef.playbackRate" />
        <!-- 音量 -->
        <el-slider v-model="playerRef.volume" height="200px" style="max-width: 150px" />
        <!-- 全屏 -->
        <el-tooltip placement="top">
            <el-icon @click="() => playerRef.toggleFullScreen?.()">
                <full-screen />
            </el-icon>
            <template #content>
                切换全屏
            </template>
        </el-tooltip>
    </div>

    <!-- timeline -->
    <TimeBubble :container-width="timelineRef['containerWidth']"
                :list="context.pointList"
                :time-period="{start: playerRef.minTime, end: playerRef.maxTime}">
        <Timeline ref="timelineRef"
                  :current="playerRef.time"
                  :end="playerRef.maxTime"
                  :start="playerRef.minTime"
                  @select="time => playerRef.setPlayTime(time)" />
    </TimeBubble>

    <!-- 底部列表 -->
    <List :list="context.pointList">
        <template v-slot:prefix>
            <el-icon>
                <postcard />
            </el-icon>
        </template>
        <template v-slot:content="{item, index}">
            {{ item.label }}
        </template>
        <template v-slot:operating="{item, index}">
            <el-button :icon="Edit" type="text" @click="context.controlDrawer.show()">
                编辑
            </el-button>
        </template>
    </List>

    <!-- 侧边抽屉 -->
    <el-drawer v-model="context.controlDrawer.isShow">
        <template #title>
            <h1>啊~ 抽屉列表-----------------</h1>
        </template>
        <List :list="context.pointList">
            <template v-slot:prefix>
                <el-icon>
                    <postcard />
                </el-icon>
            </template>
            <template v-slot:content="{item, index}">
                {{ item }}
            </template>
            <template v-slot:operating="{item, index}">
                <el-button type="primary">
                </el-button>
            </template>
        </List>
    </el-drawer>

</div>

</template>

<style lang="sass" scoped src="./style/VideoEditorStyle.sass" />
