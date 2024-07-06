<template>
    <div class="news-content-partial">
        <section-title title="اخبار و اطلاعیه ها" caption="اخبار و اطلاعیه های اخیر دانشگاه را در اینجا دنبال کنید">
            <McAnnouncementLine />
        </section-title>


        <Carousel v-bind="carousel.settings" :breakpoints="carousel.breakpoints">
            <Slide v-for="(item, index) in data" :key="index">
                <slide-show-item :img-path="api_base_url + item?.banner_path" :img-alt="item?.title" :title="item?.title"
                    :date="changeDate(item?.create_at)" :description="shortenDescription(item?.seo_description) + '...'"
                    :link-path="'/news/' + manageSlug(item?.title)" />

            </Slide>
            <template #addons>
                <Navigation />
            </template>
        </Carousel>

    </div>
</template>

<script lang="ts">
import SectionTitle from '@/components/SectionTitle.vue'
import SlideShowItem from '@/components/SlideShowItem.vue';
import { McAnnouncementLine } from "@kalimahapps/vue-icons";
import { defineComponent } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import { get_back_base_url } from '@/helpers/Base'
import 'vue3-carousel/dist/carousel.css'
import { string } from 'yup';
import moment from 'jalali-moment';

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
    props: ['items'],
    methods: {
        changeDate(date: string) {
            return moment(date).locale('fa').format('YYYY/M/D H:m:s')
        },
        manageSlug(slug: string) {
            return slug.replaceAll(' ', '-')
        },
        shortenDescription(desc: string) {
            let newDesc = ''
            desc.split(' ').map((item, index) => {
                if (newDesc.length < 150) {
                    newDesc += ' ' + item
                }
            })

            return newDesc
        }
    },
    data() {
        return {
            api_base_url: get_back_base_url(),
            data: [],
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
    },
    mounted() {
        setTimeout(() => {
            this.data = this.items
        }, 100)
    }
});
</script>

<style lang="scss" scoped></style>