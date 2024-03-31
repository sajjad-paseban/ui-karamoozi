<template>
    <div class="contact-us-form p-3">
        <Form
            :validation-schema="form.ContactUsFormSchema"
            @submit="handleSubmit"
        >
            <div class="row justify-content-start">
                <div class="col-auto">
                    <div class="form-group">
                        <label for="name">
                            نام و نام خانوادگی
                        </label>
                        <Field v-model="form.params.name" class="form-control" name="name" id="name" />
                        <ErrorMessage name="name" />
                    </div>
                </div>
                <div class="col-auto">
                    <div class="form-group">
                        <label for="title">
                            موضوع
                        </label>
                        <Field v-model="form.params.title" class="form-control" name="title" id="title" />
                        <ErrorMessage name="title" />
                    </div>
                </div>
                <div class="col-auto">
                    <div class="form-group">
                        <label for="email">
                            پست الکترونیکی
                        </label>
                        <Field en v-model="form.params.email" class="form-control" name="email" id="email" />
                        <ErrorMessage name="email" />
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label for="description">
                            توضیحات
                        </label>
                        <Field as="textarea" v-model="form.params.description" class="form-control form-control-sm" name="description" id="description" />
                        <ErrorMessage name="description" />
                    </div>
                </div>
            </div>
            <div class="row my-3">
                <div class="col-auto d-flex">
                    <Button
                        title="ثبت"
                        group="alpha"
                        btn-class="btn btn-secondary"
                        type="submit"
                    />
                </div>
            </div>
        </Form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import Button from '@/components/Button.vue';
import { ContactUsFormSchema } from '@/forms/landing/Schema'
export default defineComponent({
    name: 'contact-us-form',
    components: {
        Form,
        Field,
        ErrorMessage,
        Button
    },
    data(){
        return {
            form: {
                ContactUsFormSchema,
                params:{
                    name: null,
                    title: null,
                    email: null,
                    description: null
                }
            }
        }
    },
    methods: {
        handleSubmit(values: any ,{ resetForm }: any){
            console.log(values)
        }
    }
})
</script>

<style lang="scss" scoped>
    .contact-us-form{
        direction: rtl;
    }
</style>