
import { useApi } from "@/helpers/Base"

export const get_data = async () =>{
    try{
        const result = await useApi.post('setting.php?method=get-data')
        
        return result

    }catch(res: any){
        return res.response
    }
}