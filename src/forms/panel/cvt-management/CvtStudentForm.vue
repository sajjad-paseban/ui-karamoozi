<template>
    <Form :validation-schema="form.CvtStudentSchema" @submit="handleSubmit">
        <div class="d-flex justify-content-start flex-row-reverse align-items-start">
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
                <label for="semester_id">
                    نیم سال تحصیلی
                </label>
                <Field as="select" dir="rtl" name="semester_id" v-model="form.params.semester_id" id="semester_id"
                    class="form-select form-select-sm">
                    <option v-for="(item, key) in semesters" :key="key" :value="item.id">{{ item?.name }}</option>
                </Field>
                <ErrorMessage name="semester_id" />
            </div>
            <div class="form-group mx-1">
                <label for="file">
                    آپلود فایل
                </label>
                <Field type="file" accept="file/xlsx,csv" dir="rtl" v-model="form.params.file" ref="file" name="file"
                    id="file" class="form-control form-control-sm" />
                <ErrorMessage name="file" />
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
import { CvtStudentSchema } from '@/forms/Schema'
import { handleNumber, Toast } from '@/helpers/Base'
import { get_data as group_get_data } from '@/services/group.service'
import { get_data as semester_get_data } from '@/services/semester.service'
import { cvt_student } from '@/services/convert.service'
export default defineComponent({
    name: 'cvt-student-form',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        return {
            form: {
                CvtStudentSchema,
                params: {
                    group_id: null,
                    semester_id: null,
                    file: null,
                }
            },
            semesters: [],
            groups: []
        }
    },
    async mounted() {
        const group_res = await group_get_data()
        if (group_res.status == 200)
            this.groups = group_res.data.row.uni_group_list

        const semester_res = await semester_get_data()
        if (group_res.status == 200)
            this.semesters = semester_res.data.row.semester_list
    },
    methods: {
        handleNumber,
        handleSubmit: async function (values: any, { resetForm }: any) {

            const res = await cvt_student(this.form.params.semester_id, this.form.params.group_id, this.form.params.file)

            Toast.fire({
                text: res.data.message,
                icon: res.data.code == 200 ? 'success' : 'error'
            }).then(() => {
                resetForm()
                // location.reload()
            })
        }
    }
})
</script>
