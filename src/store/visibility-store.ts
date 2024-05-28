import { ref } from 'vue';
import { IVisibility } from './../helpers/Interfaces';
import { defineStore } from "pinia";

export const useVisibilityStore = defineStore('visibility-store',()=>{
    const status = ref<IVisibility[]>([
        { id: 'panel-menu' , status: false }
    ])

    function get_status(id: string){
        return status.value.filter((item) => item.id == id)[0].status
    }
    
    function set_status(id: string, bool: boolean){
        status.value.map(item => {
            if(item.id == id)
                item.status = bool
        })
    }

    return {
        status,
        get_status,
        set_status
    }
})