<template>
    <header-partial />
    <router-view />
    <footer-partial />
</template>
<script lang="ts">
import HeaderPartial from '@/partials/HeaderPartial.vue'
import FooterPartial from '@/partials/FooterPartial.vue'
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'landing-layout',
    components: {
        HeaderPartial,
        FooterPartial
    }
})
</script>