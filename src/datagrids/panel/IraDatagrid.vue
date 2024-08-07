<template>
    <div class="panel-ira-datagrid">
        <vue-good-table :columns="columns" :rows="rows" :search-options="options.search" :select-options="options.select"
            :sort-options="options.sort" :pagination-options="options.pagination" line-numbers="true" compactMode
            ref="panel-ira-datagrid">

            <template #table-row="props">
                <div v-if="props.column.field == 'actions'">
                    <div class="d-flex justify-content-center">
                        <button v-if="props.row.status == null" class="btn btn-sm btn-danger mx-1 d-flex align-items-center"
                            @click="deleteAction(props.row.id, props.row.originalIndex)" style="height: 28px;">
                            <i class="pi pi-trash"></i>
                        </button>
                        <span v-else>
                            -
                        </span>
                    </div>
                </div>
                <div v-else-if="props.column.field == 'status'">
                    <span v-if="props.row.status == 1">تایید شده توسط مدیر گروه</span>
                    <span v-if="props.row.status == 0">رد شده توسط مدیر گروه</span>
                    <span v-if="props.row.status == null">نامشخص</span>
                </div>
                <div v-else>
                    {{ props.formattedRow[props.column.field] }}
                </div>
            </template>

            <template #selected-row-actions>
                <!-- <button @click="deleteAction" class="btn btn-sm btn-secondary">
                    حذف
                </button> -->
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
import { delete_ira, get_data, change_status_ira } from '@/services/ira.service'
import { AskPrompt, Toast } from '@/helpers/Base';

export default defineComponent({
    name: 'panel-ira-datagrid',
    components: {
        VueGoodTable,
        Button,
        AkPlus
    },
    methods: {
        deleteAction(index: number, originalIndex: number) {

            AskPrompt('آیا از انجام اینکار مطمئن هستید؟', 'warning').then(async result => {
                if (result.isConfirmed) {

                    this.rows.splice(originalIndex, 1)

                    const result = await delete_ira(index)

                    Toast.fire({
                        text: result.data.message,
                        icon: result.status == 200 ? 'success' : 'error'
                    })
                }
            })

        },
        tdClassFunc(row: any) {
            if (row.status == null)
                return 'bg-secondary text-white';


            if (row.status == 0)
                return 'bg-danger text-white';

            return 'bg-success text-white';
        },
    },
    data() {
        return {
            columns: [
                {
                    label: 'کد درخواست',
                    field: 'code',
                },
                {
                    label: 'کد گروه',
                    field: 'group.code',
                },
                {
                    label: 'نام گروه',
                    field: 'group.name',
                },
                {
                    label: 'کد نیمسال تحصیلی',
                    field: 'semester.code',
                },
                {
                    label: 'نام نیمسال تحصیلی',
                    field: 'semester.name',
                },
                {
                    label: 'ظرفیت',
                    field: 'capacity',
                },
                {
                    label: 'توضیحات',
                    field: 'description',
                },
                {
                    label: 'وضعیت',
                    field: 'status',
                    tdClass: this.tdClassFunc,
                },
                {
                    label: 'عملیات',
                    field: 'actions',
                },

            ],
            rows: [],
            options: {
                search: {
                    enabled: true,
                    placeholder: 'جست و جو کنید'
                },
                select: {
                    enabled: false,
                    selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
                    // selectionInfoClass: 'custom-class',
                    selectionText: 'سطر انتخاب شده',
                    clearSelectionText: 'پاک کن',
                    disableSelectInfo: false, // disable the select info panel on top
                    // selectAllByGroup: true, // when used in combination with a iraed table, add a checkbox in the header row to check/uncheck the entire ira
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
        const res = await get_data()
        if (res.status == 200) {
            this.rows = res.data.row.intern_recruitment_application_list
        }
    }
})
</script>

<style lang="scss" scoped>
.panel-ira-datagrid {
    p.empty-state {
        text-align: center;
    }
}
</style>