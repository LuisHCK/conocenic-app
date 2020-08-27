import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/Home.vue"),
    },
    {
        path: "/departments/:id",
        name: "Department",
        component: () => import("../views/Department.vue"),
    },
    {
        path: "/places/:id",
        name: "Place",
        component: () => import("../views/Place.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
