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
    title: [
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
const lastPage = () => {
    if (page.current > 1) {
        page.current--
        getMaterialList()
    }
}
const nextPage = () => {
    if (list.value.current * list.value.pageSize < list.value.total) {
        page.current++
        getMaterialList()
    }
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
    form.name=''
    form.title=''
    form.materialId = ''
}
getMaterialList()
</script>

<template>
    <el-dialog v-model="subassembly.visible" :title="subassembly.title" destroy-on-close width="40%" @close="initForm">
        <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="0">
            <el-form-item prop="name">
                <el-input v-model="form.name" placeholder="请输入作品名称" />
            </el-form-item>
            <el-form-item prop="title">
                <el-input v-model="form.title" disabled placeholder="请选择一个视频素材" />
            </el-form-item>
            <el-row :gutter="10">
                <el-col :offset="22" :span="2">
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-icon :class="page.current === 1? 'noLast':''" :size="20" @click="lastPage">
                                <caret-left />
                            </el-icon>
                        </el-col>
                        <el-col :span="12">
                            <el-icon :class="list.current*list.pageSize >= list.total? 'noLast':''" :size="20" @click="nextPage">
                                <caret-right />
                            </el-icon>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row :gutter="10" style="margin-top: 10px">
                <el-col :span="6">标题</el-col>
                <el-col :offset="6" :span="6">创建时间</el-col>
            </el-row>
            <el-row v-for="(item,index) in list.list"
                    :key="index" :class="[checkIndex===index?'bg':'','material']"
                    :gutter="10"
                    style="margin-top: 20px"
                    @click="checkMaterial(index,item)">
                <el-col :span="6">{{ item.title }}</el-col>
                <el-col :offset="6" :span="6">{{ filterTime(item.createTime) }}</el-col>
                <el-col :class="[checkIndex===index?'yes':'no','check']" :offset="4" :span="2">已选</el-col>
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
.material {
    padding: 8px 0;
    border-radius: 5px;

    &:hover {
        background-color: #f7f9ff;
        cursor: pointer;
    }
}

.bg {
    border: 1px solid #d9e4ff;
    background-color: #f7f9ff;
}

.check {
    color: #3569fd;
}

.yes {
    display: block;
}

.no {
    display: none;
}

.noLast {
    display: none;
}
</style>
