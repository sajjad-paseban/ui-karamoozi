import useAuthStore from '@/store/auth-store';
import { connectTokenWithData, useApi } from "@/helpers/Base"

export const get_data = async () =>{
    try{
        const result = await useApi.post('group.php?method=get-data', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const find_data = async (id: number) =>{
    try{
        const result = await useApi.post('group.php?method=get-data', useAuthStore().auth, {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const delete_group = async (ids: any) =>{
    try{
        const result = await useApi.post('group.php?method=delete-uni-group', connectTokenWithData({ ids: (ids as Array<any>).join(',') }))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const create_group = async (data: any) =>{
    try{
        const result = await useApi.post('group.php?method=create-uni-group', connectTokenWithData(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const update_group = async (data: any ,id: number) =>{
    try{
        const result = await useApi.post('group.php?method=update-uni-group', connectTokenWithData(data), {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}