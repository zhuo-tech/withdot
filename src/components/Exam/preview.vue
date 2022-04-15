<script setup lang="ts">
import { ref, reactive } from "vue";
import { onMounted, onUpdated, onUnmounted } from "vue";
// ======================================数据===================================================

// ======================================函数===================================================

onMounted(() => {
    console.log("onMounted");
});
</script>

<template>
    <div class="choice">
        <div class="title">预览</div>

        <div class="top">
            <div class="topText">共六题</div>
        </div>
        <div class="middle">
            <div class="type">多选题</div>
            <div class="name">为什么大象不会飞</div>
        </div>
        <div class="answerList">
            <div class="a">A</div>
            <div class="answerText">选项1</div>
            <div class="right">回答正确</div>
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
}
</style>
