<template>
    <header-banner-partial />
    <news-content-partial />

</template>

<script lang="ts">
import HeaderBannerPartial from '@/partials/HeaderBannerPartial.vue'
import NewsContentPartial from '@/partials/NewsContentPartial.vue'
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'landing-index-view',
    components: { HeaderBannerPartial, NewsContentPartial },
})
</script>