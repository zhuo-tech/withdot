<script lang="ts" setup>
import CrudPagination from '@/components/CrudPagination/CrudPagination'
import { getLogger } from '@/main'
import CoreMaterial from '@/model/entity/CoreMaterial'
import { FileInfo } from '@/model/FileInfo'
import { FileType } from '@/model/FileType'
import MaterialDialogForm from '@/pages/materials/components/MaterialDialogForm.vue'
import MaterialQuery from '@/pages/materials/components/MaterialQuery'
import ShowMaterial from '@/pages/materials/components/ShowMaterial'
import MaterialService from '@/pages/materials/MaterialService'
import { FolderOpened } from '@element-plus/icons-vue'
import { onMounted, reactive } from 'vue'

const props = defineProps<{
    id?: string
    material?: CoreMaterial
    file?: FileInfo
    href?: string
}>()

const emit = defineEmits<{
    (event: 'update:id', id: string): void
    (event: 'update:material', material: CoreMaterial): void
    (event: 'update:file', file: FileInfo): void
    (event: 'update:href', href: string): void
}>()

const log = getLogger('SelectMaterialModel')
const controlShow = reactive({
    isShow: false,
    show() {
        this.isShow = true
    },
    close() {
        this.isShow = false
    },
})

const service = reactive(new MaterialService())
service.showQuery = true
service.queryData.type = FileType.IMAGE

onMounted(service.listUpdate)

const onSelect = (item: CoreMaterial, index: number) => {
    log.info('选择 =>',{item, index})

    emit('update:id', item._id)
    emit('update:file', item.file)
    emit('update:href', item.href)
    emit('update:material', item)

    controlShow.close()
}
</script>

<template>
<!-- 触发器 -->
<slot>
    <el-button :icon="FolderOpened" type="primary" @click="controlShow.show()">选择素材</el-button>
</slot>

<el-dialog
    v-model="controlShow.isShow"
    append-to-body
    close-on-click-modal
    destroy-on-close
    draggable
    lock-scroll
    modal
    title="选择素材"
    width="50%">

    <MaterialQuery :service="service" />
    <ShowMaterial :list="service.page.list"
                  :query-type="service.queryData.type"
                  :select="onSelect"
                  style="min-height: 500px" />
    <CrudPagination :service="service" />
    <MaterialDialogForm :service="service" />

    <span slot="footer" class="dialog-footer">
        <el-button @click="controlShow.close()">取 消</el-button>
        <el-button type="primary" @click="controlShow.close()">确 定</el-button>
    </span>
</el-dialog>
</template>

<style scoped>

</style>
