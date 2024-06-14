<template>
    <div class="row justify-content-between flex-row-reverse py-3 align-items-center">
        <div class="col-auto">
            <h3 class="text-secondary">
                کاربر - ویرایش
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
            <card :headerBordering="true" title="فرم بروزرسانی کاربر">
                <users-roles-edit-form :props="props" @get-page-data="page" />
            </card>
        </div>
    </div>
</template>
<script lang="ts">
import Card from "@/components/Card.vue";
import UsersRolesEditForm from "@/forms/panel/users-roles-management/UsersRolesEditForm.vue";
import { defineComponent } from "vue";
export default defineComponent({
    name: 'edit-view',
    props: ['props'],
    components: {
        Card,
        UsersRolesEditForm
    },
    methods: {
        page: function (val: any) {
            this.$emit('get-page-data', val)
        }
    }
})
</script>