<script lang="ts" setup>
import { getLogger } from "@/main"
import { reactive, ref } from "vue"
import { cloud } from "@/cloud"
import { PayChannel } from "@/model/entity/PayChannel"
import { PayChannelService } from "../service/PayChannelService"
import CrudPagination from '@/components/CrudPagination/CrudPagination'

const log = getLogger("支付渠道")

const DB = cloud.database() // 数据库

//支付类型选项
const wxPay = ref("")
const wxOptions = [
  {
    wxPay: "wx",
    label: "微信公众号支付",
  },
]
const channel = ref("") //渠道状态
const stateOptions = [
  {
    channel: "normal",
    state: "正常",
  },
  {
    channel: "congelation",
    state: "冻结",
  },
]

const addPageTable = ref(false)//新增
const redact = ref(false)
const appid = ref("")
const payment = ref("")
const channelname = ref("")
const channelMchId = ref("")
const remark = ref("")
const parameter = ref("")

const PayChannelForm = reactive({
  o: PayChannel,
})

const hide = ref(true) //搜索显隐

const tableData = ref()//表单参数

const controlRefresh = ref(false)//刷新
const lookOver = ref(false) //查看

//清空状态
function sweepaway() {
  wxPay.value = ""
  channel.value = ""
}

//获取数据
const list = async () => {
  const service = new PayChannelService()
  tableData.value = await service.list()
  let sortord = 1
  tableData.value.forEach((item: { sort: number }) => {
    item.sort = sortord
    sortord++
  })
}
list()

//隐藏头部
function showhide() {
  hide.value = !hide.value
}


//刷新
const refresh = () => {
  controlRefresh.value = true
  setTimeout(() => {
    controlRefresh.value = false
  }, 2000)
}

//添加
async function saveHandler() {
  const o = PayChannelForm
  await DB.collection(PayChannel.TABLE_NAME).add({
    o,
  })
  addPageTable.value = false
}


</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h1>支付渠道</h1>
      </div>
    </template>
    <paychannel />

    <div v-show="hide" class="choice">
      <span class="size">支付类型：</span>
      <el-select v-model="wxPay" class="select" placeholder="支付类型">
        <el-option v-for="item in wxOptions" :key="item.wxPay" :label="item.label" :value="item.wxPay" />
      </el-select>

      <span class="size1">渠道状态：</span>
      <el-select v-model="channel" class="select" placeholder="渠道状态">
        <el-option v-for="item in stateOptions" :key="item.channel" :label="item.state" :value="item.channel" />
      </el-select>

      <div class="but">
        <div class="seek">
          <img alt="" class="icon" src="../../../assets/icon/ss.png" />
          搜索
        </div>
        <div class="empty" @click="sweepaway()">
          <img alt="" class="icon1" src="../../../assets/icon/sc.png" />
          清空
        </div>
      </div>
    </div>

    <div class="addbox">
      <div class="add" @click="addPageTable = true">
        <div class="addbut">+ 新增</div>
      </div>

      <!-- Form -->
      <el-dialog v-model="addPageTable" title="新增">
        <el-form :model="PayChannelForm" style="display: flex; flex-wrap: wrap">
          <div class="newadd"><span style="color: red">*</span>appid:</div>
          <el-input v-model="appid" placeholder="请输入 appid" style="width: 370px; padding: 0 30px 20px 15px" />
          <div class="newadd">支付类型:</div>
          <el-input v-model="payment" placeholder="请输入 支付类型" style="width: 370px; padding: 0 30px 20px 15px" />
          <div class="newadd"><span style="color: red">*</span>渠道名称:</div>
          <el-input v-model="channelname" placeholder="请输入 渠道名称" style="width: 370px; padding: 0 30px 20px 15px" />
          <div class="newadd"><span style="color: red">*</span>商户号:</div>
          <el-input v-model="channelMchId" placeholder="请输入 渠道商户号" style="width: 370px; padding: 0 30px 20px 15px" />
          <div class="newadd">渠道状态:</div>
          <el-select v-model="channel" placeholder="请输入 渠道状态" style="width: 370px; padding: 0 30px 20px 15px">
            <el-option v-for="item in stateOptions" :key="item.channel" :label="item.state" :value="item.channel" />
          </el-select>
          <div class="newadd">备注:</div>
          <el-input v-model="remark" placeholder="请输入 备注" style="width: 370px; padding: 0 30px 20px 15px" />

          <div class="newadd"><span style="color: red">*</span>配置参数:</div>
          <el-input v-model="parameter" :rows="2" type="textarea" placeholder="请输入 扩展参数.json字符串"
            style="width: 820px; padding: 0 30px 20px 15px" />
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="addPageTable = false">取消</el-button>
            <el-button type="primary" @click="saveHandler">确定</el-button>
          </span>
        </template>
      </el-dialog>

      <div class="hintbox">
        <el-tooltip content="刷新" effect="dark" placement="top">
          <el-button v-loading.fullscreen.lock="controlRefresh" class="lod" type="primary" @click="refresh">
            <div class="hint">
              <img alt="" class="ico" src="../../../assets/icon/sx.png" />
            </div>
          </el-button>
        </el-tooltip>

        <el-tooltip content="搜索" effect="dark" placement="top">
          <div class="hint" @click="showhide()">
            <img alt="" class="ico" src="../../../assets/icon/sss.png" />
          </div>
        </el-tooltip>
      </div>
    </div>

    <div class="formbox">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" prop="sort" width="60" />
        <el-table-column label="appid" prop="appId" />
        <el-table-column label="渠道名称" prop="channelName" />
        <el-table-column label="商户号" prop="channelMchId" />
        <el-table-column label="渠道状态" prop="state" />
        <el-table-column label="备注" prop="remark" />
        <el-table-column label="配置参数" prop="param" />
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column label="操作" prop="operation">
          <template #default>
            <el-button @click="lookOver = true" size="small" type="text">查看</el-button>
            <el-button @click="redact = true" size="small" type="text">编辑</el-button>
            <el-button size="small" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="lookOver" title="查看" width="30%">
      <div style="width: 60px; text-align: right; margin-bottom: 10px">
        appid:<span></span>
      </div>
      <div style="width: 60px; text-align: right; margin-bottom: 10px">
        支付类型:<span></span>
      </div>
      <div style="width: 60px; text-align: right; margin-bottom: 10px">
        渠道名称:<span></span>
      </div>
      <div style="width: 60px; text-align: right; margin-bottom: 10px">
        商户号:<span></span>
      </div>
      <div style="width: 60px; text-align: right; margin-bottom: 10px">
        渠道状态:<span></span>
      </div>
      <div style="width: 60px; text-align: right; margin-bottom: 10px">
        备注:<span></span>
      </div>
      <div style="width: 60px; text-align: right">配置参数:</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="lookOver = false">取消</el-button>
          <el-button type="primary" @click="lookOver = false">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="redact" title="编辑">
      <el-form :model="payredact" style="display: flex; flex-wrap: wrap">
        <div class="newadd">appid:</div>
        <el-input v-model="appid" placeholder="请输入 appid" style="width: 370px; padding: 0 30px 20px 15px" />
        <div class="newadd">支付类型:</div>
        <el-input v-model="payment" placeholder="请输入 支付类型" style="width: 370px; padding: 0 30px 20px 15px" />
        <div class="newadd">渠道名称:</div>
        <el-input v-model="channelname" placeholder="请输入 渠道名称" style="width: 370px; padding: 0 30px 20px 15px" />
        <div class="newadd">商户号:</div>
        <el-input v-model="channelMchId" placeholder="请输入 渠道商户号" style="width: 370px; padding: 0 30px 20px 15px" />
        <div class="newadd">渠道状态:</div>
        <el-select v-model="channel" placeholder="请输入 渠道状态" style="width: 370px; padding: 0 30px 20px 15px">
          <el-option v-for="item in stateOptions" :key="item.channel" :label="item.state" :value="item.channel" />
        </el-select>
        <div class="newadd">备注:</div>
        <el-input v-model="remark" placeholder="请输入 备注" style="width: 370px; padding: 0 30px 20px 15px" />

        <div class="newadd">配置参数:</div>
        <el-input v-model="parameter" :rows="2" type="textarea" placeholder="请输入 扩展参数.json字符串"
          style="width: 820px; padding: 0 30px 20px 15px" />
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="redact = false">取消</el-button>
          <el-button type="primary" @click="redact = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
       <div class="pages">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="1" />
        </div>
  </el-card>
</template>

<style lang="less" scoped>
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

.newadd {
  width: 80px;
  line-height: 30px;
  text-align: right;
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
    display: flex;

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
