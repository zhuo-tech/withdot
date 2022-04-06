<script lang="ts" setup>
import { getUserInfo }  from '@/api/token'
import { ElMessage } from 'element-plus'
import { onMounted } from 'vue'

const getInfo = () => {
    getUserInfo().then(response=>{
        console.log(response)
    }).catch(err=>{
        ElMessage.error(err)
    })
}
onMounted(()=>{
    getInfo()
})
</script>

<template>
    <div>账户信息</div>
</template>

<style lang="less" scoped></style>
