// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        home: resolve(__dirname, "pages/home/index.html"),
        about: resolve(__dirname, "pages/about-us/index.html"),
        shop: resolve(__dirname, "pages/shop/index.html"),
        detail: resolve(__dirname, "pages/shop/product-detail/index.html"),
        blog: resolve(__dirname, "pages/blog/index.html"),
      },
    },
  },
});
