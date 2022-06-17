<script lang="ts" setup>
import CrudPagination from '@/components/CrudPagination/CrudPagination'
import { getLogger } from '@/main'
import DialogForm from './components/Form.vue'
import QueryForm from './components/QueryForm.vue'
import { Delete, Edit, Warning } from '@element-plus/icons-vue'
import { reactive, toRefs } from 'vue'
import WxAccountService from './WxAccountService'

const log = getLogger('素材管理')
const service = reactive(new WxAccountService())

const {tableIsLoading} = toRefs(service)
const {page, rowKey, readyEdit, readyDelete, listUpdate} = service

listUpdate()
</script>

<template>
<el-card class="box-card">
    <template #header>
        <div class="card-header">
            <h1>账号管理</h1>
        </div>
    </template>

    <!-- 搜索区域 & 功能按钮 -->
    <QueryForm :service="service" />
    <!-- 表格 -->
    <el-table v-loading="tableIsLoading" :data="page.list" :row-key="rowKey" fit show-header stripe style="width: 100%">
        <el-table-column align="center" label="序号" type="index" width="60" />
        <el-table-column align="left" label="公众号名称" min-width="100" prop="name" />
        <el-table-column align="left" label="账号" min-width="100" prop="account" />
        <el-table-column align="left" label="AppID" min-width="100" prop="appid" />
        <el-table-column align="left" label="AppSecret" min-width="100" prop="appSecret" />
        <el-table-column align="left" label="URL" min-width="100" prop="url" />
        <el-table-column align="left" label="token" min-width="100" prop="token" />
        <el-table-column align="left" label="加密密钥" min-width="100" prop="aesKey" />
        <el-table-column align="left" label="二维码图片" min-width="100" prop="qrUrl" >
            <template v-slot="{row}">
                <el-image :src="row.qrUrl" fit="cover"/>
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
    <DialogForm :service="service" />

</el-card>
</template>
