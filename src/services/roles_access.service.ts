import useAuthStore from '@/store/auth-store';
import { connectTokenWithData, useApi } from "@/helpers/Base"

export const get_data = async () =>{
    try{
        const result = await useApi.post('roles_access.php?method=get-data', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const find_data = async (id: number) =>{
    try{
        const result = await useApi.post('roles_access.php?method=get-data', useAuthStore().auth, {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const delete_role_access = async (ids: any) =>{
    try{
        const result = await useApi.post('roles_access.php?method=delete-role-access', connectTokenWithData({ ids: (ids as Array<any>).join(',') }))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const create_role_access = async (data: any) =>{
    try{
        const result = await useApi.post('roles_access.php?method=create-role-access', connectTokenWithData(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const update_role_access = async (data: any ,id: number) =>{
    try{
        const result = await useApi.post('roles_access.php?method=update-role-access', connectTokenWithData(data), {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}