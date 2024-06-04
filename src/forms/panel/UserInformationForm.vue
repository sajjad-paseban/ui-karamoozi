<template>
    <Form :validation-schema="form.UserInformationFormSchema" @submit="handleSubmit">
        <div class="d-flex justify-content-start flex-row-reverse align-items-start">
            <div class="form-group mx-1">
                <label for="fname">
                    نام
                </label>
                <Field type="text" v-model="form.params.fname" name="fname" id="fname"
                    class="form-control form-control-sm" />
                <ErrorMessage name="fname" />
            </div>
            <div class="form-group mx-1">
                <label for="lname">
                    نام خانوادگی
                </label>
                <Field type="text" v-model="form.params.lname" name="lname" id="lname"
                    class="form-control form-control-sm" />
                <ErrorMessage name="lname" />
            </div>
            <div class="form-group mx-1">
                <label for="birthdate">
                    تاریخ تولد
                </label>
                <!-- <date-picker v-model="form.params.birthdate"></date-picker> -->
                <Field type="date" v-model="form.params.birthdate" name="birthdate" id="birthdate"
                    class="form-control form-control-sm" />
                <ErrorMessage name="birthdate" />
            </div>
            <div class="form-group mx-1">
                <label for="nationalcode">
                    کد ملی
                </label>
                <Field type="text" v-model="form.params.nationalcode" disabled name="nationalcode" @keyup="handleNumber"
                    id="nationalcode" class="form-control form-control-sm" />
                <ErrorMessage name="nationalcode" />
            </div>
            <div class="form-group mx-1">
                <label for="phone">
                    شماره همراه
                </label>
                <Field type="text" v-model="form.params.phone" name="phone" @keyup="handleNumber" id="phone"
                    class="form-control form-control-sm" />
                <ErrorMessage name="phone" />
            </div>
            <div class="form-group mx-1">
                <label for="email">
                    پست الکترونیکی
                </label>
                <Field type="email" v-model="form.params.email" disabled name="email" id="email"
                    class="form-control form-control-sm" />
                <ErrorMessage name="email" />
            </div>
        </div>
        <div class="form-group d-flex  m-2">
            <button class="btn btn-sm btn-primary shadow-sm">
                ذخیره مشخصات
            </button>
        </div>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { UserInformationFormSchema } from '../Schema'
import { handleNumber, Toast } from '@/helpers/Base'
import DatePicker from 'vue3-persian-datetime-picker'
import useUserStore from '@/store/user-store'
import { get_info, update_user_info } from '@/services/user.service'
import useAuthStore from '@/store/auth-store'

export default defineComponent({
    name: 'password-change-form',
    components: {
        Form,
        Field,
        ErrorMessage,
        DatePicker
    },
    data() {
        return {
            form: {
                UserInformationFormSchema,
                params: {
                    fname: null,
                    lname: null,
                    birthdate: null,
                    nationalcode: null,
                    phone: null,
                    email: null,
                }
            }
        }
    },
    methods: {
        handleNumber,
        handleSubmit: async (values: any, { resetForm }: any) => {
            const res = await update_user_info(values)


            Toast.fire({
                text: res.data.message,
                icon: res.data.code == 200 ? 'success' : 'error'
            })

            const info = await get_info(useAuthStore().auth)
            if (info.status == 200) {
                useUserStore().clear_user()
                useUserStore().set_user(info.data.row)
            }

        }
    },
    async mounted() {
        this.form.params.fname = useUserStore().user.info.fname
        this.form.params.lname = useUserStore().user.info.lname
        this.form.params.birthdate = useUserStore().user.info.birthdate
        this.form.params.nationalcode = useUserStore().user.info.nationalcode.length == 9 ? '0' + useUserStore().user.info.nationalcode : useUserStore().user.info.nationalcode
        this.form.params.phone = useUserStore().user.info.phone
        this.form.params.email = useUserStore().user.info.email
    }
})
</script>
<style lang="scss" scoped>
.form-group {
    input {
        direction: rtl;
    }
}
</style>