<script lang="ts" setup>
import CrudPagination from '@/components/CrudPagination/CrudPagination'
import ShowFile from '@/components/Upload/ShowFile'
import { getLogger } from '@/main'
import { Delete, Edit, Warning } from '@element-plus/icons-vue'
import paychannel from '@/components/pay/paychannel.vue'

const log = getLogger('支付渠道')

</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <h1>支付渠道</h1>
            </div>
        </template>
           <paychannel/>
    </el-card>
</template>