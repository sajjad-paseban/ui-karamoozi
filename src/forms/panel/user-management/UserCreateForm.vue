<template>
    <div class="alert alert-info px-2 py-2" dir="rtl">
        <small>
            توجه: گذرواره کاربر جدید بصورت پیشفرض کد ملی در نظر گرفته می شود
        </small>
    </div>
    <Form :validation-schema="form.UserFormSchema" @submit="handleSubmit">
        <div class="d-flex justify-content-start flex-row-reverse align-items-start">
            <div class="form-group mx-1">
                <label for="nationalcode">
                    کد ملی
                </label>
                <Field @keypress="handleNumber" @keyup="form.params.password = form.params.nationalcode"
                    v-model="form.params.nationalcode" name="nationalcode" id="nationalcode"
                    class="form-control form-control-sm" />
                <ErrorMessage name="nationalcode" />
            </div>
            <div class="form-group mx-1">
                <label for="phone">
                    شماره همراه
                </label>
                <Field @keypress="handleNumber" v-model="form.params.phone" name="phone" id="phone"
                    class="form-control form-control-sm" />
                <ErrorMessage name="phone" />
            </div>
            <div class="form-group mx-1">
                <label for="email">
                    پست الکترونیکی
                </label>
                <Field v-model="form.params.email" name="email" id="email" class="form-control form-control-sm" />
                <ErrorMessage name="email" />
            </div>
            <div class="form-group mx-1">
                <label for="password">
                    گذرواژه
                </label>
                <Field disabled v-model="form.params.password" type="password" name="password" id="password"
                    class="form-control form-control-sm" />
                <ErrorMessage name="password" />
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
import { UserFormSchema } from '@/forms/Schema'
import { handleNumber, Toast } from '@/helpers/Base'
import { create_user } from '@/services/user.service'
export default defineComponent({
    name: 'user-create-form',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        return {
            form: {
                UserFormSchema,
                params: {
                    nationalcode: null,
                    phone: null,
                    email: null,
                    password: null,
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

            const res = await create_user(values)

            Toast.fire({
                text: res.data.message,
                icon: res.data.code == 201 ? 'success' : 'error'
            }).then(() => {
                resetForm()
                this.getPageData()
            })
        }
    }
})
</script>
