<template>
    <div class="login-form">
        <h3>
            سامانه کارآموزی
        </h3>
        <Form :validation-schema="form.LoginFormSchema" @submit="handleSubmit">
            <div class="form-group">
                <label for="national_code">
                    کد ملی
                </label>
                <Field @keypress="handleNumber" name="national_code" id="national_code"
                    class="form-control form-control-sm" />
                <ErrorMessage name="national_code" />
            </div>
            <div class="form-group">
                <label for="password">
                    گذرواژه
                </label>
                <Field type="password" name="password" id="password" class="form-control form-control-sm" />
                <ErrorMessage name="password" />
            </div>
            <div class="form-group mt-1 mx-1">
                <router-link to="">
                    !گذرواژه خود را فراموش کرده ام
                </router-link>
            </div>
            <div class="form-group mt-1 mx-1">
                <router-link to="/register">
                    !من ثبت نام نکرده ام
                </router-link>
            </div>
            <div class="form-group d-flex justify-content-center my-3">
                <Button title="ورود به پنل کاربری" group="alpha" btn-class="btn btn-secondary" type="submit" />
            </div>
        </Form>
    </div>
</template>

<script lang="ts">
import Button from '@/components/Button.vue';
import { Form, Field, ErrorMessage } from 'vee-validate'
import { defineComponent } from 'vue'
import { LoginFormSchema } from '@/forms/Schema'
import { login } from '@/services/auth.service';
import { Toast } from '@/helpers/Base';
import useAuthStore from '@/store/auth-store';
export default defineComponent({
    name: 'login-form',
    components: {
        Form,
        Field,
        ErrorMessage,
        Button,
    },
    data() {
        return {
            form: {
                LoginFormSchema,
                params: {
                    national_code: null,
                    password: null
                }
            }
        }
    },
    methods: {
        handleNumber(e: any) {
            let persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"]
            let normalNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-"]
            if (!(normalNumbers.includes(e.key) || persianNumbers.includes(e.key)))
                e.preventDefault()
        },
        async handleSubmit(values: any, { resetForm }: any) {
            const res = await login(values);

            if (res.data.code == 200) {

                useAuthStore().set_auth(
                    res.data.row.user_info.id,
                    res.data.row.token
                )
            }

            Toast.fire({
                text: res.data.message,
                icon: res.status == 200 ? 'success' : 'warning'
            }).then(() => {
                this.$router.push('/panel?flg=true')
            })

        }
    }
})
</script>

<style lang="scss" scoped>
.login-form {
    h3 {
        text-align: center;
        font-family: 'yekan';
        color: #fff;
        margin: 10px 0;
    }

    a {
        color: #0B44EF;
        font-family: 'vazir';
        font-size: 12px;
    }

    label {
        color: rgba($color: #fff, $alpha: 0.8) !important;
    }
}
</style>