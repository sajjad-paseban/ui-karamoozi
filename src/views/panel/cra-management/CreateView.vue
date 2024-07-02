<script lang="ts">
import CraCreateForm from "@/forms/panel/cra-management/CraCreateForm.vue";
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";
export default defineComponent({
    name: 'create-view',
    components: {
        CraCreateForm,
        Card
    }
})

</script>

<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                درخواست ثبت شرکت
            </h1>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <card :headerBordering="true" title="فرم درخواست ثبت شرکت">
                <cra-create-form />
            </card>
        </div>
    </div>
</template>