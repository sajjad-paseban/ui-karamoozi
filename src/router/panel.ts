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
        component: () => import('@/views/panel/base-tables-manager/IndexView.vue'),
    },
    {
        path: 'group-management',
        name: 'group-management',
        redirect: { name: 'index-group-management' },
        children:[
            {
                path: '',
                name: 'index-group-management',
                component: () => import('@/views/panel/group-management/IndexView.vue')
            },
            {
                path: 'create',
                name: 'create-group-management',
                component: () => import('@/views/panel/group-management/CreateView.vue')
            },
            {
                path: 'edit/:id',
                name: 'edit-group-management',
                component: () => import('@/views/panel/group-management/EditView.vue')
            }
        ]
    },
    {
        path: 'company-registration-application',
        name: 'company-registration-application',
        component: () => import('@/views/panel/cra-management/CreateView.vue'),
    },
    {
        path: 'company-registration-application-management',
        name: 'company-registration-application-management',
        component: () => import('@/views/panel/cra-management/IndexView.vue'),
    },
    
]


export default PanelRoute;