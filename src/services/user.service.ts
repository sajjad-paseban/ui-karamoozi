import useAuthStore from '@/store/auth-store';
import { connectTokenWithData, useApi } from "@/helpers/Base"

export const get_info = async (data: any) =>{
    try{
        const result = await useApi.post('user.php?method=get-info', JSON.stringify(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const update_user_info = async (data: any) =>{
    try{
        const result = await useApi.post('user.php?method=update-user-info', JSON.stringify(connectTokenWithData(data)))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const upload_profile_picture = async (data: any) =>{
    try{
        const formData = new FormData()
        formData.append('user_id', useAuthStore().auth.user_id)
        formData.append('token', useAuthStore().auth.token)
        formData.append('image', data.image)

        const result = await useApi.post('user.php?method=profile-picture-upload', formData)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const remove_profile_picture = async () =>{
    try{

        const result = await useApi.post('user.php?method=remove-profile-picture', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}