<script lang="ts" setup>
import CrudPagination from '@/components/CrudPagination/CrudPagination'
import MaterialDialogForm from '@/pages/materials/components/MaterialDialogForm.vue'
import MaterialQuery from '@/pages/materials/components/MaterialQuery'
import MaterialService from '@/pages/materials/MaterialService'
import { FolderOpened } from '@element-plus/icons-vue'
import { onMounted, reactive } from 'vue'

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
onMounted(service.listUpdate)

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

    <!-- TODO: list 或者 table 展示 & 选择 -->
    <div style="min-height: 600px">
        <div v-for="(item, index) in service.page.list" :key="index" style="margin: 15px; color: #f478e3">
            {{ item }}
        </div>
    </div>

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
