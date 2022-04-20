<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { onMounted, onUpdated, onUnmounted } from "vue";
import preview from "../Exam/preview.vue";
// ======================================数据===================================================

const current = ref(0); // 标识当前题目
const inputValue = ref(""); // 输入的分数
const show = ref(true);

const props = defineProps({
    list: {
        type: Array,
        required: true,
    },
});

// 字母表
const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];

// 答案列表
const answerList = ref([
    {
        index: "A",
        value: "",
        isAnswer: false,
    },
]);
// ======================================函数===================================================

onMounted(() => {
    console.log("onMounted");
});

function ok() {
    console.log(props.list[0]);
}

// 下一页
function nextOne() {
    if (!check()) return;
    // 保存此题设置的答案
    props.list[current.value].options = answerList.value;
    // 保存设置的分数
    props.list[current.value].score = inputValue.value;
    // 答案列表还原
    answerList.value = [
        {
            index: "A",
            value: "",
            isAnswer: false,
        },
    ];
    inputValue.value = "";

    console.log(props.list[0]);
    // 下一个题目
    current.value++;
}

// 检查是否填写完整信息
function check() {
    if (!inputValue.value) {
        ElMessage.error("请输入分数");
        return false;
    }

    let answerEmpty = false; // 是否设置答案
    let valueEmpty = false; // 是否设置正确答案
    let rightAnswer = 0; //正确答案个数

    answerList.value.forEach((item) => {
        if (item.isAnswer) {
            answerEmpty = true;
            rightAnswer++;
        }
        if (item.value === "") valueEmpty = true;
    });

    if (valueEmpty) {
        ElMessage.error("答案不可为空");
        return false;
    }
    if (!answerEmpty) {
        ElMessage.error("请设置正确答案");
        return false;
    }
    if (props.list[current.value].type === "radio" && rightAnswer > 1) {
        ElMessage.error("单选题不可设置多个答案");
        return false;
    }

    return true;
}

// 设置正确答案时触发
function checkboxChange(type: string, isAnswer: boolean) {
    let answerEmpty = false;
    if ("radio" === type) {
        answerList.value.forEach((item) => {
            if (item.isAnswer) answerEmpty = true;
        });
        if (!answerEmpty) {
            isAnswer = false;
            ElMessage.error("单选题不可设置多个答案");
        }
    }
}

// 新增答案
function addAnswer() {
    const obj = {
        index: alphabet[answerList.value.length],
        value: "",
        isAnswer: false,
    };
    answerList.value.push(obj);
}

// 删除答案
function delAnswer() {
    answerList.value.pop();
}
</script>

<template>
    <div>
        <div v-show="show" class="choice">
            <div class="title">题目录入</div>
            <div class="tips">请进行题目编辑和分数设置</div>
            <div class="top">
                <div class="topText">共{{ list?.length }}题(20/100)</div>
                <el-input
                    class="input"
                    v-model="inputValue"
                    size="default"
                    placeholder="分数"
                />
            </div>
            <div class="middle">
                <div class="type">{{ list[current]?.typeText }}</div>
                <div class="name">{{ list[current]?.label }}</div>
            </div>
            <div class="bottom">
                <div v-for="item in answerList" class="answer">
                    <div class="a">{{ item.index }}</div>
                    <el-input
                        class="input"
                        v-model="item.value"
                        size="default"
                        placeholder="单行输入"
                    />
                    <el-checkbox
                        class="checkbox"
                        v-model="item.isAnswer"
                        label="正确答案"
                        size="large"
                    />
                </div>
                <div class="operation">
                    <img
                        @click="addAnswer"
                        src="../../assets/icon/add.png"
                        alt=""
                    />
                    <img
                        @click="delAnswer"
                        src="../../assets/icon/del.png"
                        alt=""
                    />
                </div>
            </div>

            <div class="over">
                <el-button size="default">上一页</el-button>
                <span>{{ current + 1 }}/{{ list?.length }}</span>
                <el-button @click="nextOne" size="default">下一页</el-button>
            </div>
            <div class="button">
                <div class="preview">预览</div>
                <div @click="ok" class="ok">确定</div>
            </div>
        </div>
        <preview :list="list" />
    </div>
</template>

<style lang="less" scoped>
.choice {
    width: 762px;
    min-height: 614px;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    border-color: rgba(255, 0, 0, 0);
    border-style: solid;
    box-shadow: rgb(0 0 0 / 20%) 0px 4px 12px 0px;
    border-radius: 4px;
    .title {
        font-weight: 700;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
    }
    .tips {
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
        margin: 10px 0 0 0;
    }
    .top {
        display: flex;
        justify-content: center;
        .topText {
            font-weight: 700;
            font-size: 20px;
        }
        .input {
            width: 80px;
            margin: 0 0 0 10px;
        }
    }
    .middle {
        display: flex;
        .type {
            width: 62px;
            height: 26px;
            line-height: 26px;
            border-color: rgb(255, 210, 210);
            border-width: 1px;
            border-style: solid;
            color: rgb(255, 37, 37);
            border-radius: 50px;
            font-size: 12px;
            text-align: center;
        }
        .name {
            margin: 0 0 0 20px;
            font-size: 16px;
            color: rgb(16, 16, 16);
        }
    }
    .bottom {
        min-height: 350px;
        .answer {
            display: flex;
            margin: 20px 0 0 20px;
            .a {
                margin: 0 10px 0 0;
                height: 35px;
                line-height: 35px;
            }
            .input {
                width: 200px;
            }
            .checkbox {
                margin: 0 0 0 50px;
                position: relative;
                top: -5px;
            }
        }
        .operation {
            display: flex;
            margin: 30px 0 0 20px;
            img {
                width: 25px;
                height: 25px;
                cursor: pointer;
                margin: 0 20px 0 0;
            }
        }
    }
    .over {
        margin: 0 0 0 250px;
    }
    .button {
        display: flex;
        justify-content: flex-end;
        .preview {
            width: 50px;
            height: 30px;
            background-color: #ffffff;
            text-align: center;
            line-height: 30px;
            border-radius: 4px;
            font-size: 14px;
            border: 1px solid #d9d9d9;
            margin: 0 20px 0 0;
            cursor: pointer;
        }
        .ok {
            width: 50px;
            height: 30px;
            background-color: #3569fd;
            color: #ffffff;
            text-align: center;
            line-height: 30px;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
        }
    }
}
</style>
