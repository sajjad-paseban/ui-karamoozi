<template>
    <section-title 
        title="اخبار و اطلاعیه ها"
        caption="اخبار و اطلاعیه های روز دانشگاه"
    />
    <div class="news-view p-3">
        <Card 
            title="بروزترین اخبار دانشکاه"
        >
            <router-link to="">
                <span class="date">
                    {{ new Date().toLocaleString('fa') }}
                </span>
                <span class="title">
                    شروع ترم جدید
                </span>
                <span class="description">
                    از تاریخ 11 اردیبهشت
                </span>
            </router-link>
        </Card>
    </div>
</template>

<script lang="ts">
import Card from '@/components/Card.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'news-view',
    components: { SectionTitle, Card },
})
</script>

<style scoped lang="scss">
    .news-view{
        direction: rtl;
        a{
            color: rgba($color: #000000, $alpha: 0.6);
            &:hover{
                color: rgba($color: #000000, $alpha: 0.9);
            }
            span.date{
                font-size: 12px;
                &::after{
                    margin: 0 5px;
                    content: '|';
                }
            }

            span.title{
                font-size: 12px;
                &::after{
                    margin: 0 5px;
                    content: '-';            
                }
            }

            span.description{
                font-size: 12px;
            }
        }
    }
</style>