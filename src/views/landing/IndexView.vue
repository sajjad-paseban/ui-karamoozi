<template>
    <header-banner-partial />
    <news-content-partial />
    <other-networks-partial />
    <map-partial />
</template>

<script lang="ts">
import HeaderBannerPartial from '@/partials/HeaderBannerPartial.vue'
import MapPartial from '@/partials/MapPartial.vue'
import NewsContentPartial from '@/partials/NewsContentPartial.vue'
import OtherNetworksPartial from '@/partials/OtherNetworksPartial.vue'
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'landing-index-view',
    components: { HeaderBannerPartial, NewsContentPartial, OtherNetworksPartial, MapPartial },
})
</script>