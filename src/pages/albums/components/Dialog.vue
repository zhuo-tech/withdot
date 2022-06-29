<script lang="ts" setup>
import { addWorkToAlbums, workList } from '@/api/works'
import EditService from '@/pages/albums/hooks/editService'
import { filterTime } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'

const props = defineProps({
    subassembly: {
        type: Object,
        required: true,
    },                             //父组件传值参数  显示隐藏(visible)  抽屉名称(title)
    getAlbumsList: {
        type: Function,
    },
    service: {
        type: [EditService, Object],
        required: true,
    },
    alreadyWorkList: {
        type: Array,
    },
})

const formIsLoading = ref(false)
const emits = defineEmits(['getNewList'])
const form: { workId: Array<string> } = reactive({
    workId: [],
})
const checkIndex = ref()
const list = ref()
const page = reactive({
    current: 1,
    pageSize: 5,
    total: 100,
})
const getMaterialList = () => {
    let _idList = props.alreadyWorkList?.map((item: any) => item._id) ?? []
    workList(page, _idList).then(response => {
        page.total = response?.total as number
        list.value = response?.list
    }).catch((err: string) => {
            ElMessage.error(err)
        },
    )
}

const initialization = () => {
    props.subassembly.visible = false
    page.current = 1
    form.workId = []
    checkIndex.value = null
}

const submit = async () => {
    if ((form.workId as Array<String>).length <= 0) {
        ElMessage.error('请选择添加的作品')
        return
    }
    formIsLoading.value = true
    const _id = props.service.getUrl_Id()
    await addWorkToAlbums(form, _id)
    setTimeout(() => {
        ElMessage.success('作品添加成功')
        props.subassembly.visible = false
        formIsLoading.value = false
        emits('getNewList')
        initialization()
    }, 1000)

}
const currentPageChange = (val: any) => {
    page.current = val
    getMaterialList()
}
const handleSelectionChange = (checkList: any) => {
    form.workId = []
    checkList.forEach((item: any) => {
        form.workId.push(item._id)
    })
}
getMaterialList()
</script>

<template>
    <el-dialog v-model="subassembly.visible"
               title="添加作品" width="40%"
               @open="getMaterialList">
        <el-table
            ref="multipleTableRef"
            :data="list"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column label="作品名称" property="name" width="120" />
            <el-table-column label="创建时间" min-width="200" prop="createTime">
                <template #default="{row}">
                    {{ filterTime(row.createTime) }}
                </template>
            </el-table-column>
        </el-table>
        <el-row justify="end" style="padding-top: 20px" type="flex">
            <el-col :span="6">
                <el-row justify="end" type="flex">
                    <el-pagination :current-page="page.current"
                                   :page-size="page.pageSize"
                                   :total="page.total"
                                   background layout="prev, pager, next"
                                   small
                                   @current-change="currentPageChange" />
                </el-row>
            </el-col>
        </el-row>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="initialization">取消</el-button>
            <el-button :loading="formIsLoading" type="primary" @click="submit">
                {{ formIsLoading ? '提交中 ...' : '确 定' }}
            </el-button>
        </span>
        </template>
    </el-dialog>
</template>

<style lang="less" scoped>
</style>
