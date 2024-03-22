<template>
    <ul>
        <li class="active">
            <router-link to="/">
                صفحه اصلی
            </router-link>
        </li>
        <li>
            <router-link to="/">
                لیست شرکت ها
            </router-link>
        </li>
        <li>
            <router-link to="/">
                اخبار و اطلاعیه ها
            </router-link>
        </li>
        <li>
            <router-link to="/contact-us">
                ارتباط با ما
            </router-link>
        </li>
    </ul>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue'
export default defineComponent({
    name: 'header-menu-partial'
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