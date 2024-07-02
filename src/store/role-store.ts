import { ref } from 'vue';
import { defineStore } from 'pinia';
const useRoleStore = defineStore('role-store', ()=>{
    const role:any = ref(null)
    
    const set_role = (data: any) =>{
        role.value = data
    }

    const clear_role = () => {
        role.value = null
    }

    return {
        role,
        set_role,
        clear_role
    }
},{
    persist: true
})

export default useRoleStore