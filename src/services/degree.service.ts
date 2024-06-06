import useAuthStore from '@/store/auth-store';
import { connectTokenWithData, useApi } from "@/helpers/Base"

export const get_data = async () =>{
    try{
        const result = await useApi.post('degree.php?method=get-data', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const find_data = async (id: number) =>{
    try{
        const result = await useApi.post('degree.php?method=get-data', useAuthStore().auth, {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const delete_degree = async (ids: any) =>{
    try{
        const result = await useApi.post('degree.php?method=delete-degree', connectTokenWithData({ ids: (ids as Array<any>).join(',') }))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const create_degree = async (data: any) =>{
    try{
        const result = await useApi.post('degree.php?method=create-degree', connectTokenWithData(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const update_degree = async (data: any ,id: number) =>{
    try{
        const result = await useApi.post('degree.php?method=update-degree', connectTokenWithData(data), {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}