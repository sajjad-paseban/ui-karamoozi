<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { ContentCreateFormSchema } from '@/forms/Schema'
import { Toast } from '@/helpers/Base'
import { create_content } from '@/services/content.service'
import CustomEditor from '@/components/CustomEditor.vue'
import tinymce from "../../../../public/tinymce/tinymce"
import { useRouter } from 'vue-router'
import RoleTemplateVue from '@/views/panel/role-management/RoleTemplate.vue'
export default defineComponent({
    name: 'ContentCreateForm',
    setup() {
        const router = useRouter()

        return {
            router
        }
    },
    data(): any {
        return {
            form: {
                ContentCreateFormSchema,
                params: {
                    title: null,
                    image: null,
                    seo_description: null,
                    content: null,
                    status: true,
                    has_star: true
                },
            },
        }
    },
    methods: {
        handleSubmit: async function (values: any, { resetForm }: any) {
            this.form.params.content = tinymce.get('editor')?.getContent()
            Object.assign(values, {
                status: this.form.params.status ? 1 : 0,
                content: this.form.params.content,
                has_star: this.form.params.has_star ? 1 : 0,
            })
            const res = await create_content(values)

            Toast.fire({ text: res.data.message, icon: res.status == 200 ? "success" : "error" })

            resetForm()
            this.form.params.content = tinymce.get('editor')?.setContent('')
            this.form.params.image = null
            this.form.params.content = null

            this.router.push({ name: 'content-management' })
        },
        statusHandler: function (el: any) {
            this.form.params.status = el.target.checked
        },
        hasStartHandler: function (el: any) {
            this.form.params.has_star = el.target.checked
        },
    },
    components: {
        CustomEditor,
        Form,
        Field,
        ErrorMessage,
    }
})
</script>

<template>
    <Form :validation-schema="form.ContentCreateFormSchema" @submit="handleSubmit">
        <div class="form-group my-2">
            <label for="title">
                عنوان محتوا
            </label>
            <Field type="text" dir="rtl" name="title" v-model="form.params.title" id="title"
                class="form-control form-control-sm" />
            <ErrorMessage name="title" />
        </div>
        <div class="form-group my-2">
            <label for="image">
                آپلود تصویر
            </label>
            <Field type="file" accept="image/*" dir="rtl" v-model="form.params.image" ref="image" name="image" id="image"
                class="form-control form-control-sm" />
            <ErrorMessage name="image" />
        </div>
        <div class="form-group my-2">
            <label for="seo_description">
                توضیحات محتوا
            </label>
            <Field as="textarea" type="text" dir="rtl" name="seo_description" v-model="form.params.seo_description"
                id="seo_description" class="form-control form-control-sm" />
            <ErrorMessage name="seo_description" />
        </div>
        <div class="form-group">
            <label for="content">
                محتوا
            </label>
            <CustomEditor />

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
            <div class="form-group w-100 m-1">
                <label for="has_star">
                    آیا مهم می باشد؟
                </label>
                <div class="form-check form-switch d-flex flex-column align-items-end">
                    <input type="checkbox" :checked="form.params.has_star" @change="hasStartHandler" name="has_star"
                        id="has_star" class="form-check-input">
                    <Field hidden type="checkbox" @change="hasStartHandler" name="has_star" id="has_star"
                        class="form-check-input" />
                    <ErrorMessage name="has_star" />
                </div>
            </div>
        </div>

        <div class="d-flex mt-3">
            <button type="submit" class="btn btn-sm btn-primary shadow-sm">
                ذخیره
            </button>
        </div>
    </Form>
</template>

<style scoped lang="scss">
span[role=alert] {
    font-size: 12px;
    margin: 4px 0;
}
</style>