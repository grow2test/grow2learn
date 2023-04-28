import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";

Vue.use(VueRouter);

import Home from "./components/HomeView.vue";
import Login from "./components/LoginView.vue";
import GithubCallback from "./components/GithubCallback.vue";

const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes: [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/login/callback", component: GithubCallback },
  ],
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
