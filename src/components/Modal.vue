<script lang="ts">
import Card from '@/components/Card.vue';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Modal',
    components: {
        Card
    },
    methods: {
        closeModal() {
            this.$emit('close-modal')
        }
    },
    props: ['title', 'buttons'],
})
</script>

<template>
    <div class="cover"></div>
    <div class="custom-modal" @click.self="closeModal">
        <div class="d-flex justify-content-center p-5" @click.self="null">
            <Card :title="title" :buttons="buttons">
                <slot />
            </Card>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cover {
    position: fixed;
    z-index: 50;
    top: 62px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba($color: #000000, $alpha: 0.5);
}

.custom-modal {
    position: fixed;
    z-index: 55;
    top: 62px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 8px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #3B566E;
        border-radius: 5px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {}

}

//just for admin panel
@media screen and (min-width: 1200px) {
    .cover {
        width: calc(100% - 250px);
    }

    .custom-modal {
        width: calc(100% - 250px);
    }
}
</style>