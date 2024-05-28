import { useApi } from "@/helpers/Base"

export const register = async (data: any) =>{
    try{
        const result = await useApi.post('auth.php?method=register',JSON.stringify(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const login = async (data: any) =>{
    try{
        const result = await useApi.post('auth.php?method=login', JSON.stringify(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const logout = async (data: any) =>{
    try{
        const result = await useApi.post('auth.php?method=logout', JSON.stringify(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}