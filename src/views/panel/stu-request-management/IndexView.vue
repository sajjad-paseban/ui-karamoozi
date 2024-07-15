<script lang="ts">
import Card from "@/components/Card.vue";
import StuRequestManagementDatagrid from "@/datagrids/panel/StuRequestManagementDatagrid.vue";
import { defineComponent } from "vue";
export default defineComponent({
    name: 'index-view',
    components: {
        Card,
        StuRequestManagementDatagrid,
    }
})
</script>

<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                مدیریت درخواست های کارآموزی
            </h1>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <stu-request-management-datagrid />
        </div>
    </div>
</template>