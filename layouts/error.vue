<template>
  <div>
    <Header/>
    <div class="index flex xl:px-32 lg:px-8 md:px-4 flex-col lg:flex-row bg-gray-200">
      <div class="w-auto lg:w-3/4 mx-4">
        <div class="mt-4 text-2xl text-red-600">
          <p>ERROR 404</p>
          <p>お探しのページは見つかりませんでした</p>
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
      title: 'ERROR 404',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex'},
        { hid: "description", name: "description", content: "お探しのページは見つかりませんでした" },
        { hid: "og:site_name", property: "og:site_name", content: "NineBolt" },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://ninebolt.net/404/"
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "ERROR 404 - NineBolt"
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "お探しのページは見つかりませんでした"
        }
      ]
    }
  },
}
</script>