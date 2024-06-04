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
</template>


<script lang="ts">

import { Toast } from '@/helpers/Base'
import HeaderPartial from '@/partials/panel/HeaderPartial.vue'
import MenuPartial from '@/partials/panel/MenuPartial.vue'
import { get_info } from '@/services/user.service'
import useAuthStore from '@/store/auth-store'
import useUserStore from '@/store/user-store'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'panel-layout',
    components: { HeaderPartial, MenuPartial },
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