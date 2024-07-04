<script lang="ts">
import SiteEditForm from "@/forms/panel/sites-management/SitesEditForm.vue";
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";
export default defineComponent({
    name: 'edit-view',
    components: {
        SiteEditForm,
        Card
    }
})
</script>
<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                مدیریت سایر سایت ها - ویرایش
            </h1>
        </div>
        <div class="col-auto">
            <router-link :to="{ name: 'sites-management' }" class="btn btn-primary btn-sm shadow-sm">
                برگشت
            </router-link>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <card :headerBordering="true" title="فرم بروزرسانی سایت">
                <site-edit-form />
            </card>
        </div>
    </div>
</template>