<template>
    <Form :validation-schema="form.ColorFormSchema" @submit="handleSubmit">
        <div class="d-flex justify-content-start flex-row-reverse align-items-start">
            <div class="form-group mx-1">
                <label for="title">
                    عنوان
                </label>
                <Field type="text" dir="rtl" name="title" v-model="form.params.title" id="title"
                    class="form-control form-control-sm" />
                <ErrorMessage name="title" />
            </div>
            <div class="form-group mx-1">
                <label for="color">
                    کد رنگی
                </label>
                <Field type="text" name="color" v-model="form.params.color" id="color"
                    class="form-control form-control-sm" />
                <ErrorMessage name="color" />
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
import { ColorFormSchema } from '@/forms/Schema'
import { handleNumber, Toast } from '@/helpers/Base'
import { create_color } from '@/services/color.service'
export default defineComponent({
    name: 'color-create-form',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        return {
            form: {
                ColorFormSchema,
                params: {
                    title: null,
                    color: null,
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

            const res = await create_color(values)

            Toast.fire({
                text: res.data.message,
                icon: res.data.code == 200 ? 'success' : 'error'
            }).then(() => {
                resetForm()
                this.getPageData()
            })
        }
    }
})
</script>
