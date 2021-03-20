<template>
  <div>
    <Header />
    <div class="index flex xl:px-32 lg:px-8 md:px-4 flex-col lg:flex-row bg-gray-200">
      <div class="w-auto lg:w-3/4 mx-4">
        <div class="mt-4">
          <p>
            カテゴリ
            <span class="py-2 text-red-600">{{ $route.params.slug }}</span>
            に含まれる記事: {{ articles.length }}件
          </p>
        </div>
        <div v-for="item in articles" :key="item.slug">
          <nuxt-link :to="'/articles/' + item.slug + '/'">
            <div class="bg-white my-4 p-4 shadow">
              <div class="flex flex-col md:flex-row">
                <lazy-image
                  :src="'/thumbnails/' + item.slug + '.png'"
                  :width="1200"
                  :height="630"
                  class="md:max-w-xs md:w-2/4 md:mr-2 thumbnail"
                />
                <div class="text-sm md:hidden px-1 mr-2 bg-gray-300 absolute">{{ item.category }}</div>
                <div class="mt-2 md:mt-0">
                  <div class="flex">
                    <div class="hidden md:block px-1 mr-2 bg-gray-300">{{ item.category }}</div>
                    <div class="my-auto">
                      <div v-html="require('~/assets/svg/clock.svg?include')" class="svgIcon"></div>
                    </div>
                    <div class="mr-2">{{ item.createdAt | moment }}</div>
                    <div class="flex" v-if="toBoolean(item.isUpdated)">
                      <div class="my-auto">
                        <div v-html="require('~/assets/svg/history.svg?include')" class="svgIcon"></div>
                      </div>
                      <div>{{ item.updatedAt | moment }}</div>
                    </div>
                  </div>
                  <div class="text-xl md:text-2xl mb-2">{{ item.title }}</div>
                  <div>{{ item.description }}</div>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
        <div class="flex my-4">
          <div v-if="page != 1">
            <nuxt-link :to="{ query: { page: (page-1) } }" v-scroll-to="'#index'">
              <div class="flex shadow bg-white p-4">
                <div
                  v-html="require('~/assets/svg/chevron-left.svg?include')"
                  class="svgIcon my-auto"
                ></div>
                <p>前の10件</p>
              </div>
            </nuxt-link>
          </div>
          <div v-if="hasNextPage" class="ml-auto">
            <nuxt-link :to="{ query: { page: (page+1) } }" v-scroll-to="'#index'">
              <div class="flex shadow bg-white p-4">
                <p>次の10件</p>
                <div
                  v-html="require('~/assets/svg/chevron-right.svg?include')"
                  class="svgIcon my-auto"
                ></div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
      <Sidebar class="w-auto lg:w-1/4 m-4" />
    </div>
    <Footer />
  </div>
</template>

<script>
import moment from "moment"

export default {
  head() {
    var titleStr, categoryStr
    if (typeof this.$route.params.slug !== "undefined") {
      categoryStr = this.$route.params.slug
      titleStr = categoryStr + " | カテゴリ検索"
    } else {
      categoryStr = ""
      titleStr = "カテゴリ検索"
    }
    return {
      title: titleStr,
      meta: [
        { hid: "description", name: "description", content: "カテゴリ検索結果: " + categoryStr },
        { hid: "og:site_name", property: "og:site_name", content: "NineBolt" },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://ninebolt.net/category/" + categoryStr + "/"
        },
        {
          hid: "og:title",
          property: "og:title",
          content: titleStr + " - NineBolt"
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "カテゴリ検索結果: " + categoryStr
        }
      ]
    }
  },

  filters: {
    moment: function(date) {
      return moment(date).format("YYYY年M月D日")
    }
  },

  methods: {
    toBoolean: function(str) {
      if (str === "true") {
        return true
      } else {
        return false
      }
    }
  },

  watchQuery: ['page'],

  async asyncData({ $content, params, error, query }) {
    if (typeof params.slug !== "undefined") {
      const page = parseInt(query.page) || 1
      try {
        const articles = await $content("articles")
          .only([
            "title",
            "description",
            "category",
            "slug",
            "createdAt",
            "updatedAt",
            "isUpdated"
          ])
          .where({ category: { $eq: params.slug } })
          .sortBy("updatedAt", "desc")
          .skip((page-1)*10)
          .limit(10)
          .fetch()
        const next = await $content("articles")
          .only('slug')
          .where({ category: { $eq: params.slug } })
          .sortBy("updatedAt", "desc")
          .surround(articles[articles.length-1].slug, {before:0, after:1})
          .fetch()
        var hasNextPage = false
        if(next[0] != null) {
          hasNextPage = true
        }
        return { articles, hasNextPage, page }
      } catch(e) {
        error({ statusCode: 404 })
      }
    } else {
      error({ statusCode: 404 })
    }
  }
}
</script>
