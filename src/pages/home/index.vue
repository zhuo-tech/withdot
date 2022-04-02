<script lang="ts" setup>
import SelectMaterialModel from '@/pages/materials/SelectMaterialModel.vue'
import { useUserStore } from '@/store/user'
import HelloWorld from './hello-world.vue'

const user = useUserStore()
user.$patch({nickname: '微草轻课'})

</script>

<template>
<hello-world :msg="user['nickname']" />
<SelectMaterialModel />
</template>
