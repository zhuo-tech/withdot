<script lang="ts" setup>
import { CoreDot } from '@/model/entity/CoreDot'
import { TimeUnit } from 'typescript-util'
import { reactive } from 'vue'
import { AddPointContext } from '../context/AddPointContext'
import { DotTypeOption } from '../context/VideoEditorContext'
import IconLabel from './IconLabel'

const props = defineProps({
    currentPlayTime: {
        type: Number,
        default: 0,
    },
})

const emits = defineEmits<{
    (event: 'submit', data: CoreDot): void
}>()

const context = reactive(new AddPointContext())

function formSubmit() {
    emits('submit', context.formData)
    context.formData = AddPointContext.formDataDefault()
}

</script>

<template>
<!-- 编辑器工具栏 -->
<el-menu :default-active="context.currentType" mode="horizontal" @select="(t) => context.onMenuSelect(t)">
    <el-menu-item v-for="item in DotTypeOption" :key="item.type" :index="item.type">
        <IconLabel :icon="item.icon" :label="item.label" />
    </el-menu-item>
</el-menu>

<!-- 新增 模态框 -->
<el-dialog
    v-model="context.formIsShow"
    append-to-body
    close-on-click-modal
    destroy-on-close
    draggable
    lock-scroll
    modal
    title="新增打点"
    width="45%">

    <el-tabs v-model="context.currentType" stretch tab-position="left">
        <el-form :model="context.formData" label-suffix=":" label-width="100px">

            <el-form-item label="标签">
                <el-input v-model="context.formData.label" placeholder="标签"></el-input>
            </el-form-item>

            <el-form-item label="开始时间">

            </el-form-item>

            <el-form-item label="结束时间">

            </el-form-item>

            <el-form-item label="时间">
                <div class="select-play-time">
                    <slot class="schedule" name="header"></slot>
                    <div class="display">{{ TimeUnit.SECOND.display(currentPlayTime) }}</div>
                </div>
            </el-form-item>
        </el-form>

        <!-- SLOT -->
        <div>
            <slot :config="context.formData.config" name="configForm"></slot>
        </div>
    </el-tabs>

    <div slot="footer" class="drawer-body-footer" style="display: flex; justify-content: right">
        <el-button @click="context.close()">取 消</el-button>
        <el-button type="primary" @click="formSubmit()">
            {{ context.formIsLoading ? '提交中 ...' : '确 定' }}
        </el-button>
    </div>
</el-dialog>
</template>

<style lang="sass" scoped>
.select-play-time
    width: 100%
    display: flex
    align-items: stretch

    .display
        flex: 0 1 120px

</style>

<style lang="sass">
.select-play-time
    .progress-bar
        margin-top: 15px
</style>
