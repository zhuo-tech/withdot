<script lang="ts" setup>
import QuestionService from '@/pages/question/QuestionService'
import { reactive } from 'vue'
import QueryForm from './components/QueryForm.vue'
import Form from './components/Form.vue'

const service = reactive(new QuestionService())
</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div>题库管理</div>
        </template>
        <!--功能栏-->
        <QueryForm :service="service" />
    </el-card>
    <Form :service="service" />
</template>

<style lang="less" scoped>
</style>
