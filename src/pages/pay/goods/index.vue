<script lang="ts" setup>
import CrudPagination from '@/components/CrudPagination/CrudPagination'
import ShowFile from '@/components/Upload/ShowFile'
import { getLogger } from '@/main'
import { Delete, Edit, Warning } from '@element-plus/icons-vue'
import goodsorderform from '@/components/pay/goodsorderform.vue'
import { ref } from "vue"
import type { VNode, VNodeProps } from "vue"
import { ElLoading } from "element-plus"

const log = getLogger('支付渠道')

const value = ref("")

const options = [
  {
    value: "win",
    label: "支付成功",
  },
  {
    value: "accomplish",
    label: "支付完成",
  },
    {
    value: "unpaid",
    label: "待支付",
  },  {
    value: "failed",
    label: "支付失败",
  },  {
    value: "cancel",
    label: "支付取消",
  },

]



const input = ref('')

function sweepaway() {
  value.value = ""
  input.value = ""
}

const tableData = [
  {
    sort: 1,
    productname: "",
    sum: "",
    state: "",
    odd: "",
    time:""
  },
]

const hide = ref(true)
function showhide() {
  hide.value = !hide.value
}

const fullscreenLoading = ref(false)
const openFullScreen1 = () => {
  fullscreenLoading.value = true
  setTimeout(() => {
    fullscreenLoading.value = false
  }, 2000)
}
</script>

<template>
<el-card class="box-card">
    <template #header>
        <div class="card-header">
            <h1>商品订单</h1>
        </div>
    </template>
    <div v-show="hide" class="choice">
    <span class="size">订单状态：</span>
    <el-select v-model="value" class="select" placeholder="订单状态">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>

    <span class="size1">支付单号：</span>
    <el-input style="width: 276px;" v-model="input" placeholder="支付单号" />


    <div class="but">
      <div class="seek">
        <img class="icon" src="../../../assets/icon/ss.png" alt="" />
        搜索
      </div>
      <div @click="sweepaway()" class="empty">
        <img class="icon1" src="../../../assets/icon/sc.png" alt="" />
        清空
      </div>
    </div>
  </div>

  <div class="addbox">

    <div class="hintbox">
      <el-tooltip effect="dark" content="刷新" placement="top">
        <el-button class="lod" v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="openFullScreen1">
          <div class="hint">
            <img class="ico" src="../../../assets/icon/sx.png" alt="" />
          </div>
        </el-button>
      </el-tooltip>

      <el-tooltip effect="dark" content="搜索" placement="top">
        <div @click="showhide()" class="hint">
          <img class="ico" src="../../../assets/icon/sss.png" alt="" />
        </div>
      </el-tooltip>
    </div>
  </div>

  <div class="formbox">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="sort" label="序号" width="60" />
      <el-table-column prop="productname" label="商品名称" />
      <el-table-column prop="sum" label="金额/元" />
      <el-table-column prop="state" label="订单状态" />
      <el-table-column prop="odd" label="支付单号" />
      <el-table-column prop="time" label="创建时间" />
    </el-table>
  </div>
  <div class="pages">
    <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="1" />
  </div>
</el-card>
</template>
<style scoped lang="less">
.choice {
  display: flex;

  .size {
    font-size: 15px;
    font-weight: 700;
    margin-top: 10px;
  }

  .size1 {
    font-size: 15px;
    font-weight: 700;
    margin: 10px 0 0 50px;
  }

  .select {
    width: 280px;
  }

  .but {
    display: flex;
    margin: 10px 0 0 180px;
    font-size: 15px;
    font-weight: 400;

    .seek {
      width: 70px;
      height: 30px;
      display: flex;
      border: solid 1px;
      font-size: 14px;
      line-height: 30px;
      margin: -5px 30px 0 0;
      border-radius: 5px;
      background-color: #409eff;
      color: #fff;
      text-align: center;
      cursor: pointer;

      .icon {
        margin: 2px 0 0 5px;
        width: 23px;
        height: 23px;
      }
    }

    .empty {
      font-size: 14px;
      width: 70px;
      height: 30px;
      display: flex;
      border: solid 1px #c0c4cc;
      line-height: 30px;
      margin-top: -5px;
      border-radius: 5px;
      color: #606266;
      text-align: center;
      cursor: pointer;

      .icon1 {
        margin: 7px 2px 0 10px;
        width: 15px;
        height: 15px;
      }
    }
  }
}

.addbox {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;

  .add {
    display: flex;

    .addbut {
      font-size: 14px;
      width: 70px;
      height: 30px;
      text-align: center;
      background-color: #409eff;
      border: solid 1px;
      line-height: 30px;
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
    }
  }

  .hintbox {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .lod {
      width: 30px;
      height: 30px;
      background-color: #fff;
      border: 1px;
    }

    .hint {
      width: 30px;
      height: 30px;
      border: solid 1px #c0c4cc;
      border-radius: 50px;
      margin-left: 10px;
      cursor: pointer;

      .ico {
        margin: 0 auto;
        margin-top: 5px;
      }
    }
  }
}

.formbox {
  margin-top: 10px;

  .form {
    text-align: center;
  }
}

.pages {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
