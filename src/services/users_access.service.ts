import useAuthStore from '@/store/auth-store';
import { connectTokenWithData, useApi } from "@/helpers/Base"

export const get_data = async () =>{
    try{
        const result = await useApi.post('users_access.php?method=get-data', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const find_data = async (id: number) =>{
    try{
        const result = await useApi.post('users_access.php?method=get-data', useAuthStore().auth, {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const delete_user_access = async (ids: any) =>{
    try{
        const result = await useApi.post('users_access.php?method=delete-user-access', connectTokenWithData({ ids: (ids as Array<any>).join(',') }))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const create_user_access = async (data: any) =>{
    try{
        const result = await useApi.post('users_access.php?method=create-user-access', connectTokenWithData(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const update_user_access = async (data: any ,id: number) =>{
    try{
        const result = await useApi.post('users_access.php?method=update-user-access', connectTokenWithData(data), {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}