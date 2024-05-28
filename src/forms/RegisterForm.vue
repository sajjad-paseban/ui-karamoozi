<template>
    <div class="register-form">
        <h3>
            سامانه کارآموزی
        </h3>
        <Form
            :validation-schema="form.RegisterFormSchema"
            @submit="handleSubmit"
        >
            <div class="form-group">
                <label for="national_code">
                    کد ملی
                </label>
                <Field @keypress="handleNumber" name="national_code" id="national_code" class="form-control form-control-sm" />
                <ErrorMessage name="national_code" />
            </div>
            <div class="form-group">
                <label for="phone">
                    شماره همراه
                </label>
                <Field @keypress="handleNumber" name="phone" id="phone" class="form-control form-control-sm" />
                <ErrorMessage name="phone" />
            </div>
            <div class="form-group">
                <label for="email">
                    پست الکترونیکی
                </label>
                <Field name="email" id="email" class="form-control form-control-sm" />
                <ErrorMessage name="email" />
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
                    ! قوانین و مقررات سامانه کاراموزی
                </router-link>
            </div>
            <div class="form-group mt-1 mx-1">
                <router-link to="/login">
                    ! من قبلا ثبت نام کرده ام
                </router-link>
            </div>
            <div class="form-group d-flex justify-content-center my-3">
                <Button 
                    :disabled="form.disableSubmitButton"
                    title="ثبت نام در سامانه کارآموزی"
                    group="alpha"
                    btn-class="btn btn-secondary"
                    type="submit"
                />
            </div>
        </Form>
    </div>
</template>

<script lang="ts">
import Button from '@/components/Button.vue';
import { Form, Field, ErrorMessage } from 'vee-validate'
import { defineComponent } from 'vue'
import { RegisterFormSchema } from '@/forms/Schema'
import { register } from '@/services/auth.service';
import { Toast } from '@/helpers/Base';
export default defineComponent({
    name: 'register-form',
    components: {
        Form,
        Field,
        ErrorMessage,
        Button,
    },
    data(){
        return{
            form: {
                RegisterFormSchema,
                params: {
                    national_code: null,
                    password: null
                },
                disableSubmitButton: false
            }
        }
    },
    methods: {
        handleNumber(e: any){
            let persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"]
            let normalNumbers = ["1","2","3","4","5","6","7","8","9","0","-"]
            if(!(normalNumbers.includes(e.key) || persianNumbers.includes(e.key)))
                e.preventDefault()
        },
        async handleSubmit(values: any, { resetForm }: any){
            this.form.disableSubmitButton = true
            const res = await register(values);
            Toast.fire({
                text: res.data.message,
                icon: res.status == 201 ? 'success' : 'error'
            }).then(() => {
                
                if(res.status == 201)
                Toast.fire({
                    text: 'لینک فعال سازی حساب کاربری به پست الکرونیکی شما ارسال گردید',
                    icon: 'success'
                })
            })
            
            resetForm()
            this.form.disableSubmitButton = false
        }
    }
})
</script>

<style lang="scss" scoped>
    .register-form{
        h3{
            text-align: center;
            font-family: 'yekan';
            color: #fff;
            margin: 10px 0;
        }

        a{
            color: #0B44EF;
            font-family: 'vazir';
            font-size: 12px;
        }
        label{
            color: rgba($color: #fff, $alpha: 0.8) !important;
        }
    }
</style>