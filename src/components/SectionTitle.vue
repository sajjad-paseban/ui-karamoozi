<template>
    <div class="section-title-component">
        <div class="caption">
            <p v-if="caption">
                {{ caption }}
            </p>
        </div>
        <div class="title">
            <span>
                {{ title }}
            </span>
            <slot />
        </div>
    </div>
    <p v-if="description" class="description">
        {{ description }}
    </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'section-title-component',
    props: ['title', 'caption', 'description'],
});
</script>

<style lang="scss">
    p.description{
        text-align: center;
        padding: 0 10%;
        margin: 20px 0;
        font-family: 'KOODAKBOLD';
        color: rgba($color: #263238, $alpha: 0.8);
        font-size: 14px;
        line-height: 1.85;
    }
    .section-title-component{
        width: calc(100% - 20px);
        border-bottom: 3.5px solid #263238;
        display: flex;
        justify-content: right;
        align-items: center;
        margin: 10px;
        user-select: none;

        .caption{
            color: #263238;
            font-family: 'KOODAKBOLD';
            padding: 0 10px;
            p{
                position: relative;
                top: 3px;
            }
        }

        .title{
            background-color: #263238;
            padding: 6px 20px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            margin-right: 8px;
            span{
                font-family: 'yekan';
                color: #fff;
                position: relative;
                bottom: 3px;
                font-size: 13px;
            }
            svg{
                position: relative;
                top: 4px;
                left: 3px;
                font-size: 20px;
                filter: invert(1);
            }
        }
    }
</style>