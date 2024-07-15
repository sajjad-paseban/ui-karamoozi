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

export const get_teachers = async () =>{
    try{
        const result = await useApi.post('stu_request.php?method=get-teachers', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

// export const find_data = async (id: number) =>{
//     try{
//         const result = await useApi.post('site.php?method=get-data', useAuthStore().auth, {
//             params: { id: id }
//         })
        
//         return result

//     }catch(res: any){
//         return res.response
//     }
// }

// export const delete_site = async (ids: any) =>{
//     try{
//         const result = await useApi.post('site.php?method=delete-site', connectTokenWithData({ ids: (ids as Array<any>).join(',') }))
        
//         return result

//     }catch(res: any){
//         return res.response
//     }
// }

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