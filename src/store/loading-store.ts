import { ref } from 'vue';
import { defineStore } from 'pinia';
const useLoadingStore = defineStore('loading-store', ()=>{
    const loading:any = ref(false)
    
    const toggle_loading = () =>{
        loading.value = !loading.value
    }

    const setLoading = (flag: boolean) =>{
        loading.value = flag
    }

    return {
        loading,
        toggle_loading,
        setLoading
    }
})

export default useLoadingStore