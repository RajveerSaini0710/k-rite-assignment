import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/products" },
    {
      path: "/products",
      component: () => import("./pages/allProducts.vue"),
    },
    {
      path: "/marketing",
      component: () => import("./pages/team/marketingPage.vue"),
    },
    {
      path: "/development",
      component: () => import("./pages/team/developmentPage.vue"),
    },
    {
      path: "/design",
      component: () => import("./pages/team/designPage.vue"),
    },
    {
      path: "/invitation",
      component: () => import("./pages/inviteTeammate.vue"),
    },
    {
      path: "/help",
      component: () => import("./pages/helpPage.vue"),
    },
    {
      path: "/billing",
      component: () => import("./pages/billingPage.vue"),
    },
    {
      path: "/:notFound(.*)",
      name: "NotFoundPage",
      component: () => import("./pages/notFound.vue"),
    },
  ],
});

export default router;
