<template>
    <div class="row justify-content-between flex-row-reverse py-3 align-items-center">
        <div class="col-auto">
            <h3 class="text-secondary">
                منو - ویرایش
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
            <card :headerBordering="true" title="فرم بروزرسانی منو">
                <menu-edit-form :props="props" @get-page-data="page" />
            </card>
        </div>
    </div>
</template>
<script lang="ts">
import Card from "@/components/Card.vue";
import MenuEditForm from "@/forms/panel/menu-management/MenuEditForm.vue";
import { defineComponent } from "vue";
export default defineComponent({
    name: 'create-view',
    props: ['props'],
    components: {
        Card,
        MenuEditForm
    },
    methods: {
        page: function (val: any) {
            this.$emit('get-page-data', val)
        }
    }
})
</script>