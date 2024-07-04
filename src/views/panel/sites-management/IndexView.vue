<script lang="ts">
import SitesDatagrid from "@/datagrids/panel/SitesDatagrid.vue";
import { defineComponent } from "vue";
export default defineComponent({
    name: 'index-view',
    components: {
        SitesDatagrid
    }
})
</script>

<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                مدیریت سایر سایت ها
            </h1>
        </div>
        <div class="col-auto">
            <router-link :to="{ name: 'create-sites-management' }" class="btn btn-primary btn-sm shadow-sm">
                سایت جدید
            </router-link>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <sites-datagrid />
        </div>
    </div>
</template>