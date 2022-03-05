import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useSideMenuStore = defineStore('sideMenu', () => {
    const collapse = ref(false)

    return { collapse }
})