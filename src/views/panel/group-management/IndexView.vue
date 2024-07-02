<script lang="ts">
import GroupDatagrid from "@/datagrids/panel/GroupDatagrid.vue";
import { defineComponent } from "vue";
export default defineComponent({
    name: 'index-view',
    components: {
        GroupDatagrid
    }
})
</script>

<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                مدیریت گروه ها
            </h1>
        </div>
        <div class="col-auto">
            <router-link :to="{ name: 'create-group-management' }" class="btn btn-primary btn-sm shadow-sm">
                گروه جدید
            </router-link>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <group-datagrid />
        </div>
    </div>
</template>