<template>
    <div class="contact-us-view">
        <section-title title="ارتباط با ما" caption="جهت برقراری ارتباط با پشتیبانی" />
        <contact-us-form />
    </div>
</template>

<script lang="ts">
import SectionTitle from '@/components/SectionTitle.vue'
import ContactUsForm from '@/forms/landing/ContactUsForm.vue'
import Vue, { defineComponent } from 'vue'
export default defineComponent({
    name: 'contact-us-view',
    components: { SectionTitle, ContactUsForm },
})
</script>

<style lang="scss" scoped>
.contact-us-view {
    margin-bottom: 400px;

}
</style>