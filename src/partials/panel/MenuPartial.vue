<template>
    <div class="menu-partial">
        <div class="user-info">
            <div class="user-roles">
                <div class="role-preview" @click="role.visibility = !role.visibility">
                    <i class="pi pi-angle-down"></i>
                    <span>{{ role.selectedRole.role.title }}</span>
                </div>
                <ul class="role-list" v-if="role.visibility">
                    <li v-for="(item, key) in role.list" :key="key" @click="handleRoleSelection(key)"
                        :class="{ 'justify-content-between': item.default_role == true, 'selected': role.currentRole == key }">
                        <i class="pi pi-verified" v-if="item.default_role == true"></i>
                        <div>
                            <span>
                                {{ item.role.title }}
                            </span>
                            <i class="pi pi-user"></i>
                        </div>
                    </li>
                </ul>
            </div>
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
                <li v-for="(item, key) in access" :key="key">
                    <router-link :to="{ name: item.menu.key_param }">
                        {{ item.menu.title }}
                        <!-- {{ item.menu }} -->
                        <i :class="item.menu.logo"></i>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { get_back_base_url } from "@/helpers/Base";
import { get_user_roles } from "@/services/users_roles.service";
import { useSiteStore } from "@/store/site-store";
import useUserStore from "@/store/user-store";
import useRoleStore from "@/store/role-store"
import { defineComponent } from "vue";
import { get_user_access } from "@/services/user.service";

export default defineComponent({
    name: 'menu-partial',
    setup() {
        const siteStore = useSiteStore().site
        const userStore = useUserStore()
        const roleStore = useRoleStore()
        return {
            siteStore,
            userStore,
            roleStore
        }
    },
    methods: {
        get_back_base_url,
        async handleRoleSelection(key: number) {
            this.role.currentRole = key
            this.role.selectedRole = this.role.list[key]

            this.roleStore.set_role(this.role.selectedRole)

            const user_access = await get_user_access()

            this.access = user_access.data.row
            this.role.visibility = false
        }
    },
    data() {
        return {
            role: {
                visibility: false,
                list: [],
                currentRole: -1,
                selectedRole: null,
            },
            access: null
        }
    },
    async mounted() {
        const roles = await get_user_roles()
        this.role.list = roles.data.row
        this.role.currentRole = this.role.list.findIndex((item: any) => item.default_role == true)
        this.role.selectedRole = this.role.list[this.role.currentRole]

        this.roleStore.set_role(this.role.selectedRole)

        const user_access = await get_user_access()
        this.access = user_access.data.row
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

        .user-roles {
            position: relative;
            cursor: pointer;

            .role-preview {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-between;
                font-size: 12px;
                border: 2.5px solid rgba($color: #fff, $alpha: 0.9);
                padding: 5px 8px;
                margin: 10px;
                border-radius: 5px;
                user-select: none;
            }

            .role-list {
                background-color: #fff;
                padding: 0;
                margin: 10px;
                position: absolute;
                top: 30px;
                left: 0;
                right: 0;
                list-style: none;
                border-radius: 2.5px;
                color: rgba($color: #000000, $alpha: 0.5);
                font-size: 14px;
                user-select: none;

                li {
                    display: flex;
                    align-items: center;
                    justify-content: end;
                    padding: 10px 15px;
                    margin: 0;
                    transition: color 100ms, background-color 100ms, font-size 100ms;
                    border-bottom: 0.5px solid rgba($color: #000000, $alpha: 0.1);

                    &.selected {
                        color: #2196F3;
                    }

                    span {
                        margin-right: 5px;
                    }

                    &:last-child {
                        border-bottom: none;
                    }

                    &:hover {
                        span {
                            font-size: 15px;
                        }

                        background-color: rgba($color: #000000, $alpha: 0.1);
                        color: rgba($color: #000000, $alpha: 0.8);
                    }

                }
            }
        }

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