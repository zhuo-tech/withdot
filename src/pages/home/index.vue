<script setup lang="ts">
import HelloWorld from './hello-world.vue'
import { useUserStore } from '@/store/user'

const user = useUserStore()
user.$patch({nickname: '微草轻课'})

</script>

<template>
<hello-world :msg="user.nickname" />
</template>

<style scoped lang="less">

</style>
