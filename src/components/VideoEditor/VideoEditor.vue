<script lang="ts" setup>
import EditorStageLayer from '@/components/VideoEditor/components/EditorStageLayer.vue'
import TimeBubble from '@/components/VideoEditor/components/TimeBubble'
import Timeline from '@/components/VideoEditor/components/Timeline'
import VideoPlayer from '@/components/VideoPlayer/index.vue'
import { ControlModel } from '@/components/VideoPlayer/service/ControlModel'
import CoreMaterial from '@/model/entity/CoreMaterial'
import { CoreWork } from '@/model/entity/CoreWork'
import { FileService, INJECT_KEY_FILE_SERVICE } from '@/service/FileService'
import { inject, reactive, Ref, ref } from 'vue'
import AddPoint from './components/AddPoint.vue'
import List from './components/List.vue'
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

</script>

<template>
<div class="video-editor-box">

    <AddPoint :current-play-time="playerRef.time" @submit="formData => context.createDot(formData, playerRef.time)" />

    <!-- 播放器 -->
    <VideoPlayer :ref="setPlayerRef" :point-list="context.pointList" :show-control="false" :src="fileService.showUrl(data.material?.href)">
        <template v-slot:stage="{list, box}">
            <EditorStageLayer :box="box" :list="list" />
        </template>
    </VideoPlayer>

    <!-- timeline -->
    <TimeBubble :list="context.pointList">
        <Timeline :current="playerRef.time" :end="playerRef.maxTime" :start="playerRef.minTime" @select="time => playerRef.setPlayTime(time)" />
    </TimeBubble>

    <!-- 底部列表 -->
    <div v-if="false">
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
                <el-button type="primary" @click="context.controlDrawer.show()">
                    显示列表 -- {{ playerRef.time }}
                </el-button>
            </template>
        </List>
    </div>
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
