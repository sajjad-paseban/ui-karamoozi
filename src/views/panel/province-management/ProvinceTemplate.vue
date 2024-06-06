<template>
    <component :is="pages[currentPage]" :props="props" @get-page-data="getPage"></component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IndexView from './IndexView.vue'
import CreateView from "./CreateView.vue";
import EditView from "./EditView.vue";
export default defineComponent({
    name: 'template',
    methods: {
        getPage: function (data: any) {
            this.currentPage = data.page
            this.props = data
        }
    },
    data() {
        return {
            pages: [
                IndexView,
                CreateView,
                EditView
            ],
            props: null,
            currentPage: 0
        }
    }
})
</script>