<script lang="ts">
import IraCreateForm from "@/forms/panel/ira-management/IraCreateForm.vue";
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";
import IraDatagrid from "@/datagrids/panel/IraDatagrid.vue";
export default defineComponent({
    name: 'create-view',
    components: {
        IraCreateForm,
        IraDatagrid,
        Card
    }
})

</script>

<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                درخواست های جذب کار آموز
            </h1>
        </div>
        <div class="col-auto">
            <router-link :to="{ name: 'intern-recruitment-application' }" class="btn btn-primary btn-sm shadow-sm">
                برگشت
            </router-link>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <card :headerBordering="true" title="فرم درخواست جذب کارآموز">
                <ira-create-form />
            </card>
        </div>
    </div>
</template>