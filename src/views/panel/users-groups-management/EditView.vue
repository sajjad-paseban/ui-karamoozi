<script lang="ts">
import UsersGroupsEditForm from "@/forms/panel/users-groups-management/UsersGroupsEditForm.vue";
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";
export default defineComponent({
    name: 'edit-view',
    components: {
        UsersGroupsEditForm,
        Card
    }
})
</script>
<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                مدیریت کاربران و گروه ها - ویرایش
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
            <card :headerBordering="true" title="فرم بروزرسانی کاربر و گروه">
                <users-groups-edit-form />
            </card>
        </div>
    </div>
</template>