<template>
  <el-card class="order-container">
    111
  </el-card>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'StudentDetail',
  setup() {
    const route = useRoute()
    const { id } = route.query
    const state = reactive({
      data: {},
      tableData: []
    })
    onMounted(() => {
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>
</style>