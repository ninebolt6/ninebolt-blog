export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",

  generate: {
    fallback: true,
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "Page",
    titleTemplate: "%s - NineBolt",
    htmlAttrs: {
      lang: "ja",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://ninebolt.net/favicon.ico",
      },
      { hid: "og:image:alt", property: "og:image:alt", content: "favicon" },
      { hid: "twitter:card", name: "twitter:card", content: "summary" },
      //{ hid: 'twitter:site', name: 'twitter:site', content: "@ninebolt9"}
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [{ src: "~/plugins/vue-scrollto" }],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/moment",
    "@aceforth/nuxt-optimized-images",
    "@nuxtjs/google-analytics",
  ],
  googleAnalytics: {
    id: "UA-175954905-1",
  },
  moment: {
    locales: ["ja"],
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt/content
    "@nuxt/content",
    "@nuxtjs/google-adsense",
    "@nuxtjs/sitemap",
  ],
  sitemap: {
    hostname: "https://ninebolt.net",
    trailingSlash: true,
    gzip: true,
    routes: async () => {
      const { $content } = require("@nuxt/content")
      const articles = await $content("articles")
        .only(["path", "tags", "category"])
        .fetch()
      const route = []

      articles.forEach((article) => {
        route.push(article.path)
        route.push("/category/" + article.category)
        article.tags
          .map((tag) => "/tag/" + tag)
          .forEach((tag) => route.push(tag))
      })
      return Array.from(new Set(route))
    },
  },
  "google-adsense": {
    id: "",
  },
  content: {
    // Options
    markdown: {
      prism: {
        theme: "~/assets/css/prism-atom-dark.css",
      },
    },
  },
  optimizedImages: {
    //For @aceforth/nuxt-optimized-images
    optimizeImages: true,
    optimizeImagesInDev: false,
    pngquant: {
      strip: true,
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    //analyze: true
  },
}
