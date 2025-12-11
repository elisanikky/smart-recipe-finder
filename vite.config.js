// @ts-check
import { defineConfig } from "vite";                  // ⬅️ тут меняем vitest/config на vite
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        setupFiles: "./src/tests/setupTests.ts",
    },
});
