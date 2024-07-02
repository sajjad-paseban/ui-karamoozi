<template>
    <Form :validation-schema="form.DefaultRoleFormSchema" @submit="handleSubmit">
        <div class="d-flex justify-content-start flex-row-reverse align-items-start">
            <div class="form-group w-25 mx-1">
                <label for="role_id">
                    نقش
                </label>
                <Field as="select" dir="rtl" name="role_id" v-model="form.params.role_id" id="role_id"
                    class="form-select form-select-sm">
                    <option v-for="(item, key) in roles" :key="key" :value="item.role.id">{{ item?.role.title }}</option>
                </Field>
                <ErrorMessage name="province_id" />
            </div>
        </div>
        <div class="form-group d-flex  m-2">
            <button class="btn btn-sm btn-primary shadow-sm">
                ذخیره نقش
            </button>
        </div>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { DefaultRoleFormSchema } from '../Schema'
import { handleNumber, Toast } from '@/helpers/Base'
import DatePicker from 'vue3-persian-datetime-picker'
import useUserStore from '@/store/user-store'
import { get_info, update_user_info } from '@/services/user.service'
import useAuthStore from '@/store/auth-store'
import { get_user_roles, update_user_default_role } from '@/services/users_roles.service'

export default defineComponent({
    name: 'default-role-form',
    components: {
        Form,
        Field,
        ErrorMessage,
        DatePicker
    },
    data() {
        return {
            form: {
                DefaultRoleFormSchema,
                params: {
                    role_id: -1
                }
            },
            roles: []
        }
    },
    methods: {
        handleNumber,
        handleSubmit: async (values: any, { resetForm }: any) => {
            const res = await update_user_default_role(values.role_id)

            Toast.fire({
                text: res.data.message,
                icon: res.status == 200 ? 'success' : 'error'
            }).then(res => location.reload())
        }
    },
    async mounted() {
        const roles_list = await get_user_roles()

        this.roles = roles_list.data.row
        this.form.params.role_id = (this.roles.find((item: any) => item.default_role == true) as any).role.id
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