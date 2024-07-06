<template>
    <div class="header-banner">
        <swiper :modules="modules" :pagination="{ clickable: true }">
            <swiper-slide v-for="(item, index) in data" :key="index">
                <carousel-item :caption="item?.title" :img-path="api_base_url + item?.banner_path" />
            </swiper-slide>
        </swiper>
    </div>
</template>
  
<script lang="ts">
import SwiperClass, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import CarouselItem from '@/components/CarouselItem.vue'
import { get_back_base_url } from '@/helpers/Base'
// import swiper module styles
import 'swiper/css'
import 'swiper/css/pagination'
import { defineComponent } from 'vue'
// more module style...

export default defineComponent({
    name: 'header-banner-partial',
    components: {
        Swiper,
        SwiperSlide,
        CarouselItem
    },
    props: ['items'],
    data() {
        return {
            api_base_url: get_back_base_url(),
            data: []
        }
    },
    setup() {
        return {
            modules: [Pagination]
        }
    },
    mounted() {
        setTimeout(() => {
            this.data = this.items
        }, 100)
    }
})
</script>

<style lang="scss" scoped>
.header-banner {
    overflow: hidden;
}
</style>