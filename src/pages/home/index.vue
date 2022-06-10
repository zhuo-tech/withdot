<script lang="ts" setup>
import { ref, reactive, } from "vue"
import { studentSum } from "../../model/entity/studentSum"
import { PayGoodsOrder } from "../../model/entity/PayGoodsOrder"
import { PayGoodsOrderQo } from "@/pages/pay/goods/PayGoodsOrderQo"
import { PayGoodsOrderService } from "@/model/entity/AlbumSlod";
import { acquire } from "@/model/entity/AlbumSlod";
import { PlayNumber } from "../../model/entity/PlayNumber"

//播放量
const play = ref(0)
//学员数量
const studentCount = ref(0)
//专辑售出
const sold = ref(0)
//收入总数
const income = ref(0)
//分页,每页有多少行
const Q = new PayGoodsOrderQo(1, 10)
//分页查询
const S = new PayGoodsOrderService();
//获取用户选择的时间
const value2 = ref()


const data = reactive({
    list: Array<PayGoodsOrder>(),//获取数据
    listLoading: true,//数据加载动画
    queryParam: Q,//分页参数
    total: 0,//总条数

})



//总播放量
async function inquirePaly() {
    const res = await PlayNumber()
    play.value = res.data.length
}


//日期查询函数
async function changgetime(val:any){
    if(val==null)return
    const starTime =  Date.parse(val[0])
    const endTime = Date.parse(val[1])
    handlePage(data.queryParam,starTime,endTime)
}

//获取学员数量
async function inquire() {
    const res = await studentSum()
    studentCount.value = res.data.length

}


async function topStatistics() {
    const r = await acquire()
    sold.value = r.data.length //获取专辑售出数量
    r.data.forEach(item => {// 获取总收入
      let total = Number(income.value) + Number(item.amount)
      income.value = Number(total.toFixed(2))
    })
}
      const handleSizeChange = (size: number) => {
            data.queryParam.size = size
            handlePage(data.queryParam)
        }


async function handlePage(queryParam: PayGoodsOrderQo,starTime?:number,endTime?:number) {
    data.listLoading = true //获取数据加载动画
    const res = await S.page(queryParam,starTime,endTime);
    res.record.forEach(item => {//获取状态转换成中文
        if(item.status==='0')item.status='待支付'
        if(item.status==='1')item.status='支付成功'
        if(item.status==='2')item.status='支付完成'
        if(item.status==='-1')item.status='支付失败'
        if(item.status==='-2')item.status='支付取消'
    })
        res.record.forEach(item => {   //转换时间
         item.createTime = formatDate(
            new Date(item.createTime)
        )
    })
    data.list = res.record ?? [] //获取数据
    data.listLoading = false     //关闭加载动画
    data.total = res.total ?? 0
}



//时间戳转换时间
 function formatDate(now:any) {
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const date = now.getDate();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}


//分页回调
function handleCurrentChange(current: number) {
    data.queryParam.current = current
    handlePage(data.queryParam)
}

topStatistics()
handlePage(data.queryParam)
inquire()//获取学员数量
inquirePaly()


</script>

<template>
    <el-card style="margin: 0 20px 20px 20px;border-radius:20px">
        <div class="top">
            <div class="card">
                <div class="text">总播放量</div>
                <div style="color: rgba(255, 77, 79, 1)" class="number">
                    {{play}}
                </div>
            </div>
            <div class="card">
                <div class="text">专辑售出</div>
                <div style="color: rgba(255, 149, 2, 1)" class="number">
                    {{ sold }}
                </div>
            </div>
            <div class="card">
                <div class="text">学员数量</div>
                <div style="color: rgba(255, 203, 1, 1)" class="number">
                    {{ studentCount }}
                </div>
            </div>
            <div class="card">
                <div class="text">收入(元)</div>
                <div style="color: rgba(255, 77, 79, 1)" class="number">
                    {{ income }}
                </div>
            </div>
        </div>
    </el-card>
    <el-card style="margin: 0 20px 20px 20px;border-radius:20px">
        <div class="title">
            <div class="tableName">收入明细</div>
            <div class="picker">
                <el-date-picker  @change="changgetime" v-model="value2" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
                    :default-value="[
                        new Date(),
                    ]" />
            </div>
        </div>
        <el-table  v-loading="data.listLoading"  :data="data.list" style="width: 100%">
            <el-table-column prop="goodsName" label="专辑" width="350"  />
            <el-table-column prop="amount" label="金额" width="350" />
            <el-table-column prop="createTime" label="日期" width="350" />
            <el-table-column label="状态"  width="150">
                <template #default="scope">
                    <el-tag disable-transitions>{{ scope.row.status }}
                    </el-tag>
                </template>
            </el-table-column>
        </el-table>
        <div class="paging">
               <el-pagination  :total="data.total"  v-model:page="data.queryParam.current"
                v-model:limit="data.queryParam.size" @size-change="handleSizeChange"  @current-change="handleCurrentChange"
                background layout="total,  prev, pager, next" />
        </div>
    </el-card>
</template>

<style lang="less" scoped>
.top {
    margin: 0 0 20px 0;
    display: flex;
    justify-content: space-around;

    .card {
        width: 200px;
        height: 172px;
        box-shadow: rgb(152 152 152 / 12%) 0px 0px 12px 0px;
        border-radius: 20px;

        .text {
            text-align: center;
            padding: 30px 0 0 0px;
            font-weight: 700;
            font-size: 18px;
            color: rgb(25, 39, 48);
        }

        .number {
            width: 100%;
            font-weight: 400;
            font-size: 40px;
            text-align: center;
            margin: 20px 0 0 0;
        }
    }
}

.title {
    display: flex;
    justify-content: space-between;
    margin: 0 0 20px 0;

    .tableName {
        font-weight: 700;
        font-size: 18px;
        color: rgb(25, 39, 48);
    }

    .picker {
        margin: 0 120px 0 0px;
    }
}

.paging {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0 0 0;
}
</style>
