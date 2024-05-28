import IndexView from '@/views/panel/IndexView.vue';
import { RouteRecordRaw } from 'vue-router';

const PanelRoute: RouteRecordRaw[] = [
    {
        path: '',
        name: 'panel',
        component: IndexView,
    },
]


export default PanelRoute;