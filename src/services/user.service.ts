import { useApi } from "@/helpers/Base"

export const get_info = async (data: any) =>{
    try{
        const result = await useApi.post('user.php?method=get-info', JSON.stringify(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}