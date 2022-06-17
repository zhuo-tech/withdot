<script lang="ts" setup>
import CrudPagination from '@/components/CrudPagination/CrudPagination'
import { SysRole } from '@/model/entity/SysRole'
import { useModalForm } from '@/tool/hooks/useModalForm'
import { useTableList } from '@/tool/hooks/useTableList'
import { CirclePlusFilled, Delete, Edit, Refresh, Search, Warning } from '@element-plus/icons-vue'
import { FormInstance } from 'element-plus'
import { ref, Ref } from 'vue'
import { request } from './SysRuleRequest'

/**
 * Rule
 * @date 2022-04-27 下午 02:59
 * @@author DNN
 **/
const formRef: Ref<FormInstance> = ref({} as any)

const table = useTableList<SysRole>(request)
const modalForm = useModalForm<SysRole>(formRef, request, {submitComplete: () => table.getPageList()})
const {isLoading, queryIsShow} = table
const {formData, formIsLoading, formIsAdd, isShow} = modalForm

const permissionOption = ref<Array<{ key: string, label: string }>>([])
request.getAllPerList().then(list => permissionOption.value = list)

const formRule: FormValidationRules<SysRole> = {
    label: [{type: 'string', max: 128, min: 1, message: '不能为空, 最多128字符', trigger: 'blur', required: true}],
    name: [{type: 'string', max: 128, min: 1, message: '不能为空, 最多128字符', trigger: 'blur', required: true}],
    permissions: [{type: 'array', message: '不能为空, 最多128字符', trigger: 'blur', required: true}],
}
</script>

<template>
<el-card class="box-card" header="角色管理">
    <!-- 搜索区域 & 功能按钮 -->
    <el-row justify="end" type="flex">
        <el-collapse-transition>
            <el-col v-show="queryIsShow">
                <el-form ref="queryFormRef" :model="table.queryData" inline label-width="80px">
                    <el-form-item>
                        <el-input v-model="table.queryData.name" clearable placeholder="角色编码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="table.queryData.label" clearable placeholder="角色名称"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button :icon="Search" type="primary" @click="table.getPageList"></el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-collapse-transition>
        <el-col :span="12">
            <el-row justify="end" type="flex">
                <el-button :icon="CirclePlusFilled" type="primary" @click="modalForm.showModel(true)">新建</el-button>
                <el-button :icon="Search" type="primary" @click="table.toggleQueryForm()" />
                <el-button v-loading="isLoading"
                           :disabled="isLoading"
                           :icon="Refresh"
                           type="primary"
                           @click="table.getPageList"></el-button>
            </el-row>
        </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table v-loading="isLoading" :data="table.page.list" fit row-key="_id" show-header stripe style="width: 100%">
        <el-table-column align="center" label="序号" type="index" width="60" />
        <el-table-column align="left" label="角色名称" min-width="100" prop="name" />
        <el-table-column align="left" label="角色编码" min-width="100" prop="name" />
        <el-table-column align="left" label="描述" min-width="200" prop="description" />
        <el-table-column align="left" label="权限" min-width="400" prop="permission">
            <template v-slot="{row}">
                <el-tag v-for="({label, name}, index) in row.permission" :key="index + name" class="lower-right-margin">
                    {{ label }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createTime" width="180" />
        <el-table-column align="center" label="更新时间" prop="updateTime" width="180" />
        <el-table-column align="center" fixed="right" label="操作" prop="Operate" width="180">
            <template v-slot="{row}">
                <el-button :icon="Edit" link @click="modalForm.showModel(false, row)">编辑</el-button>
                <el-divider direction="vertical" />
                <el-popconfirm :icon="Warning"
                               cancel-button-text="手滑了"
                               confirm-button-text="确认删除"
                               icon-color="red"
                               title=" 操作无法撤销, 确定要删除吗 ？"
                               @confirm="table.execDelete(row)">
                    <template #reference>
                        <el-button :icon="Delete" link>删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <CrudPagination :service="table" style="padding-top: 20px" />

    <!--  编辑抽屉 -->
    <el-dialog
        v-model="isShow"
        append-to-body
        close-on-click-modal
        destroy-on-close
        draggable
        lock-scroll
        modal
        title=""
        width="45%">
        <el-form ref="formRef"
                 v-loading="formIsLoading"
                 :model="modalForm.formData"
                 :rules="formRule"
                 label-width="140px"
                 style="max-width: 1000px">

            <el-form-item label="角色编码" prop="name">
                <el-input v-model="formData.name" :disabled="!formIsAdd" clearable placeholder="权限编码" />
            </el-form-item>
            <el-form-item label="角色名称" prop="label">
                <el-input v-model="formData.label" clearable placeholder="权限名称" />
            </el-form-item>

            <el-form-item label="描述" prop="description">
                <el-input v-model="formData.description" :rows="{min: 4, max: 10}" type="textarea" />
            </el-form-item>

            <el-form-item label="权限" prop="permissions">
                <el-transfer
                    v-model="formData.permissions"
                    :data="permissionOption"
                    :titles="['未选择', '已选择']"
                    filter-placeholder=""
                    filterable />
            </el-form-item>

        </el-form>

        <div slot="footer" class="drawer-body-footer" style="padding-left: 30px">
            <el-button @click="modalForm.close">取 消</el-button>
            <el-button :loading="formIsLoading" type="primary" @click="modalForm.submit">
                {{ formIsLoading ? '提交中 ...' : '确 定' }}
            </el-button>
        </div>
    </el-dialog>

</el-card>
</template>

<style lang="sass" scope>
.lower-right-margin
    margin-right: 10px
    margin-bottom: 10px
</style>
