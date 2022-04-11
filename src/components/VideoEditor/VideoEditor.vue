<script lang="ts" setup>
import VideoPlayer from '@/components/VideoPlayer/index.vue'
import { CoreDot, CoreDotType } from '@/model/entity/CoreDot'
import { ObjectUtil } from 'typescript-util'
import { reactive } from 'vue'
import List from './components/List.vue'

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
    <VideoPlayer></VideoPlayer>

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
                ???
            </el-button>
        </template>
    </List>

</div>

</template>

<style lang="sass" scoped src="./VideoEditorStyle.sass" />
