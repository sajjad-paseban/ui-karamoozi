import useAuthStore from '@/store/auth-store';
import { connectTokenWithData, useApi } from "@/helpers/Base"

export const get_data = async () =>{
    try{
        const result = await useApi.post('menu.php?method=get-data', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const find_data = async (id: number) =>{
    try{
        const result = await useApi.post('menu.php?method=get-data', useAuthStore().auth, {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const delete_menu = async (ids: any) =>{
    try{
        const result = await useApi.post('menu.php?method=delete-menu', connectTokenWithData({ ids: (ids as Array<any>).join(',') }))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const create_menu = async (data: any) =>{
    try{
        const result = await useApi.post('menu.php?method=create-menu', connectTokenWithData(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const update_menu = async (data: any ,id: number) =>{
    try{
        const result = await useApi.post('menu.php?method=update-menu', connectTokenWithData(data), {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}