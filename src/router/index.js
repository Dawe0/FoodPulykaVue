import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/pizza",
    name: "pizza",
    component: () => import("../views/PizzaView.vue"),
  },
  {
    path: "/hamburger",
    name: "hamburger",
    component: () => import("../views/HamburgerView.vue"),
  },
  {
    path: "/gyros",
    name: "gyros",
    component: () => import("../views/GyrosView.vue"),
  },
  {
    path: "/desszert",
    name: "desszert",
    component: () => import("../views/DesszertView.vue"),
  },
  {
    path: "/ital",
    name: "ital",
    component: () => import("../views/ItalView.vue"),
  },
  {
    path: "/szeszesital",
    name: "szeszesital",
    component: () => import("../views/SzeszesItalView.vue"),
  },
  {
    path: "/felhasznalok",
    name: "felhasznalok",
    component: () => import("../views/FelhasznalokView.vue"),
  },
  {
    path: "/kosar",
    name: "kosar",
    component: () => import("../views/KosarView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
