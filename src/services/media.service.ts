import useAuthStore from '@/store/auth-store';
import { connectTokenWithData, useApi } from "@/helpers/Base"

export const get_data = async () =>{
    try{
        const result = await useApi.post('media.php?method=get-data', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const find_data = async (id: number) =>{
    try{
        const result = await useApi.post('media.php?method=get-data', useAuthStore().auth, {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const delete_media = async (id: any) =>{
    try{
        const result = await useApi.post('media.php?method=delete-media', connectTokenWithData({ id: id }))
        return result

    }catch(res: any){
        return res.response
    }
}

export const create_media = async (data: any) =>{
    try{
        const formData = new FormData();
        formData.append('user_id', useAuthStore().auth.user_id)
        formData.append('token', useAuthStore().auth.token)
        Object.entries(data).map((item: any) => formData.append(item[0], item[1]))

        const result = await useApi.post('media.php?method=create-media', formData)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const update_media = async (data: any ,id: number) =>{
    try{
        const result = await useApi.post('media.php?method=update-media', connectTokenWithData(data), {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}