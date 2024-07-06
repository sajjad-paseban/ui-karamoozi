<template>
    <header-banner-partial v-if="banners.length > 0" :items="banners" />
    <news-content-partial v-if="news.length > 0" :items="news" />
    <other-networks-partial v-if="sites.length > 0" :items="sites" />
    <map-partial />
</template>

<script lang="ts">
import { landing_data } from '@/services/base.service'
import HeaderBannerPartial from '@/partials/HeaderBannerPartial.vue'
import MapPartial from '@/partials/MapPartial.vue'
import NewsContentPartial from '@/partials/NewsContentPartial.vue'
import OtherNetworksPartial from '@/partials/OtherNetworksPartial.vue'
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'landing-index-view',
    components: { HeaderBannerPartial, NewsContentPartial, OtherNetworksPartial, MapPartial },
    data() {
        return {
            banners: [],
            news: [],
            sites: []
        }
    },
    async beforeMount() {
        const res = await landing_data()
        if (res.status == 200) {
            this.banners = res.data.row.banners
            this.news = res.data.row.news
            this.sites = res.data.row.sites
        }
    }
})
</script>