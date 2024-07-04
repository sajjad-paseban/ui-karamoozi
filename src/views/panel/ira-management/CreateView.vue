<script lang="ts">
import IraCreateForm from "@/forms/panel/ira-management/IraCreateForm.vue";
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";
export default defineComponent({
    name: 'create-view',
    components: {
        IraCreateForm,
        Card
    }
})

</script>

<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                درخواست جذب کارآموز
            </h1>
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