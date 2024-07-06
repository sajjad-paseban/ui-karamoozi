<template>
    <div class="news-single-view">
        <div class="news-list">
            <section-title title="اخبار و اطلاعیه ها" caption="اخبار و اطلاعیه های روز دانشگاه" />
            <div class="news-list-body px-2">
                <card title="سایر اخبار">
                    <a v-for="(item, index) in news" :key="index" :href="'/news/' + manageSlug(item?.title)">
                        <span class="date">
                            {{ changeDate(item?.create_at) }}
                        </span>
                        <span class="title">
                            {{ item?.title }}
                        </span>
                    </a>

                </card>
            </div>
        </div>
        <div class="news-content">
            <div class="news-content-header">
                <div class="news-content-header-img">
                    <img :src="api_base_url + item?.banner_path" :alt="item?.title" class="">
                </div>
                <div class="news-content-header-info">
                    <span>
                        <HiPencilSquare />
                        توسط مدیر سایت
                    </span>
                    <span>
                        <UiDate />
                        {{ changeDate(item?.create_at) }}
                    </span>
                    <span>
                        <FlSubtitles />
                        {{ item?.title }}
                    </span>
                </div>
            </div>
            <div class="news-content-body py-3" v-html="item?.content">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { HiPencilSquare } from "@kalimahapps/vue-icons";
import { FeClock } from "@kalimahapps/vue-icons";
import { UiDate } from "@kalimahapps/vue-icons";
import { FlSubtitles } from "@kalimahapps/vue-icons";
import Card from '@/components/Card.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import { defineComponent } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { find_data } from "@/services/content.service";
import { find_content, get_news } from "@/services/base.service";
import { get_back_base_url } from "@/helpers/Base";
import moment from "jalali-moment";
import router from "@/router";
export default defineComponent({
    name: 'news-single-view',
    components: {
        SectionTitle,
        Card,
        HiPencilSquare,
        FeClock,
        UiDate,
        FlSubtitles
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        return {
            route,
            router
        }
    },
    data() {
        return {
            api_base_url: get_back_base_url(),
            item: null,
            news: []
        }
    },
    methods: {
        changeDate(date: string) {
            return moment(date).locale('fa').format('YYYY/M/D H:m:s')
        },
        manageSlug(slug: string) {
            return slug.replaceAll(' ', '-')
        },
    },
    async mounted() {
        const res = await find_content(this.route.params?.slug)
        if (res.status == 200) {
            this.item = res.data.row.content
            if (this.item == null)
                this.router.push({ name: 'not-found' })
        }

        const news_list = await get_news()
        if (news_list.status == 200)
            this.news = news_list.data.row.news
    }
})
</script>
<style lang="scss" scoped>
.news-single-view {
    display: flex;

    .news-list {
        width: 400px;

        .news-list-body {
            direction: rtl;

            a {
                display: block;
                color: rgba($color: #000000, $alpha: 0.6);

                &:hover {
                    color: rgba($color: #000000, $alpha: 0.9);
                }

                span.date {
                    font-size: 12px;

                    &::after {
                        margin: 0 5px;
                        content: '|';
                    }
                }

                span.title {
                    font-size: 12px;
                }
            }
        }

    }

    .news-content {
        padding: 10px 15px;
        width: calc(100% - 400px);

        .news-content-header {
            .news-content-header-img {
                img {
                    width: 100%;
                    max-height: 700px;
                    object-fit: cover;
                    object-position: center center;
                    border-radius: 4px;
                    box-shadow: 0px 4px 2px rgba($color: #000000, $alpha: 0.2);
                }
            }

            .news-content-header-info {
                color: #263238;
                font-family: 'vazir';
                font-size: 13px;
                direction: rtl;
                border-bottom: 2px solid #263238;
                padding-bottom: 4px;
                user-select: none;

                span {
                    margin: 0 4px;
                }

                svg {
                    font-size: 20px;
                    position: relative;
                    top: 6px;
                }
            }

        }

        .news-content-body {
            padding: 10px 0;
            direction: rtl;
            text-align: justify;
            font-family: vazir;
            font-size: 14px;
            line-height: 1.75;
        }
    }
}
</style>