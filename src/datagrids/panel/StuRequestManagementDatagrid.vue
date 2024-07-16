<template>
    <stu-request-reject-dialog v-if="dialogs.reject.display" :data="dialogs.reject.data"
        @close="dialogs.reject.display = false" />

    <present-info-dialog v-if="dialogs.present_info.display" :data="dialogs.present_info.data"
        @close="dialogs.present_info.display = false" />

    <intern-place-info-dialog v-if="dialogs.intern_place_info.display" :data="dialogs.intern_place_info.data"
        @close="dialogs.intern_place_info.display = false" />

    <intern-info-dialog v-if="dialogs.intern_info.display" :data="dialogs.intern_info.data"
        @close="dialogs.intern_info.display = false" />

    <div class="panel-stu-request-management-datagrid">
        <vue-good-table :columns="columns" :rows="rows" :search-options="options.search" :select-options="options.select"
            :sort-options="options.sort" :pagination-options="options.pagination" line-numbers="true" compactMode
            ref="panel-stu-request-management-datagrid">

            <template #table-row="props">
                <div v-if="props.column.field == 'actions'">
                    <div v-if="roleStore.role.role.id == 5 && props.row.teacher_confirm == null">
                        <button @click="handleDialog(3, props.row.originalIndex)"
                            class="btn btn-sm btn-danger m-1 d-flex align-items-center" style="height: 28px;">
                            <i class="pi pi-times-circle mx-1"></i>
                            رد
                        </button>
                        <button @click="handleConfirm" class="btn btn-sm btn-success m-1 d-flex align-items-center"
                            style="height: 28px;">
                            <i class="pi pi-check mx-1"></i>
                            تایید
                        </button>
                    </div>

                    <div v-if="roleStore.role.role.id == 6 && props.row.manager_confirm == null">
                        <button @click="handleDialog(3, props.row.originalIndex)"
                            class="btn btn-sm btn-danger m-1 d-flex align-items-center" style="height: 28px;">
                            <i class="pi pi-times-circle mx-1"></i>
                            رد
                        </button>
                        <button @click="handleConfirm" class="btn btn-sm btn-success m-1 d-flex align-items-center"
                            style="height: 28px;">
                            <i class="pi pi-check mx-1"></i>
                            تایید
                        </button>
                    </div>
                </div>
                <div v-else-if="props.column.field == 'status'">
                    <span v-if="props.row.status == 1">فعال</span>
                    <span v-if="props.row.status == 0">غیر فعال</span>
                    <span v-if="props.row.status == null">نامشخص</span>
                </div>
                <div v-else-if="props.column.field == 'manager_confirm'">
                    <span v-if="props.row.manager_confirm == 1">تایید شده توسط مدیر گروه</span>
                    <span v-if="props.row.manager_confirm == 0">رد شده توسط مدیر گروه</span>
                    <span v-if="props.row.manager_confirm == null">درحال بررسی</span>
                </div>
                <div v-else-if="props.column.field == 'teacher_confirm'">
                    <span v-if="props.row.teacher_confirm == 1">تایید شده توسط استاد</span>
                    <span v-if="props.row.teacher_confirm == 0">رد شده توسط استاد</span>
                    <span v-if="props.row.teacher_confirm == null">درحال بررسی</span>
                </div>
                <div v-else-if="props.column.field == 'intern_info'">
                    <button class="btn btn-sm btn-outline-primary mx-1" @click="handleDialog(0, props.row.originalIndex)">
                        <i class="pi pi-eye" style="font-size: 16px; position: relative; top: 2px; cursor: pointer;"></i>
                    </button>
                </div>
                <div v-else-if="props.column.field == 'intern_place_info'">
                    <button class="btn btn-sm btn-outline-primary mx-1" @click="handleDialog(1, props.row.originalIndex)">
                        <i class="pi pi-eye" style="font-size: 16px; position: relative; top: 2px; cursor: pointer;"></i>
                    </button>
                </div>
                <div v-else-if="props.column.field == 'present_info'">
                    <button class="btn btn-sm btn-outline-primary mx-1" @click="handleDialog(2, props.row.originalIndex)">
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
import { get_requests_for_manager, get_requests_for_teacher } from '@/services/stu_request.service'
import { AskPrompt, Toast } from '@/helpers/Base';
import InternInfoDialog from '@/dialogs/InternInfoDialog.vue';
import InternPlaceInfoDialog from '@/dialogs/InternPlaceInfoDialog.vue';
import PresentInfoDialog from '@/dialogs/PresentInfoDialog.vue';
import StuRequestRejectDialog from '@/dialogs/StuRequestRejectDialog.vue';
import useRoleStore from '@/store/role-store';
export default defineComponent({
    name: 'panel-stu-request-management-datagrid',
    components: {
        VueGoodTable,
        Button,
        AkPlus,
        InternInfoDialog,
        InternPlaceInfoDialog,
        PresentInfoDialog,
        StuRequestRejectDialog
    },
    setup() {
        const roleStore = useRoleStore()

        return {
            roleStore
        }
    },
    methods: {
        handleDialog(index: number, originalIndex: number) {
            if (index == 0) {
                this.dialogs.intern_info.display = true
                this.dialogs.intern_info.data = this.rows[originalIndex]
            }

            if (index == 1) {
                this.dialogs.intern_place_info.display = true
                this.dialogs.intern_place_info.data = this.rows[originalIndex]
            }

            if (index == 2) {
                this.dialogs.present_info.display = true
                this.dialogs.present_info.data = this.rows[originalIndex]
            }

            if (index == 3) {
                this.dialogs.reject.display = true
                this.dialogs.reject.data = this.rows[originalIndex]
            }
        },
        handleConfirm() {

        },
        tdClassFunc(row: any) {
            if (row.status == null)
                return 'bg-secondary text-white';


            if (row.status == 0)
                return 'bg-danger text-white';

            return 'bg-success text-white';
        },
        tdManagerClassFunc(row: any) {
            if (row.manager_confirm == null)
                return 'bg-primary text-white';


            if (row.manager_confirm == 0)
                return 'bg-danger text-white';

            return 'bg-success text-white';
        },
        tdTeacherClassFunc(row: any) {
            if (row.teacher_confirm == null)
                return 'bg-primary text-white';


            if (row.teacher_confirm == 0)
                return 'bg-danger text-white';

            return 'bg-success text-white';
        },
    },
    data() {
        return {
            dialogs: {
                intern_info: {
                    display: false,
                    data: null
                },
                intern_place_info: {
                    display: false,
                    data: null
                },
                present_info: {
                    display: false,
                    data: null
                },
                reject: {
                    display: false,
                    data: null
                },
            },
            columns: [
                {
                    label: 'کد درخواست',
                    field: 'code',
                },
                {
                    label: 'نیمسال تحصیلی',
                    field: 'semester.name',
                },
                {
                    label: 'گروه',
                    field: 'group.name',
                },
                {
                    label: 'محل کارآموزی',
                    field: 'type_desc',
                },
                {
                    label: 'مشخصات کارآموز',
                    field: 'intern_info',
                },
                {
                    label: 'مشخصات محل کارآموزی',
                    field: 'intern_place_info',
                },
                {
                    label: 'اطلاعات حضور در محل کارآموزی',
                    field: 'present_info',
                },
                {
                    label: 'توضیحات',
                    field: 'description',
                },
                {
                    label: 'استاد',
                    field: 'teacher_user.fullname',
                },
                {
                    label: 'تایید استاد',
                    field: 'teacher_confirm',
                    tdClass: this.tdTeacherClassFunc,
                },
                {
                    label: 'تایید مدیر گروه',
                    field: 'manager_confirm',
                    tdClass: this.tdManagerClassFunc,

                },
                {
                    label: 'توضیحات استاد',
                    field: 'teacher_description',
                },
                {
                    label: 'توضیحات مدیر گروه',
                    field: 'manager_description',
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
        if (this.roleStore.role.role.id == 6) { //manager
            const res = await get_requests_for_manager()
            if (res.status == 200 && res.data.row.requests) {
                this.rows = res.data.row.requests
            }
        } else if (this.roleStore.role.role.id == 5) { // teacher
            const res = await get_requests_for_teacher()
            if (res.status == 200 && res.data.row.requests) {
                this.rows = res.data.row.requests
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.panel-stu-request-management-datagrid {
    p.empty-state {
        text-align: center;
    }
}
</style>