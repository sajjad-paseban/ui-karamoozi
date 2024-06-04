<template>
    <Form :validation-schema="form.ProfilePictureFormSchema" @submit="handleSubmit">
        <div class="d-flex justify-content-center flex-row-reverse align-items-start py-3">
            <div class="form-group mx-1">
                <img @click="triggerClick"
                    :src="userStore?.info?.image_path && !form.params.image_path ? get_back_base_url() + userStore?.info?.image_path : (form.params.image_path ? convertBlob(form.params.image_path) : get_back_base_url() + 'storage/images/unknown_profile.jpg')">
                <label class="d-flex justify-content-center mb-3" for="pic">
                    آپلود تصویر
                </label>
                <div class="d-flex justify-content-center">
                    <Field type="file" accept="image/*" hidden v-model="form.params.image_path" ref="upload_field"
                        name="image" id="pic" class="form-control form-control-sm" />
                    <ErrorMessage name="image" />
                </div>
                <div class="d-flex justify-content-center my-2">
                    <button type="button" @click="removeProfilePic" v-if="userStore?.info?.image_path"
                        class="btn btn-sm btn-danger d-flex align-items-center mx-1">
                        <FlDelete />
                    </button>
                </div>
            </div>
        </div>
        <div class="form-group d-flex  m-2">
            <button class="btn btn-sm btn-primary shadow-sm">
                ذخیره مشخصات
            </button>
        </div>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { ProfilePictureFormSchema } from '../Schema'
import { get_back_base_url, handleNumber, Toast } from '@/helpers/Base'
import DatePicker from 'vue3-persian-datetime-picker'
import { FlDelete } from "@kalimahapps/vue-icons";
import useUserStore from '@/store/user-store'
import { get_info, remove_profile_picture, upload_profile_picture } from '@/services/user.service'
import useAuthStore from '@/store/auth-store'

export default defineComponent({
    name: 'profile-picture-form',
    components: {
        Form,
        Field,
        ErrorMessage,
        DatePicker,
        FlDelete
    },
    setup() {
        const userStore = useUserStore().user

        return {
            userStore
        }
    },
    data() {
        return {
            form: {
                ProfilePictureFormSchema,
                params: {
                    image_path: null,
                }
            }
        }
    },
    methods: {
        triggerClick: function () {
            (this.$refs.upload_field as any)?.$el?.click()
        },
        convertBlob: (url: any) => {
            return URL.createObjectURL(url)
        },
        handleNumber,
        get_back_base_url,
        handleSubmit: async (values: any, { resetForm }: any) => {

            const res = await upload_profile_picture(values)

            Toast.fire({
                text: res.data.message,
                icon: res.data.code == 200 ? 'success' : 'error'
            })

            const info = await get_info(useAuthStore().auth)
            if (info.status == 200) {
                useUserStore().clear_user()
                useUserStore().set_user(info.data.row)
            }

        },
        removeProfilePic: async () => {
            const res = await remove_profile_picture()

            Toast.fire({
                text: res.data.message,
                icon: res.data.code == 200 ? 'success' : 'error'
            })

            const info = await get_info(useAuthStore().auth)
            if (info.status == 200) {
                useUserStore().clear_user()
                useUserStore().set_user(info.data.row)
            }
        }
    }
})
</script>
<style lang="scss" scoped>
form {
    button {
        svg {
            font-size: 20px;
        }
    }

    label {
        color: rgba($color: #0d6efd, $alpha: 0.8);
        cursor: pointer;
        font-size: 15px;

        &:hover {
            color: rgba($color: #0d6efd, $alpha: 1.0)
        }
    }

    img {
        object-fit: cover;
        object-position: top;
        border-radius: 50%;
        width: 200px;
        height: 200px;
        box-shadow: 0 2px 3px #000;
    }
}
</style>