import rehypeExternalLinks from "rehype-external-links";
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
        head: {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1",
            meta: [{ name: "description", content: `Semolik's portfolio` }],
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
        public: {
            CODESTATS_USERNAME: process.env.CODESTATS_USERNAME,
            GITHUB_USERNAME: process.env.GITHUB_USERNAME,
        },
    },
});
