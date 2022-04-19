
<script lang="ts">
import { onMounted, reactive, ref, toRefs } from "vue";
import { getLogger } from "@/main";
import { StudentService } from "@/pages/student/StudentService";
import { StudentQo } from "@/pages/student/StudentQo";
import { CoreStudent } from "@/model/entity/CoreStudent";
import { getIsPayLabel } from '@/model/CommonEnum';
import { useRouter } from 'vue-router'
const NAME = CoreStudent.name
export default {
    name: NAME,
    setup() {
        const router = useRouter()
        const L = getLogger("学员列表");
        const S = new StudentService();
        const Q = new StudentQo(1, 10);
        const total = ref(0)
        const listLoading = ref(true)
        const state = reactive({
            data: Array<CoreStudent>(),
            total,
            listLoading,
            queryParam: Q
        })
        L.debug(`[state] -> ${JSON.stringify(state)}`)
        onMounted(() => {
            handlePage(state.queryParam)
        })
        const handleSn = (index: number): number => {
            return (index += 1)
        }
        const fmtIsPay = (row: CoreStudent): string => {
            return getIsPayLabel(row.isPay)
        }
        const handleDetail = (id: number) => {
            router.push({ path: '/student/detail', query: { id } })
        }
        const handleCurrentChange = (current: number) => {
            L.debug(`current -> ${current} `)
            state.queryParam.current = current
            handlePage(state.queryParam)
        }
        const handleSizeChange = (size: number) => {
            state.queryParam.size = size
            L.debug(`size -> ${size} `)
            handlePage(state.queryParam)
        }
        const handleSearch = () => {
            L.debug(`search params queryParam-> ${state.queryParam}`)
            handlePage(state.queryParam)
        }
        const handlePage = async (params: StudentQo): Promise<void> => {
            state.listLoading = true
            const res = await S.pageByParams(params);
            state.data = res.record ?? []
            state.total = res.total ?? 0
            state.listLoading = false
        }
        return {
            ...toRefs(state),
            fmtIsPay,
            handleDetail,
            handleSearch,
            handlePage,
            handleSizeChange,
            handleCurrentChange,
            handleSn
        }
    }
}
</script>
<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <h1>学员列表</h1>
            </div>
        </template>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form v-model="queryParam" ref="queryParamRef">
                    <el-form-item> 
                        <el-radio-group v-model="queryParam.isPay" size="large" @change="handleSearch()">
                            <el-radio-button label="1">免费</el-radio-button>
                            <el-radio-button label="0">付费</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="6" :offset="0">
                <el-button type="primary" icon="Search" @click="handleSearch()">查询</el-button>
            </el-col>
        </el-row>
        <el-table v-loading="listLoading" :data="data" border fit highlight-current-row
            style="width: 100%;pading-top:20px">
            <el-table-column label="序号" type="index" :sn="handleSn" width="60" />
            <el-table-column label="学员头像" prop="avatar" />
            <el-table-column label="学员姓名" prop="name" />
            <el-table-column label="手机号码" prop="phone" />
            <el-table-column label="是否付费" prop="isPay" :formatter="fmtIsPay" />
            <el-table-column label="注册时间" prop="createTime" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button size="small" type="text" icon="View" @click="handleDetail(scope.row._id)">
                        查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pages" :total="total" v-show="total > 0" v-model:page="queryParam.current"
            v-model:limit="queryParam.size" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" />
    </el-card>
</template>
<style lang="less" scoped>
.pages {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
}
</style>