import useAuthStore from '@/store/auth-store';
import { connectTokenWithData, useApi } from "@/helpers/Base"

export const get_data = async () =>{
    try{
        const result = await useApi.post('semester.php?method=get-data', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const find_data = async (id: number) =>{
    try{
        const result = await useApi.post('semester.php?method=get-data', useAuthStore().auth, {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const delete_semester = async (ids: any) =>{
    try{
        const result = await useApi.post('semester.php?method=delete-semester', connectTokenWithData({ ids: (ids as Array<any>).join(',') }))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const create_semester = async (data: any) =>{
    try{
        const result = await useApi.post('semester.php?method=create-semester', connectTokenWithData(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const update_semester = async (data: any ,id: number) =>{
    try{
        const result = await useApi.post('semester.php?method=update-semester', connectTokenWithData(data), {
            params: { id: id }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}