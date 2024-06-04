<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                مدیریت پروفایل
            </h1>
        </div>
        <div class="col-auto">
            <!-- <router-link to="" class="btn btn-primary btn-sm shadow-sm">
                تیکت جدید
            </router-link> -->
        </div>
    </div>
    <div class="row py-3">
        <div class="col">
            <nav dir="rtl">
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button v-for="(item, key) in navs" :key="key" class="nav-link" :class="{ 'active': currentNav == key }"
                        id="nav" data-bs-toggle="tab" :data-bs-target="'#nav-' + key" type="button" role="tab"
                        :aria-controls="'nav-' + key" aria-selected="true" @click="currentNav = key">
                        <component :is="icons[item.icon]"></component>
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

<script lang="js">
import { defineComponent } from "vue";
import { GlProfile, AnFilledPicture } from "@kalimahapps/vue-icons";
import ProfilePictureForm from "@/forms/panel/ProfilePictureForm.vue";
import UserInformationForm from "@/forms/panel/UserInformationForm.vue";
export default defineComponent({
    name: 'index-view',
    data() {
        return {
            currentNav: 0,
            forms: {
                'user-inforamtion-form': UserInformationForm,
                'profile-picture-form': ProfilePictureForm
            },
            icons: {
                'profile': GlProfile,
                'profile-pic': AnFilledPicture
            },
            navs: [
                {
                    title: 'مشخصات کاربر',
                    component: 'user-inforamtion-form',
                    icon: 'profile'
                },
                {
                    title: 'تصویر پروفایل',
                    component: 'profile-picture-form',
                    icon: 'profile-pic'

                }
            ]
        }
    },

})
</script>

<style lang="scss" scoped>
button {
    svg {
        font-size: 20px;
        position: relative;
        top: 5.5px;
        left: 4px;
    }
}
</style>