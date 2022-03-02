import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useUserStore = defineStore('user', () => {
    const nickname = ref('')
    const username = ref('')
    const phone = ref('')
    const avatar = ref('')

    return { nickname, username, phone, avatar}
})