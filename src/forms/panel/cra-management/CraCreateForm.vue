<template>
    <div v-if="form.enabled" class="alert alert-info px-2 py-2" dir="rtl">
        <small>
            توجه: کاربر محترم، شما از قبل درخواستی ثبت کرده اید. درخواست شما درحال بررسی می باشد.
        </small>
    </div>
    <Form :validation-schema="form.CraFormSchema" @submit="handleSubmit">
        <div class="d-flex flex-wrap justify-content-start flex-row-reverse align-items-start">
            <div class="form-group mx-1">
                <label for="company_name">
                    نام شرکت
                </label>
                <Field type="text" dir="rtl" name="company_name" v-model="form.params.company_name" id="company_name"
                    class="form-control form-control-sm" />
                <ErrorMessage name="company_name" />
            </div>

            <div class="form-group mx-1">
                <label for="company_manager_name">
                    نام مدیرعامل
                </label>
                <Field type="text" dir="rtl" name="company_manager_name" v-model="form.params.company_manager_name"
                    id="company_manager_name" class="form-control form-control-sm" />
                <ErrorMessage name="company_manager_name" />
            </div>

            <div class="form-group mx-1">
                <label for="company_supervisor_name">
                    نام سرپرست
                </label>
                <Field type="text" dir="rtl" name="company_supervisor_name" v-model="form.params.company_supervisor_name"
                    id="company_supervisor_name" class="form-control form-control-sm" />
                <ErrorMessage name="company_supervisor_name" />
            </div>

            <div class="form-group mx-1">
                <label for="company_supervisor_phone">
                    شماره همراه سرپرست
                </label>
                <Field type="text" @keypress="handleNumber" dir="rtl" name="company_supervisor_phone"
                    v-model="form.params.company_supervisor_phone" id="company_supervisor_phone"
                    class="form-control form-control-sm" />
                <ErrorMessage name="company_supervisor_phone" />
            </div>

            <div class="form-group mx-1">
                <label for="company_telephone">
                    شماره شرکت
                </label>
                <Field type="text" @keypress="handleNumber" dir="rtl" name="company_telephone"
                    v-model="form.params.company_telephone" id="company_telephone" class="form-control form-control-sm" />
                <ErrorMessage name="company_telephone" />
            </div>

            <div class="form-group mx-1 w-100">
                <label for="company_address">
                    آدرس شرکت
                </label>
                <Field type="text" dir="rtl" name="company_address" v-model="form.params.company_address"
                    id="company_address" class="form-control form-control-sm" />
                <ErrorMessage name="company_address" />
            </div>

            <div class="form-group mx-1 w-100">
                <label for="description">
                    توضیحات
                </label>
                <Field as="textarea" type="text" dir="rtl" name="description" v-model="form.params.description"
                    id="description" class="form-control form-control-sm" />
                <ErrorMessage name="description" />
            </div>

        </div>
        <div class="d-flex mx-1 mt-3">
            <button type="submit" :disabled="form.enabled" class="btn btn-sm btn-primary shadow-sm">
                ذخیره
            </button>
        </div>
    </Form>
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
