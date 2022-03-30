<script lang="ts" setup>
import { Search, CirclePlusFilled, Edit, Delete, Refresh, Warning } from '@element-plus/icons-vue'
import { onMounted, reactive } from 'vue'
import MaterialService from './MaterialService'

const service = reactive<MaterialService>(new MaterialService())
onMounted(service.listUpdate)

</script>

<template>
<el-card class="box-card">
    <template #header>
        <div class="card-header">
            <h1>素材管理</h1>
        </div>
    </template>

    <!-- 搜索区域 & 功能按钮 -->
    <el-row justify="end" type="flex">
        <el-col v-if="service.showQuery">
            <el-form ref="queryFormRef" :model="service.queryData" inline label-width="80px">
                <el-form-item>
                    <el-input v-model="service.queryData.title" clearable placeholder="标题" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="service.queryData.tag" clearable placeholder="标签" />
                </el-form-item>
                <el-form-item>
                    <el-button :icon="Search" type="primary" @click="service.queryFormSubmit" />
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="6">
            <el-row justify="end" type="flex">
                <el-button :icon="CirclePlusFilled" type="primary" @click="service.readyAdd">新增</el-button>
                <el-button :icon="Search" type="primary" @click="service.showQuery = !service.showQuery" />
                <el-button v-loading="service.tableIsLoading"
                           :disabled="service.tableIsLoading"
                           :icon="Refresh"
                           type="primary"
                           @click="service.listUpdate" />
            </el-row>
        </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table v-loading="service.tableIsLoading" :data="service.page.list" :row-key="service.rowKey" fit show-header stripe style="width: 100%">
        <el-table-column align="center" label="序号" prop="index" width="60" />
        <el-table-column align="center" label="标题" min-width="180" prop="title" />
        <el-table-column align="center" label="预览" prop="href" width="180" />
        <el-table-column align="center" label="大小" prop="size" width="180" />
        <el-table-column align="center" label="标签" min-width="180" prop="tag" />
        <el-table-column align="center" label="上传时间" prop="createTime" width="180" />
        <el-table-column align="center" fixed="right" label="操作" prop="Operate" width="180">
            <template v-slot="{row}">
                <el-button :icon="Edit" type="text" @click="service.readyEdit(row)">编辑</el-button>
                <el-divider direction="vertical" />
                <el-popconfirm :icon="Warning"
                               cancel-button-text="手滑了"
                               confirm-button-text="确认删除"
                               icon-color="red"
                               title=" 操作无法撤销, 确定要删除吗 ？">
                    <template #reference>
                        <el-button :icon="Delete" type="text" @click="service.readyDelete(row)">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row justify="end" style="padding-top: 20px" type="flex">
        <el-col :span="6">
            <el-row justify="end" type="flex">
                <el-pagination
                    :current-page="service.page.current"
                    :page-size="service.page.size"
                    :page-sizes="[10, 20, 50, 100]"
                    :total="service.page.total"
                    layout="total, sizes, prev, pager, next"
                    @size-change="service.pageSizeChange"
                    @current-change="service.currentPageChange">
                </el-pagination>
            </el-row>
        </el-col>
    </el-row>

    <!--  编辑抽屉 -->
    <el-dialog
        ref="dialogRef"
        v-model="service.isShow"
        :title="service.formIsAdd ? '新增' : '编辑' "
        append-to-body
        close-on-click-modal
        destroy-on-close
        draggable
        lock-scroll
        modal
        width="45%">
        <el-form ref="formRef"
                 v-loading="service.formIsLoading"
                 :model="service.formData"
                 :rules="service.formRule"
                 label-width="140px"
                 style="max-width: 1000px">

            <el-form-item label="标题" prop="title">
                <el-input v-model="service.formData.title" placeholder="" />
            </el-form-item>

            <el-form-item label="标签" prop="tag">
                <el-input v-model="service.formData.tag" :autosize="{ minRows: 5, maxRows: 20 }" placeholder="" type="textarea" />
            </el-form-item>

        </el-form>

        <div slot="footer" class="drawer-body-footer" style="padding-left: 30px">
            <el-button @click="service.close">取 消</el-button>
            <el-button :loading="service.formIsLoading" type="primary" @click="service.formSubmit">
                {{ service.formIsLoading ? '提交中 ...' : '确 定' }}
            </el-button>
        </div>
    </el-dialog>

</el-card>
</template>

<style lang="less" scoped>
</style>
