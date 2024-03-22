<template>
    <div class="slide-show-item-component">
        <img 
            :src="imgPath ? imgPath : 'https://montazeri.tvu.ac.ir/file/122/attach/202310/579306_1081465244.jpg'" 
            :alt="imgAlt">
        <span class="badge badge-secondary date">
            {{ date ? date : new Date().toLocaleDateString('fa-IR') }}
        </span>
        <div class="title">
            <span>
                {{ title }}
            </span>
        </div>
        <div class="description">
            <span>
                {{ description }}
            </span>
        </div>
        <div class="buttons">
            <Button 
                group="tau" 
                btnClass="btn btn-dark" 
                :isLink="true" 
                :title="btnTitle ? btnTitle : 'ادامه مطلب'" 
                :path="linkPath" />
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import Button from './Button.vue';
export default defineComponent({
    name: 'slide-show-item-component',
    props: ['imgPath', 'imgAlt', 'date', 'title', 'description', 'btnTitle', 'linkPath'],
    components: { Button }
})
</script>


<style lang="scss" scoped>
    .slide-show-item-component{
        background-color: #E0E0E0;
        width: calc(100% - 20px);
        margin: 0 10px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        overflow: hidden;
        position: relative;
        img{
            width: 100%;
            max-height: 150px;
            object-fit: cover;
        }
        .date{
            position: absolute;
            right: 4px;
            top: 4px;
            font-size: 12px;
            font-family: 'yekan';
        }
        .title{
            padding: 0 10px;
            text-align: justify;
            direction: rtl;
            span{
                font-family: 'KOODAKBOLD';
                font-size: 16px;
            }
        }
        .description{
            padding: 8px 12px;
            text-align: justify;
            direction: rtl;
            span{
                font-family: 'KOODAKBOLD';
                font-size: 13px;
                color: rgba($color: #000000, $alpha: 0.8);
            }
        }

        .buttons{
            display: flex;
            justify-content: left;
            padding: 10px;
        }
    }
</style>