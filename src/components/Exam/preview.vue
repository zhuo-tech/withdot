<script setup lang="ts">
import { ElMessage } from "element-plus";

import { ref, reactive } from "vue";
import { onMounted, onUpdated, onUnmounted } from "vue";
// ======================================数据===================================================
const current = ref(0); // 当前问题
const index = ref(-1); // 标识选中的答案
const showText = ref(false); // 控制回答正确文字

const props = defineProps({
    list: {
        type: Array,
        required: true,
    },
});

// ======================================函数===================================================

onMounted(() => {
    console.log("onMounted");
});

// 选中答案触发
function press(isAnswer: boolean, itemIndex: number) {
    if (!isAnswer) return ElMessage.error("回答错误");
    showText.value = true;
    index.value = itemIndex;
    // 下一题 顺便把控制答案的数值还原
    setTimeout(() => {
        current.value++;
        showText.value = false;
        index.value = -1;
    }, 1000);

    return;
}
</script>

<template>
    <div class="choice">
        <div class="title">预览</div>
        <div class="top">
            <div class="topText">共{{ list?.length }}题</div>
        </div>
        <div class="middle">
            <div class="type">{{ list[current]?.typeText }}</div>
            <div class="name">{{ list[current]?.label }}</div>
        </div>
        <div
            @click="press(item.isAnswer, itemIndex)"
            :class="[index === itemIndex ? 'answerList' : 'answerList1']"
            v-for="(item, itemIndex) in list[current]?.options"
        >
            <div class="a">{{ item.index }}</div>
            <div class="answerText">{{ item.value }}</div>
            <div v-show="showText && item.isAnswer" class="right">回答正确</div>
        </div>
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

    .top {
        display: flex;
        justify-content: center;
        margin: 30px 0 0 0;
        .topText {
            font-weight: 700;
            font-size: 20px;
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
    .answerList {
        display: flex;
        margin: 30px 0 0 0;
        width: 671px;
        height: 36px;
        border-color: rgb(53, 151, 238);
        border-width: 1px;
        border-style: solid;
        color: rgb(53, 151, 238);
        border-radius: 50px;
        line-height: 36px;
        .a {
            margin: 0 0 0 20px;
        }
        .answerText {
            margin: 0 0 0 20px;
        }
        .right {
            margin: 0 0 0 480px;
        }
    }
    .answerList1 {
        display: flex;
        margin: 30px 0 0 0;
        width: 671px;
        height: 36px;
        border-color: rgb(240, 240, 240);
        border-width: 1px;
        border-style: solid;
        color: #101010;
        border-radius: 50px;
        line-height: 36px;
        cursor: pointer;
        .a {
            margin: 0 0 0 20px;
        }
        .answerText {
            margin: 0 0 0 20px;
        }
        .right {
            margin: 0 0 0 480px;
        }
    }
}
</style>
