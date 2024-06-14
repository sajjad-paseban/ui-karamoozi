<template>
    <Form :validation-schema="form.AccessUsersFormSchema" @submit="handleSubmit">
        <div class="d-flex justify-content-start flex-row-reverse align-items-start">
            <div class="form-group w-25 mx-1">
                <label for="user_id">
                    کاربر
                </label>
                <Field as="select" dir="rtl" name="user_id" v-model="form.params.user_id" id="user_id"
                    class="form-select form-select-sm">
                    <option v-for="(item, key) in users" :key="key" :value="item.id">
                        {{ item.fname + ' ' + item.lname + ' (0' + item.nationalcode + ')' }}
                    </option>
                </Field>
                <ErrorMessage name="user_id" />
            </div>

            <div class="form-group w-25 mx-1">
                <label for="menu_id">
                    منو
                </label>
                <Field as="select" dir="rtl" name="menu_id" v-model="form.params.menu_id" id="menu_id"
                    class="form-select form-select-sm">
                    <option v-for="(item, key) in menus" :key="key" :value="item.id">{{ item?.title }}</option>
                </Field>
                <ErrorMessage name="menu_id" />
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
import { AccessUsersFormSchema } from '@/forms/Schema'
import { handleNumber, Toast } from '@/helpers/Base'
import { get_data as get_user_data } from '@/services/user.service'
import { get_data as get_menu_data } from '@/services/menu.service'
import { create_user_access } from '@/services/users_access.service'
export default defineComponent({
    name: 'access-users-create-form',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        return {
            form: {
                AccessUsersFormSchema,
                params: {
                    user_id: null,
                    menu_id: null,
                    status: true,
                }
            },
            users: [],
            menus: []
        }
    },
    methods: {
        handleNumber,
        statusHandler: function (el: any) {
            this.form.params.status = el.target.checked
        },
        getPageData: function () {
            this.$emit('get-page-data', { page: 0, section: 1 })
        },
        handleSubmit: async function (values: any, { resetForm }: any) {

            Object.assign(values, { status: this.form.params.status ? 1 : 0 })

            const res = await create_user_access(values)

            resetForm()

            Toast.fire({ text: res.data.message, icon: res.status == 200 ? 'success' : 'error' }).then((res) => this.getPageData())


        },
    },
    async mounted() {
        const users_res = await get_user_data()
        this.users = users_res.data.row.user_list

        const menus_res = await get_menu_data()
        this.menus = menus_res.data.row.menu_list
    }
})
</script>
