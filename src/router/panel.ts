import { RouteRecordRaw } from 'vue-router';

const PanelRoute: RouteRecordRaw[] = [
    {
        path: '',
        name: 'panel',
        component: () => import('@/views/panel/IndexView.vue'),
    },
    {
        path: 'ticket',
        name: 'ticket',
        component: () => import('@/views/panel/tickets/IndexView.vue')        
    },
    {
        path: 'change-password',
        name: 'change-password',
        component: () => import('@/views/panel/change-password/IndexView.vue')        
    }
]


export default PanelRoute;