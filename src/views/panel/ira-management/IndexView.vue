<script lang="ts">
import IraDatagrid from "@/datagrids/panel/IraDatagrid.vue";
import { defineComponent } from "vue";
export default defineComponent({
    name: 'index-view',
    components: {
        IraDatagrid
    }
})
</script>

<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                درخواست های جذب کار آموز
            </h1>
        </div>
        <div class="col-auto">
            <router-link :to="{ name: 'create-intern-recruitment-application' }" class="btn btn-primary btn-sm shadow-sm">
                درخواست جدید
            </router-link>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <ira-datagrid />
        </div>
    </div>
</template>