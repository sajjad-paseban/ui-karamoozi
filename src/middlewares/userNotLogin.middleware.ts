import useAuthStore from "@/store/auth-store";

export default function userNotLogin({ next, router }: any) {

  if (useAuthStore().auth.token && useAuthStore().auth.user_id) {
    return next('/panel');
  }

  return next();
}