import useAuthStore from '@/store/auth-store';
import { connectTokenWithData, useApi } from "@/helpers/Base"

export const get_data = async () =>{
    try{
        const result = await useApi.post('contactus.php?method=get-data', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const find_data = async (id: number) =>{
    try{
        const result = await useApi.post('contactus.php?method=get-data', useAuthStore().auth, {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const delete_contactus = async (ids: any) =>{
    try{
        const result = await useApi.post('contactus.php?method=delete-contact-us', connectTokenWithData({ ids: (ids as Array<any>).join(',') }))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const create_contactus = async (data: any) =>{
    try{
        const result = await useApi.post('contactus.php?method=create-contact-us', connectTokenWithData(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const update_contactus = async (data: any ,id: number) =>{
    try{
        const result = await useApi.post('contactus.php?method=update-contact-us', connectTokenWithData(data), {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const change_status = async (data: any ,id: number) =>{
    try{
        const result = await useApi.post('contactus.php?method=change-status', connectTokenWithData(data), {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}