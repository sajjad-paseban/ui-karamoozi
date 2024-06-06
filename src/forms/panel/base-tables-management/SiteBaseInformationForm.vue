<template>
    <Form :validation-schema="form.SiteBaseInformationFormSchema" @submit="handleSubmit">
        <div
            class="d-flex justify-content-md-start justify-content-center flex-row-reverse align-items-start flex-wrap py-2">
            <div class="form-group mx-1">
                <label for="uni_name">
                    نام دانشگاه
                </label>
                <Field type="text" v-model="form.params.uni_name" name="uni_name" id="uni_name"
                    class="form-control form-control-sm" />
                <ErrorMessage name="uni_name" />
            </div>
            <div class="form-group mx-1">
                <label for="telephone">
                    شماره تماس
                </label>
                <Field type="text" v-model="form.params.telephone" name="telephone" @keypress="handleNumber" id="telephone"
                    class="form-control form-control-sm" />
                <ErrorMessage name="telephone" />
            </div>
            <div class="form-group mx-1">
                <label for="email">
                    پست الکترونیکی دانشگاه
                </label>
                <Field type="email" v-model="form.params.email" name="email" id="email"
                    class="form-control form-control-sm" />
                <ErrorMessage name="email" />
            </div>
            <div class="form-group mx-1">
                <label for="fax">
                    شماره فکس
                </label>
                <Field type="text" v-model="form.params.fax" @keypress="handleNumber" name="fax" id="fax"
                    class="form-control form-control-sm" />
                <ErrorMessage name="fax" />
            </div>
            <div class="form-group mx-1">
                <label for="status">
                    آیا سایت فعال می باشد؟
                </label>
                <div class="form-check form-switch d-flex flex-column align-items-end">
                    <input type="checkbox" :checked="form.params.status" @change="siteStatus" name="status" id="status"
                        class="form-check-input">
                    <Field hidden type="checkbox" @change="siteStatus" name="status" id="status" class="form-check-input" />
                    <ErrorMessage name="status" />
                </div>
            </div>
            <div class="form-group col-12 mx-1">
                <label for="uni_logo">
                    لوگو دانشگاه
                </label>
                <div class="d-flex">
                    <button type="button" @click="handleRemoveLogo" class="btn btn-sm btn-danger mx-1"
                        v-if="form.params.uni_logo_path">
                        <i class="pi pi-trash" style="font-size: 18px; position: relative; top: 2px;"></i>
                    </button>
                    <a :href="get_back_base_url() + form.params.uni_logo_path" target="_blank"
                        class="btn btn-sm btn-primary mx-1" v-if="form.params.uni_logo_path">
                        <i class="pi pi-eye " style="font-size: 18px; position: relative; top: 2px;"></i>
                    </a>
                    <Field type="file" accept="image/*" v-model="form.params.uni_logo" name="uni_logo" id="uni_logo"
                        class="form-control form-control-sm" />
                </div>
                <ErrorMessage name="uni_logo" />
            </div>
            <div class="form-group col-12 mx-1">
                <label for="footer_description">
                    توضیحات پا صفحه
                </label>
                <Field type="text" as="textarea" dir="rtl" v-model="form.params.footer_description"
                    name="footer_description" id="footer_description" class="form-control form-control-sm" />
                <ErrorMessage name="footer_description" />
            </div>
            <div class="form-group col-12 mx-1">
                <label for="location">
                    موقعیت دانشگاه
                </label>
                <div class="row justify-content-end">
                    <div class="col-auto">
                        <Field type="text" placeholder="long" v-model="form.params.long" name="long" id="long"
                            class="form-control form-control-sm" />
                        <ErrorMessage name="long" />
                    </div>
                    <div class="col-auto">
                        <Field type="text" placeholder="lat" v-model="form.params.lat" name="lat" id="lat"
                            class="form-control form-control-sm" />
                        <ErrorMessage name="lat" />
                    </div>
                </div>
            </div>
            <div class="form-group col-12 mx-1">
                <label for="address">
                    آدرس دانشگاه
                </label>
                <Field type="text" v-model="form.params.address" name="address" id="address"
                    class="form-control form-control-sm" />
                <ErrorMessage name="address" />
            </div>
            <div class="form-group col-12 mx-1">
                <label for="description">
                    توضیحات
                </label>
                <Field type="text" as="textarea" dir="rtl" v-model="form.params.description" name="description"
                    id="description" class="form-control form-control-sm" />
                <ErrorMessage name="description" />
            </div>
            <div class="form-group col-12 mx-1">
                <label for="register_rules">
                    قوانین ثبت نام
                </label>
                <Field type="text" as="textarea" dir="rtl" v-model="form.params.register_rules" name="register_rules"
                    id="register_rules" class="form-control form-control-sm" />
                <ErrorMessage name="register_rules" />
            </div>
        </div>
        <div class="form-group d-flex  m-2">
            <button class="btn btn-sm btn-primary shadow-sm">
                ذخیره اطلاعات
            </button>
        </div>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { SiteBaseInformationFormSchema } from '@/forms/Schema'
import { get_back_base_url, handleNumber, Toast } from '@/helpers/Base'
import { get_data, remove_logo, update_data } from '@/services/setting.service'

export default defineComponent({
    name: 'site-base-information-form',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            form: {
                SiteBaseInformationFormSchema,
                params: {
                    uni_name: null,
                    uni_logo: null,
                    uni_logo_path: null,
                    footer_description: null,
                    long: null,
                    lat: null,
                    telephone: null,
                    email: null,
                    fax: null,
                    address: null,
                    description: null,
                    register_rules: null,
                    status: true,

                }
            }
        }
    },
    methods: {
        handleNumber,
        get_back_base_url,
        siteStatus: function (el: any) {
            this.form.params.status = el.target.checked
        },
        handleSubmit: async function (values: any, { resetForm }: any) {
            Object.assign(values, { status: this.form.params.status ? 1 : 0 })
            const res = await update_data(values)

            Toast.fire({ text: res.data.message, icon: res.status == 200 ? 'success' : 'error' })
        },
        handleRemoveLogo: async function () {
            const res = await remove_logo()
            this.form.params.uni_logo_path = null
            this.form.params.uni_logo = null
            Toast.fire({ text: res.data.message, icon: res.status == 200 ? 'success' : 'error' })
        }
    },
    async mounted() {
        const siteInfo = await get_data()

        if (siteInfo.status == 200) {
            this.form.params.uni_name = siteInfo.data.row.uni_name
            this.form.params.uni_logo_path = siteInfo.data.row.uni_logo_path ?? null
            this.form.params.uni_logo = siteInfo.data.row.uni_logo_path ?? null
            this.form.params.footer_description = siteInfo.data.row.footer_description
            this.form.params.long = JSON.parse(siteInfo.data.row.location).long
            this.form.params.lat = JSON.parse(siteInfo.data.row.location).lat
            this.form.params.telephone = siteInfo.data.row.telephone
            this.form.params.email = siteInfo.data.row.email
            this.form.params.fax = siteInfo.data.row.fax
            this.form.params.address = siteInfo.data.row.address
            this.form.params.description = siteInfo.data.row.description
            this.form.params.register_rules = siteInfo.data.row.register_rules
            this.form.params.status = siteInfo.data.row.status == 1 ? true : false
        }
    }
})
</script>
<style lang="scss" scoped>
.form-group {
    input {
        direction: rtl;
    }
}
</style>