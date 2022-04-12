<script lang="ts" setup>
import CrudPagination from '@/components/CrudPagination/CrudPagination'
import ShowFile from '@/components/Upload/ShowFile'
import { getLogger } from '@/main'
import { Delete, Edit, Warning } from '@element-plus/icons-vue'
import transaction from '@/components/pay/transaction.vue'

const log = getLogger('交易订单')

</script>

<template>
<el-card class="box-card">
    <template #header>
        <div class="card-header">
            <h1>交易订单</h1>
        </div>
    </template>
    <transaction/>
</el-card>
</template>
