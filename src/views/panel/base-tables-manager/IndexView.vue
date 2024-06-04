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
import { defineComponent } from "vue";

export default defineComponent({
    name: 'index-view',
    data() {
        return {
            currentNav: 0,
            forms: {
                'site-base-information-form': SiteBaseInformationFormVue
            },
            navs: [
                {
                    title: 'مدیریت اطلاعات پایه سایت',
                    component: 'user-inforamtion-form',
                    icon: 'pi pi-database'
                },
                {
                    title: 'مدیریت منوها',
                    component: 'user-inforamtion-form',
                    icon: 'pi pi-bars'
                },
                {
                    title: 'مدیریت نقش ها',
                    component: 'profile-picture-form',
                    icon: 'pi pi-shield'
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
                    component: 'profile-picture-form',
                    icon: 'pi pi-map-marker'
                },
                {
                    title: 'مدیریت شهرها',
                    component: 'profile-picture-form',
                    icon: 'pi pi-sitemap'
                },
                {
                    title: 'مدیریت مدارک',
                    component: 'profile-picture-form',
                    icon: 'pi pi-verified'
                },
                {
                    title: 'مدیریت نوع درس',
                    component: 'profile-picture-form',
                    icon: 'pi pi-book'
                },
                {
                    title: 'مدیریت رنگ ها',
                    component: 'profile-picture-form',
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