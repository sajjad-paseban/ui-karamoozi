<template>
    <div class="row justify-content-between flex-row-reverse py-3 align-items-center">
        <div class="col-auto">
            <h3 class="text-secondary">
                مدرک - ویرایش
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
            <card :headerBordering="true" title="فرم بروزرسانی مدرک">
                <degree-edit-form :props="props" @get-page-data="page" />
            </card>
        </div>
    </div>
</template>
<script lang="ts">
import Card from "@/components/Card.vue";
import DegreeEditForm from "@/forms/panel/degree-management/DegreeEditForm.vue";
import { defineComponent } from "vue";
export default defineComponent({
    name: 'create-view',
    props: ['props'],
    components: {
        Card,
        DegreeEditForm
    },
    methods: {
        page: function (val: any) {
            this.$emit('get-page-data', val)
        }
    }
})
</script>