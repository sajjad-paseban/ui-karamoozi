import { check_auth_expiration } from "@/services/auth.service";
import useAuthStore from "@/store/auth-store";

export default async function auth({ next, router }: any) {

  if (!(useAuthStore().auth.token && useAuthStore().auth.user_id)) {
    return router.push('/login');
  }else{
    const res = await check_auth_expiration(useAuthStore().auth)
    if(res.status == 200){
      return next();
    }else{
      useAuthStore().clear_auth()
      return router.push('/login')
    }
  }

}