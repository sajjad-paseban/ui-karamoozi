<template>
    <div class="menu-partial">
        <div class="user-info">
            <div class="user-info-img">
                <img :src="userStore.user.info.image_path ? get_back_base_url() + userStore.user.info.image_path : get_back_base_url() + 'storage/images/unknown_profile.jpg'"
                    alt="">
            </div>
            <div class="user-info-name">
                {{ userStore.user.info.fullname ?? '-' }}
            </div>
            <!-- <div class="user-info-uni-code">
                ۹۸۱۱۱۰۵۵۳۰۲۰۰۳
            </div> -->
            <div class="user-info-email">
                {{ userStore.user.info.email ?? '-' }}
            </div>
            <div class="user-info-code">
                {{ userStore.user.info.nationalcode ? '0' + userStore.user.info.nationalcode : '-' }}
            </div>
        </div>
        <div class="menu-list">
            <div class="d-flex justify-content-end">
                <span class="" style="position: relative; right: 16px; color: #fff;">
                    منو
                </span>
            </div>
            <ul>
                <li>
                    <router-link :to="{ name: 'panel' }">
                        داشبورد
                        <i class="pi pi-gauge"></i>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'base-tables-management' }">
                        مدیریت جداول پایه
                        <i class="pi pi-cog"></i>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { get_back_base_url } from "@/helpers/Base";
import { useSiteStore } from "@/store/site-store";
import useUserStore from "@/store/user-store";
import { defineComponent } from "vue";

export default defineComponent({
    name: 'menu-partial',
    setup() {
        const siteStore = useSiteStore().site
        const userStore = useUserStore()
        return {
            siteStore,
            userStore
        }
    },
    methods: {
        get_back_base_url
    }
})
</script>

<style lang="scss" scoped>
.menu-partial {
    .user-info {
        font-family: 'vazir';
        color: rgba($color: #fff, $alpha: 0.9);
        border: 2.5px solid rgba($color: #fff, $alpha: 0.9);
        margin: 14px 10px;
        border-radius: 10px;

        .user-info-img {
            margin: 15px 0;
            display: flex;
            justify-content: center;

            img {
                width: 100px;
                height: 100px;
                object-position: top;
                object-fit: cover;
                border-radius: 50%;
            }
        }

        .user-info-name {
            text-align: center;
            font-size: 16px;
        }

        .user-info-code {
            text-align: center;
            font-size: 13px;
            margin: 5px 0;
            margin-bottom: 10px !important;

            &::before {
                content: 'کد ملی: ';
            }
        }

        .user-info-uni-code {
            text-align: center;
            font-size: 13px;
            margin: 5px 0;

            &::before {
                content: 'شماره دانشگاهی: ';
            }
        }

        .user-info-email {
            direction: rtl;
            text-align: center;
            font-size: 13px;
            margin: 5px 0;

            &::before {
                content: 'ایمیل: ';
            }
        }
    }

    .menu-list {
        font-family: vazir;

        ul {
            list-style: none;

            li {
                margin: 5px 10px;

                a {

                    border-radius: 4px;
                    display: block;
                    padding: 10px;
                    color: #fff;
                    text-align: right;
                    font-size: 14px;
                    transition: all 400ms;

                    &:hover {
                        font-size: 15px;
                        background-color: rgba($color: #2196F3, $alpha: .8);
                        box-shadow: 0.1px 2px 1px rgba($color: #000, $alpha: .6);
                    }

                    &.active {
                        font-size: 16px;
                        background-color: rgba($color: #2196F3, $alpha: .8);
                        box-shadow: 0.1px 2px 1px rgba($color: #000, $alpha: .6);
                    }

                    i {
                        position: relative;
                        top: 3px;
                        margin-left: 3px;
                    }
                }
            }
        }
    }
}
</style>