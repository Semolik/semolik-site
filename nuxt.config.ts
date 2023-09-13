import rehypeExternalLinks from "rehype-external-links";
import { userInfo } from "@/info";
export default defineNuxtConfig({
    modules: [
        "nuxt-icon",
        "@nuxt/content",
        "@element-plus/nuxt",
        "@nuxtjs/google-fonts",
    ],
    extends: "@nuxt-themes/typography",
    googleFonts: {
        families: {
            "Open+Sans": true,
        },
    },
    app: {
        pageTransition: {
            name: "slide-bottom",
            mode: "out-in",
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: [
                        '@use "@/assets/styles/_colors.scss" as *;',
                        '@use "@/assets/styles/breakpoints.scss" as *;',
                        '@use "@/assets/styles/helpers.scss" as *;',
                    ].join(""),
                },
            },
        },
    },
    content: {
        highlight: {
            theme: {
                dark: "github-dark",
                default: "light-plus",
            },
        },
        navigation: false,
        markdown: {
            anchorLinks: false,

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
            process.env.DISCORD_SKIP_APPLICATIONS_IDS?.split(",") ?? [],
        LAST_FM_API_KEY: process.env.LAST_FM_API_KEY,
        LAST_FM_API_SECRET: process.env.LAST_FM_API_SECRET,

        public: {
            CODESTATS_USERNAME: process.env.CODESTATS_USERNAME,
            LAST_FM_USERNAME: process.env.LAST_FM_USERNAME,
            GITHUB_USERNAME: process.env.GITHUB_USERNAME,
        },
    },
});
