<template>
    <template v-if="request_id == 0">
        <div class="alert alert-primary mt-2" dir="rtl">
            <small>
                شما در حال حاضر درخواستی ثبت نکرده اید.
            </small>
        </div>
    </template>
    <template v-if="request_id != 0">
        <div class="alert px-2 py-2"
            :class="{ 'alert-primary': form.params.teacher_confirm == null, 'alert-danger': form.params.teacher_confirm == 0, 'alert-success': form.params.teacher_confirm == 1 }"
            dir="rtl">
            <small v-if="form.params.teacher_confirm == null">
                درخواست شما توسط استاد درحال بررسی می باشد.
            </small>
            <small v-if="form.params.teacher_confirm == 0">
                درخواست شما توسط استاد رد شده است.
            </small>
            <small v-if="form.params.teacher_confirm == 1">
                درخواست شما توسط استاد تایید شده است.
            </small>
        </div>
        <div class="d-flex flex-wrap justify-content-start flex-row-reverse align-items-start"
            v-if="form.params.teacher_confirm == 0">
            <div class="form-group w-100 mx-1">
                <label for="teacher_description">
                    توضیحات استاد
                </label>
                <Field disabled as="textarea" type="text" dir="rtl" name="teacher_description"
                    v-model="form.params.teacher_description" id="teacher_description"
                    class="form-control form-control-sm" />
                <ErrorMessage name="teacher_description" />
            </div>
        </div>
        <div class="alert px-2 mt-3 py-2"
            :class="{ 'alert-primary': form.params.manager_confirm == null, 'alert-danger': form.params.manager_confirm == 0, 'alert-success': form.params.manager_confirm == 1 }"
            dir="rtl">
            <small v-if="form.params.manager_confirm == null">
                درخواست شما توسط مدیر گروه درحال بررسی می باشد.
            </small>
            <small v-if="form.params.manager_confirm == 0">
                درخواست شما توسط مدیر گروه رد شده است.
            </small>
            <small v-if="form.params.manager_confirm == 1">
                درخواست شما توسط مدیر گروه تایید شده است.
            </small>
        </div>
        <div class="d-flex flex-wrap justify-content-start flex-row-reverse align-items-start"
            v-if="form.params.manager_confirm == 0">
            <div class="form-group w-100 mx-1">
                <label for="manager_description">
                    توضیحات مدیر گروه
                </label>
                <Field disabled as="textarea" type="text" dir="rtl" name="manager_description"
                    v-model="form.params.manager_description" id="manager_description"
                    class="form-control form-control-sm" />
                <ErrorMessage name="manager_description" />
            </div>
        </div>
    </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { find_data } from '@/services/stu_request.service'
export default defineComponent({
    name: 'stu-request-result-form',
    props: ['request_id'],
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data(): any {
        return {
            form: {
                params: {
                    teacher_confirm: null,
                    manager_confirm: null,
                    teacher_description: null,
                    manager_description: null,
                }
            }
        }
    },
    mounted() {
        setTimeout(async () => {
            if (this.request_id != 0) {
                const res_find = await find_data(this.request_id)
                if (res_find.status == 200 && res_find.data.row.requests) {
                    this.form.params.teacher_confirm = res_find.data.row.requests.teacher_confirm
                    this.form.params.manager_confirm = res_find.data.row.requests.manager_confirm
                    this.form.params.teacher_description = res_find.data.row.requests.teacher_description
                    this.form.params.manager_description = res_find.data.row.requests.manager_description

                }
            }
        }, 1000)

    },

})
</script>
