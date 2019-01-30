import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './pages/home.vue'),
      meta: { title: 'home', home: true },
    },
    {
      path: '/archives',
      name: 'archives',
      component: () => import(/* webpackChunkName: "archives" */ './pages/archives.vue'),
      meta: { title: 'archives' },
    },
    {
      path: '/related',
      name: 'related',
      component: () => import(/* webpackChunkName: "related" */ './pages/related.vue'),
      meta: { title: 'search' },
    },
    {
      path: '/articles/:slug',
      name: 'article',
      component: () => import(/* webpackChunkName: "articles" */ './pages/articles/_slug.vue'),
      meta: { post: true },
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import(/* webpackChunkName: "projects" */ './pages/projects.vue'),
      meta: { title: 'projects', page: true, sidebar: false },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ './pages/profile.vue'),
      meta: { title: 'profile', page: true, sidebar: false },
    },
    {
      path: '/:slug',
      name: 'page',
      component: () => import(/* webpackChunkName: "pages" */ './pages/_slug.vue'),
      meta: { page: true },
    },
  ],
});
