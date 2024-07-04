<template>
    <Form :validation-schema="form.IraFormSchema" @submit="handleSubmit">
        <div class="d-flex flex-wrap justify-content-start flex-row-reverse align-items-start">
            <div class="form-group mx-1">
                <label for="group_id">
                    گروه
                </label>
                <Field as="select" dir="rtl" name="group_id" v-model="form.params.group_id" id="group_id"
                    class="form-select form-select-sm">
                    <option v-for="(item, key) in groups" :key="key" :value="item.id">{{ item?.name }}</option>
                </Field>
                <ErrorMessage name="group_id" />
            </div>

            <div class="form-group mx-1">
                <label for="capacity">
                    ظرفیت
                </label>
                <Field @keypress="handleNumber" type="text" dir="rtl" name="capacity" v-model="form.params.capacity"
                    id="capacity" class="form-control form-control-sm" />
                <ErrorMessage name="capacity" />
            </div>

            <div class="form-group mx-1 w-100">
                <label for="description">
                    توضیحات
                </label>
                <Field as="textarea" type="text" dir="rtl" name="description" v-model="form.params.description"
                    id="description" class="form-control form-control-sm" />
                <ErrorMessage name="description" />
            </div>
        </div>
        <div class="d-flex mx-1 mt-3">
            <button type="submit" class="btn btn-sm btn-primary shadow-sm">
                ذخیره
            </button>
        </div>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { IraFormSchema } from '@/forms/Schema'
import { handleNumber, Toast } from '@/helpers/Base'
import { create_ira } from '@/services/ira.service'
import { useRoute, useRouter } from 'vue-router'
import useUserStore from '@/store/user-store'
import { get_data } from '@/services/group.service'
export default defineComponent({
    name: 'cra-create-form',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const userStore = useUserStore()
        return {
            route,
            router,
            userStore
        }
    },
    data(): any {
        return {
            form: {
                IraFormSchema,
                params: {
                    group_id: null,
                    capacity: null,
                    description: null,
                },
            },
            groups: null
        }
    },
    async mounted() {
        const group_res = await get_data()
        if (group_res.status == 200)
            this.groups = group_res.data.row.uni_group_list
    },
    methods: {
        handleNumber,
        handleSubmit: async function (values: any, { resetForm }: any) {

            const date = new Date()
            const fullYear = date.getFullYear().toString()
            const year = fullYear.slice(fullYear.length - 2, fullYear.length)
            const month = date.getMonth().toString()
            const day = date.getDay().toString()
            const hour = date.getHours().toString()
            const min = date.getMinutes().toString()
            const second = date.getSeconds().toString()
            const milisec = date.getMilliseconds().toString()

            const code =
                year +
                month +
                day +
                hour +
                min +
                second +
                milisec

            const res = await create_ira(Object.assign(values, { code: code }))

            Toast.fire({
                text: res.data.message ?? 'عملیات با خطا مواجه شد',
                icon: res.data.code == 200 ? 'success' : 'error'
            }).then(() => {
                resetForm()
            })
        }
    },
})
</script>
