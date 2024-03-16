import { createApp } from "vue";
import "../src/style.css";
import App from "./App.vue";
import router from "../router.js";
import PrimeVue from "primevue/config";
import Wind from "../src/wind";
// import "primevue/resources/themes/md-light-deeppurple/theme.css";
import ToastService from "primevue/toastservice";
import "primeicons/primeicons.css";

const app = createApp(App);

app.use(PrimeVue, {
  pt: Wind,
});
app.use(router);
app.use(ToastService);

app.mount("#app");
