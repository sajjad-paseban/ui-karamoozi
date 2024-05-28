import useAuthStore from "@/store/auth-store";

export default function auth({ next, router }: any) {

  if (!(useAuthStore().auth.token && useAuthStore().auth.user_id)) {
    return router.push('/login');
  }

  return next();
}