<script lang="ts" setup>
import VideoEditor from '@/components/VideoEditor/VideoEditor.vue'
import WorkBaseForm from '@/pages/works/components/WorkBaseForm.vue'
import { WorkEditorContext } from '@/pages/works/WorkEditorContext'
import { ArrowLeft } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const context = reactive(new WorkEditorContext(useRoute().params.id as string))

const router = useRouter()
</script>

<template>
<el-card v-loading="context.workDataIsLoading" class="page-wrapper">
    <el-page-header :icon="ArrowLeft" @back="() => router.back()">
        <template #content>
            <h1>{{ context.workData.name }}
                <WorkBaseForm :data="context.workData" />
            </h1>
        </template>
    </el-page-header>

    <div class="content-area">
        <VideoEditor :data="context.workData" />
    </div>
</el-card>

</template>

<style lang="sass" scoped>
.page-wrapper
    min-height: 60vh
    width: 100%
    max-width: 1600px
    margin: 0 auto

.content-area
    padding-top: 20px
</style>
