<script lang="ts" setup>
import WxAccountService from '@/pages/weixin/account/WxAccountService'
import { CollUtil } from 'typescript-util'
import { reactive } from 'vue'

const props = defineProps<{
    value: String
    autoSelectFirst: Boolean
}>()
const emits = defineEmits<{
    (event: 'update', value: string): void
    (event: 'update:value', value: string): void
    (event: 'select', value: Object): void
}>()

function emitsWork(item: { label: string, value: string } & Record<string, any>) {
    emits('update', item.value)
    emits('update:value', item.value)
    emits('select', item)
}

const elTreeData = reactive({
    ref: null,
    treeProps: {},
    // 没用...
    currentNodeKey: props.value,
    treeData: [],
    onClick(data: any) {
        emitsWork(data)
    },
})

new WxAccountService()
    .listAll()
    .then(list => {
        elTreeData.treeData = list.map(i => ({label: `${ i.name } - ${ i.account }`, value: i._id, data: i})) as any
        if (CollUtil.isNotEmpty(list) && props.autoSelectFirst) {
            const selectData = elTreeData.treeData[0]
            const key = selectData['value']
            elTreeData.currentNodeKey = key
            // @ts-ignore
            elTreeData.ref?.['setCurrentKey'](key)
            emitsWork(selectData)
        }
    })
</script>

<template>
<el-tree :ref="(e) => elTreeData.ref = e"
         :current-node-key="elTreeData.currentNodeKey"
         :data="elTreeData.treeData"
         :props="elTreeData.treeProps"
         default-expand-all
         highlight-current
         node-key="value"
         @node-click="elTreeData.onClick" />
</template>

<style lang="sass" scoped>
:deep(.el-tree-node__content)
    height: 60px
</style>
