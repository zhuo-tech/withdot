<script lang="ts" setup>
import AlbumsService from '@/pages/albums/AlbumsService'

const props = defineProps<{
    service: AlbumsService
}>()

</script>
<template>
    <el-dialog
        v-model="service.formStates.isShow"
        append-to-body
        close-on-click-modal
        destroy-on-close
        draggable
        lock-scroll
        modal
        title="创建新专辑"
        width="45%">
        <el-form :ref="el => service.addFormRef = el"
                 v-loading="service.addFormData.addFormIsLoading"
                 :model="service.addFormData"
                 :rules="service.rules">

            <el-form-item label="专辑名称" prop="name">
                <el-input v-model="service.addFormData.name"></el-input>
            </el-form-item>

        </el-form>

        <template #footer>
            <span class="dialog-footer">
              <el-button @click="service.addFormCancel()">取消</el-button>
              <el-button type="primary" @click="service.addFormDefine()">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
