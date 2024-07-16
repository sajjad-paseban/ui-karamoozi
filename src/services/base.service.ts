import { useApi } from "@/helpers/Base"

export const landing_data = async () =>{
    try{
        const result = await useApi.post('base.php?method=landing-data')
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const get_news = async () =>{
    try{
        const result = await useApi.post('base.php?method=get-news')
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const get_companies = async () =>{
    try{
        const result = await useApi.post('base.php?method=get-companies')
        
        return result

    }catch(res: any){
        return res.response
    }
}

export const find_content = async (slug: string) =>{
    try{
        const result = await useApi.post('base.php?method=find-content', {
            slug: slug.replaceAll('-',' ')
        })
        
        return result

    }catch(res: any){
        return res.response
    }
}