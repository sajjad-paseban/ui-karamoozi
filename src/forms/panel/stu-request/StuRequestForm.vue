<template>
    <div v-if="form.enabled" class="alert alert-warning px-2 py-2" dir="rtl">
        <small>
            توجه: کاربر محترم، شما از قبل درخواستی ثبت کرده اید. درخواست شما درحال بررسی می باشد.
        </small>
    </div>
    <Form :validation-schema="formSchema" @submit="handleSubmit">
        <div class="d-flex flex-wrap justify-content-start flex-row-reverse align-items-start">
            <div class="form-group mx-1">
                <label for="semester_id">
                    نیمسال تحصیلی
                </label>
                <Field as="select" dir="rtl" name="semester_id" v-model="form.params.semester_id" id="semester_id"
                    class="form-select form-select-sm">
                    <option v-for="(item, index) in form.semesters" :key="index" :value="item?.id">
                        {{ item?.name }}
                    </option>
                </Field>
                <ErrorMessage name="semester_id" />
            </div>
            <div class="form-group mx-1">
                <label for="intern_name">
                    نام و نام خانوادگی کارآموز
                </label>
                <Field type="text" disabled dir="rtl" name="intern_name" v-model="form.params.intern_name" id="intern_name"
                    class="form-control form-control-sm" />
                <ErrorMessage name="intern_name" />
            </div>
            <div class="form-group mx-1">
                <label for="intern_phone">
                    شماره همراه کارآموز
                </label>
                <Field type="text" dir="rtl" @keypress="handleNumber" disabled name="intern_phone"
                    v-model="form.params.intern_phone" id="intern_phone" class="form-control form-control-sm" />
                <ErrorMessage name="intern_phone" />
            </div>
            <div class="form-group mx-1">
                <label for="intern_telephone">
                    شماره ثابت کارآموز
                </label>
                <Field type="text" dir="rtl" @keypress="handleNumber" name="intern_telephone"
                    v-model="form.params.intern_telephone" id="intern_telephone" class="form-control form-control-sm" />
                <ErrorMessage name="intern_telephone" />
            </div>
            <div class="mx-1" style="font-family: 'vazir';" dir="rtl">
                <label for="from_date" style="font-size: 14px; margin: 5px 0;">
                    از تاریخ
                </label>
                <date-picker v-model="form.params.from_date" format="YYYY-MM-DD" display-format="jYYYY/jMM/jDD" />
                <div class="form-group">
                    <Field hidden type="text" dir="rtl" name="from_date" v-model="form.params.from_date" id="from_date"
                        class="form-control form-control-sm" />
                    <ErrorMessage name="from_date" />
                </div>
            </div>
            <div class="mx-1" style="font-family: 'vazir';" dir="rtl">
                <label for="to_date" style="font-size: 14px; margin: 5px 0;">
                    تا تاریخ
                </label>
                <date-picker v-model="form.params.to_date" format="YYYY-MM-DD" display-format="jYYYY/jMM/jDD" />
                <div class="form-group">
                    <Field hidden type="text" dir="rtl" name="to_date" v-model="form.params.to_date" id="to_date"
                        class="form-control form-control-sm" />
                    <ErrorMessage name="to_date" />
                </div>
            </div>
            <div class="form-group mx-1">
                <label for="teacher">
                    استاد
                </label>
                <Field as="select" dir="rtl" name="teacher" v-model="form.params.teacher" id="teacher"
                    class="form-select form-select-sm">
                    <option v-for="(item, index) in form.teachers" :key="index" :value="item.user.id">
                        {{ item?.user?.fname + ' ' + item?.user?.lname }}
                    </option>
                </Field>
                <ErrorMessage name="teacher" />
            </div>
            <div class="form-group mx-1">
                <label for="type">
                    محل کارآموزی
                </label>
                <Field as="select" dir="rtl" name="type" v-model="form.params.type" id="type"
                    class="form-select form-select-sm">
                    <option value="0">
                        شرکت های تایید شده دانشگاه
                    </option>
                    <option value="1">
                        سایر
                    </option>
                </Field>
                <ErrorMessage name="type" />
            </div>
            <template v-if="form.params.type == 0">
                <div class="form-group mx-1">
                    <label for="type">
                        انتخاب شرکت
                    </label>
                    <Field as="select" dir="rtl" name="ira_id" v-model="form.params.ira_id" id="ira_id"
                        class="form-select form-select-sm">
                        <option v-for="(item, index) in form.companies" :key="index" :value="item?.id"
                            v-show="item.capacity >= 1">
                            {{
                                "کد شرکت: " + item?.code +
                                "، نام شرکت: " + item?.cra?.company_name +
                                "، ظرفیت: " + item?.capacity
                            }}
                        </option>
                    </Field>
                    <ErrorMessage name="ira_id" />
                </div>
            </template>
            <template v-if="form.params.type == 1">
                <div class="form-group mx-1">
                    <label for="place_name">
                        عنوان محل کارآموزی
                    </label>
                    <Field type="text" dir="rtl" name="place_name" v-model="form.params.place_name" id="place_name"
                        class="form-control form-control-sm" />
                    <ErrorMessage name="place_name" />
                </div>
                <div class="form-group mx-1">
                    <label for="place_telephone">
                        شماره تلفن محل کارآموزی
                    </label>
                    <Field type="text" dir="rtl" @keypress="handleNumber" name="place_telephone"
                        v-model="form.params.place_telephone" id="place_telephone" class="form-control form-control-sm" />
                    <ErrorMessage name="place_telephone" />
                </div>
                <div class="form-group w-100 mx-1">
                    <label for="place_address">
                        آدرس محل کارآموزی
                    </label>
                    <Field type="text" dir="rtl" name="place_address" v-model="form.params.place_address" id="place_address"
                        class="form-control form-control-sm" />
                    <ErrorMessage name="place_address" />
                </div>
                <div class="form-group mx-1">
                    <label for="supervisor_name">
                        نام سرپرست کارآموزی
                    </label>
                    <Field type="text" dir="rtl" name="supervisor_name" v-model="form.params.supervisor_name"
                        id="supervisor_name" class="form-control form-control-sm" />
                    <ErrorMessage name="supervisor_name" />
                </div>
                <div class="form-group mx-1">
                    <label for="supervisor_phone">
                        شماره همراه سرپرست کارآموزی
                    </label>
                    <Field type="text" dir="rtl" @keypress="handleNumber" name="supervisor_phone"
                        v-model="form.params.supervisor_phone" id="supervisor_phone" class="form-control form-control-sm" />
                    <ErrorMessage name="supervisor_phone" />
                </div>
            </template>

            <div class="w-100 mx-1" dir="rtl">
                <fieldset>
                    <legend>
                        روز های حاضر در محل کارآموزی
                    </legend>
                    <div class="w-100 px-2 days" dir="ltr">
                        <Field name="days" @change="handleDays" id="thu" type="checkbox" v-model="form.params.days"
                            value="5" />
                        <label for="thu">
                            پنج شنبه
                        </label>
                        <Field name="days" @change="handleDays" id="wed" type="checkbox" v-model="form.params.days"
                            value="4" />
                        <label for="wed">
                            چهار شنبه
                        </label>
                        <Field name="days" @change="handleDays" id="tue" type="checkbox" v-model="form.params.days"
                            value="3" />
                        <label for="tue">
                            سه شنبه
                        </label>
                        <Field name="days" @change="handleDays" id="mon" type="checkbox" v-model="form.params.days"
                            value="2" />
                        <label for="mon">
                            دو شنبه
                        </label>
                        <Field name="days" @change="handleDays" id="sun" type="checkbox" v-model="form.params.days"
                            value="1" />
                        <label for="sun">
                            یک شنبه
                        </label>
                        <Field name="days" @change="handleDays" id="sat" type="checkbox" v-model="form.params.days"
                            value="0" />
                        <label for="sat">
                            شنبه
                        </label>
                        <div class="form-group w-100">
                            <ErrorMessage name="days" />
                        </div>
                    </div>
                    <div class="px-2" v-if="form.params.days?.includes('0')" dir="rtl">
                        <fieldset class="w-100 d-flex">
                            <legend>
                                شنبه
                            </legend>

                            <div class="mx-1" style="font-family: 'vazir';" dir="rtl">
                                <label for="sat_from" style="font-size: 14px; margin: 5px 0;">
                                    از ساعت
                                </label>
                                <date-picker v-model="form.params.sat_from" type="time" min="07:00" max="22:00" />
                                <div class="form-group">
                                    <Field hidden type="text" dir="rtl" name="sat_from" v-model="form.params.sat_from"
                                        id="sat_from" class="form-control form-control-sm" />
                                    <ErrorMessage name="sat_from" />
                                </div>
                            </div>
                            <div class="mx-1" style="font-family: 'vazir';" dir="rtl">
                                <label for="sat_to" style="font-size: 14px; margin: 5px 0;">
                                    تا ساعت
                                </label>
                                <date-picker v-model="form.params.sat_to" type="time" min="07:00" max="22:00" />
                                <div class="form-group">
                                    <Field hidden type="text" dir="rtl" name="sat_to" v-model="form.params.sat_to"
                                        id="sat_to" class="form-control form-control-sm" />
                                    <ErrorMessage name="sat_to" />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="px-2" v-if="form.params.days?.includes('1')" dir="rtl">
                        <fieldset class="w-100 d-flex">
                            <legend>
                                یک شنبه
                            </legend>

                            <div class="mx-1" style="font-family: 'vazir';" dir="rtl">
                                <label for="sun_from" style="font-size: 14px; margin: 5px 0;">
                                    از ساعت
                                </label>
                                <date-picker v-model="form.params.sun_from" type="time" min="07:00" max="22:00" />
                                <div class="form-group">
                                    <Field hidden type="text" dir="rtl" name="sun_from" v-model="form.params.sun_from"
                                        id="sun_from" class="form-control form-control-sm" />
                                    <ErrorMessage name="sun_from" />
                                </div>
                            </div>
                            <div class="mx-1" style="font-family: 'vazir';" dir="rtl">
                                <label for="sun_to" style="font-size: 14px; margin: 5px 0;">
                                    تا ساعت
                                </label>
                                <date-picker v-model="form.params.sun_to" type="time" min="07:00" max="22:00" />
                                <div class="form-group">
                                    <Field hidden type="text" dir="rtl" name="sun_to" v-model="form.params.sun_to"
                                        id="sun_to" class="form-control form-control-sm" />
                                    <ErrorMessage name="sun_to" />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="px-2" v-if="form.params.days?.includes('2')" dir="rtl">
                        <fieldset class="w-100 d-flex">
                            <legend>
                                دو شنبه
                            </legend>

                            <div class="mx-1" style="font-family: 'vazir';" dir="rtl">
                                <label for="mon_from" style="font-size: 14px; margin: 5px 0;">
                                    از ساعت
                                </label>
                                <date-picker v-model="form.params.mon_from" type="time" min="07:00" max="22:00" />
                                <div class="form-group">
                                    <Field hidden type="text" dir="rtl" name="mon_from" v-model="form.params.mon_from"
                                        id="mon_from" class="form-control form-control-sm" />
                                    <ErrorMessage name="mon_from" />
                                </div>
                            </div>
                            <div class="mx-1" style="font-family: 'vazir';" dir="rtl">
                                <label for="mon_to" style="font-size: 14px; margin: 5px 0;">
                                    تا ساعت
                                </label>
                                <date-picker v-model="form.params.mon_to" type="time" min="07:00" max="22:00" />
                                <div class="form-group">
                                    <Field hidden type="text" dir="rtl" name="mon_to" v-model="form.params.mon_to"
                                        id="mon_to" class="form-control form-control-sm" />
                                    <ErrorMessage name="mon_to" />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="px-2" v-if="form.params.days?.includes('3')" dir="rtl">
                        <fieldset class="w-100 d-flex">
                            <legend>
                                سه شنبه
                            </legend>

                            <div class="mx-1" style="font-family: 'vazir';" dir="rtl">
                                <label for="tue_from" style="font-size: 14px; margin: 5px 0;">
                                    از ساعت
                                </label>
                                <date-picker v-model="form.params.tue_from" type="time" min="07:00" max="22:00" />
                                <div class="form-group">
                                    <Field hidden type="text" dir="rtl" name="tue_from" v-model="form.params.tue_from"
                                        id="tue_from" class="form-control form-control-sm" />
                                    <ErrorMessage name="tue_from" />
                                </div>
                            </div>
                            <div class="mx-1" style="font-family: 'vazir';" dir="rtl">
                                <label for="tue_to" style="font-size: 14px; margin: 5px 0;">
                                    تا ساعت
                                </label>
                                <date-picker v-model="form.params.tue_to" type="time" min="07:00" max="22:00" />
                                <div class="form-group">
                                    <Field hidden type="text" dir="rtl" name="tue_to" v-model="form.params.tue_to"
                                        id="tue_to" class="form-control form-control-sm" />
                                    <ErrorMessage name="tue_to" />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="px-2" v-if="form.params.days?.includes('4')" dir="rtl">
                        <fieldset class="w-100 d-flex">
                            <legend>
                                چهار شنبه
                            </legend>

                            <div class="mx-1" style="font-family: 'vazir';" dir="rtl">
                                <label for="wed_from" style="font-size: 14px; margin: 5px 0;">
                                    از ساعت
                                </label>
                                <date-picker v-model="form.params.wed_from" type="time" min="07:00" max="22:00" />
                                <div class="form-group">
                                    <Field hidden type="text" dir="rtl" name="wed_from" v-model="form.params.wed_from"
                                        id="wed_from" class="form-control form-control-sm" />
                                    <ErrorMessage name="wed_from" />
                                </div>
                            </div>
                            <div class="mx-1" style="font-family: 'vazir';" dir="rtl">
                                <label for="wed_to" style="font-size: 14px; margin: 5px 0;">
                                    تا ساعت
                                </label>
                                <date-picker v-model="form.params.wed_to" type="time" min="07:00" max="22:00" />
                                <div class="form-group">
                                    <Field hidden type="text" dir="rtl" name="wed_to" v-model="form.params.wed_to"
                                        id="wed_to" class="form-control form-control-sm" />
                                    <ErrorMessage name="wed_to" />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="px-2" v-if="form.params.days?.includes('5')" dir="rtl">
                        <fieldset class="w-100 d-flex">
                            <legend>
                                پنج شنبه
                            </legend>

                            <div class="mx-1" style="font-family: 'vazir';" dir="rtl">
                                <label for="thu_from" style="font-size: 14px; margin: 5px 0;">
                                    از ساعت
                                </label>
                                <date-picker v-model="form.params.thu_from" type="time" min="07:00" max="22:00" />
                                <div class="form-group">
                                    <Field hidden type="text" dir="rtl" name="thu_from" v-model="form.params.thu_from"
                                        id="thu_from" class="form-control form-control-sm" />
                                    <ErrorMessage name="thu_from" />
                                </div>
                            </div>
                            <div class="mx-1" style="font-family: 'vazir';" dir="rtl">
                                <label for="thu_to" style="font-size: 14px; margin: 5px 0;">
                                    تا ساعت
                                </label>
                                <date-picker v-model="form.params.thu_to" type="time" min="07:00" max="22:00" />
                                <div class="form-group">
                                    <Field hidden type="text" dir="rtl" name="thu_to" v-model="form.params.thu_to"
                                        id="thu_to" class="form-control form-control-sm" />
                                    <ErrorMessage name="thu_to" />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </fieldset>
            </div>

            <div class="form-group w-100 mx-1">
                <label for="description">
                    توضیحات
                </label>
                <Field as="textarea" type="text" dir="rtl" name="description" v-model="form.params.description"
                    id="description" class="form-control form-control-sm" />
                <ErrorMessage name="description" />
            </div>
        </div>
        <div v-if="form.enabled == false" class="d-flex mx-1 mt-3">
            <button type="submit" :disabled="form.enabled" class="btn btn-sm btn-primary shadow-sm">
                ذخیره
            </button>
        </div>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { AskPrompt, customErrorMessage, handleNumber, Toast } from '@/helpers/Base'
import { useRoute, useRouter } from 'vue-router'
import useUserStore from '@/store/user-store'
import { create_request, get_active_semesters, find_data_by_user_id, get_companies, get_teachers } from '@/services/stu_request.service'
import * as yup from 'yup'
import DatePicker from 'vue3-persian-datetime-picker'
export default defineComponent({
    name: 'stu-request-create-form',
    props: ['stu_id', 'group_id'],
    components: {
        Form,
        Field,
        DatePicker,
        ErrorMessage
    },
    setup() {
        const formSchema = yup.object().shape({
            semester_id: yup.string().required(customErrorMessage('نیمسال تحصیلی').required),
            intern_name: yup.string().required(customErrorMessage('نام کارآموز').required),
            intern_phone: yup.string().required(customErrorMessage('شماره کارآموز').required).length(11, customErrorMessage('شماره همراه کارآموز', { length: 11 }).length),
            intern_telephone: yup.string().required(customErrorMessage('شماره ثابت کارآموز').required).length(11, customErrorMessage('شماره ثابت کارآموز', { length: 11 }).length),
            from_date: yup.string().required(customErrorMessage('از تاریخ').required),
            to_date: yup.string().required(customErrorMessage('تا تاریخ').required),
            teacher: yup.string().required(customErrorMessage('استاد').required),
            type: yup.string().required(customErrorMessage('محل کارآموزی').required),
            ira_id: yup.string().when("type", (value: any, schema) => {
                if (value == 0 || value == '0')
                    return schema.required(customErrorMessage('انتخاب کارآموز').required)
                return schema
            }),
            place_name: yup.string().when("type", (value: any, schema) => {
                if (value == 1 || value == '1')
                    return schema.required(customErrorMessage('عنوان محل کارآموزی').required)
                return schema
            }),
            place_telephone: yup.string().when("type", (value: any, schema) => {
                if (value == 1 || value == '1')
                    return schema.required(customErrorMessage('شماره تلفن محل کارآموزی').required).length(11, customErrorMessage('شماره تلفن محل کارآموزی', { length: 11 }).length)
                return schema
            }),
            place_address: yup.string().when("type", (value: any, schema) => {
                if (value == 1 || value == '1')
                    return schema.required(customErrorMessage('آدرس محل کارآموزی').required)
                return schema
            }),
            supervisor_name: yup.string().when("type", (value: any, schema) => {
                if (value == 1 || value == '1')
                    return schema.required(customErrorMessage('نام سرپرست کارآموزی').required)
                return schema
            }),
            supervisor_phone: yup.string().when("type", (value: any, schema) => {
                if (value == 1 || value == '1')
                    return schema.required(customErrorMessage('شماره همراه سرپرست کارآموزی').required).length(11, customErrorMessage('شماره همراه سرپرست کارآموزی', { length: 11 }).length)
                return schema
            }),
            days: yup.array().required(customErrorMessage('روز های حاضر در محل کارآموزی').required),
            sat_from: yup.string().when("days", (value: any, schema) => {
                if (value && value[0]?.includes('0'))
                    return schema.required(customErrorMessage('از ساعت').required)
                return schema
            }),
            sat_to: yup.string().when("days", (value: any, schema) => {
                if (value && value[0]?.includes('0'))
                    return schema.required(customErrorMessage('تا ساعت').required)
                return schema
            }),
            sun_from: yup.string().when("days", (value: any, schema) => {
                if (value && value[0]?.includes('1'))
                    return schema.required(customErrorMessage('از ساعت').required)
                return schema
            }),
            sun_to: yup.string().when("days", (value: any, schema) => {
                if (value && value[0]?.includes('1'))
                    return schema.required(customErrorMessage('تا ساعت').required)
                return schema
            }),
            mon_from: yup.string().when("days", (value: any, schema) => {
                if (value && value[0]?.includes('2'))
                    return schema.required(customErrorMessage('از ساعت').required)
                return schema
            }),
            mon_to: yup.string().when("days", (value: any, schema) => {
                if (value && value[0]?.includes('2'))
                    return schema.required(customErrorMessage('تا ساعت').required)
                return schema
            }),
            tue_from: yup.string().when("days", (value: any, schema) => {
                if (value && value[0]?.includes('3'))
                    return schema.required(customErrorMessage('از ساعت').required)
                return schema
            }),
            tue_to: yup.string().when("days", (value: any, schema) => {
                if (value && value[0]?.includes('3'))
                    return schema.required(customErrorMessage('تا ساعت').required)
                return schema
            }),
            wed_from: yup.string().when("days", (value: any, schema) => {
                if (value && value[0]?.includes('4'))
                    return schema.required(customErrorMessage('از ساعت').required)
                return schema
            }),
            wed_to: yup.string().when("days", (value: any, schema) => {
                if (value && value[0]?.includes('4'))
                    return schema.required(customErrorMessage('تا ساعت').required)
                return schema
            }),
            thu_from: yup.string().when("days", (value: any, schema) => {
                if (value && value[0]?.includes('5'))
                    return schema.required(customErrorMessage('از ساعت').required)
                return schema
            }),
            thu_to: yup.string().when("days", (value: any, schema) => {
                if (value && value[0]?.includes('5'))
                    return schema.required(customErrorMessage('تا ساعت').required)
                return schema
            }),
            description: yup.string().required(customErrorMessage('توضیحات').required),

        })

        const route = useRoute()
        const router = useRouter()
        const userStore = useUserStore()
        return {
            route,
            router,
            userStore,
            formSchema
        }
    },
    data(): unknown | undefined | any {
        return {
            form: {
                params: {
                    semester_id: null,
                    intern_name: null,
                    intern_phone: null,
                    intern_telephone: null,
                    from_date: null,
                    to_date: null,
                    teacher: null,
                    type: null,
                    ira_id: null,
                    place_name: null,
                    place_telephone: null,
                    place_address: null,
                    supervisor_name: null,
                    supervisor_phone: null,
                    description: null,
                    days: null,
                    sat: null,
                    sat_from: null,
                    sat_to: null,
                    sun: null,
                    sun_from: null,
                    sun_to: null,
                    mon: null,
                    mon_from: null,
                    mon_to: null,
                    tue: null,
                    tue_from: null,
                    tue_to: null,
                    wed: null,
                    wed_from: null,
                    wed_to: null,
                    thu: null,
                    thu_from: null,
                    thu_to: null,
                },
                semesters: [],
                companies: [],
                teachers: [],
                enabled: false
            }
        }
    },
    async beforeMount() {
        const semesters_res = await get_active_semesters()
        if (semesters_res.status == 200)
            this.form.semesters = semesters_res.data.row.active_semesters

        const companies_res = await get_companies()
        if (companies_res.status == 200)

            this.form.companies = companies_res.data.row.company_list
        const teachers_res = await get_teachers()
        if (teachers_res.status == 200)
            this.form.teachers = teachers_res.data.row.teacher_list
    },
    async mounted() {

        this.form.params.intern_name = this.userStore.user.info.fullname
        this.form.params.intern_phone = this.userStore.user.info.phone


        const res_find = await find_data_by_user_id()
        if (res_find.status == 200) {
            const res = res_find.data.row.requests
            if (res) {
                this.form.enabled = true

                this.$emit('get-request-id', res.id)

                this.form.params.semester_id = res.semester_id;
                this.form.params.intern_name = res.intern_name;
                this.form.params.intern_phone = res.intern_phone;
                this.form.params.intern_telephone = res.intern_telephone;
                this.form.params.from_date = res.from_date;
                this.form.params.to_date = res.to_date;
                this.form.params.teacher = res.teacher;
                this.form.params.type = res.type;
                this.form.params.ira_id = res.ira_id;
                this.form.params.place_name = res.place_name;
                this.form.params.place_telephone = res.place_telephone;
                this.form.params.place_address = res.place_address;
                this.form.params.supervisor_name = res.supervisor_name;
                this.form.params.supervisor_phone = res.supervisor_phone;
                this.form.params.sat_from = res.sat_from;
                this.form.params.sat_to = res.sat_to;
                this.form.params.sun_from = res.sun_from;
                this.form.params.sun_to = res.sun_to;
                this.form.params.mon_from = res.mon_from;
                this.form.params.mon_to = res.mon_to;
                this.form.params.tue_from = res.tue_from;
                this.form.params.tue_to = res.tue_to;
                this.form.params.wed_from = res.wed_from;
                this.form.params.wed_to = res.wed_to;
                this.form.params.thu_from = res.thu_from;
                this.form.params.thu_to = res.thu_to;
                this.form.params.description = res.description;
                this.form.params.days = []

                if (res.sat == 1)
                    this.form.params.days.push('0')
                if (res.sun == 1)
                    this.form.params.days.push('1')
                if (res.mon == 1)
                    this.form.params.days.push('2')
                if (res.tue == 1)
                    this.form.params.days.push('3')
                if (res.wed == 1)
                    this.form.params.days.push('4')
                if (res.thu == 1)
                    this.form.params.days.push('5')

            }
        }

    },
    methods: {
        handleNumber,
        handleDays() {
            if ((this.form.params.days as unknown as any[]).length == 0)
                this.form.params.days = null

        },
        clearDays() {
            this.form.params.sat = null
            this.form.params.sun = null
            this.form.params.mon = null
            this.form.params.tue = null
            this.form.params.wed = null
            this.form.params.thu = null

        },
        handleSubmit: async function (values: any, { resetForm }: any) {
            AskPrompt('آیا از انجام اینکار مطمئن هستید؟', 'warning').then(async result => {
                if (result.isConfirmed) {
                    this.clearDays()

                    this.form.params.days?.map((item: any, index: number) => {
                        if (item == '0')
                            this.form.params.sat = 1
                        if (item == '1')
                            this.form.params.sun = 1
                        if (item == '2')
                            this.form.params.mon = 1
                        if (item == '3')
                            this.form.params.tue = 1
                        if (item == '4')
                            this.form.params.wed = 1
                        if (item == '5')
                            this.form.params.thu = 1
                    })

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

                    Object.assign(values, {
                        code: code,
                        stu_semester_id: this.stu_id,
                        group_id: this.group_id,
                        sat: this.form.params.sat,
                        sun: this.form.params.sun,
                        mon: this.form.params.mon,
                        tue: this.form.params.tue,
                        wed: this.form.params.wed,
                        thu: this.form.params.thu,
                    })


                    if (this.form.params.from_date.replaceAll('/', '') < this.form.params.to_date.replaceAll('/', '')) {
                        const res = await create_request(values)

                        Toast.fire({
                            text: res.data.message ?? 'عملیات با خطا مواجه شد',
                            icon: res.data.code == 200 ? 'success' : 'error'
                        }).then(() => {
                            this.form.enabled = true
                            location.reload()
                        })
                    } else {
                        Toast.fire({
                            text: 'فیلد تا تاریخ می بایست بزرگتر از فیلد از تاریخ باشد.',
                            icon: 'error'
                        })
                    }
                }
            })


        }
    },
})
</script>

<style lang="scss">
.days {
    label {
        margin: 0 5px;
        user-select: none;
    }

    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    align-items: center;
}
</style>