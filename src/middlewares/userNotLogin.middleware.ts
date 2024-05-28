import useAuthStore from "@/store/auth-store";

export default function userNotLogin({ next, router }: any) {

  if (useAuthStore().auth.token && useAuthStore().auth.user_id) {
    return router.push('/panel');
  }

  return next();
}