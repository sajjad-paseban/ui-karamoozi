<template>
    <Form :validation-schema="form.StuSemestersSchema" @submit="handleSubmit">
        <div class="d-flex justify-content-start flex-row-reverse align-items-start">
            <div class="form-group mx-1">
                <label for="semester_id">
                    نیمسال تحصیلی
                </label>
                <Field as="select" dir="rtl" name="semester_id" v-model="form.params.semester_id" id="semester_id"
                    class="form-select form-select-sm">
                    <option v-for="(item, key) in semesters" :key="key" :value="item.id">{{ item?.name }}</option>
                </Field>
                <ErrorMessage name="semester_id" />
            </div>
            <div class="form-group mx-1">
                <label for="group_id">
                    نام گروه
                </label>
                <Field as="select" dir="rtl" name="group_id" v-model="form.params.group_id" id="group_id"
                    class="form-select form-select-sm">
                    <option v-for="(item, key) in groups" :key="key" :value="item.id">{{ item?.name }}</option>
                </Field>
                <ErrorMessage name="group_id" />
            </div>
            <div class="form-group mx-1">
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
import { StuSemestersSchema } from '@/forms/Schema'
import { handleNumber, Toast } from '@/helpers/Base'
import { update_stu_semesters, find_data, get_users_by_role } from '@/services/stu_semesters.service'
import { get_data as group_get_data } from '@/services/group.service'
import { get_data as semester_get_data } from '@/services/semester.service'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
    name: 'semester-edit-form',
    setup() {
        const route = useRoute()
        const router = useRouter()
        return {
            route,
            router
        }
    },
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        return {
            form: {
                StuSemestersSchema,
                params: {
                    semester_id: null,
                    group_id: null,
                    userid: null,
                    status: true,
                }
            },
            semesters: [],
            groups: [],
            users: [],
        }
    },
    methods: {
        handleNumber,
        statusHandler: function (el: any) {
            this.form.params.status = el.target.checked
        },
        handleSubmit: async function (values: any, { resetForm }: any) {

            Object.assign(values, { status: this.form.params.status ? 1 : 0 })

            const res = await update_stu_semesters(values, this.route.params.id as unknown as number)

            Toast.fire({
                text: res.data.message ?? 'عملیات با خطا مواجه گردید',
                icon: res.data.code == 200 ? 'success' : 'error'
            }).then(() => {
                resetForm()
                this.router.push({ name: 'stu-semesters-management' })
            })
        }
    },
    async mounted() {

        const result = await find_data(this.route.params.id as unknown as number)
        if (result.status == 200) {
            this.form.params.semester_id = result.data.row.stu_semesters_list.semester_id
            this.form.params.userid = result.data.row.stu_semesters_list.user.id
            this.form.params.group_id = result.data.row.stu_semesters_list.group_id
            this.form.params.status = result.data.row.stu_semesters_list.status == 1 ? true : false
        }

        const semester_res = await semester_get_data()
        if (semester_res.status == 200)
            this.semesters = semester_res.data.row.semester_list

        const group_res = await group_get_data()
        if (group_res.status == 200)
            this.groups = group_res.data.row.uni_group_list

        const users_res = await get_users_by_role(4)
        if (users_res.status == 200)
            this.users = users_res.data.row.users

    }
})
</script>
