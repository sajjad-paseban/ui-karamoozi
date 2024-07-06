<template>
    <section-title title="اخبار و اطلاعیه ها" caption="اخبار و اطلاعیه های روز دانشگاه" />
    <div class="news-view p-3">
        <Card title="بروزترین اخبار دانشکاه" height="500px">
            <router-link v-for="(item, index) in news" :key="index" :to="'/news/' + manageSlug(item?.title)">
                <span class="date">
                    {{ changeDate(item?.create_at) }}
                </span>
                <span class="title">
                    {{ item?.title }}
                </span>
                <span class="description">
                    {{ shortenDescription(item?.seo_description) + ' ...' }}
                </span>
            </router-link>
        </Card>
    </div>
</template>

<script lang="ts">
import Card from '@/components/Card.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import { get_news } from '@/services/base.service'
import moment from 'jalali-moment'
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'news-view',
    components: { SectionTitle, Card },
    data() {
        return {
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
        shortenDescription(desc: string) {
            let newDesc = ''
            desc.split(' ').map((item, index) => {
                if (newDesc.length < 100) {
                    newDesc += ' ' + item
                }
            })

            return newDesc
        }
    },
    async mounted() {
        const res = await get_news()

        if (res.status == 200)
            this.news = res.data.row.news
    }
})
</script>

<style scoped lang="scss">
.news-view {
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

            &::after {
                margin: 0 5px;
                content: '-';
            }
        }

        span.description {
            font-size: 12px;
        }
    }

    margin-bottom: 650px;
}
</style>