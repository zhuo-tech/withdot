<script lang="ts" setup>
import { getLogger } from "@/main"
import { reactive, ref } from "vue"
import { cloud } from "@/cloud"
import { PayChannel } from "@/model/entity/PayChannel"
import { PayChannelService } from "../service/PayChannelService"
import { onMounted, onUpdated, onUnmounted } from "vue"
import { getPayStatLabel } from "@/model/entity/PayState"
import { ElMessage } from 'element-plus'
import { id } from "element-plus/lib/locale"

//============================================================数据=============================================

const log = getLogger("支付渠道")
const service = new PayChannelService()
const notifyList = ref<PayChannel[]>([])


const total = ref(0) // 总数
const size = ref(10) // 每页数量
const current = ref(1) // 当前页
const addPageTable = ref(false)// 控制新增面板

// 用来保存新增时候输入的数据
const redact = ref(false)
const appid = ref("")
const channelname = ref("")
const channelMchId = ref("")
const remark = ref("")
const param = ref("")
let sta = ''

const currentIndex = ref()// 当前点击的行数


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
    channel: "0",
    state: "正常",
  },
  {
    channel: "1",
    state: "冻结",
  },
]






//============================================================函数=============================================
onMounted(() => {
  count()
  page(current.value)
})

/**
 * 分页查询支付渠道列表
 * @param current  当前页
 * @param size  分页大小
 */
const page = async (current: number) => {
  notifyList.value = await service.page(size.value, current)
  notifyList.value.forEach(item => {
    item.paramText = JSON.stringify(item.param)
  })

}



/**
 * 统计汇总
 */
const count = async () => {
  total.value = await service.count()
}

/**
 * 生成序列号
 * @param index 序号
 * @returns 递增序号
 */
const genSn = (index: number) => {
  return index += 1
}


/**
 * 逻辑删除
 * @param index 下标
 * @param row  记录
 */
const handleDelete = async (index: number, row: PayChannel) => {
  await service.removeById(row._id)
  notifyList.value = await service.page(current.value, size.value)
  delHint()
}

// 编辑
function handleEdit(index: number) {
  currentIndex.value = index
  redact.value = true
}

function verify() {
  if (appid.value === '') return ElMessage.error('请输入appid')

  if (channelname.value === '') return ElMessage.error('请输入渠道名称')

  if (channelMchId.value === '') return ElMessage.error('请输入商户号')

  if (channel.value === '') return ElMessage.error('请选择渠道状态')

  if (param.value === '') return ElMessage.error('请输入配置参数')

  saveHandler()
  empty()
  count()
  return
}

//添加
async function saveHandler() {
  const obj = new PayChannel
  obj.appId = appid.value
  obj.mchId = ''
  obj.channelName = channelname.value
  obj.channelMchId = channelMchId.value
  obj.returnUrl = ''
  obj.notifyUrl = ''
  obj.state = channel.value
  obj.param = JSON.parse(param.value)
  obj.updateTime = 0
  obj.remark = remark.value
  obj.delFlag = 0
  obj.createTime = Date.now()
  await service.addPayChannel(obj)

  addPageTable.value = false
  page(current.value)
}


//区分状态
const handlePayState = (row: PayChannel): string => {
  return getPayStatLabel(row.state)
}


 async function changeEdit() {

   if(notifyList.value[currentIndex.value].appId ==='')return ElMessage.error('appid不能为空')

   if(notifyList.value[currentIndex.value].channelName ==='')return ElMessage.error('渠道名称不能为空')

   if(notifyList.value[currentIndex.value].channelMchId ==='')return ElMessage.error('商户号不能为空')

  const obj = {
    appId: notifyList.value[currentIndex.value].appId,
    channelName: notifyList.value[currentIndex.value].channelName,
    channelMchId: notifyList.value[currentIndex.value].channelMchId,
    objstate: notifyList.value[currentIndex.value].state,
    remark: notifyList.value[currentIndex.value].remark,
    param: JSON.parse(notifyList.value[currentIndex.value].paramText) 
  }
  const a = await service.editPayChannel(obj, notifyList.value[currentIndex.value]._id)  
  redact.value = false
  return
}


//删除提示
const delHint = () => {
  ElMessage({
    message: '删除成功',
    type: 'success',
  })
  page(current.value)
  count()
}

//清空表单
function empty() {
  appid.value = ''
  channelname.value = ''
  channelMchId.value = ''
  channel.value = ''
  remark.value = ''
  param.value = ''
}

async function inquire() {
  const res = await service.searchTool(sta)
  if (sta === '') return page(current.value)
  if (res.ok == true) {
    notifyList.value = res.data
    notifyList.value.forEach(item => {
      item.paramText = JSON.stringify(item.param)
    })
  }
}


function change(val: string) {
  sta = val
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

    <div class="choice">
      <span class="size">支付类型：</span>
      <el-select v-model="wxPay" class="select" placeholder="支付类型" clearable>
        <el-option v-for="item in wxOptions" :key="item.wxPay" :label="item.label" :value="item.wxPay" />
      </el-select>

      <span class="size1">渠道状态：</span>
      <el-select v-model="channel" @change="change" class="select" placeholder="渠道状态" clearable>
        <el-option v-for="item in stateOptions" :key="item.channel" :label="item.state" :value="item.channel"
          clearable=true />
      </el-select>

      <div class="but">
        <el-button @click="inquire()" type="primary" icon="Search">搜索</el-button>
      </div>
    </div>

    <div class="addbox">
      <div>
        <el-button @click="addPageTable = true" type="primary">+ 新增</el-button>
      </div>



      <!-- 新增表单 -->
      <el-dialog v-model="addPageTable" title="新增">
        <el-form style="display: flex; flex-wrap: wrap">
          <div class="newadd"><span style="color: red">*</span>appid:</div>
          <el-input v-model="appid" placeholder="请输入 appid" style="width: 370px; padding: 0 30px 20px 15px" />
          <div class="newadd"><span style="color: red">*</span>渠道名称:</div>
          <el-input v-model="channelname" placeholder="请输入 渠道名称" style="width: 370px; padding: 0 30px 20px 15px" />
          <div class="newadd"><span style="color: red">*</span>商户号:</div>
          <el-input v-model="channelMchId" placeholder="请输入 渠道商户号" style="width: 370px; padding: 0 30px 20px 15px" />
          <div class="newadd"><span style="color: red">*</span>渠道状态:</div>
          <el-select v-model="channel" placeholder="请选择 渠道状态" style="width: 370px; padding: 0 30px 20px 15px">
            <el-option v-for="item in stateOptions" :key="item.channel" :label="item.state" :value="item.channel" />
          </el-select>
          <div class="newadd">备注:</div>
          <el-input v-model="remark" placeholder="请输入 备注" style="width: 325px; margin: 0 490px 20px 15px" />
          <div class="newadd"><span style="color: red">*</span>配置参数:</div>
          <el-input v-model="param" :rows="2" type="textarea" placeholder="请输入 扩展参数.json字符串"
            style="width: 820px; padding: 0 30px 20px 15px" />
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="addPageTable = false">取消</el-button>
            <el-button type="primary" @click="verify">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <div class="formbox">
      <el-table :data="notifyList" border style="width: 100%">
        <el-table-column label="序号" type="index" :sn="genSn" width="60" />
        <el-table-column label="appid" prop="appId" />
        <el-table-column label="渠道名称" prop="channelName" />
        <el-table-column label="商户号" prop="channelMchId" />
        <el-table-column label="渠道状态" prop="state" :formatter="handlePayState" />
        <el-table-column label="备注" prop="remark" />
        <el-table-column label="配置参数" prop="paramText" :show-overflow-tooltip="true" />
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column label="操作" prop="operation">
          <template #default="scope">
            <el-button @click="handleEdit(scope.$index)" size="small" icon="Edit" type="text">编辑</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)" size="small" type="text" icon="Delete">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="redact" title="编辑">
      <el-form :model="notifyList[currentIndex]" style="display: flex; flex-wrap: wrap">
        <div class="newadd">appid:</div>
        <el-input v-model="notifyList[currentIndex].appId" placeholder="请输入 appid"
          style="width: 370px; padding: 0 30px 20px 15px" />
        <div class="newadd">渠道名称:</div>
        <el-input v-model="notifyList[currentIndex].channelName" placeholder="请输入 渠道名称"
          style="width: 370px; padding: 0 30px 20px 15px" />
        <div class="newadd">商户号:</div>
        <el-input v-model="notifyList[currentIndex].channelMchId" placeholder="请输入 渠道商户号"
          style="width: 370px; padding: 0 30px 20px 15px" />
        <div class="newadd">渠道状态:</div>
        <el-select v-model="notifyList[currentIndex].state" placeholder="请输入 渠道状态"
          style="width: 370px; padding: 0 30px 20px 15px">
          <el-option v-for="item in stateOptions" :key="item.channel" :label="item.state" :value="item.channel" />
        </el-select>
        <div class="newadd">备注:</div>
        <el-input v-model="notifyList[currentIndex].remark" placeholder="请输入 备注"
          style="width: 325px; margin: 0 490px 20px 15px" />
        <div class="newadd">配置参数:</div>
        <el-input v-model="notifyList[currentIndex].paramText" :rows="2" type="textarea" placeholder="请输入 扩展参数.json字符串"
          style="width: 820px; padding: 0 30px 20px 15px" />
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="redact = false">取消</el-button>
          <el-button type="primary" @click="changeEdit()">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <div class="pages">
      <el-pagination :total="total" :page-size="size" @current-change="page" background
        layout="total, prev, pager, next, jumper" />
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
    margin: 0px 0 0 30px;
    font-size: 15px;
  }
}

.newadd {
  width: 80px;
  line-height: 30px;
  text-align: right;
}

.addbox {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  font-size: 15px;


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
