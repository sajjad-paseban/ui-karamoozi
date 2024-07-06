<script lang="ts">
import { defineComponent } from "vue"
import tinymce from "../../public/tinymce/tinymce"
export default defineComponent({
    name: 'custom-editor',
    props: ["content"],
    components: {
    },
    data() {
        return {

        }
    },
    mounted() {
        tinymce.init({
            selector: '#editor',
            height: 1000,
            resize: false,
            placeholder: 'بنویس...',
            language: 'fa',
            highlight_on_focus: true,
            plugins: 'lists link autolink image advlist preview code table wordcount media',
            toolbar: 'undo redo | link image media | copy cut paste | fontsize forecolor | code | blocks | bold italic underline  | alignleft aligncenter alignjustify alignright blockquote backcolor | lineheight indent outdent | bullist numlist | code | table |',

        })

        setTimeout(() => {
            if (this.$props.content)
                tinymce.get('editor')?.setContent(this.$props.content)
        }, 1000)
    },
    beforeMount() {
        tinymce.remove()
    }
})
</script>

<template>
    <div id="editor">

    </div>
</template>