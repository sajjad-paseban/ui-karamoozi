<script lang="ts">
import SemesterDatagrid from "@/datagrids/panel/SemesterDatagrid.vue";
import { defineComponent } from "vue";
export default defineComponent({
    name: 'index-view',
    components: {
        SemesterDatagrid
    }
})
</script>

<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                مدیریت نیمسال های تحصیلی
            </h1>
        </div>
        <div class="col-auto">
            <router-link :to="{ name: 'create-semester-management' }" class="btn btn-primary btn-sm shadow-sm">
                نیمسال تحصیلی جدید
            </router-link>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <semester-datagrid />
        </div>
    </div>
</template>