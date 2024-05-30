import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import sassDts from 'vite-plugin-sass-dts';

export default defineConfig({
  plugins: [
    vue({
      css: true, // Dynamically inject css as a <style> tag
      compileTemplate: true, // Explicitly convert template to render function
    }),
    sassDts(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  base: "./",
  build: {
    outDir: "./lib",
    lib: {
      // the entry file that is loaded whenever someone imports
      // your plugin in their app
      entry: resolve(__dirname, "src/lib.js"),
      name: "VueBerg",
      fileName: "vueberg",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        name: "VueBerg",
        exports: "named",
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${resolve(__dirname, 'src/style.scss')}";`
      },
    },
  },
});
