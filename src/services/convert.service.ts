import useAuthStore from '@/store/auth-store';
import { connectTokenWithData, useApi } from "@/helpers/Base"

export const cvt_manager = async (group_id: any, file: any) =>{
    try{
        const formData = new FormData();
        formData.append('user_id', useAuthStore().auth.user_id)
        formData.append('token', useAuthStore().auth.token)
        formData.append('group_id', group_id)
        formData.append('file', file)

        const result = await useApi.post('convert.php?method=cvt-manager', formData)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const cvt_teacher = async (group_id: any, file: any) =>{
    try{
        const formData = new FormData();
        formData.append('user_id', useAuthStore().auth.user_id)
        formData.append('token', useAuthStore().auth.token)
        formData.append('group_id', group_id)
        formData.append('file', file)

        const result = await useApi.post('convert.php?method=cvt-teacher', formData)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const cvt_student = async (semester_id:any, group_id: any, file: any) =>{
    try{
        const formData = new FormData();
        formData.append('user_id', useAuthStore().auth.user_id)
        formData.append('token', useAuthStore().auth.token)
        formData.append('group_id', group_id)
        formData.append('semester_id', semester_id)
        formData.append('file', file)

        const result = await useApi.post('convert.php?method=cvt-student', formData)
        
        return result

    }catch(res: any){
        return res.response
    }
}