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
        download: true,
        fontsDir: "~/assets/fonts",
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
    runtimeConfig: {
        DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
        DISCORD_SERVER_ID: process.env.DISCORD_SERVER_ID,
        DISCORD_USER_ID: process.env.DISCORD_USER_ID,
        DISCORD_SKIP_APPLICATIONS_IDS:
            process.env.DISCORD_SKIP_APPLICATIONS_IDS,
        LAST_FM_API_KEY: process.env.LAST_FM_API_KEY,
        LAST_FM_API_SECRET: process.env.LAST_FM_API_SECRET,
        CODESTATS_API_KEY: process.env.CODESTATS_API_KEY,
        CODESTATS_USERNAME: process.env.CODESTATS_USERNAME,
        public: {
            LAST_FM_USERNAME: process.env.LAST_FM_USERNAME,
        },
    },
});
