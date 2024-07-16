<template>
    <div class="panel-present-info-info-datagrid">
        <vue-good-table :columns="columns" :rows="rows" :search-options="options.search" :select-options="options.select"
            :sort-options="options.sort" :pagination-options="options.pagination" line-numbers="true" compactMode
            ref="panel-present-info-datagrid">

            <template #table-row="props">
                <div v-if="props.column.field == 'sat'">
                    <i class="pi" :class="{ 'pi-times': props.row.sat == null, 'pi-check': props.row.sat == 1 }"></i>
                </div>
                <div v-else-if="props.column.field == 'sun'">
                    <i class="pi" :class="{ 'pi-times': props.row.sun == null, 'pi-check': props.row.sun == 1 }"></i>
                </div>
                <div v-else-if="props.column.field == 'mon'">
                    <i class="pi" :class="{ 'pi-times': props.row.mon == null, 'pi-check': props.row.mon == 1 }"></i>
                </div>
                <div v-else-if="props.column.field == 'tue'">
                    <i class="pi" :class="{ 'pi-times': props.row.tue == null, 'pi-check': props.row.tue == 1 }"></i>
                </div>
                <div v-else-if="props.column.field == 'wed'">
                    <i class="pi" :class="{ 'pi-times': props.row.wed == null, 'pi-check': props.row.wed == 1 }"></i>
                </div>
                <div v-else-if="props.column.field == 'thu'">
                    <i class="pi" :class="{ 'pi-times': props.row.thu == null, 'pi-check': props.row.thu == 1 }"></i>
                </div>
                <div v-else>
                    {{ props.formattedRow[props.column.field] }}
                </div>
            </template>

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

export default defineComponent({
    name: 'panel-present-info-info-datagrid',
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
                    label: 'از تاریخ',
                    width: '100px',
                    field: 'from_date_fa',
                },
                {
                    label: 'تا تاریخ',
                    width: '100px',
                    field: 'to_date_fa',
                },
                {
                    label: 'شنبه',
                    field: 'sat',
                },
                {
                    label: 'شنبه - از ساعت',
                    field: 'sat_from',
                },
                {
                    label: 'شنبه - تا ساعت',
                    field: 'sat_to',
                },
                {
                    label: 'یک شنبه',
                    field: 'sun',
                },
                {
                    label: 'یک شنبه - از ساعت',
                    field: 'sun_from',
                },
                {
                    label: 'یک شنبه - تا ساعت',
                    field: 'sun_to',
                },
                {
                    label: 'دو شنبه',
                    field: 'mon',
                },
                {
                    label: 'دو شنبه - از ساعت',
                    field: 'mon_from',
                },
                {
                    label: 'دو شنبه - تا ساعت',
                    field: 'mon_to',
                },
                {
                    label: 'سه شنبه',
                    field: 'tue',
                },
                {
                    label: 'سه شنبه - از ساعت',
                    field: 'tue_from',
                },
                {
                    label: 'سه شنبه - تا ساعت',
                    field: 'tue_to',
                },
                {
                    label: 'چهار شنبه',
                    field: 'wed',
                },
                {
                    label: 'چهار شنبه - از ساعت',
                    field: 'wed_from',
                },
                {
                    label: 'چهار شنبه - تا ساعت',
                    field: 'wed_to',
                },
                {
                    label: 'پنج شنبه',
                    field: 'thu',
                },
                {
                    label: 'پنج شنبه - از ساعت',
                    field: 'thu_from',
                },
                {
                    label: 'پنج شنبه - تا ساعت',
                    field: 'thu_to',
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
.panel-present-info-info-datagrid {
    p.empty-state {
        text-align: center;
    }
}
</style>