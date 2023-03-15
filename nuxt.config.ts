// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "nuxt-icon",
        "@nuxtjs/google-fonts",
        "v-satori/nuxt",
        "unplugin-font-to-buffer/nuxt",
        "@nuxt/devtools",
        "@nuxt/content",
        "@element-plus/nuxt",
    ],
    devtools: {
        // Enable devtools (default: true)
        enabled: true,
        // VS Code Server options
        vscode: {},
        // ...other options
    },
    googleFonts: {
        families: {
            "Open+Sans": true,
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData:
                        '@use "@/assets/styles/_colors.scss" as *;@use "@/assets/styles/breakpoints.scss" as *;',
                },
            },
        },
    },
    css: ["@/assets/styles/global.scss"],
});
