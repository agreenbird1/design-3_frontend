import piniaPluginPersist from "pinia-plugin-persist";
import { createPinia } from "pinia";

const pinia = createPinia();
pinia.use(piniaPluginPersist);

export default pinia;
