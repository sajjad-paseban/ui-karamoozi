<template>
    <Form :validation-schema="form.AccessRolesFormSchema" @submit="handleSubmit">
        <div class="d-flex justify-content-start flex-row-reverse align-items-start">
            <div class="form-group w-25 mx-1">
                <label for="role_id">
                    نقش
                </label>
                <Field as="select" dir="rtl" name="role_id" v-model="form.params.role_id" id="role_id"
                    class="form-select form-select-sm">
                    <option v-for="(item, key) in roles" :key="key" :value="item.id">{{ item.title }}</option>
                </Field>
                <ErrorMessage name="role_id" />
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
import { AccessRolesFormSchema } from '@/forms/Schema'
import { handleNumber, Toast } from '@/helpers/Base'
import { get_data as get_role_data } from '@/services/role.service'
import { get_data as get_menu_data } from '@/services/menu.service'
import { find_data, update_role_access } from '@/services/roles_access.service'
export default defineComponent({
    name: 'access-roles-edit-form',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    props: ['props'],
    data() {
        return {
            form: {
                AccessRolesFormSchema,
                params: {
                    role_id: null,
                    menu_id: null,
                    status: true,
                }
            },
            roles: [],
            menus: []
        }
    },
    methods: {
        handleNumber,
        statusHandler: function (el: any) {
            this.form.params.status = el.target.checked
        },
        getPageData: function () {
            this.$emit('get-page-data', { page: 0, section: 0 })
        },
        handleSubmit: async function (values: any, { resetForm }: any) {

            Object.assign(values, { status: this.form.params.status ? 1 : 0 })

            const res = await update_role_access(values, this.props.id)

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
        const roles_res = await get_role_data()
        this.roles = roles_res.data.row.role_list

        const menus_res = await get_menu_data()
        this.menus = menus_res.data.row.menu_list

        const result = await find_data(this.props.id)
        if (result.status == 200) {
            this.form.params.role_id = result.data.row.role_access_list.role_id
            this.form.params.menu_id = result.data.row.role_access_list.menu_id
            this.form.params.status = result.data.row.role_access_list.status == 1 ? true : false
        }
    }
})
</script>
