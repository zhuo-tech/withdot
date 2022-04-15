<script lang="ts" setup>
import { getLogger } from '@/main'
import {  ref } from "vue"
import { cloud } from '@/cloud'
import { PayGoodsOrderService } from '../service/PayGoodsOrderService'
import { PayGoodsOrder } from '@/model/entity/PayGoodsOrder'


const DB = cloud.database() // 数据库


const service = new PayGoodsOrderService()
let notifyList = ref<PayGoodsOrder[]>([])
const total = ref(0)
const size = ref(5)
const current = ref(1)
/**
 * 生成序列号
 * @param index 序号
 * @returns 递增序号
 */
const genSn = (index: number) => {
    return index += 1
}

/**
 * 统计汇总
 */
const count = async () => {
    total.value = await service.count()
}
/**
 * 分页查询支付渠道列表
 * @param current  当前页
 * @param size  分页大小
 */
const page = async ( current: number,size: number) => {
    notifyList.value = await service.page(current, size)
}


/**
 * 分页处理
 * @param current 当前页
 */
const handleCurrentChange = async (current: number) => {
    notifyList.value = await service.page(current, size.value)
    
}




const tableData = ref()//表单

const log = getLogger('支付渠道')

const orderform = ref("")//订单状态

const hide = ref(true)//头部展示

const odd = ref('')//单号


const PayOptions = [  //状态
  {
    PayName: "win",
    order : "支付成功",
  },
  {
    PayName: "accomplish",
    order: "支付完成",
  },
  {
    PayName: "unpaid",
    order: "待支付",
  }, {
    PayName: "failed",
    order: "支付失败",
  }, {
    PayName: "cancel",
    order: "支付取消",
  },

]



//清空
function sweepaway() {
  orderform.value = ""
  odd.value = ""
}


//隐藏头部
function showhide() {
  hide.value = !hide.value
}


//刷新
const controlRefresh = ref(false)
const openFullScreen1 = () => {
  controlRefresh.value = true
  init()
  setTimeout(() => {
    controlRefresh.value = false
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
      <el-select v-model="orderform" class="select" placeholder="订单状态">
        <el-option v-for="item in PayOptions" :key="item.PayName" :label="item.order" :value="item.PayName" />
      </el-select>

      <span class="size1">支付单号：</span>
      <el-input style="width: 276px;" v-model="odd" placeholder="支付单号" />


      <div class="but">
        <el-button  size="default" type="primary" icon="Search">搜索</el-button>
       <el-button @click="sweepaway()" size="default"  type="primary" icon="Delete">清空</el-button>
      </div>
    </div>

    <div class="addbox">

        <div class="hintbox">
        <el-tooltip content="刷新" effect="dark" placement="top">
          <el-button v-loading.fullscreen.lock="controlRefresh" class="lod" type="primary" @click="openFullScreen1">
                  <el-button class="hint" icon="refresh" circle />
          </el-button>
        </el-tooltip>

        <el-tooltip content="搜索" effect="dark" placement="top">
            <el-button class="hint" @click="showhide()" icon="Search" circle />
        </el-tooltip>
      </div>
    </div>

    <div class="formbox">
      <el-table :data="notifyList" border style="width: 100%">
        <el-table-column :sn="genSn" type="index" label="序号" width="60" />
        <el-table-column prop="goodsName" label="商品名称" />
        <el-table-column prop="amount" label="金额/元" />
        <el-table-column prop="status" label="订单状态" />
        <el-table-column prop="payOrderId" label="支付单号" />
        <el-table-column prop="createTime" label="创建时间" />
      </el-table>
    </div>
   <div class="pages">
            <el-pagination :total="total" :page-size="size" @current-change="handleCurrentChange" background
                layout="total, prev, pager, next, jumper" />
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
    margin: 0 0 0 180px;
    font-size: 15px;
    font-weight: 400;
  }
}

.addbox {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;

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
    }
  }
}

.formbox {
  margin-top: 10px;
}

.pages {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
