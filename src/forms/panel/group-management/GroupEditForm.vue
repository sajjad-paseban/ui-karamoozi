<template>
    <Form :validation-schema="form.GroupFormSchema" @submit="handleSubmit">
        <div class="d-flex justify-content-start flex-row-reverse align-items-start">
            <div class="form-group mx-1">
                <label for="code">
                    کد گروه
                </label>
                <Field type="text" @keypress="handleNumber" dir="rtl" name="code" v-model="form.params.code" id="code"
                    class="form-control form-control-sm" />
                <ErrorMessage name="code" />
            </div>
            <div class="form-group mx-1">
                <label for="name">
                    عنوان گروه
                </label>
                <Field type="text" dir="rtl" name="name" v-model="form.params.name" id="name"
                    class="form-control form-control-sm" />
                <ErrorMessage name="name" />
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
import { GroupFormSchema } from '@/forms/Schema'
import { handleNumber, Toast } from '@/helpers/Base'
import { find_data, update_group } from '@/services/group.service'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
    name: 'group-edit-form',
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
                GroupFormSchema,
                params: {
                    code: null,
                    name: null,
                    status: true,
                }
            },
        }
    },
    methods: {
        handleNumber,
        statusHandler: function (el: any) {
            this.form.params.status = el.target.checked
        },
        handleSubmit: async function (values: any, { resetForm }: any) {

            Object.assign(values, { status: this.form.params.status ? 1 : 0 })

            const res = await update_group(values, this.route.params.id as unknown as number)

            Toast.fire({
                text: res.data.message ?? 'عملیات با خطا مواجه گردید',
                icon: res.data.code == 200 ? 'success' : 'error'
            }).then(() => {
                resetForm()
                this.router.push({ name: 'group-management' })
            })
        }
    },
    async mounted() {

        const result = await find_data(this.route.params.id as unknown as number)
        if (result.status == 200) {
            this.form.params.name = result.data.row.uni_group_list.name
            this.form.params.code = result.data.row.uni_group_list.code
            this.form.params.status = result.data.row.uni_group_list.status == 1 ? true : false
        }

    }
})
</script>
