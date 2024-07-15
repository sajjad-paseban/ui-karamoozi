<template>
    <div class="alert alert-success px-2 py-2" dir="rtl">
        <small>
            درخواست شما توسط استاد تایید شده است.
        </small>
    </div>
    <div class="d-flex flex-wrap justify-content-start flex-row-reverse align-items-start">
        <div class="form-group w-100 mx-1">
            <label for="teacher_description">
                توضیحات استاد
            </label>
            <Field as="textarea" type="text" dir="rtl" name="teacher_description" v-model="form.params.company_name"
                id="company_name" class="form-control form-control-sm" />
            <ErrorMessage name="company_name" />
        </div>
    </div>
    <div class="alert alert-success px-2 mt-3 py-2" dir="rtl">
        <small>
            درخواست شما توسط مدیر گروه تایید شده است
        </small>
    </div>
    <div class="d-flex flex-wrap justify-content-start flex-row-reverse align-items-start">
        <div class="form-group w-100 mx-1">
            <label for="manager_description">
                .توضیحات مدیر گروه
            </label>
            <Field as="textarea" type="text" dir="rtl" name="teacher_description" v-model="form.params.company_name"
                id="company_name" class="form-control form-control-sm" />
            <ErrorMessage name="company_name" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { CraFormSchema } from '@/forms/Schema'
import { handleNumber, Toast } from '@/helpers/Base'
import { create_cra, find_data_by_user_id } from '@/services/cra.service'
import { useRoute, useRouter } from 'vue-router'
import useUserStore from '@/store/user-store'
export default defineComponent({
    name: 'cra-create-form',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const userStore = useUserStore()
        return {
            route,
            router,
            userStore
        }
    },
    data(): any {
        return {
            form: {
                CraFormSchema,
                params: {
                    company_name: null,
                    company_manager_name: null,
                    company_supervisor_name: null,
                    company_supervisor_phone: null,
                    company_telephone: null,
                    company_address: null,
                    description: null,
                },
                enabled: false
            }
        }
    },
    async mounted() {
        const res_find = await find_data_by_user_id()
        const res = res_find.data.row.company_registration_application_list
        if (res) {
            this.form.enabled = true

            this.form.params.company_name = res.company_name;
            this.form.params.company_manager_name = res.company_manager_name;
            this.form.params.company_supervisor_name = res.company_supervisor_name;
            this.form.params.company_supervisor_phone = '0' + res.company_supervisor_phone;
            this.form.params.company_telephone = '0' + res.company_telephone;
            this.form.params.company_address = res.company_address;
            this.form.params.description = res.description;
        } else {
            this.form.params.company_manager_name = this.userStore.user.info.fullname
            this.form.params.company_supervisor_name = this.userStore.user.info.fullname
            this.form.params.company_supervisor_phone = this.userStore.user.info.phone
        }

    },
    methods: {
        handleNumber,
        statusHandler: function (el: any) {
            this.form.params.status = el.target.checked
        },
        handleSubmit: async function (values: any, { resetForm }: any) {

            Object.assign(values, { status: this.form.params.status ? 1 : 0 })

            const res = await create_cra(values)

            Toast.fire({
                text: res.data.message ?? 'عملیات با خطا مواجه شد',
                icon: res.data.code == 200 ? 'success' : 'error'
            }).then(() => {
                resetForm()
                this.router.push({ name: 'dashboard' })
                this.form.enabled = true
            })
        }
    },
})
</script>
