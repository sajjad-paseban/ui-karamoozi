<template>
    <Form :validation-schema="form.SemesterFormSchema" @submit="handleSubmit">
        <div class="d-flex justify-content-start flex-row-reverse align-items-start">
            <div class="form-group mx-1">
                <label for="code">
                    کد نیمسال تحصیلی
                </label>
                <Field type="text" @keypress="handleNumber" dir="rtl" name="code" v-model="form.params.code" id="code"
                    class="form-control form-control-sm" />
                <ErrorMessage name="code" />
            </div>
            <div class="form-group mx-1">
                <label for="name">
                    نام نیمسال تحصیلی
                </label>
                <Field type="text" dir="rtl" name="name" v-model="form.params.name" id="name"
                    class="form-control form-control-sm" />
                <ErrorMessage name="name" />
            </div>
        </div>
        <div class="d-flex">
            <div class="form-group w-100 m-1">
                <label for="is_active">
                    آیا فعال می باشد؟
                </label>
                <div class="form-check form-switch d-flex flex-column align-items-end">
                    <input type="checkbox" :checked="form.params.is_active" @change="statusHandler" name="is_active"
                        id="is_active" class="form-check-input">
                    <Field hidden type="checkbox" @change="statusHandler" name="is_active" id="is_active"
                        class="form-check-input" />
                    <ErrorMessage name="is_active" />
                </div>
            </div>
        </div>
        <div class="d-flex">
            <button type="submit" class="btn btn-sm btn-primary shadow-sm">
                ذخیره
            </button>
        </div>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { SemesterFormSchema } from '@/forms/Schema'
import { handleNumber, Toast } from '@/helpers/Base'
import { create_semester } from '@/services/semester.service'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
    name: 'semester-create-form',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        return {
            route,
            router
        }
    },
    data() {
        return {
            form: {
                SemesterFormSchema,
                params: {
                    code: null,
                    name: null,
                    is_active: true,
                }
            }
        }
    },
    methods: {
        handleNumber,
        statusHandler: function (el: any) {
            this.form.params.is_active = el.target.checked
        },
        handleSubmit: async function (values: any, { resetForm }: any) {

            Object.assign(values, { is_active: this.form.params.is_active ? 1 : 0 })

            const res = await create_semester(values)

            Toast.fire({
                text: res.data.message ?? 'عملیات با خطا مواجه شد',
                icon: res.data.code == 200 ? 'success' : 'error'
            }).then(() => {
                resetForm()
                this.router.push({ name: 'semester-management' })
            })
        }
    },
})
</script>
