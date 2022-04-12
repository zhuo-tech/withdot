<script lang="ts" setup>
import { addWork, addWorkToAlbums, workList } from '@/api/works'
import { filterTime } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import EditService from '@/pages/albums/editService'

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
    aleryWorkList: {
        type: Array,
    },
})

const formIsLoading = ref(false)
const emits = defineEmits(['getNewList'])
const form = reactive({
    workId: '',
})
const checkIndex = ref()
const list = ref()
const page = reactive({
    current: 1,
    pageSize: 5,
})
const getMaterialList = () => {
    workList(page).then(response => {
        let newList = response?.list.filter(item => {
            return !props.aleryWorkList?.some(it => (it as any)._id === item._id)
        })
        console.log(newList)
        list.value = newList
    }).catch(err => {
            ElMessage.error(err)
        },
    )
}

const checkMaterial = (index: number, item: any) => {
    checkIndex.value = index
    form.workId = item._id
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
    form.workId = ''
    checkIndex.value = null
}

const submit = async () => {
    if (!form.workId) {
        ElMessage.error('请选择添加的作品')
        return
    }
    formIsLoading.value = true
    const _id = props.service?.getUrl_Id
    await addWorkToAlbums(form, _id)
    setTimeout(() => {
        ElMessage.success('作品添加成功')
        props.subassembly.visible = false
        formIsLoading.value = false
        emits('getNewList')
        initialization()
    }, 1000)

}
getMaterialList()
</script>

<template>
    <el-dialog v-model="subassembly.visible" title="添加作品" width="40%" @open="getMaterialList">
        <el-row :gutter="10" style="margin-top: -10px">
            <el-col :span="6">标题</el-col>
            <el-col :offset="6" :span="6">创建时间</el-col>
            <el-col :span="6">
                <el-row :gutter="10">
                    <el-col :offset="12" :span="6">
                        <el-icon :class="page.current === 1 || list.length===0? 'noLast':''" :size="20" @click="lastPage">
                            <caret-left />
                        </el-icon>
                    </el-col>
                    <el-col :span="6">
                        <el-icon :class="list.current*list.pageSize >= list.total || list.length===0 ||list.length<=5? 'noLast':''"
                                 :size="20"
                                 @click="nextPage">
                            <caret-right />
                        </el-icon>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row v-if="list.length===0" :gutter="10">
            <el-col :span="24" class="noWork">暂无数据</el-col>
        </el-row>
        <el-row v-for="(item,index) in list" v-else
                :key="index" :class="[checkIndex===index?'bg':'','material']"
                :gutter="10"
                style="margin-top: 20px"
                @click="checkMaterial(index,item)">
            <el-col :span="6">{{ item.name }}</el-col>
            <el-col :offset="6" :span="6">{{ filterTime(item.createTime) }}</el-col>
            <el-col :class="[checkIndex===index?'yes':'no','check']" :offset="4" :span="2">已选</el-col>
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

.noWork {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
}
</style>
