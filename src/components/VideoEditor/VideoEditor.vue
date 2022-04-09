<script lang="ts" setup>
import List from './components/List.vue'
import VideoPlayer from '@/components/VideoPlayer/index.vue'
import { CoreDot, CoreDotType } from '@/model/entity/CoreDot'
import { ObjectUtil, TimeUnit } from 'typescript-util'
import { reactive } from 'vue'
import { unref } from '@vue/reactivity'

const actionList = reactive({
    currentType: CoreDotType.题目,
    options: ObjectUtil.toArray(CoreDotType),
})

const pointList = reactive<Array<CoreDot>>([])
pointList.push(new CoreDot())
</script>

<template>
<div class="video-editor-box">
    <!-- 编辑器工具栏 -->
    <VideoPlayer>

        <!-- 功能区... -->
        <template v-slot="{service}">
            <br>
            <el-tabs v-model="actionList.currentType" stretch type="card">
                <el-tab-pane v-for="(kv, index) in actionList.options" :key="index" :label="kv.key" :name="kv.value" />
            </el-tabs>
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
                        {{ TimeUnit.SECOND.display(unref(service.videoElement.playTime)) }}
                    </el-button>
                </template>
            </List>
        </template>
    </VideoPlayer>

</div>

</template>

<style lang="sass" scoped src="./VideoEditorStyle.sass" />
