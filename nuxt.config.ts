// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "nuxt-icon",
        "@nuxtjs/google-fonts",
        "v-satori/nuxt",
        "unplugin-font-to-buffer/nuxt",
    ],
    googleFonts: {
        families: {
            "Open+Sans": true,
        },
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/styles/_colors.scss" as *;',
                },
            },
        },
    },
    css: ["@/assets/styles/global.scss"],
});
