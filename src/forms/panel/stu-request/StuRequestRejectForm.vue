<template>
    <Form :validation-schema="form.StuRequestRejectFormSchema" @submit="handleSubmit">
        <div class="d-flex justify-content-start flex-row-reverse align-items-start">
            <div class="form-group w-100 mx-1">
                <label for="description">
                    توضیحات
                </label>
                <Field as="textarea" type="text" dir="rtl" name="description" v-model="form.params.description"
                    id="description" class="form-control form-control-sm" />
                <ErrorMessage name="description" />
            </div>
        </div>
        <div class="d-flex mx-1 my-2">
            <button type="submit" class="btn btn-sm btn-primary shadow-sm">
                ذخیره
            </button>
        </div>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { StuRequestRejectFormSchema } from '@/forms/Schema'
import { AskPrompt, Toast } from '@/helpers/Base'
import { reject_request_by_manager, reject_request_by_teacher } from '@/services/stu_request.service'
import useRoleStore from '@/store/role-store'
export default defineComponent({
    name: 'stu-request-reject-form',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    setup() {
        const roleStore = useRoleStore()

        return {
            roleStore
        }
    },
    props: ['data'],
    data() {
        return {
            form: {
                StuRequestRejectFormSchema,
                params: {
                    description: null,
                }
            },
        }
    },
    methods: {
        handleSubmit: function (values: any, { resetForm }: any) {

            AskPrompt('آیا از انجام اینکار مطمئن هستید؟', 'warning').then(async result => {
                if (result.isConfirmed) {

                    if (this.roleStore.role.role.id == 6) {

                        const result = await reject_request_by_manager({ description: this.form.params.description, id: this.data.id })

                        Toast.fire({
                            text: result.data.message,
                            icon: result.status == 200 ? 'success' : 'error'
                        }).then(() => {
                            location.reload()
                        })

                    } else if (this.roleStore.role.role.id == 5) {
                        const result = await reject_request_by_teacher({ description: this.form.params.description, id: this.data.id })

                        Toast.fire({
                            text: result.data.message,
                            icon: result.status == 200 ? 'success' : 'error'
                        }).then(() => {
                            location.reload()
                        })
                    }

                }
            })

        }
    },
})
</script>
