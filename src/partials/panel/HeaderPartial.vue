<template>
    <div class="header-partial">
        <div class="left">
            <ul>
                <li>
                    <div class="profile-item" @click="profileMenu.visibility = !profileMenu.visibility">
                        <i class="pi pi-angle-down" v-show="!profileMenu.visibility"></i>
                        <i class="pi pi-angle-up" v-show="profileMenu.visibility"></i>
                        <span>
                            {{ userStore.user.info.fullname ?? userStore.user.info.email }}
                        </span>
                    </div>
                    <div class="profile-sub-item" v-if="profileMenu.visibility">
                        <ul>
                            <li v-for="(item, index) in profileMenu.data" :key="index" @click="profileMenu.visibility = !profileMenu.visibility">
                                <router-link :to="item.link">
                                    {{ item.name }}
                                    <i :class="item.icon"></i>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div class="message-item" @click="message.visibility = !message.visibility">
                        <span>
                            پیام ها
                        </span>
                        <i class="pi pi-envelope"></i>
                    </div>
                    <div class="message-sub-item" v-if="message.visibility">
                        <ul v-if="message.data.length == 0">
                            <li>
                                <span class="date">
                                    ۲۴ ساعت پیش
                                </span>
                                <span class="title">
                                    <i class="pi pi-times-circle"></i>
                                    تیکت شماره ۵۲۰۹۱ پاسخ داده شد
                                </span>
                            </li>

                            <li>
                                <span class="date">
                                    ۲۴ ساعت پیش
                                </span>
                                <span class="title">
                                    <i class="pi pi-times-circle"></i>
                                    تیکت شماره ۹۹۹۲۳۴۸۲ توسط مدیر سامانه پاسخ داده شد
                                </span>
                            </li>

                        </ul>
                        <div class="empty-message" v-if="message.data.length != 0">
                            <i class="pi pi-bell-slash"></i>
                            <span>
                                درحال حاضر پیامی برای شما وجود ندارد
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="right">
            <span>
                {{ siteStore?.uni_name }} - سامانه کارآموزی
            </span>
            <i class="pi pi-microsoft" @click="showMenu" v-if="!menu.visibility"></i>
            <i class="pi pi-align-right" @click="showMenu" v-if="menu.visibility"></i>
        </div>
    </div>
</template>


<script lang="ts">
import { useSiteStore } from '@/store/site-store'
import useUserStore from '@/store/user-store'
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'header-partial',
    setup(){
        const siteStore = useSiteStore().site
        const userStore = useUserStore()
        return {
            siteStore,
            userStore
        }
    },
    data(){
        return {
            profileMenu: {
                data: [
                    { name: 'ارسال تیکت', link: '/panel/ticket/', icon: 'pi pi-ticket' },
                    { name: 'رفتن به سامانه', link: '/', icon: 'pi pi-link' },
                    { name: 'تغییر کلمه عبور', link: '/panel/change-password', icon: 'pi pi-lock' },
                    { name: 'مدیریت پروفایل', link: '/panel/profile/edit', icon: 'pi pi-user-edit' },
                    { name: 'خروج از سامانه کارآموزی', link: '/logout', icon: 'pi pi-sign-out' },
                ],
                visibility: false
            },
            message: {
                data: [],
                visibility: false
            },
            menu:{
                visibility: false
            }
        }
    },
    components: {
        
    },
    methods:{
        showMenu(){
            this.menu.visibility = !this.menu.visibility
            this.$emit('show-menu')
        }
    }
})
</script>

<style lang="scss" scoped>
    .header-partial{
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left{
            ul{
                display: flex;
                align-items: center;
                list-style: none;
                font-family: 'vazir';
                li{
                    position: relative;
                    padding: 6px;
                    margin: 2px 5px;
                    user-select: none;
                    cursor: pointer;
                    
                    .profile-item{
                        border-radius: 3px;
                        box-shadow: 0px 2px 2px rgba($color: #000000, $alpha: 0.2);
                        background-color: rgba($color: #e2e3e5, $alpha: 0.8);
                        min-width: 220px;
                        padding: 10px;
                        color: rgba($color: #000000, $alpha: 0.6);
                        text-align: right;
                        position: relative;
                        span{
                            font-size: 14px;
                            margin: 0 5px;
                            margin-left: 23px;
                        }
                        i{
                            position: absolute;
                            top: 15px;
                            left: 10px;
                        }
                    }

                    .profile-sub-item{
                        position: absolute;
                        z-index: 5;
                        top: 65px;
                        right: 0;
                        left: 0;
                        margin: 0 8px;
                        border-radius: 3px;
                        background-color: #fff;
                        box-shadow: 0 3px 2px rgba($color: #e2e3e5, $alpha: 1);
                        overflow: hidden;
        
                        ul{
                            list-style: none;
                            display: block;
                            li{
                                margin: 0;
                                padding: 0;
                                a{
                                    padding: 10px;
                                    padding-bottom: 14px !important;
                                    display: block;
                                    color: rgba($color: #000000, $alpha: 0.5);
                                    font-size: 14px;
                                    text-align: right;
                                    font-family: 'vazir';
                                    transition: background-color 100ms, font-size 100ms, color 100ms;
                                    &:hover{
                                        color: rgba($color: #000000, $alpha: 0.7);
                                        font-size: 15px;
                                        background-color: rgba($color: #e2e3e5, $alpha: 0.5);
                                    }
                                    i{
                                        position: relative;
                                        top: 4px;
                                        margin-left: 5px;
                                        font-size: 20px;
                                    }
                                }
                            }
                        }
                    }

                    .message-item{
                        color: rgba($color: #000000, $alpha: 0.5);
                        transition: color 100ms;
                        font-size: 15px;
                        i{
                            font-size: 20px;
                            position: relative;
                            margin: 0 4px;
                            top: 3.5px;
                        }   
                        
                        &:hover{
                            color: rgba($color: #000000, $alpha: 0.7);
                        }
                    }

                    .message-sub-item{
                        position: absolute;
                        z-index: 6;
                        top: 57px;
                        min-width: 300px;
                        margin: 0 8px;
                        border-radius: 3px;
                        background-color: #fff;
                        box-shadow: 0 3px 2px rgba($color: #e2e3e5, $alpha: 1);
                        overflow: hidden;
                        font-size: 12px;
                        direction: rtl;
                        ul{
                            display: block;
                            li{
                                &:nth-child(1){
                                    border-top: none;
                                }
                                margin: 0;
                                padding: 15px;
                                display: flex;
                                flex-direction: row-reverse;
                                justify-content: space-between;
                                align-items: center;
                                border-top: 1px solid rgba($color: #e2e3e5, $alpha: 0.5);        
                                transition: background-color 300ms, color 300ms;
                                color: rgba($color: #000000, $alpha: 0.4);
                                &:hover{
                                    color: rgba($color: #000000, $alpha: 0.7);
                                    background-color: rgba($color: #e2e3e5, $alpha: 0.5);
                                }

                                span.date{
                                    font-size: 10px;
                                }

                                span.title{
                                    display: flex;
                                    align-items: center;
                                    font-size: 12px;
                                    text-align: right;
                                    width: 200px;                                    
                                    i{
                                        padding: 0 2px;
                                        position: relative;
                                        left: 6px;
                                        font-size: 18px;
                                    }
                                }
                            }   
                        }

                        .empty-message{
                            color: rgba($color: #000000, $alpha: 0.4);
                            padding: 20px;
                            *{
                                display: block;
                                text-align: center;
                            }

                            i{
                                font-size: 100px;
                            }

                            span{
                                font-size: 14px;
                                margin-top: 20px !important;
                            }
                        }
                    }
                }
            }
        }

        .right{
            display: flex;
            color: rgba($color: #000000, $alpha: 0.6);
            align-items: center;
            font-family: 'vazir';
            i{
                font-size: 22px;
                visibility: hidden;
                cursor: pointer;
            }

            span{
                font-size: 14px;
            }
        }
    }
    @media screen and (max-width: 1200px){
        .right{
            padding: 0 10px;            
            span{
                display: none;
            }

            i{
                visibility: visible !important;
            }
        }
    }
    @media screen and (max-width: 660px) {
        .message-sub-item{
            left: none; 
            right: 0;  
        }
    }
</style>