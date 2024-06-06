import useAuthStore from '@/store/auth-store';
import { connectTokenWithData, useApi } from "@/helpers/Base"

export const get_data = async () =>{
    try{
        const result = await useApi.post('role.php?method=get-data', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const find_data = async (id: number) =>{
    try{
        const result = await useApi.post('role.php?method=get-data', useAuthStore().auth, {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const delete_role = async (ids: any) =>{
    try{
        const result = await useApi.post('role.php?method=delete-role', connectTokenWithData({ ids: (ids as Array<any>).join(',') }))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const create_role = async (data: any) =>{
    try{
        const result = await useApi.post('role.php?method=create-role', connectTokenWithData(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const update_role = async (data: any ,id: number) =>{
    try{
        const result = await useApi.post('role.php?method=update-role', connectTokenWithData(data), {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}