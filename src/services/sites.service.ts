import useAuthStore from '@/store/auth-store';
import { connectTokenWithData, useApi } from "@/helpers/Base"

export const get_data = async () =>{
    try{
        const result = await useApi.post('site.php?method=get-data', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const find_data = async (id: number) =>{
    try{
        const result = await useApi.post('site.php?method=get-data', useAuthStore().auth, {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const delete_site = async (ids: any) =>{
    try{
        const result = await useApi.post('site.php?method=delete-site', connectTokenWithData({ ids: (ids as Array<any>).join(',') }))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const create_site = async (data: any) =>{
    try{
        const result = await useApi.post('site.php?method=create-site', connectTokenWithData(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const update_site = async (data: any ,id: number) =>{
    try{
        const result = await useApi.post('site.php?method=update-site', connectTokenWithData(data), {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}