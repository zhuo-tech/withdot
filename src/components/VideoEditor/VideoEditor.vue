<script lang="ts" setup>
import { PlayerContext } from '@/components/VideoPlayer/context/PlayerContext'
import VideoPlayer from '@/components/VideoPlayer/index.vue'
import { TimeUnit } from 'typescript-util'
import { provide, reactive } from 'vue'
import IconLabel from './components/IconLabel'
import List from './components/List.vue'
import { DotTypeOption, VideoEditorContext } from './VideoEditorContext'

/**
 * 编辑器
 * @provide {@link VideoEditorContext}
 * @provide {@link PlayerContext} 向下注入播放器的上下文 替换播放器自身
 */
const context = reactive(new VideoEditorContext())
provide(VideoEditorContext.INJECTION_KEY, context as any)
provide(PlayerContext.INJECTION_KEY, context.playerContext as any)

const {pointList, playerContext, addPoint} = context
</script>

<template>
<div class="video-editor-box">
    <!-- 编辑器工具栏 -->
    <el-menu :default-active="context.currentType" mode="horizontal" @select="context.addPointOnSelect">
        <el-menu-item v-for="item in DotTypeOption" :key="item.type" :index="item.type">
            <IconLabel :icon="item.icon" :label="item.label" />
        </el-menu-item>
    </el-menu>

    <!-- 播放器 -->
    <VideoPlayer :point-list="pointList"></VideoPlayer>

    <!-- 底部列表 -->
    <el-tabs v-model="context.currentType" stretch type="card">
        <el-tab-pane v-for="item in DotTypeOption" :key="item.type" :label="item.label" :name="item.label">
            <template #label>
                <IconLabel :icon="item.icon" :label="item.label" />
            </template>
        </el-tab-pane>
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
<el-dialog
    v-model="addPoint.formIsShow"
    append-to-body
    close-on-click-modal
    destroy-on-close
    draggable
    lock-scroll
    modal
    title="新增打点"
    width="45%">

    <el-tabs v-model="context.currentType" stretch tab-position="left">
        <el-tab-pane v-for="item in DotTypeOption" :key="item.type" :name="item.type">
            <template #label>
                <IconLabel :icon="item.icon" :label="item.label" />
            </template>
            <el-form>
                <el-form-item label="时间">
                    <span>{{ TimeUnit.SECOND.display(playerContext.videoElement.playTime) }}</span>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>

    <div slot="footer" class="drawer-body-footer" style="display: flex; justify-content: right">
        <el-button @click="addPoint.close()">取 消</el-button>
        <el-button type="primary">
            {{ false ? '提交中 ...' : '确 定' }}
        </el-button>
    </div>
</el-dialog>

</template>

<style lang="sass" scoped src="./VideoEditorStyle.sass" />
