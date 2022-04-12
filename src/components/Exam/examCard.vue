<script setup lang="ts">
import { ref, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import { onMounted, onUpdated, onUnmounted } from "vue";
// ======================================数据===================================================
interface User {
    order: number;
    name: string;
    type: string;
}
const inputValue = ref(""); // 搜索框
const value = ref(""); // 下拉框
// 下拉框选项
const options = [
    {
        value: "Option1",
        label: "Option1",
    },
    {
        value: "Option2",
        label: "Option2",
    },
    {
        value: "Option3",
        label: "Option3",
    },
    {
        value: "Option4",
        label: "Option4",
    },
    {
        value: "Option5",
        label: "Option5",
    },
];
// 表格数据
const tableData: User[] = [
    {
        order: 1,
        name: "公王蚊子会咬人吗",
        type: "选择题",
    },
    {
        order: 2,
        name: "公蚊子会咬人吗",
        type: "选择题",
    },
    {
        order: 3,
        name: "公蚊子会咬人吗",
        type: "选择题",
    },
    {
        order: 4,
        name: "公蚊子怪咬人吗",
        type: "选择题",
    },
    {
        order: 5,
        name: "奥太热门怪兽",
        type: "选择题",
    },
];
let tempTableData = ref<User[]>(tableData);
const multipleSelection = ref<User[]>([]); // 保存已选中的数据

// ======================================函数===================================================

onMounted(() => {
    // tempTableData = tableData;
    // console.log(tempTableData, "1111111111");
});
// 表格选中回调
const handleSelectionChange = (val: User[]) => {
    multipleSelection.value = val;
    console.log(val, "选中了");
};

//搜索框值变化时触发
function search() {
    tempTableData.value = [];

    let reg = new RegExp(inputValue.value);
    // 如果input值为空则展示所有数据
    if (!inputValue.value) {
        tempTableData.value = tableData;
        return;
    }
    // 根据input值来模糊匹配
    tableData.forEach((item) => {
        if (item.name.match(reg)) {
            tempTableData.value.push(item);
        }
    });
}
</script>

<template>
    <div class="choice">
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
            <el-table-column property="name" label="问题" width="420" />
            <el-table-column
                property="type"
                label="分类"
                show-overflow-tooltip
            />
        </el-table>

        <div class="button">
            <div class="cancel">取消</div>
            <div class="ok">确定</div>
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
            display: flex;
            width: 30px;
            height: 30px;
            border-color: rgb(187, 187, 187);
            border-width: 1px;
            border-style: solid;
            border-radius: 50px;
            font-size: 14px;
            line-height: 30px;
            padding: 0 0 0 9px;
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
            width: 80px;
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
