<template>
    <div class="panel-intern-place-info-datagrid">
        <vue-good-table :columns="columns" :rows="rows" :search-options="options.search" :select-options="options.select"
            :sort-options="options.sort" :pagination-options="options.pagination" line-numbers="true" compactMode
            ref="panel-intern-info-place-datagrid">

            <template #emptystate>
                <p class="empty-state">
                    درحال حاضر دیتایی وجود ندارد
                </p>
            </template>

        </vue-good-table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next'
import Button from '@/components/Button.vue'
import { AkPlus } from "@kalimahapps/vue-icons";
import { find_data } from '@/services/cra.service'

export default defineComponent({
    name: 'panel-intern-place-info-datagrid',
    components: {
        VueGoodTable,
        Button,
        AkPlus
    },
    props: ['data'],
    data() {
        return {
            columns: [
                {
                    label: 'نام محل کارآموزی',
                    field: this.data.type == 0 ? 'ira.cra.company_name' : 'place_name',
                },
                {
                    label: 'شماره تماس محل کارآموزی',
                    field: this.data.type == 0 ? 'ira.cra.company_telephone' : 'place_telephone',
                },
                {
                    label: 'آدرس محل کارآموزی',
                    field: this.data.type == 0 ? 'ira.cra.company_address' : 'company_address',
                },
                {
                    label: 'نام سرپرست محل کارآموزی',
                    field: this.data.type == 0 ? 'ira.cra.company_supervisor_name' : 'supervisor_name',
                },
                {
                    label: 'شماره همراه سرپرست کارآموزی',
                    field: this.data.type == 0 ? 'ira.cra.company_supervisor_phone' : 'supervisor_phone',
                },
            ],
            rows: [],
            options: {
                search: {
                    enabled: false,
                    placeholder: 'جست و جو کنید'
                },
                select: {
                    enabled: false,
                    selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
                    // selectionInfoClass: 'custom-class',
                    selectionText: 'سطر انتخاب شده',
                    clearSelectionText: 'پاک کن',
                    disableSelectInfo: false, // disable the select info panel on top
                    // selectAllByGroup: true, // when used in combination with a craed table, add a checkbox in the header row to check/uncheck the entire cra
                },
                sort: {
                    enabled: true
                },
                pagination: {
                    enabled: true,
                    mode: 'records',
                    perPage: 5,
                    position: 'bottom',
                    // perPageDropdown: [10, 20, 30],
                    dropdownAllowAll: false,
                    setCurrentPage: 1,
                    nextLabel: 'بعدی',
                    prevLabel: 'قبلی',
                    rowsPerPageLabel: 'تعداد سطر در هر صفحه',
                    ofLabel: 'از',
                    pageLabel: 'صفحه', // for 'pages' mode
                    allLabel: 'همه',
                    // infoFn: (params: any) => `my own page ${params.firstRecordOnPage}`,
                }
            }
        }
    },
    async mounted() {
        setTimeout(async () => {
            this.rows.push(this.data as never)
        }, 1000)
    }
})
</script>

<style lang="scss" scoped>
.panel-intern-place-info-datagrid {
    p.empty-state {
        text-align: center;
    }
}
</style>