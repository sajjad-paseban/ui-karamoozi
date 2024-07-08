<template>
    <Form :validation-schema="form.UsersGroupsSchema" @submit="handleSubmit">
        <div class="d-flex justify-content-start flex-row-reverse align-items-start">
            <div class="form-group mx-1">
                <label for="role_id">
                    نقش
                </label>
                <Field as="select" dir="rtl" @change="handleRoleChange" name="role_id" v-model="form.params.role_id"
                    id="role_id" class="form-select form-select-sm">
                    <option value="6">مدیر گروه</option>
                    <option value="5">استاد</option>
                </Field>
                <ErrorMessage name="role_id" />
            </div>
            <div class="form-group mx-1" v-if="form.params.role_id && (users && users.length > 0)">
                <label for="userid">
                    نام کاربر
                </label>
                <Field as="select" dir="rtl" name="userid" v-model="form.params.userid" id="userid"
                    class="form-select form-select-sm">
                    <option v-for="(item, key) in users" :key="key" :value="item?.id">{{ item?.fname + ' ' + item?.lname +
                        ' ( 0' + item?.nationalcode + ')' }}
                    </option>
                </Field>
                <ErrorMessage name="userid" />
            </div>
            <div class="form-group mx-1" v-if="form.params.role_id && form.params.userid">
                <label for="group_id">
                    نام گروه
                </label>
                <Field as="select" dir="rtl" name="group_id" v-model="form.params.group_id" id="group_id"
                    class="form-select form-select-sm">
                    <option v-for="(item, key) in groups" :key="key" :value="item.id">{{ item?.name }}</option>
                </Field>
                <ErrorMessage name="group_id" />
            </div>
        </div>
        <div class="d-flex">
            <div class="form-group w-100 m-1">
                <label for="status">
                </label>
                آیا فعال می باشد؟
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
import { UsersGroupsSchema } from '@/forms/Schema'
import { handleNumber, Toast } from '@/helpers/Base'
import { create_user_group, get_users_by_role } from '@/services/users_groups.service'
import { get_data } from '@/services/group.service'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
    name: 'users-groups-create-form',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        return {
            route,
            router
        }
    },
    data() {
        return {
            form: {
                UsersGroupsSchema,
                params: {
                    role_id: null,
                    userid: null,
                    group_id: null,
                    status: true,
                }
            },
            users: [],
            groups: [],
        }
    },
    async mounted() {
        const res = await get_data()
        if (res.status == 200)
            this.groups = res.data.row.uni_group_list
    },
    methods: {
        handleNumber,
        statusHandler: function (el: any) {
            this.form.params.status = el.target.checked
        },
        async handleRoleChange() {
            this.users = []
            this.form.params.userid = null
            const res = await get_users_by_role(this.form.params.role_id as unknown as number)
            if (res.status == 200)
                this.users = res.data.row.users
        },
        handleSubmit: async function (values: any, { resetForm }: any) {

            Object.assign(values, { status: this.form.params.status ? 1 : 0 })

            const res = await create_user_group(values)

            Toast.fire({
                text: res.data.message ?? 'عملیات با خطا مواجه شد',
                icon: res.data.code == 200 ? 'success' : 'error'
            }).then(() => {
                resetForm()
                this.router.push({ name: 'users-groups-management' })
            })
        }
    },
})
</script>
