<template>
    <div class="menu-partial">
        <div class="user-info">
            <div v-if="role.list && role.list.length > 0" class="user-roles">
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
        <div v-if="updated_access_list && updated_access_list.length > 0" class="menu-list">
            <div class="d-flex justify-content-end">
                <span class="" style="position: relative; right: 16px; color: #fff;">
                    منو
                </span>
            </div>
            <ul>
                <li v-for="(item, key) in updated_access_list" :key="key">
                    <a :class="{ 'active': route.path.includes(item.menu.key_param) || route.name === item.menu.key_param }"
                        @click="handleMenuSelect(item.menu.key_param)">
                        {{ item.menu.title }}
                        <i :class="item.menu.logo"></i>
                    </a>
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
import { computed, defineComponent } from "vue";
import { get_user_access } from "@/services/user.service";
import { useRoute, useRouter } from "vue-router";
import router from "@/router";
import useLoadingStore from "@/store/loading-store";
import { check_user_has_access } from "@/services/auth.service";
import useAuthStore from "@/store/auth-store";

export default defineComponent({
    name: 'menu-partial',
    setup() {
        const siteStore = useSiteStore().site
        const userStore = useUserStore()
        const roleStore = useRoleStore()
        const route = useRoute()
        const router = useRouter()
        const loadingStore = useLoadingStore()
        return {
            siteStore,
            userStore,
            roleStore,
            route,
            router,
            loadingStore
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

            router.push({ name: 'dashboard' })
        },
        async handleMenuSelect(name: string) {
            this.loadingStore.toggle_loading()

            const path = name.toString().replaceAll('index-', '')
            const res = await check_user_has_access({
                user_id: useAuthStore().auth.user_id,
                role_id: useRoleStore().role.role.id,
                path: path
            })

            if (res.status == 200 && res.data.res != true) {
                this.router.push({ name: 'dashboard' })
            } else {
                this.router.push({ name: name })
            }

            setTimeout(() => {
                this.loadingStore.toggle_loading()
            }, 1000)
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
            access: []
        }
    },
    computed: {
        updated_access_list(): any {
            return Array.from(new Map(this.access.map((item: any) => [item.menu_id, item])).values());
        }
    },
    async mounted() {
        const roles = await get_user_roles()
        this.role.list = roles.data.row

        if (this.roleStore.role == null) {

            this.role.currentRole = this.role.list.findIndex((item: any) => item.default_role == true)
            this.role.selectedRole = this.role.list[this.role.currentRole]
            this.roleStore.set_role(this.role.selectedRole)
        } else {
            this.role.currentRole = this.role.list.findIndex((item: any) => item.id == this.roleStore.role.id)
            this.role.selectedRole = this.role.list[this.role.currentRole]
        }

        const user_access = await get_user_access()
        this.access = user_access.data.row
    }
})
</script>

<style lang="scss" scoped>
.menu-partial {
    overflow-y: auto !important;
    height: 100%;

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
                    cursor: pointer;

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