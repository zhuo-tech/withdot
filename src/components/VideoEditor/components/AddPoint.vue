<script lang="ts" setup>
import IconLabel from '@/components/IconLabel/IconLabel'
import { CoreDot } from '@/model/entity/CoreDot'
import { DotDisplayTypeShow } from '@/model/entity/Dot/DotDisplayType'
import { ObjectUtil, TimeUnit } from 'typescript-util'
import { reactive } from 'vue'
import { AddPointContext } from '../context/AddPointContext'
import { DotTypeOption } from '../context/VideoEditorContext'
import DotConfigForm from './DotConfigForm'

const props = defineProps({
    currentPlayTime: {
        type: Number,
        default: 0,
    },
})

const emits = defineEmits<{
    (event: 'submit', data: CoreDot): void
}>()

const context = reactive(new AddPointContext(props, emits))

</script>

<template>
<!-- 编辑器工具栏 -->
<slot :add="context.onMenuSelect" :edit="(dot: CoreDot) => context.editEcho(dot)">
    <el-menu :default-active="context.formData.type" mode="horizontal" @select="(t) => context.onMenuSelect(t)">
        <el-menu-item v-for="item in DotTypeOption" :key="item.type" :index="item.type">
            <IconLabel :icon="item.icon" :label="item.label" />
        </el-menu-item>
    </el-menu>
</slot>

<!-- 新增 模态框 -->
<el-dialog
    v-model="context.formIsShow"
    :append-to-body="true"
    close-on-click-modal
    destroy-on-close
    draggable
    lock-scroll
    modal
    title="新增打点"
    width="45%">

    <el-form :ref="el => context.formRef = el" :model="context.formData" :rules="context.formRule" label-suffix=":" label-width="100px">

        <el-form-item label="标签" prop="label">
            <el-input v-model="context.formData.label" placeholder="标签"></el-input>
        </el-form-item>

        <el-form-item label="默认展示" prop="display">
            <el-radio-group v-model="context.formData.display">
                <el-radio-button v-for="kv in ObjectUtil.toArray(DotDisplayTypeShow)"
                                 :key="kv.value"
                                 :label="kv.value">{{ kv.key }}
                </el-radio-button>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="时间">
            <div class="select-play-time">
                <div class="display">{{ TimeUnit.SECOND.display(context.isAdd ? currentPlayTime : context.formData.start) }}</div>
            </div>
        </el-form-item>

        <el-form-item label-width="0px" prop="config">
            <DotConfigForm v-model:value="context.formData.config" :type="context.formData.type" />
        </el-form-item>
    </el-form>

    <div slot="footer" class="drawer-body-footer" style="display: flex; justify-content: right">
        <el-button @click="context.close()">取 消</el-button>
        <el-button type="primary" @click="context.submit()">
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
