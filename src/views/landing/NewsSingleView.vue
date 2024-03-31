<template>
    <div class="news-single-view">
        <div class="news-list">
            <section-title 
                title="اخبار و اطلاعیه ها"
                caption="اخبار و اطلاعیه های روز دانشگاه"
                />
            <div class="news-list-body px-2">
                <card
                    title="سایر اخبار">
    
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
    
                </card>           
            </div>
        </div>
        <div class="news-content">
            <div class="news-content-header">
                <div class="news-content-header-img">
                    <img src="https://montazeri.tvu.ac.ir/file/122/attach/202310/579306_1081465244.jpg" alt="" class="">
                </div>
                <div class="news-content-header-info">
                    <span>
                        <HiPencilSquare />  
                        توسط مدیر سایت
                    </span>
                    <span>
                        <UiDate />
                        {{ new Date().toLocaleString('fa') }}
                    </span>
                    <span>
                        <FeClock />  
                        20:80
                    </span>
                    <span>
                        <FlSubtitles />
                        از تاریخ 11 اردیبهشت
                    </span>
                </div>
            </div>
            <div class="news-content-body">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </div>
        </div>
    </div>
</template>

<script lang="js">
import { HiPencilSquare } from "@kalimahapps/vue-icons";
import { FeClock } from "@kalimahapps/vue-icons";
import { UiDate } from "@kalimahapps/vue-icons";
import { FlSubtitles } from "@kalimahapps/vue-icons";
import Card from '@/components/Card.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'news-single-view',
    components: {
        SectionTitle,
        Card,
        HiPencilSquare,
        FeClock,
        UiDate,
        FlSubtitles
    }
})
</script>
<style lang="scss" scoped>

    .news-single-view{
        display: flex;
        .news-list{
            width: 400px;
            .news-list-body{
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

        }
        .news-content{
            padding: 10px 15px;
            width: calc(100% - 400px);
            .news-content-header{
                .news-content-header-img{
                    img{
                        width: 100%;
                        object-fit: cover;
                        object-position: center center;
                        border-radius: 4px;
                        box-shadow: 0px 4px 2px rgba($color: #000000, $alpha: 0.2);
                    }
                }

                .news-content-header-info{
                    color: #263238;
                    font-family: 'vazir';
                    font-size: 13px;
                    direction: rtl;
                    border-bottom: 2px solid #263238;
                    padding-bottom: 4px;
                    user-select: none;
                    span{
                        margin: 0 4px;
                    }
                    svg{
                        font-size: 20px;
                        position: relative;
                        top: 6px;
                    }
                }

            }
            .news-content-body{
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