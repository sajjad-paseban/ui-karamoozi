<script lang="ts">
import ContactusDatagrid from "@/datagrids/panel/ContactusDatagrid.vue";
import { defineComponent } from "vue";
export default defineComponent({
    name: 'index-view',
    components: {
        ContactusDatagrid
    }
})
</script>

<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                مدیریت درخواست های ارتباط با ما
            </h1>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <contactus-datagrid />
        </div>
    </div>
</template>