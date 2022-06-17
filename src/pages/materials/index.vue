<script lang="ts" setup>
import CrudPagination from '@/components/CrudPagination/CrudPagination'
import ShowFile from '@/components/Upload/ShowFile'
import { getLogger } from '@/main'
import MaterialDialogForm from '@/pages/materials/components/MaterialDialogForm.vue'
import MaterialQuery from '@/pages/materials/components/MaterialQuery'
import { Delete, Edit, Warning } from '@element-plus/icons-vue'
import { StorageUnit } from 'typescript-util'
import { reactive, toRefs } from 'vue'
import MaterialService from './MaterialService'

const log = getLogger('素材管理')
const service = reactive<MaterialService>(new MaterialService())

const {tableIsLoading} = toRefs(service)
const {page, rowKey, readyEdit, readyDelete, listUpdate} = service

service.showQuery = true

listUpdate()
</script>

<template>
<el-card class="box-card">
    <template #header>
        <div class="card-header">
            <h1>素材管理</h1>
        </div>
    </template>

    <!-- 搜索区域 & 功能按钮 -->
    <MaterialQuery :service="service" />
    <!-- 表格 -->
    <el-table v-loading="tableIsLoading" :data="page.list" :row-key="rowKey" fit show-header stripe style="width: 100%">
        <el-table-column align="center" label="序号" type="index" width="60" />
        <el-table-column align="left" label="标题" min-width="100" prop="title" />
        <el-table-column align="center" label="预览" min-width="160">
            <template v-slot="{row}">
                <ShowFile :file="row.file" style="height: 50px; margin: 0 auto;" />
            </template>
        </el-table-column>
        <el-table-column align="right" label="大小" prop="size" width="180">
            <template v-slot="{row}">
                <span>{{ StorageUnit.displayName(row.file?.size) }}</span>
            </template>
        </el-table-column>
        <el-table-column align="left" label="标签" min-width="160" prop="tag">
            <template v-slot="{row}">
                <el-tag v-for="(tag, index) in row.tag" :key="index" type="success">{{ tag }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column align="center" label="上传时间" prop="createTime" width="180">
            <template v-slot="{row}">
                {{ new Date(row.createTime).toLocaleString() }}
            </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" prop="Operate" width="180">
            <template v-slot="{row}">
                <el-button :icon="Edit" link @click="readyEdit(row)">编辑</el-button>
                <el-divider direction="vertical" />
                <el-popconfirm :icon="Warning"
                               cancel-button-text="手滑了"
                               confirm-button-text="确认删除"
                               icon-color="red"
                               title=" 操作无法撤销, 确定要删除吗 ？"
                               @confirm="readyDelete(row)">
                    <template #reference>
                        <el-button :icon="Delete" link>删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <CrudPagination :service="service" style="padding-top: 20px" />
    <!--  编辑抽屉 -->
    <MaterialDialogForm :service="service" />

</el-card>
</template>
