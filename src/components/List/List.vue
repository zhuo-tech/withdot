<script lang="ts" setup>
import { CollUtil } from 'typescript-util'

/**
 * 渲染基础列表样式信息
 */
defineProps<{
    list: Array<any>
}>()
</script>

<template>
<div class="list-box">
    <div v-if=" CollUtil.isEmpty(list)">
        <el-empty></el-empty>
    </div>
    <div v-for="(item, index ) in list" :key="index" class="list-item">
        <div class="prefix">
            <slot name="prefix" :item="item" :index="index">

            </slot>
        </div>
        <div class="content">
            <slot name="content" :item="item" :index="index">
                {{ item }}
            </slot>
        </div>
        <div class="operating">
            <slot name="operating" :item="item" :index="index">
            </slot>
        </div>
    </div>
</div>
</template>

<style lang="sass" scoped>
.list-box
    display: flex
    flex-direction: column

    .list-item
        display: flex
        border-bottom: 1px solid rgba(104, 104, 104, 0.64)
        padding: 10px


        .content
            flex: 1 1 auto

        .operating,
        .prefix
            flex: 0 0 auto

        .prefix
            font-size: 30px
            padding-right: 15px

.list-box :last-child
    border-bottom: none

</style>
