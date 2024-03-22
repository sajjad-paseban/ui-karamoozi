<template>
    <header-banner-partial />
</template>

<script lang="ts">
import HeaderBannerPartial from '@/partials/HeaderBannerPartial.vue'
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'landing-index-view',
    components: { HeaderBannerPartial },
})
</script>