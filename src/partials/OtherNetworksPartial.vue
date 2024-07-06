<template>
    <div class="other-networks-partial">
        <section-title title="سایر سامانه ها" caption="سایر سامانه های پر کاربرد دانشگاه">
            <CaContentDeliveryNetwork />
        </section-title>
        <Carousel v-bind="carousel.settings" :breakpoints="carousel.breakpoints">
            <Slide v-for="(item, index) in data" :key="index">
                <div class="item">
                    <CaContentDeliveryNetwork />
                    <a :href="item?.link" target="_blank">
                        {{ item?.name }}
                    </a>
                </div>
            </Slide>

            <template #addons>
                <Navigation />
            </template>
        </Carousel>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SectionTitle from '@/components/SectionTitle.vue';
import { CaContentDeliveryNetwork } from "@kalimahapps/vue-icons";
import { Carousel, Navigation, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
    name: 'other-networks-partial',
    props: ['items'],
    components: {
        SectionTitle,
        CaContentDeliveryNetwork,
        Carousel,
        Navigation,
        Slide
    },
    data() {
        return {
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
    async mounted() {
        setTimeout(() => {
            this.data = this.items
        }, 100)
    }
})
</script>

<style lang="scss" scoped>
.other-networks-partial {

    .item {
        display: flex;
        flex-wrap: wrap;

        &>* {
            width: 100%;
        }

        svg {
            font-size: 80px;
            color: #263238;
        }

        a {
            font-family: 'KOODAKBOLD';
            background-color: rgba($color: #000000, $alpha: 0.8);
            color: #fff;
            padding: 12px 5px;
            margin: 10px 0;
            border-radius: 4px;
            font-size: 14px;
        }
    }
}
</style>