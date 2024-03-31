<template>
    <ul>
        <li :class="{active: route == 0}">
            <router-link to="/" @click="set_ment_item_active('home')">
                صفحه اصلی
            </router-link>
        </li>
        <li :class="{active: route == 1}">
            <router-link to="/company" @click="set_ment_item_active('company')">
                لیست شرکت ها
            </router-link>
        </li>
        <li :class="{active: route == 2}">
            <router-link to="/news" @click="set_ment_item_active('news')">
                اخبار و اطلاعیه ها
            </router-link>
        </li>
        <li :class="{active: route == 3}">
            <router-link to="/contact-us" @click="set_ment_item_active('contactus')">
                ارتباط با ما
            </router-link>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { menu_switch } from '@/helpers/Functions'
export default defineComponent({
    name: 'header-menu-partial',
    data(){
        return {
            route: 0
        }
    },
    methods: {
        set_ment_item_active(name: string){
            this.route = menu_switch(name);
        }
    },
    mounted(){
        console.log(this.$route.name)
        this.route = menu_switch((this.$route.name as string));
    }
})
</script>

<style lang="scss" scoped>
    ul{
        display: flex;
        list-style: none;
        direction: rtl;        
        margin: 0 15px;
        height: 100%;
        li{
            font-family: 'yekan';
            font-size: 15px;
            margin: 0 10px;
            a{
                display: flex;
                align-items: center;
                height: 100%;
                color: #fff;
                transition: color 300ms;
                &:visited{
                    color: #fff;
                }

                &:hover{
                    color: #4CAF50;
                }

            }
            &.active{
                a{
                    color: #4CAF50;
                }
                border-bottom: 3.5px solid #4CAF50;
            }
        }
    }
</style>