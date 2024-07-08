<script lang="ts">
import UsersGroupsDatagrid from "@/datagrids/panel/UsersGroupsDatagrid.vue";
import { defineComponent } from "vue";
export default defineComponent({
    name: 'index-view',
    components: {
        UsersGroupsDatagrid
    }
})
</script>

<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                مدیریت کاربران و گروه ها
            </h1>
        </div>
        <div class="col-auto">
            <router-link :to="{ name: 'create-users-groups-management' }" class="btn btn-primary btn-sm shadow-sm">
                کاربر و گروه جدید
            </router-link>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <users-groups-datagrid />
        </div>
    </div>
</template>