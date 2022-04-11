<script lang="ts" setup>
import { VideoEditorContext } from '@/components/VideoEditor/VideoEditorContext'
import { PlayerContext } from '@/components/VideoPlayer/context/PlayerContext'
import VideoPlayer from '@/components/VideoPlayer/index.vue'
import { provide, reactive } from 'vue'
import List from './components/List.vue'

/**
 * 编辑器
 * @provide {@link VideoEditorContext}
 * @provide {@link PlayerContext} 向下注入播放器的上下文 替换播放器自身
 */
const context = reactive(new VideoEditorContext())
provide(VideoEditorContext.INJECTION_KEY, context as any)
provide(PlayerContext.INJECTION_KEY, context.playerContext as any)

const {actionList, pointList} = context
</script>

<template>
<div class="video-editor-box">
    <!-- 编辑器工具栏 -->
    <div>

    </div>

    <!-- 播放器 -->
    <VideoPlayer></VideoPlayer>

    <!-- 底部列表 -->
    <el-tabs v-model="actionList.currentType" stretch type="card">
        <el-tab-pane v-for="(kv, index) in actionList.options" :key="index" :label="kv.key" :name="kv.value" />
    </el-tabs>
    <!-- 展示: 列表 -->
    <List :list="pointList">
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
                ---
            </el-button>
        </template>
    </List>
</div>

<!-- 侧边抽屉 -->
<div>

</div>

<!-- 新增 模态框 -->
<div>

</div>

</template>

<style lang="sass" scoped src="./VideoEditorStyle.sass" />
