<template>
    <header>
        <div class="left-side">
            <Button :isLink="true" group="alpha" btnClass="btn btn-light" path="/login" title="ورود به پنل کاربری">
                <FeLogIn />
            </Button>
        </div>
        <nav class="nav-desktop">
            <header-menu-partial />
            <logo :title="siteStore.uni_name" :isLight="true" :path="get_back_base_url() + siteStore.uni_logo_path" />
        </nav>
        <nav class="nav-mobile">
            <i @click="navbar_mobile.display = !navbar_mobile.display" class="pi"
                :class="{ 'pi-align-justify': navbar_mobile.display == false, 'pi-align-right': navbar_mobile.display }"></i>
            <div class="menu" v-if="navbar_mobile.display">
                <header-menu-partial mode="mobile" />
            </div>
        </nav>
    </header>
</template>

<script>
import Logo from "@/components/Logo.vue";
import { defineComponent } from "vue";
import HeaderMenuPartial from "./HeaderMenuPartial.vue";
import Button from "@/components/Button.vue";
import { FeLogIn } from "@kalimahapps/vue-icons";
import { useSiteStore } from "@/store/site-store";
import { get_back_base_url } from "@/helpers/Base";
export default defineComponent({
    components: { Logo, HeaderMenuPartial, Button, FeLogIn },
    name: 'header-partial',
    setup() {
        const siteStore = useSiteStore().site
        return {
            siteStore
        }
    },
    data() {
        return {
            navbar_mobile: {
                display: false,
            }
        }
    },
    methods: {
        get_back_base_url
    }
})
</script>

<style lang="scss" scoped>
header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    background-color: #263238;

    nav.nav-desktop {
        display: flex;
        align-items: center;
    }

    nav.nav-mobile {
        display: none;
        align-items: center;

        i {
            color: #fff;
            position: relative;
            right: 8px;
            font-size: 20px;
            cursor: pointer;
        }

        .menu {
            position: absolute;
            background-color: rgba($color: #000000, $alpha: 0.9);
            top: 50px;
            right: 0;
            left: 0;
            z-index: 5;
            padding: 20px 0;
            display: flex;
            justify-content: center;
        }
    }

    .left-side {
        display: flex;
        align-items: center;
        margin: 0 10px;
        position: relative;
        bottom: 1px;
    }
}

@media screen and (max-width: 750px) {
    .nav-desktop {
        display: none !important;
    }

    .nav-mobile {
        display: flex !important;
    }
}
</style>