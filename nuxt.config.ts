export default defineNuxtConfig({
    modules: [
        "nuxt-icon",
        "@nuxtjs/google-fonts",
        "@nuxt/content",
        "nuxt-viewport",
    ],
    viewport: {
        breakpoints: {
            xs: 360,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
            xxl: 1400,
            xxxl: 1600,
            xxxxl: 1900,
        },
    },
    googleFonts: {
        families: {
            "Open+Sans": true,
        },
        // download: true,
        // fontsDir: "~/assets/fonts",
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

        public: {
            CODESTATS_USERNAME: process.env.CODESTATS_USERNAME,
            LAST_FM_USERNAME: process.env.LAST_FM_USERNAME,
            GITHUB_USERNAME: process.env.GITHUB_USERNAME,
        },
    },
});
