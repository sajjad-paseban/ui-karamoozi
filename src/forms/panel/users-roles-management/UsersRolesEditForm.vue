<template>
    <Form :validation-schema="form.UsersRolesFormSchema" @submit="handleSubmit">
        <div class="d-flex justify-content-start flex-row-reverse align-items-start">
            <div class="form-group mx-1">
                <label for="user_id">
                    کاربر
                </label>
                <Field type="text" as="select" dir="rtl" name="user_id" v-model="form.params.user_id" id="user_id"
                    class="form-control form-control-sm">
                    <option value="">یک گزینه را انتخاب کنید</option>
                    <option v-for="(item, index) in usersOption" :key="index" :value="item.id">{{ item?.fname + ' ' +
                        item?.lname }}</option>
                </Field>
                <ErrorMessage name="user_id" />
            </div>
            <div class="form-group mx-1">
                <label for="role_id">
                    نقش
                </label>
                <Field type="text" as="select" dir="rtl" name="role_id" v-model="form.params.role_id" id="role_id"
                    class="form-control form-control-sm">
                    <option value="">یک گزینه را انتخاب کنید</option>
                    <option v-for="(item, index) in rolesOption" :key="index" :value="item.id">{{ item?.title }}</option>
                </Field>
                <ErrorMessage name="role_id" />
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
import { UsersRolesFormSchema } from '../../../forms/Schema'
import { handleNumber, Toast } from '../../../helpers/Base'
import { find_data, update_users_roles } from '../../../services/users_roles.service'
import { get_data as user_get_data } from '../../../services/user.service'
import { get_data as role_get_data } from '../../../services/role.service'
export default defineComponent({
    name: 'users-roles-edit-form',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    props: ['props'],
    data() {
        return {
            form: {
                UsersRolesFormSchema,
                params: {
                    user_id: null,
                    role_id: null,
                    status: true,
                }
            },
            usersOption: [],
            rolesOption: []
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

            const res = await update_users_roles(values, this.props.id)

            Toast.fire({
                text: res.data.message,
                icon: res.data.code == 200 ? 'success' : 'error'
            }).then(() => {
                resetForm()
                this.getPageData()
            })
        }
    },
    async mounted() {
        const users = await user_get_data()
        if (users.status == 200)
            this.usersOption = users.data.row.user_list

        const roles = await role_get_data()
        if (users.status == 200)
            this.rolesOption = roles.data.row.role_list

        const result = await find_data(this.props.id)
        if (result.status == 200) {
            this.form.params.user_id = result.data.row.users_roles_list.user_id
            this.form.params.role_id = result.data.row.users_roles_list.role_id
            this.form.params.status = result.data.row.users_roles_list.status == 1 ? true : false
        }
    }
})
</script>
