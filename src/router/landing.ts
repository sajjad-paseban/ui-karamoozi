import CompanyView from '@/views/landing/CompanyView.vue';
import ContactUsView from '@/views/landing/ContactUsView.vue';
import IndexView from '@/views/landing/IndexView.vue';
import NewsSingleView from '@/views/landing/NewsSingleView.vue';
import NewsView from '@/views/landing/NewsView.vue';
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
    },
    {
        path: '/company',
        name: 'company',
        component: CompanyView,
    },
    {
        path: '/news',
        name: 'news',
        component: NewsView,
    },
    {
        path: '/news/:slug',
        name: 'news_single',
        component: NewsSingleView,
    }
];

export default LandingRoute;