import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { fileURLToPath, URL } from "url";
import { defineConfig, normalizePath } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // 注意，这种方法并不会处理函数 API
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${normalizePath(
          path.resolve(__dirname, "./src/assets/styles/common.less")
        )}";`,
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        // changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/api/, "");
        },
      },
    },
  },
});
