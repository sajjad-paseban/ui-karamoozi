<template>
    <Form :validation-schema="form.SiteFormSchema" @submit="handleSubmit">
        <div class="d-flex justify-content-start flex-row-reverse align-items-start">
            <div class="form-group mx-1">
                <label for="name">
                    نام سایت
                </label>
                <Field type="text" dir="rtl" name="name" v-model="form.params.name" id="name"
                    class="form-control form-control-sm" />
                <ErrorMessage name="name" />
            </div>
            <div class="form-group mx-1">
                <label for="link">
                    لینک سایت
                </label>
                <Field type="text" dir="rtl" name="link" v-model="form.params.link" id="link"
                    class="form-control form-control-sm" />
                <ErrorMessage name="link" />
            </div>
        </div>
        <div class="d-flex">
            <div class="form-group w-100 m-1">
                <label for="status">
                    آیا فعال می باشد؟
                </label>
                <div class="form-check form-switch d-flex flex-column align-items-end">
                    <input type="checkbox" :checked="form.params.status" @change="statusHandler" name="status" id="status"
                        class="form-check-input">
                    <Field hidden type="checkbox" @change="statusHandler" name="status" id="status"
                        class="form-check-input" />
                    <ErrorMessage name="status" />
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
import { SiteFormSchema } from '@/forms/Schema'
import { handleNumber, Toast } from '@/helpers/Base'
import { create_site } from '@/services/sites.service'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
    name: 'site-create-form',
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
                SiteFormSchema,
                params: {
                    name: null,
                    link: null,
                    status: true,
                }
            }
        }
    },
    methods: {
        handleNumber,
        statusHandler: function (el: any) {
            this.form.params.status = el.target.checked
        },
        handleSubmit: async function (values: any, { resetForm }: any) {

            Object.assign(values, { status: this.form.params.status ? 1 : 0 })

            const res = await create_site(values)

            Toast.fire({
                text: res.data.message ?? 'عملیات با خطا مواجه شد',
                icon: res.data.code == 200 ? 'success' : 'error'
            }).then(() => {
                resetForm()
                this.router.push({ name: 'sites-management' })
            })
        }
    },
})
</script>
