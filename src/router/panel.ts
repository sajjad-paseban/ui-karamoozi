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
    },
    {
        path: 'profile-management',
        name: 'profile-management',
        component: () => import('@/views/panel/profile/IndexView.vue')        
    },
    {
        path: 'base-tables-management',
        name: 'base-tables-management',
        component: () => import('@/views/panel/base-tables-manager/IndexView.vue')        
    }
]


export default PanelRoute;