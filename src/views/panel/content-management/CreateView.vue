<script lang="ts">
import ContentCreateForm from "@/forms/panel/content-management/ContentCreateForm.vue";
import UploadMediaForm from '@/forms/panel/content-management/UploadMediaForm.vue'
import Modal from '@/components/Modal.vue'
import Card from "@/components/Card.vue";
import { defineComponent } from "vue";
export default defineComponent({
    name: 'create-view',
    components: {
        ContentCreateForm,
        UploadMediaForm,
        Card,
        Modal
    },
    data(): any {
        return {
            uploadFileModal: {
                title: 'مدیریت رسانه',
                showModal: false
            }
        }
    },
    methods: {
        closeModal() {
            this.uploadFileModal.showModal = false
        }
    }
})
</script>
<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                مدیریت محتوا ها - جدید
            </h1>
        </div>
        <div class="col-auto">
            <router-link :to="{ name: 'content-management' }" class="btn btn-primary btn-sm shadow-sm mx-1">
                برگشت
            </router-link>
            <button @click="uploadFileModal.showModal = true" class="btn btn-primary btn-sm shadow-sm mx-1">
                مدیریت رسانه
            </button>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <card :headerBordering="true" title="فرم ثبت محتوا جدید">
                <content-create-form />
            </card>
        </div>
    </div>
    <Modal v-if="uploadFileModal.showModal" :title="uploadFileModal.title" @close-modal="closeModal">
        <UploadMediaForm />
    </Modal>
</template>