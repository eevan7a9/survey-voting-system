import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: "/register",
      name: "register",
      component: () => import('./views/Register.vue'),
      meta: { requiresVisitor: true }
    },
    {
      path: "/login",
      name: "login",
      component: () => import('./views/Login.vue'),
      meta: { requiresVisitor: true }
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import('./views/Logout.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: "/question/:questionId/details",
      name: "details",
      component: () => import('./views/Details.vue'),
      props(route) { // by doing this we can prevent the params.id Type 
        let props = { ...route.params } // from changing when entered from url
        props.questionId = parseInt(props.questionId);
        return props
      },
    },
    {
      path: "/question/:questionId/chart",
      name: "chart",
      component: () => import('./views/DetailsChart.vue'),
      props(route) { // by doing this we can prevent the params.id Type 
        let props = { ...route.params } // from changing when entered from url
        props.questionId = parseInt(props.questionId);
        return props
      },
    },
    {
      path: "/question/:questionId/edit",
      name: "edit",
      component: () => import('./views/DetailsEdit.vue'),
      props(route) { // by doing this we can prevent the params.id Type 
        let props = { ...route.params } // from changing when entered from url
        props.questionId = parseInt(props.questionId);
        return props
      },
      meta: { requiresAuth: true, requiresOwner: true }
    },
    {
      path: "/create",
      name: "create",
      component: () => import('./views/CreateQuestion.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: "/account",
      name: "account",
      component: () => import('./views/Account.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: "/password/update",
      name: "updatepassword",
      component: () => import('./views/UpdatePassword.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: "/password/email",
      name: "emailPassword",
      component: () => import('./views/EmailPassword.vue'),
      meta: { requiresVisitor: true }
    },
    {
      path: "/password/reset/:token/:email",
      name: "resetPassword",
      component: () => import('./views/ResetPassword.vue'),
      meta: { requiresVisitor: true },
      props: true
    },
    {
      path: "/resend-verification",
      name: "resendverification",
      component: () => import("./views/ResendVerification.vue"),
      meta: { requiresVisitor: true }
    }
  ]
})
