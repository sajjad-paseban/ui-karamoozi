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

export const get_data = async () =>{
    try{
        const result = await useApi.post('user.php?method=get-data', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const find_data = async (id: number) =>{
    try{
        const result = await useApi.post('user.php?method=get-data', useAuthStore().auth, {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const delete_user = async (ids: any) =>{
    try{
        const result = await useApi.post('user.php?method=delete-user', connectTokenWithData({ ids: (ids as Array<any>).join(',') }))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const create_user = async (data: any) =>{
    try{
        const result = await useApi.post('user.php?method=create-user', connectTokenWithData(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const update_user = async (data: any ,id: number) =>{
    try{
        const result = await useApi.post('user.php?method=update-user', connectTokenWithData(data), {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const reset_password = async (user_id: number) =>{
    try{
        const result = await useApi.post('user.php?method=reset-password', connectTokenWithData({ id: user_id }))
        
        return result

    }catch(res: any){
        return res.response
    }
}