<script lang="ts">
import GroupEditForm from "@/forms/panel/group-management/GroupEditForm.vue";
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";
export default defineComponent({
    name: 'edit-view',
    components: {
        GroupEditForm,
        Card
    }
})
</script>
<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                مدیریت گروه ها - ویرایش
            </h1>
        </div>
        <div class="col-auto">
            <router-link :to="{ name: 'group-management' }" class="btn btn-primary btn-sm shadow-sm">
                برگشت
            </router-link>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <card :headerBordering="true" title="فرم بروزرسانی گروه">
                <group-edit-form />
            </card>
        </div>
    </div>
</template>