import { ref } from 'vue';
import { defineStore } from 'pinia';

const useUserStore = defineStore('user-store', () => {
    const user = ref(null)

    const set_user = (data: any)=>{
        user.value = data
    }

    const clear_user = () =>{
        user.value = null
    }

    return {
        user,
        set_user,
        clear_user
    }
})

export default useUserStore;