<template>
    <footer>
        <div class="footer-top">
            <div class="left-side">
                <logo 
                    :title="siteStore?.uni_name"
                    is-light="true"
                    :path="get_back_base_url() + siteStore?.uni_logo_path"
                />
            </div>
            <nav>
                <ul>
                    <span>
                        دسترسی سریع
                    </span>
                    <li>
                        <router-link to="/">
                            صفحه اصلی
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/company">
                            لیست شرکت ها
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/news">
                            اخبار و اطلاعیه ها
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/contact-us">
                            ارتباط با ما
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="footer-bottom">
            <p>
                @ {{ siteStore?.footer_description }}.
            </p>
        </div>
    </footer>
</template>

<script lang="ts">
import Logo from '@/components/Logo.vue'
import { get_back_base_url } from '@/helpers/Base'
import { useSiteStore } from '@/store/site-store'
import Vue, { defineComponent, watch } from 'vue'
export default defineComponent({
    name: 'footer-partial',  
    components: { Logo },
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
    footer{
        margin-top: 350px;
        background-color: #263238;
        .footer-top{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 20px 30px;
            .left-side{
                display: flex;
                align-items: center;
            }

            nav{
                display: flex;
                ul{
                    margin: 0 15px;
                    list-style: none;
                    direction: rtl;
                    font-family: 'ghasem';
                    span{
                        font-size: 16px;
                        color: #fff;
                    }

                    li{
                        margin: 10px 0;
                        font-size: 14px;
                        a{
                            color: rgba($color: #fff, $alpha: 0.6);
                            &:hover{
                                color: #4CAF50;
                            }
                        }
                    }
                }
            }
        }
        .footer-bottom{
            border-top: 2px solid #fff;
            padding: 15px 45px;
            color: #fff;
            font-family: 'yekan';
            font-size: 13px;
            direction: rtl;
            p{
                text-align: right;
            }
        }
    }
</style>