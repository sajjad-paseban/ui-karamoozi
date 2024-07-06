<script lang="ts">
import { MediaFormSchema } from '@/forms/Schema'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { defineComponent } from "vue"
import { create_media, get_data, delete_media } from '@/services/media.service'
import { Toast, get_back_base_url } from '@/helpers/Base'

export default defineComponent({
    name: 'UploadMediaForm',
    data(): any {
        return {
            files: [],
            api_base_url: get_back_base_url(),
            form: {
                MediaFormSchema,
                params: {
                    title: null,
                    image: null,
                },
                disable: false
            },
        }
    },
    methods: {
        async copyUrlToClipboard(url: any) {
            await navigator.clipboard.writeText(url);

            Toast.fire({ title: 'آدرس به کلیپ برد اضافه شد', icon: "success" })
        },
        async deleteMedia(id: any, index: number) {
            const res = await delete_media(id).then(res => res)

            if (res.status == 200) {
                Toast.fire({ title: res.data.message, icon: "success" })
                this.files.splice(index, 1)
            } else {
                Toast.fire({ title: res.data.message, icon: "error" })
            }
        },
        async handleSubmit(form: any, { resetForm }: any) {
            this.form.disable = true

            const res = await create_media(this.form.params).then(res => res)

            if (res.status == 200) {
                Toast.fire({ title: res.data.message, icon: "success" })
                resetForm()
                this.files.push(
                    {
                        id: res.data.id,
                        alt: res.data.title,
                        path: res.data.url,
                    }
                )
                this.form.params.title = null
                this.form.params.image = null
            } else {
                Toast.fire({ title: res.data.message, icon: "error" })
            }

            this.form.disable = false

        }
    },
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    async mounted() {
        const res = await get_data()

        if (res.status == 200) {
            this.files = res.data.row.media_list
        } else {
            Toast.fire({ title: res.data.message, icon: "error" })
        }
    }
})
</script>

<template>
    <div class="upload-media-form">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane"
                    type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                    آپلود
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane"
                    type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
                    فایل ها
                </button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active py-3" dir="ltr" id="home-tab-pane" role="tabpanel"
                aria-labelledby="home-tab" tabindex="0">

                <Form :validation-schema="form.MediaFormSchema" @submit="handleSubmit" class="p-2">
                    <div class="form-group">
                        <label for="title">
                            عنوان(alt)
                        </label>
                        <Field type="text" dir="rtl" name="title" v-model="form.params.title" id="title"
                            class="form-control form-control-sm" />
                        <ErrorMessage name="title" />
                    </div>
                    <div class="form-group my-3">
                        <label for="image">
                            آپلود تصویر
                        </label>
                        <Field type="file" accept="image/*" dir="rtl" v-model="form.params.image" ref="image" name="image"
                            id="image" class="form-control form-control-sm" />
                        <ErrorMessage name="image" />
                    </div>

                    <div class="row mt-4  justify-content-start">
                        <div class="col-auto">
                            <button class="btn btn-sm btn-outline-primary" :class="{ disabled: form.disable }" type="submit"
                                role="button">
                                ذخیره
                            </button>
                        </div>
                    </div>
                </Form>

            </div>
            <div class="tab-pane fade py-3" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab"
                tabindex="0">
                <div v-if="files.length == 0" class="small text-center text-grey">
                    در حال حاضر فایلی در آرشیو وجود ندارد
                </div>
                <div v-if="files.length > 0" class="d-flex flex-wrap justify-content-center">
                    <div class="card m-2" style="width: 10rem;" v-for="(item, index) in files" :key="index">
                        <img class="card-img-top card-img" :src="api_base_url + item.path" :alt="item.alt">
                        <div class="card-body p-0 px-2 py-2 d-flex">
                            <button class="btn btn-sm btn-danger d-flex align-items-center"
                                @click="deleteMedia(item.id, index)">
                                <i class="pi pi-trash h-3"></i>
                            </button>
                            <button class="btn btn-sm btn-primary mx-1 d-flex align-items-center"
                                @click="copyUrlToClipboard(api_base_url + item.path)">
                                <i class="pi pi-copy h-3"></i>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.upload-media-form {
    direction: rtl;

    ul {
        padding-right: 0;
        padding-left: 45px;

        button {
            font-family: 'yekan' !important;
            color: #3B566E !important;

            &.active {
                color: rgb(44, 103, 242) !important;
            }
        }
    }

    .card {
        overflow: hidden;
    }

    .card-img {
        object-fit: cover;
        object-position: center center;
        height: 150px;
        width: 100%;
        border-radius: 0;
        border-bottom: 1px solid rgba($color: #3B566E, $alpha: 0.2);
    }
}
</style>