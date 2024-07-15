<template>
    <header>
        <header-partial @show-menu="showMenu" />
    </header>
    <div class="main">
        <div class="content">
            <div class="container-fluid">
                <router-view />
            </div>
        </div>
        <div class="menu" ref="panelMenu">
            <menu-partial />
        </div>
    </div>
    <loading :type="1" v-if="loadingStore.loading" />
</template>


<script lang="ts">

import HeaderPartial from '@/partials/panel/HeaderPartial.vue'
import MenuPartial from '@/partials/panel/MenuPartial.vue'
import { check_user_has_access } from '@/services/auth.service'
import { get_info } from '@/services/user.service'
import useAuthStore from '@/store/auth-store'
import useRoleStore from '@/store/role-store'
import useUserStore from '@/store/user-store'
import useLoadingStore from '@/store/loading-store'
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Loading from '@/components/Loading.vue'

export default defineComponent({
    name: 'panel-layout',
    components: { HeaderPartial, MenuPartial, Loading },
    setup() {
        const loadingStore = useLoadingStore()

        return {
            loadingStore
        }
    },
    methods: {
        showMenu() {
            (this.$refs.panelMenu as any).classList.toggle('show')
        }
    },
    async mounted() {
        const res = await get_info(useAuthStore().auth)

        if (res.status == 200) {
            useUserStore().clear_user()
            useUserStore().set_user(res.data.row)
        }
    },
    async beforeCreate() {
        this.loadingStore.toggle_loading()
        const filters = ['change-password', 'profile-management']
        const route = useRoute()
        const router = useRouter()
        if (!route.query?.flg) {
            const path = route.name?.toString().replaceAll('index-', '')
            if (!filters.includes(path as string)) {
                const res = await check_user_has_access({
                    user_id: useAuthStore().auth.user_id,
                    role_id: useRoleStore().role.role.id,
                    path: path
                })

                if (res.status == 200 && res.data.res != true) {
                    router.push({ name: 'dashboard' })
                }
            }
        } else {
            router.push({ name: 'dashboard' })
        }

        setTimeout(() => {
            this.loadingStore.toggle_loading()
        }, 3000)


    }

})
</script>

<style lang="scss" scoped>
.main {
    position: relative;

    .content {
        position: fixed;
        top: 62px;
        left: 0;
        bottom: 0;
        width: calc(100% - 250px);
        overflow-y: auto;
        transition: width 200ms;
        font-family: 'vazir';
    }

    .menu {
        position: fixed;
        background-color: #495F75;
        right: 0;
        top: 62px;
        bottom: 0;
        width: 250px;
        transition: right 200ms;
    }
}

@media screen and (max-width: 1200px) {
    .main {
        .content {
            width: 100%;
        }

        .menu {
            right: -250px;

            &.show {
                right: 0;
            }
        }
    }
}
</style>