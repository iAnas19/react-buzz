import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts"; // Add this

export default defineConfig({
  plugins: [
    react(),
    dts({
      // Add the plugin configuration
      insertTypesEntry: true,
      rollupTypes: true,
      exclude: ["**/__tests__/**", "**/*.stories.tsx"],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ReactBuzz",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
