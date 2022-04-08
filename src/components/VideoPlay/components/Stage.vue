<script lang="ts" setup>
import Draggable from '@/components/VideoPlay/components/Draggable.vue'
import { onMounted, reactive, Ref, ref } from 'vue'

const prop = defineProps<{
    list: Array<Record<string, any>>
}>()

const boxRef: Ref<HTMLDivElement> = ref({} as any)

const parentBoxProperties = reactive({
    width: 0,
    height: 0,
})

function update() {

    const {offsetWidth: w, offsetHeight: h, scrollHeight, scrollWidth, clientWidth, clientHeight} = boxRef.value
    parentBoxProperties.width = w
    parentBoxProperties.height = h

    console.debug('????', window.getComputedStyle(boxRef.value).getPropertyValue('height'))

    console.debug('重设盒子宽高...', parentBoxProperties)
    console.debug('重设盒子宽高...', {scrollWidth, scrollHeight})
    console.debug('重设盒子宽高...', {clientWidth, clientHeight})
    console.debug('重设盒子宽高...', boxRef.value.getBoundingClientRect())
}

onMounted(update)

</script>

<template>
<div ref="boxRef" class="stage-box" @resize="update">
    <Draggable v-for="(item, index) in list"
               :key="index"
               :index="index"
               :item="item"
               :parent-box-properties="parentBoxProperties" />
</div>
</template>

<style lang="sass" scoped>
.stage-box > *
    position: absolute

.stage-box
    pointer-events: none
    width: 100%
    height: 100%
    position: relative
</style>
