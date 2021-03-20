<template>
  <div>
    <Header />
    <div id="index" class="index flex xl:px-32 lg:px-8 md:px-4 flex-col lg:flex-row bg-gray-200">
      <div class="w-auto lg:w-3/4 mx-4">
        <div class="my-4">
          <span>ブログ内検索</span>
          <input
            type="search"
            spellcheck="false"
            v-model="query"
            placeholder="検索ワード"
            aria-label="検索ボックス"
            class="w-full p-2 outline-none shadow"
          />
        </div>
        <p>検索結果: {{ articles.length }}件 ({{ page }}ページ目)</p>
        <div v-if="articles.length">
          <div v-for="item in articles" :key="item.slug">
            <nuxt-link :to="'/articles/' + item.slug + '/'">
              <div class="bg-white mb-4 p-4 shadow">
                <div class="flex flex-col md:flex-row">
                  <lazy-image
                    :src="'/thumbnails/' + item.slug + '.png'"
                    :width="1200"
                    :height="630"
                    class="md:max-w-xs md:w-2/4 md:mr-2 thumbnail"
                  />
                  <div class="mt-2 md:mt-0">
                    <div class="flex">
                      <div class="px-1 mr-2 bg-gray-300">{{ item.category }}</div>
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
          <div class="flex">
            <div v-if="page !== 1" class="mb-4">
              <nuxt-link :to="{ query: { word: query, page: (page-1) } }" v-scroll-to="'#index'">
                <div class="flex shadow bg-white p-4">
                  <div v-html="require('~/assets/svg/chevron-left.svg?include')" class="svgIcon my-auto"></div>
                  <p>前の10件</p>
                </div>
              </nuxt-link>
            </div>
            <div v-if="hasNextPage" class="ml-auto mb-4">
              <nuxt-link :to="{ query: { word: query, page: (page+1) } }" v-scroll-to="'#index'">
                <div class="flex shadow bg-white p-4">
                  <p>次の10件</p>
                  <div v-html="require('~/assets/svg/chevron-right.svg?include')" class="svgIcon my-auto"></div>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <Sidebar class="w-auto lg:w-1/4 m-4" :searchfield="false" />
    </div>
    <Footer />
  </div>
</template>

<script>
import moment from "moment"

export default {
  head() {
    var wordQuery = (this.query !== "") ? "?word="+this.query : ""
    var pageQuery = (this.page !== 1) ? ((wordQuery === "") ? ("?page="+this.page) : ("&page="+this.page)) : ""

    return {
      title: "ブログ内検索",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "ブログ内検索ページです。"
        },
        { hid: "og:site_name", property: "og:site_name", content: "NineBolt" },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://ninebolt.net/search/"+wordQuery+pageQuery
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "ブログ内検索 - NineBolt"
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "ブログ内検索ページです。"
        }
      ]
    }
  },

  methods: {
    toBoolean: function(str) {
      if (str === "true") {
        return true
      } else {
        return false
      }
    },

    toggle: function() {
      this.isShown = !this.isShown
    },

    async getArticles() {
      if(this.query === "") {
        this.articles = []
      } else {
        try {
          this.articles = await this.$content("articles")
            .only([
              "title",
              "description",
              "category",
              "slug",
              "createdAt",
              "updatedAt",
              "isUpdated"
            ])
            .sortBy("createdAt", "desc")
            .search(this.query)
            .skip((this.page-1)*10)
            .limit(10)
            .fetch()
          if(this.articles.length) {
            const next = await this.$content("articles").only('slug').sortBy("createdAt", "desc").search(this.query).surround(this.articles[this.articles.length-1].slug, {before:0, after:1}).fetch()
            if(next[0] != null) {
              this.hasNextPage = true
            }
          }
        } catch(e) {
          //not found
        }
      }
    }
  },

  filters: {
    moment: function(date) {
      return moment(date).format("YYYY年M月D日")
    }
  },

  data() {
    return {
      query: this.$route.query.word || "",
      articles: [],
      page: parseInt(this.$route.query.page) || 1,
      hasNextPage: false
    }
  },

  watch: {
    query: {
      handler(newQuery) {
        this.query = newQuery;
        this.getArticles();
      },
      immediate: true
    },
    '$route.query.page': {
      handler(newPage) {
        if(typeof newPage !== 'undefined' && (this.articles.length)) {
          this.page = newPage;
          this.getArticles();
        }
      },
      immediate: true
    }
  }
}
</script>
