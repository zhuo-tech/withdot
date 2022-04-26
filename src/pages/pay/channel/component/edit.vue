<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useRoute, useRouter } from 'vue-router';
import { getLogger } from '@/main';
import { PayChannelOptions } from '@/model/PayChannelEnum';
import { PayChannelDo } from '@/pages/pay/channel/PayChannelDo';
import { PayChannelService } from "@/pages/pay/channel/PayChannelService";
import { ObjectUtil } from 'typescript-util';
const L = getLogger("支付渠道编辑");
const S = new PayChannelService();
const route = useRoute()
const router = useRouter()
type RouteParams = {
  id: string
}
const { id } = route.query as RouteParams
const o = new PayChannelDo()
const gotoRouter = ref('/pay/channel')
const channelRef = ref<FormInstance>()
const formState = reactive({
  channelForm: o,
  payChannelOptions: PayChannelOptions
})
const channelRule = reactive<FormRules>({
  channelName: [
    { required: true, message: '请输入渠道名称', trigger: 'blur' },
    { min: 2, max: 128, message: '长度在 2 到 128 个字符', trigger: 'blur' },
  ],
  appId: [
    { required: true, message: '请输入应用识别号', trigger: 'blur' },
    { min: 2, max: 128, message: '长度在 2 到 255 个字符', trigger: 'blur' },
  ],
  keyPem: [
    { required: true, message: '请输入Apiclient Key', trigger: 'blur' }
  ],
  certPem: [
    { required: true, message: '请输入Apiclient Cert', trigger: 'blur' }
  ],
  secret: [
    { required: true, message: '请输入应用密钥', trigger: 'blur' }
  ],
  partnerKey: [
    { required: true, message: '请输入支付密钥', trigger: 'blur' }
  ],
  channelMchId: [
    { required: true, message: '请输入商户号', trigger: 'blur' },
    { min: 2, max: 128, message: '长度在 2 到 255 个字符', trigger: 'blur' },
  ],
  channelId: [
    {
      required: true,
      message: '请选择支付类型',
      trigger: 'change',
    },
  ],
  state: [
    {
      required: true,
      message: '清选择渠道状态',
      trigger: 'change',
    },
  ],
  remark: [
    { min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur' },
  ],
})

const getPayChannelById = async (id: string) => {
  if (ObjectUtil.isNull(id)) {
    ElMessage.warning('参数不合法')
    return
  }
  const res = await S.getById(id)
  L.debug(`获取支付渠道详情信息 -> ${JSON.stringify(res)}`)
  formState.channelForm = res
  L.debug(`formState -> ${JSON.stringify(formState.channelForm)}`)
}

const goto = () => {
  router.push({ path: gotoRouter.value })
}

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (!valid) {
      ElMessage.warning('请检查表单数据是否填写完整')
      return
    }
    L.debug(`[channelForm] -> ${JSON.stringify(formState.channelForm)}`)
    S.updateById(formState.channelForm)
    ElMessage.success({
      message: '修改成功',
      type: 'success',
      duration: 2000
    })
    handleResetForm(formEl)
    goto()
  })
}

const handleResetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

onMounted(() => {
  getPayChannelById(id)
})

</script>
<template>
  <el-card class="good-container">
    <template #header>
      <div class="header">
        <el-link icon="ArrowLeft" @click="goto">返回</el-link>
      </div>
    </template>
    <el-form ref="channelRef" :model="formState.channelForm" :rules="channelRule" label-width="120px"
      class="demo-ruleForm" size="default">
      <el-form-item label="渠道名称" prop="channelName" size="large">
        <el-input v-model="formState.channelForm.channelName" placeholder="请输入渠道名称" />
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="应用识别号" prop="appId" size="large">
            <el-input v-model="formState.channelForm.appId" placeholder="请输入appid" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商户号" prop="channelMchId" size="large">
            <el-input v-model="formState.channelForm.channelMchId" placeholder="请输入商户号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="支付类型" prop="channelId" size="large">
            <el-select v-model="formState.channelForm.channelId" clearable placeholder="请选择支付类型" style="width: 600px">
              <el-option v-for="item in formState.payChannelOptions" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="渠道状态" prop="state" size="large">
            <el-select v-model="formState.channelForm.state" clearable placeholder="请选择渠道状态" style="width: 600px">
              <el-option label="正常" value="0" />
              <el-option label="禁用" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注" prop="remark" size="large">
        <el-input v-model="formState.channelForm.remark" type="textarea" />
      </el-form-item>
      <el-divider content-position="left">支付设置</el-divider>
      <el-form-item label="前端回调地址" prop="returnUrl" size="large">
        <el-input v-model="formState.channelForm.returnUrl" placeholder="请输入前端回调地址" />
      </el-form-item>
      <el-form-item label="后端回调地址" prop="notifyUrl" size="large">
        <el-input v-model="formState.channelForm.notifyUrl" placeholder="请输入后端回调地址" />
      </el-form-item>
      <el-form-item label="Apiclient Key" prop="keyPem" size="large">
        <el-input v-model="formState.channelForm.keyPem" type="textarea" />
      </el-form-item>
      <el-form-item label="Apiclient Cert" prop="certPem" size="large">
        <el-input v-model="formState.channelForm.certPem" type="textarea" />
      </el-form-item>
      <el-form-item label="应用密钥" prop="secret" size="large">
        <el-input v-model="formState.channelForm.secret" placeholder="请输入应用密钥" />
      </el-form-item>
      <el-form-item label="支付密钥" prop="partnerKey" size="large">
        <el-input v-model="formState.channelForm.partnerKey" placeholder="请输入支付密钥" />
      </el-form-item>
      <div class="btn">
        <el-form-item class="add-channel-btn">
          <el-button type="primary" @click="handleSubmit(channelRef)">提交</el-button>
          <el-button @click="handleResetForm(channelRef)">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-card>
</template>
<style lang="less" scoped>
.btn {
  float: right;
}
</style>
