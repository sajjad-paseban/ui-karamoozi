import useAuthStore from '@/store/auth-store';
import { connectTokenWithData, useApi } from "@/helpers/Base"

export const get_data = async () =>{
    try{
        const result = await useApi.post('stu_semesters.php?method=get-data', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const find_data = async (id: number) =>{
    try{
        const result = await useApi.post('stu_semesters.php?method=get-data', useAuthStore().auth, {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const get_users_by_role = async (role_id: number) =>{
    try{
        const result = await useApi.post('stu_semesters.php?method=get-users-by-role', useAuthStore().auth, {
            params: { role_id: role_id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const delete_stu_semesters = async (ids: any) =>{
    try{
        const result = await useApi.post('stu_semesters.php?method=delete-stu-semesters', connectTokenWithData({ ids: (ids as Array<any>).join(',') }))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const create_stu_semesters = async (data: any) =>{
    try{
        const result = await useApi.post('stu_semesters.php?method=create-stu-semesters', connectTokenWithData(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const update_stu_semesters = async (data: any ,id: number) =>{
    try{
        const result = await useApi.post('stu_semesters.php?method=update-stu-semesters', connectTokenWithData(data), {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}