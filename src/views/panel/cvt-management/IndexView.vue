<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";
import CvtManagerForm from "@/forms/panel/cvt-management/CvtManagerForm.vue";
import CvtTeacherForm from "@/forms/panel/cvt-management/CvtTeacherForm.vue";
import CvtStudentForm from "@/forms/panel/cvt-management/CvtStudentForm.vue";
export default defineComponent({
    name: 'index-view',
    components: {
        Card,
        CvtManagerForm,
        CvtTeacherForm,
        CvtStudentForm
    }
})
</script>

<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                کانورت اطلاعات
            </h1>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <div class="alert alert-info" dir="rtl">
                توجه: فایل های اکسل می بایست شامل ستون های (fname,lname,nationalcode,phone,email) باشد.
            </div>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <card :headerBordering="true" title="فرم کانورت اطلاعات مدیر گروه">
                <CvtManagerForm />
            </card>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <card :headerBordering="true" title="فرم کانورت اطلاعات استاد">
                <CvtTeacherForm />
            </card>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <card :headerBordering="true" title="فرم کانورت اطلاعات دانشجو">
                <CvtStudentForm />
            </card>
        </div>
    </div>
</template>