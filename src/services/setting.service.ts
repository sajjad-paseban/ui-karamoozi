
import { useApi } from "@/helpers/Base"
import useAuthStore from "@/store/auth-store"

export const get_data = async () =>{
    try{
        const result = await useApi.post('setting.php?method=get-data')
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const remove_logo = async () =>{
    try{
        const result = await useApi.post('setting.php?method=remove-logo', useAuthStore().auth)
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const update_data = async (data: any) =>{
    try{
        const formData = new FormData;
        formData.append('uni_name', data.uni_name)
        formData.append('uni_logo_path', data.uni_logo)
        formData.append('footer_description', data.footer_description)
        formData.append('long', data.long)
        formData.append('lat', data.lat)
        formData.append('telephone', data.telephone)
        formData.append('email', data.email)
        formData.append('fax', data.fax)
        formData.append('address', data.address)
        formData.append('description', data.description)
        formData.append('register_rules', data.register_rules)
        formData.append('status', data.status)
        formData.append('token', useAuthStore().auth.token)
        formData.append('user_id', useAuthStore().auth.user_id)


        const result = await useApi.post('setting.php?method=update-data', formData)
        
        return result

    }catch(res: any){
        return res.response
    }
}