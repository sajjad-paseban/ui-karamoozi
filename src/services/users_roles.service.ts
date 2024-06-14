import useAuthStore from '@/store/auth-store';
import { connectTokenWithData, useApi } from "@/helpers/Base"

export const get_data = async () =>{
    try{
        const result = await useApi.post('users_roles.php?method=get-data', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const find_data = async (id: number) =>{
    try{
        const result = await useApi.post('users_roles.php?method=get-data', useAuthStore().auth, {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const delete_users_roles = async (ids: any) =>{
    try{
        const result = await useApi.post('users_roles.php?method=delete-users-roles', connectTokenWithData({ ids: (ids as Array<any>).join(',') }))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const create_users_roles = async (data: any) =>{
    try{
        const result = await useApi.post('users_roles.php?method=create-users-roles', connectTokenWithData(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const update_users_roles = async (data: any ,id: number) =>{
    try{
        const result = await useApi.post('users_roles.php?method=update-users-roles', connectTokenWithData(data), {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const get_user_roles = async () =>{
    try{
        const result = await useApi.post('users_roles.php?method=get-user-roles', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const update_user_default_role = async (role_id: number) =>{
    try{
        const result = await useApi.post('users_roles.php?method=update-default-user-role', connectTokenWithData({ role_id: role_id }))
        
        return result

    }catch(res: any){
        return res.response
    }
}