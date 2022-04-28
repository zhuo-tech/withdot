<script lang="ts" setup>
import CrudPagination from '@/components/CrudPagination/CrudPagination'
import ShowFile from '@/components/Upload/ShowFile'
import UploadFile from '@/components/Upload/UploadFile.vue'
import { SysAdmin } from '@/model/entity/SysAdmin'
import { SysRole } from '@/model/entity/SysRole'
import { request } from '@/pages/system/admin/SysAdminRequest'
import { useModalForm } from '@/tool/hooks/useModalForm'
import { useTableList } from '@/tool/hooks/useTableList'
import { CirclePlusFilled, Delete, Edit, Refresh, Search, Warning } from '@element-plus/icons-vue'
import { FormInstance } from 'element-plus'
import { ref, Ref } from 'vue'

/**
 * Admin
 * @date 2022-04-27 下午 02:58
 * @author DNN
 **/
const formRef: Ref<FormInstance> = ref({} as any)

const table = useTableList<SysAdmin>(request)
const modalForm = useModalForm<SysAdmin>(formRef, request, {submitComplete: () => table.getPageList()})
const {isLoading, queryIsShow} = table
const {formData, formIsLoading, formIsAdd, isShow} = modalForm

const roleList = ref<Array<SysRole>>([])
request.getAllRole().then(list => roleList.value = list)

</script>

<template>
<el-card class="box-card" header="管理员账号">
    <!-- 搜索区域 & 功能按钮 -->
    <el-row justify="end" type="flex">
        <el-collapse-transition>
            <el-col v-show="queryIsShow">
                <el-form ref="queryFormRef" :model="table.queryData" inline label-width="80px">
                    <el-form-item>
                        <el-input v-model="table.queryData.name" clearable placeholder="姓名"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button :icon="Search" type="primary" @click="table.getPageList"></el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-collapse-transition>
        <el-col :span="12">
            <el-row justify="end" type="flex">
                <el-button :icon="CirclePlusFilled" type="primary" @click="modalForm.showModel(true)">新建账号</el-button>
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
        <el-table-column align="left" label="登录账号" min-width="100" prop="username" />
        <el-table-column align="left" label="头像" prop="avatar" width="130">
            <template v-slot="{row}">
                <ShowFile :href="row.avatar" />
            </template>
        </el-table-column>
        <el-table-column align="left" label="姓名" min-width="100" prop="name" />
        <el-table-column align="left" label="角色" min-width="200" prop="roles" />
        <el-table-column align="left" label="权限" min-width="400" prop="permission">
            <template v-slot="{row}">
                <el-tag v-for="({label, name}, index) in row.permission" :key="index + name" class="lower-right-margin">
                    {{ label }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="created_at" width="180" />
        <el-table-column align="center" label="更新时间" prop="updated_at" width="180" />
        <el-table-column align="center" fixed="right" label="操作" prop="Operate" width="180">
            <template v-slot="{row}">
                <el-button :icon="Edit" type="text" @click="modalForm.showModel(false, row)">编辑</el-button>
                <el-divider direction="vertical" />
                <el-popconfirm :icon="Warning"
                               cancel-button-text="手滑了"
                               confirm-button-text="确认删除"
                               icon-color="red"
                               title=" 操作无法撤销, 确定要删除吗 ？"
                               @confirm="table.execDelete(row)">
                    <template #reference>
                        <el-button :icon="Delete" type="text">删除</el-button>
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
                 :rules="{}"
                 label-width="140px"
                 style="max-width: 1000px">

            <el-form-item label="登录账号" prop="username">
                <el-input v-model="formData.username" :disabled="!formIsAdd" clearable placeholder="登录账户"></el-input>
            </el-form-item>

            <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name" clearable placeholder="姓名"></el-input>
            </el-form-item>

            <el-form-item label="头像" prop="avatar">
                <UploadFile v-model:href="formData.avatar"
                            :drag="true"
                            :limit="1"
                            listType="picture" />
            </el-form-item>

            <el-form-item label="角色" prop="roles">
                <el-select v-model="formData.roles" clearable multiple placeholder="选择角色">
                    <el-option v-for="(rule, index) in roleList" :key="index" :label="rule.label" :value="rule.name" />
                </el-select>
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
