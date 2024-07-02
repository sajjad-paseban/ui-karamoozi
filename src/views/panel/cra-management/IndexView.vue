<script lang="ts">
import CraDatagrid from "@/datagrids/panel/CraDatagrid.vue";
import { defineComponent } from "vue";
export default defineComponent({
    name: 'index-view',
    components: {
        CraDatagrid
    }
})
</script>

<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                مدیریت درخواست های ثبت شرکت
            </h1>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <cra-datagrid />
        </div>
    </div>
</template>