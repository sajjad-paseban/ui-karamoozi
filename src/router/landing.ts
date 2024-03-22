import ContactUsView from '@/views/landing/ContactUsView.vue';
import IndexView from '@/views/landing/IndexView.vue';
import { RouteRecordRaw } from 'vue-router';
const LandingRoute: RouteRecordRaw[] = [
    {
        path: '',
        name: 'home',
        component: IndexView,    
    },
    {
        path: '/contact-us',
        name: 'contactus',
        component: ContactUsView,
    }
];

export default LandingRoute;