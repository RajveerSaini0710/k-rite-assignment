import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/products" },
    {
      path: "/products",
      component: () => import("./src/pages/allProducts.vue"),
    },
    {
      path: "/:notFound(.*)",
      name: "NotFoundPage",
      component: () => import("./src/pages/notFound.vue"),
    },
  ],
});

export default router;
