import Message from "@/components/Message.vue";
import { createApp } from "vue";
import App from "./App.vue";
import pinia from "@/stores";
import router from "./router";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.component("message", Message);
app.mount("#app");
