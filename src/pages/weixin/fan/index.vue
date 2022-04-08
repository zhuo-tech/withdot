<script lang="ts" setup>
import QueryForm from './components/QueryForm.vue'
import DialogForm from './components/Form.vue'
import CrudPagination from '@/components/CrudPagination/CrudPagination' //分页器
import { Delete, Edit, Warning } from '@element-plus/icons-vue'
import { reactive, toRefs } from 'vue'
import WxFanService from './WxFanService'

const service = reactive(new WxFanService())
const {tableIsLoading} = toRefs(service)
const {page, rowKey, readyEdit, readyDelete, listUpdate} = service

listUpdate()
</script>
<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <h1>粉丝管理</h1>
            </div>
        </template>

        <!-- 搜索区域 & 功能按钮 -->
        <QueryForm :service="service" />

        <el-table v-loading="tableIsLoading" :data="page.list" :row-key="rowKey" fit show-header stripe style="width: 100%">
            <el-table-column align="center" label="序号" type="index" width="60" />
            <el-table-column align="left" label="主键" min-width="100" prop="_id" />
            <el-table-column align="left" label="公众号" min-width="100" prop="wxAccountName" />
            <el-table-column align="left" label="用户标识" min-width="100" prop="openid" />
            <el-table-column align="left" label="昵称" min-width="100" prop="nickname" />
            <el-table-column align="left" label="备注" min-width="100" prop="remark" />
            <el-table-column align="left" label="分组" min-width="100" prop="token" />
            <el-table-column align="left" label="订阅状态" min-width="100" prop="subscribeStatus">
                <template v-slot="{row}">
                    <div>
                        <span v-if="row.subscribeStatus===0">未关注</span>
                        <span v-else>已关注</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="left" label="订阅时间" min-width="100" prop="subscribeTime" />
            <el-table-column align="center" fixed="right" label="操作" prop="Operate" width="180">
                <template v-slot="{row}">
                    <el-button :icon="Edit" type="text" @click="readyEdit(row)">编辑</el-button>
                    <el-divider direction="vertical" />
                    <el-popconfirm :icon="Warning"
                                   cancel-button-text="手滑了"
                                   confirm-button-text="确认删除"
                                   icon-color="red"
                                   title=" 操作无法撤销, 确定要删除吗 ？"
                                   @confirm="readyDelete(row)">
                        <template #reference>
                            <el-button :icon="Delete" type="text">删除</el-button>
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
<style lang="less" scoped>
</style>
