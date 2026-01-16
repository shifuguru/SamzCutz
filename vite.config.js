import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const defaultBase = "/";
const githubBase = repoName ? `/${repoName}/` : defaultBase;
const resolvedBase = process.env.VITE_BASE_PATH ?? (process.env.GITHUB_ACTIONS ? githubBase : defaultBase);
export default defineConfig({
    base: resolvedBase,
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    css: {
        devSourcemap: true
    },
    build: {
        sourcemap: true
    }
});
