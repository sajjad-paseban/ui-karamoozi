import { ref } from 'vue';
import { defineStore } from "pinia";

const useAuthStore = defineStore('auth-store', () => {
    const auth = ref<any>({
        user_id: null,
        token: null
    })

    const set_auth = (user_id: number, token: string) =>{
        auth.value.user_id = user_id
        auth.value.token = token
    }
    
    const clear_auth = () => {
        auth.value = {
            user_id: null,
            token: null
        }
    }


    return {
        auth,
        set_auth,
        clear_auth
    }
},{
    persist: true
})

export default useAuthStore;