<script lang="ts" setup>
import { CoreDotType, DotTypeConfigMapping } from '@/model/entity/CoreDot'
import { ElMessage, FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
import { QuestionTypeEnum } from '@/model/QuestionTypeEnum'

const props = defineProps<{
    data: DotTypeConfigMapping[CoreDotType.题目]
}>()

const formData: Record<number, any> = {}

props.data.exam.forEach((item, index) => {
    switch (item.type) {
        case QuestionTypeEnum.SAQ:
            formData[index] = {
                type: item.type,
                currentAnswer: '',
            }
            break
        case QuestionTypeEnum.XUANZE:
            let options: Record<number, any> = {}
            item.content.forEach((item: any, index: number) => {
                options[index] = false
            })
            formData[index] = {
                type: item.type,
                currentAnswer: options,
            }
            break
        case QuestionTypeEnum.TIANKONG:
            let blank: Record<number, any> = {}
            item.content.forEach((item: any, index: number) => {
                blank[index] = ''
            })
            formData[index] = {
                type: item.type,
                currentAnswer: blank,
            }
            break
        default:
            formData[index] = {type: 'default'}
    }
})

const currentQuestion = ref(0)

const nextQuestion = () => {
    if (props.data.exam.length >= (currentQuestion.value + 1)) {
        currentQuestion.value++
    }
}

const uponQuestion = () => {
    if (currentQuestion.value > 0) {
        currentQuestion.value--
    }
}

const form = reactive(formData)
</script>

<template>
    <div class="box" @click.stop="()=>{}">
        <div class="boxTop">
            <div v-for="(item,index) in data.exam" :class="index>currentQuestion? 'noAnswer':'alreadyAnswer'">第{{ index + 1 }}题</div>
        </div>
        <el-form ref="formRef" :model="form" label-width="80px">
            <div v-for="(item,index) in data.exam" v-show="currentQuestion === index" :key=index>
                <div v-if="item.type === QuestionTypeEnum.SAQ">
                    <el-form-item label="题目">
                        <div>{{ item.label }}</div>
                    </el-form-item>
                    <el-form-item label="答案">
                        <el-input v-model="form[index].currentAnswer" type="textarea"></el-input>
                    </el-form-item>
                </div>
                <div v-if="item.type === QuestionTypeEnum.TIANKONG">
                    <el-form-item label="题目">
                        <div>{{ item.label }}</div>
                    </el-form-item>
                    <el-form-item v-for="(i,ind) in item.content" :key="ind" label="答案">
                        <el-input v-model="form[index].currentAnswer[ind]" style="width: 100px"></el-input>
                    </el-form-item>
                </div>
                <div v-if="item.type === QuestionTypeEnum.XUANZE">
                    <el-form-item label="题目">
                        <div>{{ item.label }}</div>
                    </el-form-item>
                    <el-form-item v-for="(i,ind) in item.content" :key="ind" label="答案">
                        <el-checkbox v-model="form[index].currentAnswer[ind]" :label="true" name="type" size="large">{{ i.answer }}</el-checkbox>
                    </el-form-item>
                </div>
            </div>
            <el-row justify="end" type="flex">
                <div v-if="(currentQuestion+1) !== data.exam.length">
                    <el-button v-if="currentQuestion !== 0"
                               style="margin: 0 20px 20px 0"
                               type="primary"
                               @click="uponQuestion">上一题
                    </el-button>
                    <el-button style="margin: 0 20px 20px 0"
                               type="primary"
                               @click="nextQuestion">下一题
                    </el-button>
                </div>
                <div v-else>
                    <el-button v-if="currentQuestion !== 0"
                               style="margin: 0 20px 20px 0"
                               type="primary"
                               @click="uponQuestion">上一题
                    </el-button>
                    <el-button style="margin: 0 20px 20px 0" type="primary">提交</el-button>
                </div>

            </el-row>

        </el-form>
    </div>
</template>

<style lang="less" scoped>
.boxTop {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 20px;
    margin-top: 20px;

    > div {
        color: #FFFFFF;
        height: 60px;
        width: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 14px;
        border-radius: 50%;
    }
}

.box {
    background-color: #ffffff;
    min-width: 500px;
    padding: 20px;
}

.noAnswer {
    background-color: #8A7F7F;
}

.alreadyAnswer {
    background-color: #409eff;
}
</style>
