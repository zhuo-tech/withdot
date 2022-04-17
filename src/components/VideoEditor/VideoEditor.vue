<script lang="ts" setup>
import EditorStageLayer from '@/components/VideoEditor/components/EditorStageLayer.vue'
import VideoPlayer from '@/components/VideoPlayer/index.vue'
import { ControlModel } from '@/components/VideoPlayer/service/ControlModel'
import { reactive, Ref, ref } from 'vue'
import AddPoint from './components/AddPoint.vue'
import List from './components/List.vue'
import { VideoEditorContext } from './context/VideoEditorContext'

/**
 * 编辑器
 */
const context = reactive(new VideoEditorContext())

const playerRef: Ref<ControlModel> = ref({} as any)
const setPlayerRef = (el: Ref<ControlModel>) => playerRef.value = el.value

</script>

<template>
<div class="video-editor-box">

    <AddPoint :current-play-time="0" />

    <!-- 播放器 -->
    <VideoPlayer :ref="setPlayerRef" :point-list="context.pointList">
        <template v-slot:stage="{list, box}">
            <EditorStageLayer :box="box" :list="list" />
        </template>
    </VideoPlayer>

    <!-- 底部列表 -->
    <div>
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
