import rehypeExternalLinks from "rehype-external-links";

export default defineNuxtConfig({
    modules: ["nuxt-icon", "@nuxt/content", "@element-plus/nuxt"],
    extends: "@nuxt-themes/typography",
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
    content: {
        highlight: {
            theme: {
                dark: "dark-plus",
                default: "light-plus",
            },
        },
        markdown: {
            rehypePlugins: {
                "rehype-external-links": {
                    instance: rehypeExternalLinks,
                    target: "_blank",
                    rel: ["nofollow", "noopener", "noreferrer"],
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
