<script lang="ts">
import StuSemestersEditForm from "@/forms/panel/stu-semesters-management/StuSemestersEditForm.vue";
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";
export default defineComponent({
    name: 'edit-view',
    components: {
        StuSemestersEditForm,
        Card
    }
})
</script>
<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                مدیریت دانشجویان - ویرایش
            </h1>
        </div>
        <div class="col-auto">
            <router-link :to="{ name: 'stu-semesters-management' }" class="btn btn-primary btn-sm shadow-sm">
                برگشت
            </router-link>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <card :headerBordering="true" title="فرم بروزرسانی دانشجو">
                <stu-semesters-edit-form />
            </card>
        </div>
    </div>
</template>