<script lang="ts" setup>
import { getLogger } from '@/main'
import { reactive, ref } from 'vue'
import { cloud } from '@/cloud'
import { PayChannel } from '@/model/entity/PayChannel'
import { PayChannelService } from '../service/PayChannelService'

const log = getLogger('支付渠道')

const DB = cloud.database() // 数据库

//支付类型选项
const value = ref('')
const options = [
    {
        value: 'wx',
        label: '微信公众号支付',
    },
]
const value1 = ref('')//渠道状态
const options1 = [
    {
        value1: 'normal',
        label1: '正常',
    },
    {
        value1: 'congelation',
        label1: '冻结',
    },
]
const dialogTableVisible = ref(false)//新增
const dialogFormVisible = ref(false)
const input = ref('')



const PayChannelForm = reactive({
    o: PayChannel,
})
const hide = ref(true)//搜索显隐
//表单参数
// let tableData = reactive([]) as Array<PayChannel>
const tableData = ref()
//刷新
const fullscreenLoading = ref(false)

//清空状态
function sweepaway() {
    value.value = ''
    value1.value = ''
}

const list = async () => {
    const service = new PayChannelService()
    tableData.value = await service.list()
     console.log(tableData.value,"数据");
    let sortord = 1
    tableData.value.forEach((item: { sort: number })=> {
        item.sort= sortord
         sortord++
    });
}

function showhide() {
    hide.value = !hide.value
}

const openFullScreen1 = () => {
    fullscreenLoading.value = true
    setTimeout(() => {
        fullscreenLoading.value = false
    }, 2000)
}

async function saveHandler() {
    const o = PayChannelForm
    console.log(o)
    await DB.collection(PayChannel.TABLE_NAME).add({
        o,
    })
    dialogFormVisible.value = false
}

list()
</script>

<template>

    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <h1>支付渠道</h1>
            </div>
        </template>
           <paychannel/>
    
    <div v-show="hide" class="choice">
        <span class="size">支付类型：</span>
        <el-select v-model="value" class="select" placeholder="支付类型">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <span class="size1">渠道状态：</span>
        <el-select v-model="value1" class="select" placeholder="渠道状态">
            <el-option v-for="item in options1" :key="item.value1" :label="item.label1" :value="item.value1" />
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
        <div class="add" @click="dialogFormVisible = true">
            <div class="addbut">+ 新增</div>
        </div>

        <!-- Form -->
        <el-dialog v-model="dialogFormVisible" title="新增">
            <el-form :model="PayChannelForm" style="display: flex; flex-wrap: wrap">
                <div class="newadd">appid:</div>
                <el-input v-model="input" placeholder="请输入 appid" style="width: 370px; padding: 0 30px 20px 15px" />
                <div class="newadd">支付类型:</div>
                <el-input v-model="input" placeholder="请输入 支付类型" style="width: 370px; padding: 0 30px 20px 15px" />
                <div class="newadd">渠道名称:</div>
                <el-input v-model="input" placeholder="请输入 渠道名称" style="width: 370px; padding: 0 30px 20px 15px" />
                <div class="newadd">商户号:</div>
                <el-input v-model="input" placeholder="请输入 渠道商户号" style="width: 370px; padding: 0 30px 20px 15px" />
                <div class="newadd">渠道状态:</div>
                <el-select v-model="value1" placeholder="请输入 渠道状态" style="width: 370px; padding: 0 30px 20px 15px">
                    <el-option v-for="item in options1" :key="item.value1" :label="item.label1" :value="item.value1" />
                </el-select>
                <div class="newadd">备注:</div>
                <el-input v-model="input" placeholder="请输入 备注" style="width: 370px; padding: 0 30px 20px 15px" />

                <div class="newadd">配置参数:</div>
                <el-input v-model="input" placeholder="请输入 扩展参数.json字符串" style="width: 820px; padding: 0 30px 20px 15px" />
            </el-form>

            <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="saveHandler">确定</el-button>
        </span>
            </template>
        </el-dialog>

        <div class="hintbox">
            <el-tooltip content="刷新" effect="dark" placement="top">
                <el-button v-loading.fullscreen.lock="fullscreenLoading" class="lod" type="primary" @click="openFullScreen1">
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
            <el-table-column label="支付类型" prop="payment" />
            <el-table-column label="渠道名称" prop="channelname" />
            <el-table-column label="商户号" prop="channelMchId" />
            <el-table-column label="渠道状态" prop="channelstate" />
            <el-table-column label="备注" prop="remark" />
            <el-table-column label="配置参数" prop="parameter" />
            <el-table-column label="创建时间" prop="createTime" />
            <el-table-column label="操作" prop="operation">
                <template #default>
                    <el-button size="small" type="text">查看</el-button>
                    <el-button size="small" type="text">编辑</el-button>
                    <el-button size="small" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="pages">
        <el-pagination :total="1" background layout="total, sizes, prev, pager, next, jumper" />
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

    .newadd {
        width: 80px;
        line-height: 30px;
        text-align: right;
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
