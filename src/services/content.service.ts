import useAuthStore from '@/store/auth-store';
import { connectTokenWithData, useApi } from "@/helpers/Base"

export const get_data = async () =>{
    try{
        const result = await useApi.post('content.php?method=get-data', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const find_data = async (id: number) =>{
    try{
        const result = await useApi.post('content.php?method=get-data', useAuthStore().auth, {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const delete_content = async (ids: any) =>{
    try{
        const result = await useApi.post('content.php?method=delete-content', connectTokenWithData({ ids: (ids as Array<any>).join(',') }))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const create_content = async (data: any) =>{
    try{
        const formData = new FormData();
        formData.append('user_id', useAuthStore().auth.user_id)
        formData.append('token', useAuthStore().auth.token)
        Object.entries(data).map((item: any) => formData.append(item[0], item[1]))

        const result = await useApi.post('content.php?method=create-content', formData)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const update_content = async (data: any ,id: number) =>{
    try{
        const formData = new FormData();
        formData.append('user_id', useAuthStore().auth.user_id)
        formData.append('token', useAuthStore().auth.token)
        Object.entries(data).map((item: any) => formData.append(item[0], item[1]))
        
        const result = await useApi.post('content.php?method=update-content', formData, {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}