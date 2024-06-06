<template>
    <Form :validation-schema="form.RoleFormSchema" @submit="handleSubmit">
        <div class="d-flex justify-content-start flex-row-reverse align-items-start">
            <div class="form-group mx-1">
                <label for="title">
                    عنوان
                </label>
                <Field type="text" dir="rtl" name="title" v-model="form.params.title" id="title"
                    class="form-control form-control-sm" />
                <ErrorMessage name="title" />
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
import { RoleFormSchema } from '@/forms/Schema'
import { handleNumber, Toast } from '@/helpers/Base'
import { create_role } from '@/services/role.service'
export default defineComponent({
    name: 'role-create-form',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        return {
            form: {
                RoleFormSchema,
                params: {
                    title: null,
                    status: true,
                }
            },
        }
    },
    methods: {
        handleNumber,
        statusHandler: function (el: any) {
            this.form.params.status = el.target.checked
        },
        getPageData: function () {
            this.$emit('get-page-data', { page: 0 })
        },
        handleSubmit: async function (values: any, { resetForm }: any) {

            Object.assign(values, { status: this.form.params.status ? 1 : 0 })

            const res = await create_role(values)

            Toast.fire({
                text: res.data.message,
                icon: res.data.code == 200 ? 'success' : 'error'
            }).then(() => {
                resetForm()
                this.getPageData()
            })
        }
    },
})
</script>
