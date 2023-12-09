import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const isTech = ref(false);
    const id = ref('');
    function setIsTech(tech:boolean) {
        isTech.value = tech;
    }
    function setId(userId:string) {
        id.value = userId;
    }

    return {id, isTech, setIsTech, setId }
})