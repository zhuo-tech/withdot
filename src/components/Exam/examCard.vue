<script setup lang="ts">
import { ref, reactive, ComponentInternalInstance } from "vue";
import { cloud } from "@/cloud";
import { Search } from "@element-plus/icons-vue";
import { onMounted, onUpdated, onUnmounted } from "vue";
import card from "../Exam/entering.vue";
// ======================================数据===================================================
const db = cloud.database();
interface User {
    typeText: string;
    order: number;
    label: string;
    type: string;
}

const show = ref(true); // 展示此组件
const showChildren = ref(false); // 展示录入组件
const inputValue = ref(""); // 搜索框
const value = ref(""); // 下拉框
// 下拉框选项
const options = [
    {
        value: "radio",
        label: "单选题",
    },
    {
        value: "multi",
        label: "多选题",
    },
    {
        value: "judge",
        label: "判断题",
    },
    {
        value: "saq",
        label: "简答题",
    },
];

let tableData: User[] = []; // 所有题目数据
const tempTableData = ref<User[]>(tableData); // 表格显示数据
const multipleSelection = ref<User[]>([]); // 保存已选中的数据

// ======================================函数===================================================

onMounted(() => {
    getList();
});

// 获取初始列表
async function getList() {
    const res = await db.collection("core_question_repo").get();
    tableData = res.data;
    let orderNumber = 1;
    tableData.forEach((item) => {
        item.order = orderNumber++; // 设置序号
        if (item.type === "radio") item.typeText = "单选题";
        if (item.type === "multi") item.typeText = "多选题";
        if (item.type === "judge") item.typeText = "判断题";
        if (item.type === "saq") item.typeText = "简答题";
    });
    search(); // 赋值给tempTableData
    console.log(tableData, "获取列表");
}

//搜索框值变化时触发
function search() {
    // 保存现在列表里的数据用来搜索
    const tempArr = tempTableData.value;
    tempTableData.value = [];

    let reg = new RegExp(inputValue.value);
    // 如果input值为空则展示所有数据
    if (!inputValue.value) {
        tempTableData.value = tableData;
        return;
    }
    // 根据input值来模糊匹配
    tempArr.forEach((item) => {
        if (item.label.match(reg)) {
            tempTableData.value.push(item);
        }
    });
}

// 下拉框选中回调
function selectChange(val: string) {
    console.log(val);
    tempTableData.value = tableData.filter((item) => item.type === val);
}

// 表格选中回调
const handleSelectionChange = (val: User[]) => {
    multipleSelection.value = val;
};

// 关闭此组件
function closeCard() {
    show.value = false;
}

// 关闭此组件并展示孩子
function showChild() {
    show.value = false;
    showChildren.value = true;
}
</script>

<template>
    <div>
        <div v-show="show" class="choice">
            <div class="title">选择题目</div>
            <div class="tips">请选择题目后进行题目编辑</div>
            <div class="selected">
                <div class="selectedTitle">已选择</div>
                <div
                    v-for="(item, index) in multipleSelection"
                    :key="index"
                    class="selectedList"
                >
                    {{ item.order }}
                </div>
            </div>
            <div class="search">
                <el-input
                    class="input"
                    @input="search"
                    v-model="inputValue"
                    size="default"
                    placeholder="搜索"
                    :suffix-icon="Search"
                />
                <img src="" alt="" />

                <el-select
                    v-model="value"
                    size="default"
                    class="select"
                    placeholder="分类"
                    @change="selectChange"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </div>

            <el-table
                ref="multipleTableRef"
                :data="tempTableData"
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" />
                <el-table-column label="序号" width="120">
                    <template #default="scope">{{ scope.row.order }}</template>
                </el-table-column>
                <el-table-column property="label" label="问题" width="420" />
                <el-table-column
                    property="typeText"
                    label="分类"
                    show-overflow-tooltip
                />
            </el-table>

            <div class="button">
                <div @click="closeCard" class="cancel">取消</div>
                <div @click="showChild" class="ok">确定</div>
            </div>
        </div>
        <card :list="multipleSelection" v-show="!showChildren" />
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
    font-size: 14px;
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
    .selected {
        width: 740px;
        display: flex;
        flex-wrap: wrap;
        margin: 10px 0 0 0;
        .selectedTitle {
            font-size: 14px;
            height: 30px;
            width: 50px;
            line-height: 30px;
            color: rgb(16, 16, 16);
            margin: 10px 10px 0 0;
        }
        .selectedList {
            width: 30px;
            height: 30px;
            border-color: rgb(187, 187, 187);
            border-width: 1px;
            border-style: solid;
            border-radius: 50px;
            font-size: 14px;
            line-height: 30px;
            text-align: center;
            margin: 10px 10px 0 0;
        }
    }
    .search {
        display: flex;
        margin: 10px 0 20px 0;
        .input {
            width: 291px;
            height: 30px;
        }
        .select {
            width: 100px;
            margin: 0 0 0 30px;
        }
    }
    .button {
        display: flex;
        justify-content: flex-end;
        margin: 20px 0 0 0;
        .cancel {
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
