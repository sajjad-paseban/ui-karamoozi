<template>
    <Form :validation-schema="form.CityFormSchema" @submit="handleSubmit">
        <div class="d-flex justify-content-start flex-row-reverse align-items-start">
            <div class="form-group mx-1">
                <label for="title">
                    عنوان
                </label>
                <Field type="text" dir="rtl" name="title" v-model="form.params.title" id="title"
                    class="form-control form-control-sm" />
                <ErrorMessage name="title" />
            </div>
            <div class="form-group w-25 mx-1">
                <label for="province_id">
                    استان
                </label>
                <Field as="select" dir="rtl" name="province_id" v-model="form.params.province_id" id="province_id"
                    class="form-control form-control-sm">
                    <option v-for="(item, key) in options" :key="key" :value="item?.id">{{ item?.title }}</option>
                </Field>
                <ErrorMessage name="province_id" />
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
import { CityFormSchema } from '@/forms/Schema'
import { handleNumber, Toast } from '@/helpers/Base'
import { create_city } from '@/services/city.service'
import { get_data } from '@/services/province.service'
export default defineComponent({
    name: 'city-create-form',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        return {
            form: {
                CityFormSchema,
                params: {
                    title: null,
                    province_id: null,
                    status: true,
                }
            },
            options: []
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

            const res = await create_city(values)

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
        const res = await get_data()

        if (res.status == 200)
            this.options = res.data.row.province_list
    }
})
</script>
