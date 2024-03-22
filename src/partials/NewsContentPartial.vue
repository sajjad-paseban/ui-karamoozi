<template>
    <div class="news-content-partial">
        <section-title 
            title="اخبار و اطلاعیه ها" 
        >
            <McAnnouncementLine />
        </section-title>


        <Carousel v-bind="carousel.settings" :breakpoints="carousel.breakpoints">
            <Slide v-for="slide in 10" :key="slide">
                <slide-show-item />
            </Slide>

            <template #addons>
                <Navigation />
            </template>
        </Carousel>

    </div>
</template>

<script>
import SectionTitle from '@/components/SectionTitle.vue'
import SlideShowItem from '@/components/SlideShowItem.vue';
import { McAnnouncementLine } from "@kalimahapps/vue-icons";
import { defineComponent } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
    name: 'news-content-partial',
    components: {
        SectionTitle,
        McAnnouncementLine,
        Carousel,
        Slide,
        Navigation,
        SlideShowItem,
    },
    data(){
        return {
            carousel: {
                settings: {
                    itemsToShow: 1,
                    snapAlign: 'center',
                },
                // breakpoints are mobile first
                // any settings not specified will fallback to the carousel settings
                breakpoints: {
                    // 700px and up
                    700: {
                        itemsToShow: 3.5,
                        snapAlign: 'center',
                    },
                    // 1024 and up
                    1024: {
                        itemsToShow: 5,
                        snapAlign: 'start',
                    },
                },
            }
        }
    }
});
</script>

<style lang="scss" scoped>

</style>