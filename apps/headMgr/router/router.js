import login from '../login/components/login.vue';
// import content from '../indexPage/components/content.vue';
// import index from '../indexPage/components/index.vue';
// import headIndex from '../indexPage/components/headIndex.vue';

export default {
    routes: [
        {
            path: '/',
            component: login
        },
        {
            path: '/login',
            component: login
        },
    ]
}