<script lang="ts">
import CrDatagrid from "@/datagrids/panel/CrDatagrid.vue";
import { defineComponent } from "vue";
export default defineComponent({
    name: 'index-view',
    components: {
        CrDatagrid
    }
})
</script>

<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                مدیریت درخواست های شرکت
            </h1>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <cr-datagrid />
        </div>
    </div>
</template>