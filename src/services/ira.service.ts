import useAuthStore from '@/store/auth-store';
import { connectTokenWithData, useApi } from "@/helpers/Base"

export const get_data = async () =>{
    try{
        const result = await useApi.post('intern_recruitment_application.php?method=get-data', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const find_data = async (id: number) =>{
    try{
        const result = await useApi.post('intern_recruitment_application.php?method=get-data', useAuthStore().auth, {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const find_data_by_user_id = async () =>{
    try{
        const result = await useApi.post('intern_recruitment_application.php?method=get-data-by-user-id', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const delete_ira = async (ids: any) =>{
    try{
        const result = await useApi.post('intern_recruitment_application.php?method=delete-intern-recruitment-application', connectTokenWithData({ ids: (ids as Array<any>).join(',') }))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const create_ira = async (data: any) =>{
    try{
        const result = await useApi.post('intern_recruitment_application.php?method=create-intern-recruitment-application', connectTokenWithData(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const change_status_ira = async (data: any ,id: number) =>{
    try{
        const result = await useApi.post('intern_recruitment_application.php?method=change-status-intern-recruitment-application', connectTokenWithData(data), {
            params: { ira_id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}