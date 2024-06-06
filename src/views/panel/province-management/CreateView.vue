<template>
    <div class="row justify-content-between flex-row-reverse py-3 align-items-center">
        <div class="col-auto">
            <h3 class="text-secondary">
                استان - جدید
            </h3>
        </div>
        <div class="col-auto">
            <button type="button" @click="page({ page: 0 })" class="btn btn-primary btn-sm shadow-sm">
                برگشت به صفحه قبل
            </button>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <card :headerBordering="true" title="فرم ثبت استان جدید">
                <province-create-form @get-page-data="page" />
            </card>
        </div>
    </div>
</template>
<script lang="ts">
import Card from "@/components/Card.vue";
import ProvinceCreateForm from "@/forms/panel/province-management/ProvinceCreateForm.vue";
import { defineComponent } from "vue";
export default defineComponent({
    name: 'create-view',
    components: {
        Card,
        ProvinceCreateForm
    },
    methods: {
        page: function (val: any) {
            this.$emit('get-page-data', val)
        }
    }
})
</script>