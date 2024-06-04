<template>
    <div class="row justify-content-between flex-row-reverse p-2 align-items-center border-bottom">
        <div class="col-auto">
            <h1 class="text-secondary">
                تغییر کلمه عبور
            </h1>
        </div>
        <div class="col-auto">  
            <!-- <router-link to="" class="btn btn-primary btn-sm shadow-sm">
                تیکت جدید
            </router-link> -->
        </div>
    </div>
    <div class="row py-3">
        <div class="col">
            <card title="ویرایش کلمه عبور">
                <password-change-form />
            </card>
        </div>
    </div>
</template>

<script lang="ts">
import Card from "@/components/Card.vue";
import PasswordChangeForm from "@/forms/panel/PasswordChangeForm.vue";
import { defineComponent } from "vue";

export default defineComponent({
    name: 'index-view',
    components: { Card, PasswordChangeForm },
})  
</script>