<script lang="ts">
import { Toast } from "@/helpers/Base";
import router from "@/router";
import { logout } from "@/services/auth.service";
import useAuthStore from "@/store/auth-store";
import useUserStore from "@/store/user-store";
import { defineComponent } from "vue";

export default defineComponent({
    name: 'logout-view',
    async beforeRouteEnter(to, from, next) {
        const res = await logout(useAuthStore().auth)
        useAuthStore().clear_auth()
        useUserStore().clear_user()

        next({ name: 'login' })
    },

});
</script>