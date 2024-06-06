<template>
    <Form :validation-schema="form.MenuFormSchema" @submit="handleSubmit">
        <div class="d-flex justify-content-start flex-row-reverse align-items-start">
            <div class="form-group mx-1">
                <label for="title">
                    عنوان
                </label>
                <Field type="text" dir="rtl" name="title" v-model="form.params.title" id="title"
                    class="form-control form-control-sm" />
                <ErrorMessage name="title" />
            </div>

            <div class="form-group mx-1">
                <label for="path">
                    مسیر
                </label>
                <Field type="text" name="path" v-model="form.params.path" id="path" class="form-control form-control-sm" />
                <ErrorMessage name="path" />
            </div>

            <div class="form-group mx-1">
                <label for="key_param">
                    کلید
                </label>
                <Field type="text" name="key_param" v-model="form.params.key_param" id="key_param"
                    class="form-control form-control-sm" />
                <ErrorMessage name="key_param" />
            </div>

            <div class="form-group mx-1">
                <label for="logo">
                    آیکون
                </label>
                <Field type="text" name="logo" v-model="form.params.logo" id="logo" class="form-control form-control-sm" />
                <ErrorMessage name="logo" />
            </div>

            <div class="form-group mx-1">
                <label for="parent_id">
                    والد
                </label>
                <Field as="select" name="parent_id" v-model="form.params.parent_id" id="parent_id"
                    class="form-select form-select-sm" dir="rtl">
                    <option value="-1">بدون والد</option>
                    <template v-if="options.length > 0">
                        <option v-for="(item, index) in options" :key="index" :value="item?.id">{{ item?.title }}</option>
                    </template>
                </Field>
                <ErrorMessage name="parent_id" />
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
import { MenuFormSchema } from '@/forms/Schema'
import { handleNumber, Toast } from '@/helpers/Base'
import { find_data, get_data, update_menu } from '@/services/menu.service'
export default defineComponent({
    name: 'menu-edit-form',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    props: ['props'],
    data() {
        return {
            form: {
                MenuFormSchema,
                params: {
                    title: null,
                    path: null,
                    key_param: null,
                    logo: null,
                    parent_id: null,
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

            const res = await update_menu(values, this.props.id)

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
        const result = await find_data(this.props.id)
        if (result.status == 200) {
            this.form.params.title = result.data.row.menu_list.title
            this.form.params.path = result.data.row.menu_list.path
            this.form.params.key_param = result.data.row.menu_list.key_param
            this.form.params.logo = result.data.row.menu_list.logo
            this.form.params.parent_id = result.data.row.menu_list.parent_id
            this.form.params.status = result.data.row.menu_list.status == 1 ? true : false
        }


        const res = await get_data()

        if (res.status == 200)
            this.options = res.data.row.menu_list
    }
})
</script>
