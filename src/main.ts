import Message from "@/components/Message.vue";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersist);

app.use(pinia);
app.use(router);
app.component("message", Message);

app.mount("#app");
