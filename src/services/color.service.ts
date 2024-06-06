import useAuthStore from '@/store/auth-store';
import { connectTokenWithData, useApi } from "@/helpers/Base"

export const get_data = async () =>{
    try{
        const result = await useApi.post('color.php?method=get-data', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const find_data = async (id: number) =>{
    try{
        const result = await useApi.post('color.php?method=get-data', useAuthStore().auth, {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const delete_color = async (ids: any) =>{
    try{
        const result = await useApi.post('color.php?method=delete-color', connectTokenWithData({ ids: (ids as Array<any>).join(',') }))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const create_color = async (data: any) =>{
    try{
        const result = await useApi.post('color.php?method=create-color', connectTokenWithData(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const update_color = async (data: any ,id: number) =>{
    try{
        const result = await useApi.post('color.php?method=update-color', connectTokenWithData(data), {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}