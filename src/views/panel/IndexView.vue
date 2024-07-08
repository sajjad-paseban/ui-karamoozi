<template>
    <div class="row justify-content-end p-2">
        <div class="col-auto">
            <h1 class="text-secondary">
                داشبورد
            </h1>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div dir="rtl" class="alert alert-primary" role="alert">
                {{ userStore.info.fullname }} به صفحه خود خوش آمدید.
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import useUserStore from "@/store/user-store";
import { defineComponent } from "vue";

export default defineComponent({
    name: 'index-view',
    setup() {
        const userStore = useUserStore().user

        return {
            userStore
        }
    }
})
</script>