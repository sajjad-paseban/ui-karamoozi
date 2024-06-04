<template>
    <Form :validation-schema="form.PasswordChangeFormSchema" @submit="handleSubmit">
        <div class="d-flex justify-content-start flex-row-reverse align-items-start">
            <div class="form-group mx-1">
                <label for="password">
                    کلمه عبور
                </label>
                <Field type="password" name="password" id="password" class="form-control form-control-sm" />
                <ErrorMessage name="password" />
            </div>
            <div class="form-group mx-1">
                <label for="re_password">
                    تکرار کلمه عبور
                </label>
                <Field type="password" name="re_password" id="re_password" class="form-control form-control-sm" />
                <ErrorMessage name="re_password" />
            </div>
            <div class="form-group mx-1 position-relative" style="top: 33px;">
                <button class="btn btn-sm btn-primary shadow-sm">
                    تغییر کلمه عبور
                </button>
            </div>
        </div>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { PasswordChangeFormSchema } from '../Schema'
import { handleNumber, Toast } from '@/helpers/Base'
import { change_password } from '@/services/auth.service'
export default defineComponent({
    name: 'password-change-form',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        return {
            form: {
                PasswordChangeFormSchema,
                params: {
                    password: null,
                    re_password: null,
                }
            }
        }
    },
    methods: {
        handleNumber,
        handleSubmit: async (values: any, { resetForm }: any) => {
            const res = await change_password(values)

            Toast.fire({
                text: res.data.message,
                icon: res.data.code == 200 ? 'success' : 'error'
            })
        }
    }
})
</script>
