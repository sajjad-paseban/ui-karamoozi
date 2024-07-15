import { RouteRecordRaw } from 'vue-router';

const PanelRoute: RouteRecordRaw[] = [
    {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/panel/IndexView.vue'),
    },
    // {
    //     path: 'ticket',
    //     name: 'ticket',
    //     component: () => import('@/views/panel/tickets/IndexView.vue')        
    // },
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
    {
        path: '/intern-recruitment-application',
        name: 'intern-recruitment-application',
        redirect: { name: 'index-intern-recruitment-application' },
        children:[
            {
                path: '',
                name: 'index-intern-recruitment-application',
                component: () => import('@/views/panel/ira-management/IndexView.vue'),
            },
            {
                path: 'create',
                name: 'create-intern-recruitment-application',
                component: () => import('@/views/panel/ira-management/CreateView.vue'),
            }
        ]
    },
    {
        path: 'semester-management',
        name: 'semester-management',
        redirect: { name: 'index-semester-management' },
        children:[
            {
                path: '',
                name: 'index-semester-management',
                component: () => import('@/views/panel/semester-management/IndexView.vue')
            },
            {
                path: 'create',
                name: 'create-semester-management',
                component: () => import('@/views/panel/semester-management/CreateView.vue')
            },
            {
                path: 'edit/:id',
                name: 'edit-semester-management',
                component: () => import('@/views/panel/semester-management/EditView.vue')
            }
        ]
    },
    {
        path: 'sites-management',
        name: 'sites-management',
        redirect: { name: 'index-sites-management' },
        children:[
            {
                path: '',
                name: 'index-sites-management',
                component: () => import('@/views/panel/sites-management/IndexView.vue')
            },
            {
                path: 'create',
                name: 'create-sites-management',
                component: () => import('@/views/panel/sites-management/CreateView.vue')
            },
            {
                path: 'edit/:id',
                name: 'edit-sites-management',
                component: () => import('@/views/panel/sites-management/EditView.vue')
            }
        ]
    },
    {
        path: 'contactus-management',
        name: 'contactus-management',
        redirect: { name: 'index-contactus-management' },
        children:[
            {
                path: '',
                name: 'index-contactus-management',
                component: () => import('@/views/panel/contactus-management/IndexView.vue')
            },
        ]
    },
    {
        path: 'content-management',
        name: 'content-management',
        redirect: { name: 'index-content-management' },
        children:[
            {
                path: '',
                name: 'index-content-management',
                component: () => import('@/views/panel/content-management/IndexView.vue')
            },
            {
                path: 'create',
                name: 'create-content-management',
                component: () => import('@/views/panel/content-management/CreateView.vue')
            },
            {
                path: 'edit/:id',
                name: 'edit-content-management',
                component: () => import('@/views/panel/content-management/EditView.vue')
            }
        ]
    },
    {
        path: 'users-groups-management',
        name: 'users-groups-management',
        redirect: { name: 'index-users-groups-management' },
        children:[
            {
                path: '',
                name: 'index-users-groups-management',
                component: () => import('@/views/panel/users-groups-management/IndexView.vue')
            },
            {
                path: 'create',
                name: 'create-users-groups-management',
                component: () => import('@/views/panel/users-groups-management/CreateView.vue')
            },
            {
                path: 'edit/:id',
                name: 'edit-users-groups-management',
                component: () => import('@/views/panel/users-groups-management/EditView.vue')
            }
        ]
    },
    {
        path: 'stu-semesters-management',
        name: 'stu-semesters-management',
        redirect: { name: 'index-stu-semesters-management' },
        children:[
            {
                path: '',
                name: 'index-stu-semesters-management',
                component: () => import('@/views/panel/stu-semesters-management/IndexView.vue')
            },
            {
                path: 'create',
                name: 'create-stu-semesters-management',
                component: () => import('@/views/panel/stu-semesters-management/CreateView.vue')
            },
            {
                path: 'edit/:id',
                name: 'edit-stu-semesters-management',
                component: () => import('@/views/panel/stu-semesters-management/EditView.vue')
            }
        ]
    },
    {
        path: 'cvt-management',
        name: 'cvt-management',
        redirect: { name: 'index-cvt-management' },
        children:[
            {
                path: '',
                name: 'index-cvt-management',
                component: () => import('@/views/panel/cvt-management/IndexView.vue')
            },
        ]
    },
    {
        path: 'cr-management',
        name: 'cr-management',
        redirect: { name: 'index-cr-management' },
        children:[
            {
                path: '',
                name: 'index-cr-management',
                component: () => import('@/views/panel/cr-management/IndexView.vue')
            },
        ]
    },
    {
        path: 'stu-request',
        name: 'stu-request',
        redirect: { name: 'index-stu-request' },
        children:[
            {
                path: '',
                name: 'index-stu-request',
                component: () => import('@/views/panel/stu-request/IndexView.vue')
            },
        ]
    },
    {
        path: 'stu-request-management',
        name: 'stu-request-management',
        redirect: { name: 'index-stu-request-management' },
        children:[
            {
                path: '',
                name: 'index-stu-request-management',
                component: () => import('@/views/panel/stu-request-management/IndexView.vue')
            },
        ]
    },
]


export default PanelRoute;