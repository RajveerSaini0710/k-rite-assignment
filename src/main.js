import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Wind from "../src/wind";
import "primevue/resources/themes/md-dark-deeppurple/theme.css";

const app = createApp(App);

app.use(PrimeVue, {
  pt: Wind,
});

app.mount("#app");
