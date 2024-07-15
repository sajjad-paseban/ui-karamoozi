<script lang="ts">
import Card from "@/components/Card.vue";
import StuRequestForm from "@/forms/panel/stu-request/StuRequestForm.vue";
import StuRequestResultForm from "@/forms/panel/stu-request/StuRequestResultForm.vue";
import { has_access } from "@/services/stu_request.service"
import { defineComponent } from "vue";
export default defineComponent({
    name: 'index-view',
    components: {
        Card,
        StuRequestForm,
        StuRequestResultForm
    },
    data() {
        return {
            active: false
        }
    },
    async beforeMount() {
        const has_access_res = await has_access()
        if (has_access_res.status == 200)
            this.active = has_access_res.data.row.has_access
    }
})
</script>

<template>
    <template v-if="active == false">
        <div class="alert alert-primary my-3" dir="rtl">
            <small>
                توجه:
                شما مجوز دسترسی به این بخش را ندارید.
            </small>
        </div>
    </template>
    <template v-if="active">
        <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
            <div class="col-auto">
                <h1 class="text-secondary">
                    ثبت درخواست کارآموزی
                </h1>
            </div>
            <div class="col-auto">
                <button class="btn btn-sm btn-primary">
                    درخواست حذف کارآموزی
                </button>
            </div>
        </div>
        <div class="row my-3">
            <div class="col">
                <div class="alert alert-primary px-2 py-2" dir="rtl">
                    <small>
                        توجه: در صورتی که درخواست شما توسط استاد یا مدیر گروه رد شده است، می توانید بر روی دکمه حذف درخواست
                        کارآموزی کلیک نمایید تا مجددا درخواست ثبت کنید.
                    </small>
                </div>
            </div>
        </div>
        <div class="row my-3">
            <div class="col">
                <card :title="'درخواست کارآموزی'">
                    <stu-request-form />
                </card>
            </div>
        </div>
        <div class="row my-3">
            <div class="col">
                <card :title="'نتیجه درخواست کارآموزی'">
                    <stu-request-result-form />
                </card>
            </div>
        </div>
    </template>
</template>