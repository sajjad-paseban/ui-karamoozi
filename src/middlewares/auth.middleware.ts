import { check_auth_expiration } from "@/services/auth.service";
import { get_user_access } from "@/services/user.service";

import useAuthStore from "@/store/auth-store";

export default async function auth({ next, router }: any) {

  if (!(useAuthStore().auth.token && useAuthStore().auth.user_id)) {
    return next('/login')
  }else{
    const res = await check_auth_expiration(useAuthStore().auth)
    if(res.status == 200){
      return next();
    }else{
      useAuthStore().clear_auth()
      return next('/login')
    }
  }

}