<script lang="ts" setup>
import CrudPagination from '@/components/CrudPagination/CrudPagination'
import ShowFile from '@/components/Upload/ShowFile'
import { getLogger } from '@/main'
import { Delete, Edit, Warning } from '@element-plus/icons-vue'

const log = getLogger('支付通知')

</script>

<template>
<el-card class="box-card">
    <template #header>
        <div class="card-header">
            <h1>支付通知</h1>
        </div>
    </template>
</el-card>
</template>
