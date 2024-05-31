<template>
    <header>
        <div class="left-side">
            <Button 
                :isLink="true"
                group="alpha"
                btnClass="btn btn-light"
                path="/login"
                title="ورود به پنل کاربری"
            >
            <FeLogIn />            
        </Button>            
        </div>
        <nav>
            <header-menu-partial />
            <logo 
                :title="siteStore.uni_name"
                :isLight="true" 
                :path="get_back_base_url() + siteStore.uni_logo_path"
                />
   
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
    setup(){
        const siteStore = useSiteStore().site
        return {
            siteStore
        }
    },
    methods: {
        get_back_base_url
    }
})
</script>

<style lang="scss" scoped>
    header{
        height: 50px;
        display: flex;
        justify-content: space-between;
        background-color: #263238;
        nav{
            display: flex;
            align-items: center;
        }

        .left-side{
            display: flex;
            align-items: center;
            margin: 0 10px;
            position: relative;
            bottom: 1px;
        }
    }
</style>