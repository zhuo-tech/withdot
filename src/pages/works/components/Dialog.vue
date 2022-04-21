<script lang="ts" setup>
import { addWork, materialList } from '@/api/works'
import { filterTime } from '@/utils/utils'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'

const props = defineProps({
    subassembly: {
        type: Object,
        required: true,
    },                             //父组件传值参数  显示隐藏(visible)  抽屉名称(title)
    getListData: {
        type: Function,
    },
})

let form = reactive({
    name: '',
    title: '',
    materialId: '',
})
const checkIndex = ref()
const list = ref()
const page = reactive({
    current: 1,
    pageSize: 5,
})
const rules = reactive({
    name: [
        {required: true, message: '请输入作品名称', trigger: 'blur'},
        {min: 3, max: 10, message: '字符应该在3到10', trigger: 'blur'},
    ],
    materialId: [
        {required: true, message: '请选择一个视频素材', trigger: 'change'},
    ],
})
const ruleFormRef = ref<FormInstance>()
const getMaterialList = () => {
    materialList(page).then(response => {
        list.value = response
    }).catch(err => {
            ElMessage.error(err)
        },
    )
}

const checkMaterial = (index: number, item: any) => {
    checkIndex.value = index
    form.title = item.title
    form.materialId = item._id
}
const initialization = () => {
    props.subassembly.visible = false
    page.current = 1
    form.name = ''
    form.title = ''
    form.materialId = ''
    checkIndex.value = null
}

const submit = async () => {
    if (!ruleFormRef.value) {
        return
    }
    await ruleFormRef.value.validate((valid, fields) => {
        if (!valid) {
            ElMessage.error('请按要求填写表单')
            return
        }
        addWork(form)
        setTimeout(() => {
            props.subassembly.visible = false
            ElMessage.success('作业添加成功')
            initialization()
        }, 1000)
        props.getListData?.()
    })
}
const initForm = () => {
    form.name = ''
    form.title = ''
    form.materialId = ''
}

const currentPageChange = (val: any) => {
    page.current = val
    getMaterialList()

}
const handleCurrentChange = (res: any) => {
    form.title = res.title
    form.materialId = res._id
}
getMaterialList()
</script>

<template>
    <el-dialog v-model="subassembly.visible"
               :title="subassembly.title"
               destroy-on-close width="40%"
               @close="initForm">
        <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="0">
            <el-form-item prop="name">
                <el-input v-model="form.name" placeholder="请输入作品名称" />
            </el-form-item>
            <el-form-item prop="materialId">
                <el-table
                    ref="multipleTableRef"
                    :data="list.list"
                    highlight-current-row
                    style="width: 100%"
                    @current-change="handleCurrentChange">
                    <el-table-column type="index" width="55" />
                    <el-table-column label="标题" prop="title" width="400" />
                    <el-table-column label="创建时间" min-width="200">
                        <template #default="scope">{{ filterTime(scope.row.createTime) }}</template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-row justify="end" style="padding-top: 20px" type="flex">
                <el-col :span="6">
                    <el-row justify="end" type="flex">
                        <el-pagination :current-page="page.current"
                                       :page-size="page.pageSize"
                                       :total="list.total"
                                       background layout="prev, pager, next"
                                       small
                                       @current-change="currentPageChange" />
                    </el-row>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="initialization">取消</el-button>
            <el-button type="primary" @click="submit">确认</el-button>
        </span>
        </template>
    </el-dialog>
</template>

<style lang="less" scoped>
</style>
