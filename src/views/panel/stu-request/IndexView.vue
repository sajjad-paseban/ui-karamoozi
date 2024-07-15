<script lang="ts">
import Card from "@/components/Card.vue";
import StuRequestForm from "@/forms/panel/stu-request/StuRequestForm.vue";
import StuRequestResultForm from "@/forms/panel/stu-request/StuRequestResultForm.vue";
import { AskPrompt, Toast } from "@/helpers/Base";
import { has_access, delete_request } from "@/services/stu_request.service"
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
    name: 'index-view',
    components: {
        Card,
        StuRequestForm,
        StuRequestResultForm
    },
    setup() {
        const router = useRouter()

        return {
            router
        }
    },
    data() {
        return {
            active: false,
            stu_semester_id: 0,
            group_id: 0,
            request_id: 0
        }
    },
    methods: {
        getRequestId(id: any) {
            this.request_id = id
        },
        handleDeleteRequest() {
            AskPrompt('آیا از انجام اینکار مطمئن هستید؟', 'warning').then(async result => {
                if (result.isConfirmed) {
                    const res = await delete_request(this.request_id)

                    Toast.fire({
                        text: res.data.message ?? 'عملیات با خطا مواجه شد',
                        icon: res.data.code == 200 ? 'success' : 'error'
                    }).then(() => {
                        if (res.status == 200) {
                            this.router.push({ name: 'dashboard' })
                        }
                    })
                }
            })
        }
    },
    async beforeMount() {
        const has_access_res = await has_access()
        if (has_access_res.status == 200) {
            this.active = has_access_res.data.row.has_access
            this.stu_semester_id = has_access_res.data.row.stu_semester_id
            this.group_id = has_access_res.data.row.group_id
        }
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
                <button class="btn btn-sm btn-primary" @click="handleDeleteRequest">
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
                    <stu-request-form :stu_id="stu_semester_id" :group_id="group_id" @get-request-id="getRequestId" />
                </card>
            </div>
        </div>
        <div class="row my-3">
            <div class="col">
                <card :title="'نتیجه درخواست کارآموزی'">
                    <stu-request-result-form :request_id="request_id" />
                </card>
            </div>
        </div>
    </template>
</template>