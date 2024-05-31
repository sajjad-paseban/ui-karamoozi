import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSiteStore = defineStore('site-store', () => {
    const site = ref(null);
    
    function set_site(data: any){
        site.value = data
    }
    
    function clear_site(){
        site.value = null
    }

    return {
        site,
        set_site,
        clear_site
    }
},{
    persist: true
})