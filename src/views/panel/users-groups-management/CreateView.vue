<script lang="ts">
import UsersGroupsCreateForm from "@/forms/panel/users-groups-management/UsersGroupsCreateForm.vue";
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";
export default defineComponent({
    name: 'create-view',
    components: {
        UsersGroupsCreateForm,
        Card
    }
})
</script>
<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                مدیریت کاربران و گروه ها - جدید
            </h1>
        </div>
        <div class="col-auto">
            <router-link :to="{ name: 'users-groups-management' }" class="btn btn-primary btn-sm shadow-sm">
                برگشت
            </router-link>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <card :headerBordering="true" title="فرم ثبت کاربر و گروه جدید">
                <users-groups-create-form />
            </card>
        </div>
    </div>
</template>