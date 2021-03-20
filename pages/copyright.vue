<template>
  <div>
    <Header/>
    <div class="index flex xl:px-32 lg:px-8 md:px-4 flex-col lg:flex-row bg-gray-200">
      <div class="w-auto lg:w-3/4 mx-4">
        <div class="bg-white my-4 p-4 shadow">
          <p>
            This website uses Font Awesome Free 5 by @fontawesome<br>
            License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
          </p>
        </div>
        <div class="my-4">
          <nuxt-link to="/">トップページに戻る</nuxt-link>
        </div>
      </div>
      <Sidebar class="w-auto lg:w-1/4 m-4" />
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '権利表記',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex'},
        { hid: "description", name: "description", content: "権利表記" },
        { hid: "og:site_name", property: "og:site_name", content: "NineBolt" },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://ninebolt.net/copyright/"
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "権利表記 - NineBolt"
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "権利表記"
        }
      ]
    }
  },
}
</script>