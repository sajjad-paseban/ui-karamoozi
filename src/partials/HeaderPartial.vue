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
                title="دانشگاه فنی و حرفه ای مشهد"
                :isLight="true" 
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
export default defineComponent({
    components: { Logo, HeaderMenuPartial, Button, FeLogIn },
    name: 'header-partial',
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