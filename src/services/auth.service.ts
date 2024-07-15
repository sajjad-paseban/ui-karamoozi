import { connectTokenWithData, useApi } from "@/helpers/Base"

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

export const check_auth_expiration = async (data: any) =>{
    try{
        const result = await useApi.post('auth.php?method=check-auth-expiration', JSON.stringify(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const check_user_has_access = async (data: any) =>{
    try{
        const result = await useApi.post('auth.php?method=check-user-has-access', JSON.stringify(data))
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const change_password = async (data: any) =>{
    try{
        const result = await useApi.post('auth.php?method=change-password', JSON.stringify(connectTokenWithData(data)))
        
        return result

    }catch(res: any){
        return res.response
    }
}