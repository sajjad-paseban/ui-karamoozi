<script lang="ts">
import StuSemestersDatagrid from "@/datagrids/panel/StuSemestersDatagrid.vue";
import { defineComponent } from "vue";
export default defineComponent({
    name: 'index-view',
    components: {
        StuSemestersDatagrid
    }
})
</script>

<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                مدیریت دانشجویان
            </h1>
        </div>
        <div class="col-auto">
            <router-link :to="{ name: 'create-stu-semesters-management' }" class="btn btn-primary btn-sm shadow-sm">
                دانشجو جدید
            </router-link>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <stu-semesters-datagrid />
        </div>
    </div>
</template>