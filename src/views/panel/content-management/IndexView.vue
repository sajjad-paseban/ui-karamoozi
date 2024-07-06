<script lang="ts">
import ContentDatagrid from "@/datagrids/panel/ContentDatagrid.vue";
import { defineComponent } from "vue";
export default defineComponent({
    name: 'index-view',
    components: {
        ContentDatagrid
    }
})
</script>

<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                مدیریت محتوا
            </h1>
        </div>
        <div class="col-auto">
            <router-link :to="{ name: 'create-content-management' }" class="btn btn-primary btn-sm shadow-sm">
                محتوا جدید
            </router-link>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <content-datagrid />
        </div>
    </div>
</template>