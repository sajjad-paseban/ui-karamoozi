<template>
    <div class="header-banner">
        <swiper :modules="modules" :pagination="{ clickable: true }">
            <swiper-slide v-for="(item, index) in data" :key="index">
                <carousel-item :caption="item.caption" />
            </swiper-slide>
        </swiper>
    </div>
</template>
  
<script lang="ts">
    import SwiperClass, { Pagination } from 'swiper'
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import CarouselItem from '@/components/CarouselItem.vue'
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
        data(){
            return {
                data: [
                    {
                        imagePath: '',
                        caption: 'سال نو مبارک'
                    },
                    {
                        imagePath: '',
                        caption: null
                    }
                ]
            }
        },
        setup() {
            return {
            modules: [Pagination]
            }
        }
    })
</script>

<style lang="scss" scoped>
    .header-banner{
        overflow: hidden;
    }
</style>