<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                مدیریت جداول پایه
            </h1>
        </div>
        <div class="col-auto">
            <!-- <router-link to="" class="btn btn-primary btn-sm shadow-sm">
                تیکت جدید
            </router-link> -->
        </div>
    </div>
    <div class="row py-2">
        <div class="col">
            <nav dir="rtl">
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button v-for="(item, key) in navs" :key="key" class="nav-link" :class="{ 'active': currentNav == key }"
                        id="nav" data-bs-toggle="tab" :data-bs-target="'#nav-' + key" type="button" role="tab"
                        :aria-controls="'nav-' + key" aria-selected="true" @click="currentNav = key">
                        <i :class="item.icon"></i>
                        {{ item.title }}
                    </button>
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">

                <div v-for="(item, key) in navs" :key="key" class="tab-pane"
                    :class="{ 'fade active show': currentNav == key }" id="nav" role="tabpanel"
                    aria-labelledby="nav-home-tab" tabindex="0">
                    <component :is="forms[item.component]" />

                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts">

import SiteBaseInformationFormVue from "@/forms/panel/base-tables-management/SiteBaseInformationForm.vue";
import MenuTemplate from '@/views/panel/menu-management/MenuTemplate.vue';
import RoleTemplate from '@/views/panel/role-management/RoleTemplate.vue';
import ProvinceTemplate from '@/views/panel/province-management/ProvinceTemplate.vue';
import CityTemplate from '@/views/panel/city-management/CityTemplate.vue';
import DegreeTemplate from '@/views/panel/degree-management/DegreeTemplate.vue';
import ColorTemplate from "@/views/panel/color-management/ColorTemplate.vue";
import { defineComponent } from "vue";

export default defineComponent({
    name: 'index-view',
    data() {
        return {
            currentNav: 0,
            forms: {
                'site-base-information-form': SiteBaseInformationFormVue,
                'menu-template': MenuTemplate,
                'role-template': RoleTemplate,
                'province-template': ProvinceTemplate,
                'city-template': CityTemplate,
                'degree-template': DegreeTemplate,
                'color-template': ColorTemplate,
            },
            navs: [
                {
                    title: 'مدیریت اطلاعات پایه سایت',
                    component: 'site-base-information-form',
                    icon: 'pi pi-database'
                },
                {
                    title: 'مدیریت منوها',
                    component: 'menu-template',
                    icon: 'pi pi-bars'
                },
                {
                    title: 'مدیریت نقش ها',
                    component: 'role-template',
                    icon: 'pi pi-shield'
                },
                {
                    title: 'مدیریت کاربران',
                    component: 'role-template',
                    icon: 'pi pi-user'
                },
                {
                    title: 'مدیریت نقش ها و کاربران',
                    component: 'profile-picture-form',
                    icon: 'pi pi-address-book'
                },
                {
                    title: 'مدیریت دسترسی ها',
                    component: 'profile-picture-form',
                    icon: 'pi pi-users'
                },
                {
                    title: 'مدیریت استان ها',
                    component: 'province-template',
                    icon: 'pi pi-map-marker'
                },
                {
                    title: 'مدیریت شهرها',
                    component: 'city-template',
                    icon: 'pi pi-sitemap'
                },
                {
                    title: 'مدیریت مدارک',
                    component: 'degree-template',
                    icon: 'pi pi-verified'
                },
                {
                    title: 'مدیریت رنگ ها',
                    component: 'color-template',
                    icon: 'pi pi-palette'
                },

            ]
        }
    },

})
</script>

<style lang="scss" scoped>
.nav-tabs {
    button {
        color: rgba($color: #000000, $alpha: 0.4);
        font-size: 14px;

        i {
            font-size: 14px;
            position: relative;
            top: 2.5px;
            left: 4px;
        }
    }
}
</style>