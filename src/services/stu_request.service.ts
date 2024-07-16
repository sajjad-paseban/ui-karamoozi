import useAuthStore from '@/store/auth-store';
import { connectTokenWithData, useApi } from "@/helpers/Base"

export const has_access = async () =>{
    try{
        const result = await useApi.post('stu_request.php?method=user-has-access', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const get_active_semesters = async () =>{
    try{
        const result = await useApi.post('stu_request.php?method=get-active-semesters', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const get_companies = async () =>{
    try{
        const result = await useApi.post('stu_request.php?method=get-companies', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const get_requests_for_teacher = async () =>{
    try{
        const result = await useApi.post('stu_request.php?method=get-data-for-teacher', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const get_requests_for_manager = async () =>{
    try{
        const result = await useApi.post('stu_request.php?method=get-data-for-manager', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const get_teachers = async () =>{
    try{
        const result = await useApi.post('stu_request.php?method=get-teachers', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const create_request = async (data: any) =>{
    try{
        const result = await useApi.post('stu_request.php?method=create-request', connectTokenWithData(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const find_data_by_user_id = async () =>{
    try{
        const result = await useApi.post('stu_request.php?method=find-data-by-user-id', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const delete_request = async (id: any) =>{
    try{
        const result = await useApi.post('stu_request.php?method=delete-request', connectTokenWithData({ id: id }))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const confirm_request_by_teacher = async (id: any) =>{
    try{
        const result = await useApi.post('stu_request.php?method=confirm-by-teacher', connectTokenWithData({ id: id }))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const confirm_request_by_manager = async (id: any) =>{
    try{
        const result = await useApi.post('stu_request.php?method=confirm-by-manager', connectTokenWithData({ id: id }))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const reject_request_by_teacher = async (data: any) =>{
    try{
        const result = await useApi.post('stu_request.php?method=reject-by-teacher', connectTokenWithData(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const reject_request_by_manager = async (data: any) =>{
    try{
        const result = await useApi.post('stu_request.php?method=reject-by-manager', connectTokenWithData(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const get_my_students = async () =>{
    try{
        const result = await useApi.post('stu_request.php?method=get-my-students', useAuthStore().auth)

        return result

    }catch(res: any){
        return res.response
    }
}

export const find_data = async (id: number) =>{
    try{
        const result = await useApi.post('stu_request.php?method=get-data', useAuthStore().auth,{
            params: {
                id: id
            }
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}

// export const create_site = async (data: any) =>{
//     try{
//         const result = await useApi.post('site.php?method=create-site', connectTokenWithData(data))
        
//         return result

//     }catch(res: any){
//         return res.response
//     }
// }

// export const update_site = async (data: any ,id: number) =>{
//     try{
//         const result = await useApi.post('site.php?method=update-site', connectTokenWithData(data), {
//             params: { id: id }
//         })
        
//         return result

//     }catch(res: any){
//         return res.response
//     }
// }