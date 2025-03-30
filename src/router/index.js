import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Add from "@/views/Add.vue";
import MyPokemon from "@/views/MyPokemon.vue";
import Login from "@/views/Login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/add-pokemon",
    name: "Add",
    component: Add,
  },
  {
    path: "/my-pokemon",
    name: "MyPokemon",
    component: MyPokemon,
  },
  { 
    path: '/login',
    name: 'Login',
    component: Login 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
