<script lang="ts" setup>
import QuestionService, { questionButtonList } from '@/pages/question/QuestionService'
import { CirclePlusFilled, CirclePlus, Refresh, Search } from '@element-plus/icons-vue'

const props = defineProps<{
    service: QuestionService
}>()

</script>

<template>
    <el-row justify="end" type="flex">
        <el-collapse-transition>
            <el-col v-show="service.showQuery">
                <el-row :gutter="10" justify="end" type="flex">
                    <el-col>
                        <el-form ref="queryFormRef" :model="service.queryData" inline>
                            <el-form-item style="width: 200px">
                                <el-input v-model="service.queryData.label" clearable placeholder="请输入题目名称"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button :icon="Search" type="primary" @click="service.getList()"></el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </el-col>
        </el-collapse-transition>
        <el-collapse-transition>
            <el-col v-show="service.topicButton.showAddTopic" style="display: flex;justify-content: center">
                <div v-for="item in questionButtonList" :key="item.questionName" class="addButton" @click="service.addQuestion(item.type)">
                    <div>
                        <el-icon>
                            <circle-plus />
                        </el-icon>
                    </div>
                    <div>{{ item.questionName }}</div>
                </div>
            </el-col>
        </el-collapse-transition>
        <el-col :span="24">
            <el-row justify="end" type="flex">
                <el-button :icon="CirclePlusFilled"
                           type="primary"
                           @click="service.topicButton.showAddTopic=!service.topicButton.showAddTopic;service.showQuery=false">新建题目
                </el-button>
                <el-button :icon="Search" type="primary" @click="service.searchQuestion()" />
                <el-button v-loading="service.tableIsLoading"
                           :disabled="service.tableIsLoading"
                           :icon="Refresh"
                           type="primary"
                           @click="service.listUpdate"></el-button>
            </el-row>
        </el-col>
    </el-row>
</template>

<style lang="less" scoped>
.addButton {
    width: 50px;
    margin: 0 25px 0 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
}
</style>
