<script lang="ts" setup>
import { getLogger } from '@/main'
import { ref } from "vue"
import { cloud } from '@/cloud'
import { PayNotifyRecordService } from '../service/PayNotifyRecordService'

const log = getLogger('支付通知')

const DB = cloud.database() // 数据库


const PayOdd = ref("")//支付单号


const tableData = ref()//表单

//清空单号
function sweepaway() {
    PayOdd.value = ''
}

//隐藏搜索
const hide = ref(true)
function showhide() {
    hide.value = !hide.value
}


//刷新
const controlRefresh = ref(false)
const openFullScreen1 = () => {
    controlRefresh.value = true
    setTimeout(() => {
        controlRefresh.value = false
    }, 2000)
}

//获取数据
const list = async () => {
    const service = new PayNotifyRecordService()
    tableData.value = await service.list()
    let sortord = 1
    tableData.value.forEach((item: { sort: number }) => {
        item.sort = sortord
        sortord++
    })

}
list()
</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <h1>支付通知</h1>
            </div>
        </template>
        <div v-show="hide" class="choice">
            <span class="size1">支付单号：</span>
            <el-input style="width: 276px;" v-model="PayOdd" placeholder="支付单号" />

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
                    <el-button class="lod" v-loading.fullscreen.lock="controlRefresh" type="primary"
                        @click="openFullScreen1">
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
                <el-table-column prop="notifyId" label="响应" />
                <el-table-column prop="orderNo" label="订单号" />
                <el-table-column prop="request" label="回调报文" />
                <el-table-column prop="response" label="响应报文" />
                <el-table-column prop="createTime" label="创建时间" />
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
        margin-top: 10px;
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

