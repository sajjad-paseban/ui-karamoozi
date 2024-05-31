<template>
    <header-partial />
    <router-view />
    <footer-partial />
</template>
<script lang="ts">
import HeaderPartial from '@/partials/HeaderPartial.vue'
import FooterPartial from '@/partials/FooterPartial.vue'
import { defineComponent } from 'vue'
import { get_data } from '@/services/setting.service'
import { useSiteStore } from '@/store/site-store'
export default defineComponent({
    name: 'landing-layout',
    components: {
        HeaderPartial,
        FooterPartial
    },
    async mounted(){
        const res = await get_data()
        if(res.status == 200)
            useSiteStore().set_site(res.data.row)
    }  
})
</script>