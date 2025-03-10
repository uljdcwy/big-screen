import { createRouter, createWebHashHistory } from "vue-router";

const HomePage = () => import("@/views/HomePage.vue");
const OtherPage = () => import("@/views/OtherPage.vue");
console.log(HomePage,"HomePage")
const routes = [
    { path: '/', redirect: "HomePage" },
    { path: '/HomePage', name: "HomePage", component: HomePage },
    { path: '/OtherPage', name: "OtherPage", component: OtherPage }
];
console.log(789)

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
export default router;