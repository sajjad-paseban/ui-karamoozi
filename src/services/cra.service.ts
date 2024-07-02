import useAuthStore from '@/store/auth-store';
import { connectTokenWithData, useApi } from "@/helpers/Base"

export const get_data = async () =>{
    try{
        const result = await useApi.post('company_registration_application.php?method=get-data', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const find_data = async (id: number) =>{
    try{
        const result = await useApi.post('company_registration_application.php?method=get-data', useAuthStore().auth, {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const delete_cra = async (ids: any) =>{
    try{
        const result = await useApi.post('company_registration_application.php?method=delete-company-registration-application', connectTokenWithData({ ids: (ids as Array<any>).join(',') }))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const create_cra = async (data: any) =>{
    try{
        const result = await useApi.post('company_registration_application.php?method=create-company-registration-application', connectTokenWithData(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const update_cra = async (data: any ,id: number) =>{
    try{
        const result = await useApi.post('company_registration_application.php?method=update-company-registration-application', connectTokenWithData(data), {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}