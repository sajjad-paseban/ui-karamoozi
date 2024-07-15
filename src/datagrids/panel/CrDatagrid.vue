<template>
    <cr-company-information-dialog v-if="crDialog.show" :id="crDialog.id" @close="crDialog.show = false" />
    <div class="panel-ira-datagrid">
        <vue-good-table :columns="columns" :rows="rows" :search-options="options.search" :select-options="options.select"
            :sort-options="options.sort" :pagination-options="options.pagination" line-numbers="true" compactMode
            ref="panel-ira-datagrid">

            <template #table-row="props">
                <div v-if="props.column.field == 'actions'">
                    <div class="d-flex justify-content-center">
                        <div v-if="props.row.status == null">
                            <button class="btn btn-sm btn-danger m-1 d-flex align-items-center"
                                @click="handleStatus(false, props.row.id)" style="height: 28px;"
                                :disabled="props.row.status == 0 ? true : false">
                                <i class="pi pi-times-circle"></i>
                            </button>
                            <button class="btn btn-sm btn-success m-1 d-flex align-items-center"
                                @click="handleStatus(true, props.row.id)" style="height: 28px;"
                                :disabled="props.row.status == 1 ? true : false">
                                <i class="pi pi-check"></i>
                            </button>
                        </div>
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
                <div v-else-if="props.column.field == 'company_info'">
                    <button class="btn btn-sm btn-outline-primary mx-1" @click="handleDialog(props.row.cra_id)">
                        <i class="pi pi-eye" style="font-size: 16px; position: relative; top: 2px; cursor: pointer;"></i>
                    </button>
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
import { get_data_by_manager, change_status_ira } from '@/services/ira.service'
import { AskPrompt, Toast } from '@/helpers/Base';
import CrCompanyInformationDialog from '@/dialogs/CrCompanyInformationDialog.vue';
export default defineComponent({
    name: 'panel-ira-datagrid',
    components: {
        VueGoodTable,
        Button,
        AkPlus,
        CrCompanyInformationDialog,
    },
    methods: {
        handleStatus(status: boolean, id: number) {
            AskPrompt('آیا از انجام اینکار مطمئن هستید؟', 'warning').then(async result => {
                if (result.isConfirmed) {
                    const res = await change_status_ira({ status: status == false ? 0 : 1 }, id)

                    this.rows.map((item: any, index: number) => {
                        if (item.id == id) {
                            item.status = status == false ? 0 : 1
                        }
                    })

                    Toast.fire({
                        text: res.data.message,
                        icon: res.status == 200 ? 'success' : 'error'
                    })
                }
            })
        },
        handleDialog(id: any) {
            this.crDialog.id = id
            this.crDialog.show = true
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
            crDialog: {
                id: null,
                show: false
            },
            columns: [
                {
                    label: 'کد درخواست',
                    field: 'code',
                },
                {
                    label: 'مشخصات شرکت',
                    field: 'company_info',
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
        const res = await get_data_by_manager()
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