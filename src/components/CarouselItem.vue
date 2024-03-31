<template>
    <div class="item">
        <img :src="imgPath ? imgPath : 'https://picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg'" alt="">
        <div v-if="caption" class="cover"></div>
        <div v-if="caption" class="caption">
            <h1>
                {{ caption }}
            </h1>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'carousel-item-component',
    props: ['imgPath', 'caption']
})
</script>

<style lang="scss" scoped>
    .item{
        position: relative;
        height: 450px;

        img{
            width: 100%;
            height: 450px;
            object-fit: cover;
            object-position: center center;
        }
        .cover{
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background-color: rgba($color: #000000, $alpha: 0.5);
        }
        .caption{
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 5;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;
            h1{
                font-family: 'KOODAKBOLD';
                color: #fff;
                transition: transform 500ms;
            }
            &:hover{
                h1{
                    transform: scale(1.5);
                }
            }
        }
    }
</style>