<script lang="ts" setup>
import CrudPagination from '@/components/CrudPagination/CrudPagination'
import ShowFile from '@/components/Upload/ShowFile'
import { getLogger } from '@/main'
import { Delete, Edit, Warning } from '@element-plus/icons-vue'
import goodsorderform from '@/components/pay/goodsorderform.vue'

const log = getLogger('支付渠道')

</script>

<template>
<el-card class="box-card">
    <template #header>
        <div class="card-header">
            <h1>商品订单</h1>
        </div>
    </template>
    <goodsorderform/>
</el-card>
</template>
