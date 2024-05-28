<template>
    <div class="menu-partial">
        <div class="user-info">
            <div class="user-info-img">
                <img src="https://assets-global.website-files.com/640f87e014ca34b6e022b883/64ab3120c638067da1bccdbf_placeholder.jpg" alt="">
            </div>
            <div class="user-info-name">
                سجاد پاسبان رضوی خراسانی
            </div>
            <div class="user-info-uni-code">
                ۹۸۱۱۱۰۵۵۳۰۲۰۰۳
            </div>
            <div class="user-info-email">
                s.pr98@yahoo.com
            </div>
            <div class="user-info-code">
                ۰۹۲۵۴۷۱۴۲۹
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: 'menu-partial',
    components:{

    }
})
</script>

<style lang="scss" scoped>
    .menu-partial{
        .user-info{
            font-family: 'vazir';
            color: rgba($color: #fff, $alpha: 0.9);
            border: 2.5px solid rgba($color: #fff, $alpha: 0.9);
            margin: 14px 10px;
            border-radius: 10px;
            .user-info-img{
                margin: 15px 0;
                display: flex;
                justify-content: center;
                img{
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                    border-radius: 50%;
                }
            }
            .user-info-name{
                text-align: center;
                font-size: 16px;
            }

            .user-info-code{
                text-align: center;
                font-size: 13px;
                margin: 5px 0;
                margin-bottom: 10px !important;
                &::before{
                    content: 'کد ملی:';
                }
            }

            .user-info-uni-code{
                text-align: center;
                font-size: 13px;
                margin: 5px 0;
                &::before{
                    content: 'شماره دانشگاهی:';
                }
            }

            .user-info-email{
                direction: rtl;
                text-align: center;
                font-size: 13px;
                margin: 5px 0;
                &::before{
                    content: 'ایمیل:';
                }
            }
        }
    }
</style>