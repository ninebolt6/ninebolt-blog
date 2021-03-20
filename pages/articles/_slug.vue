<template>
  <div>
    <Header />
    <div class="index flex xl:px-32 lg:px-8 md:px-4 flex-col lg:flex-row bg-gray-200">
      <div class="w-auto lg:w-3/4 mx-4">
        <div class="bg-white my-4 p-4 shadow">
          <div class="flex">
            <div class="px-1 mr-2 bg-gray-300">
              <nuxt-link :to="'/category/' + post.category + '/'">{{ post.category }}</nuxt-link>
            </div>
            <div class="my-auto">
              <div v-html="require('~/assets/svg/clock.svg?include')" class="svgIcon"></div>
            </div>
            <div class="mr-2">{{ post.createdAt | moment }}</div>
            <div class="flex" v-if="toBoolean(post.isUpdated)">
              <div class="my-auto">
                <div v-html="require('~/assets/svg/history.svg?include')" class="svgIcon"></div>
              </div>
              <div>{{ post.updatedAt | moment }}</div>
            </div>
          </div>
          <h1 class="text-2xl md:text-3xl">{{ post.title }}</h1>
          <div class="flex">
            <div class="my-auto">
              <div v-html="require('~/assets/svg/tags.svg?include')" class="svgIcon"></div>
            </div>
            <span class="mr-2">Tags:</span>
            <div v-if="post.tags.length">
              <div v-for="tag in post.tags" :key="tag">
                <nuxt-link :to="'/tag/' + tag + '/'" class="mr-2 px-2 bg-gray-200">{{ tag }}</nuxt-link>
              </div>
            </div>
            <div v-else>
              <span>None</span>
            </div>
          </div>
          <lazy-image
            :src="'/thumbnails/' + post.slug + '.png'"
            :width="1200"
            :height="630"
            class="w-full"
          />
          <share-button :title="post.title" :url="'https://ninebolt.net'+post.path"/>
          <hr />
          <div class="desc">{{ post.description }}</div>
          <div class="my-4 lg:flex">
            <div class="bg-gray-100 shadow-md p-4">
              <div class="justify-center flex">
                <p class="mb-4 mr-2">目次</p>
                <p @click="toggle" class="cursor-pointer">
                  <span v-if="isShown" class="text-blue-800 hover:text-blue-500">[ 非表示 ]</span>
                  <span v-else class="text-blue-800 hover:text-blue-500">[ 表示 ]</span>
                </p>
              </div>
              <ul v-if="isShown" class="">
                <li
                  v-for="link of post.toc"
                  :key="link.id"
                  :class="{ toc2: link.depth === 2, toc3: link.depth === 3 }"
                  class="my-2 text-blue-800 flex"
                >
                  <div class="my-auto">
                    <div v-html="require('~/assets/svg/caret-right.svg?include')" class="svgIcon"></div>
                  </div>
                  <nuxt-link class="hover:text-blue-500" v-scroll-to="'#' + link.id" to>{{ link.text }}</nuxt-link>
                </li>
              </ul>
            </div>
            <!-- <div class="ad lg:ml-4 p-4">
              広告here
            </div> -->
          </div>
          <nuxt-content :document="post" />
          <share-button :title="post.title" :url="'https://ninebolt.net'+post.path"/>
          <hr />
          <div class="flex mt-2">
            <div v-if="prev" class="w-1/2 mr-2 prev">
              <nuxt-link :to="'/articles/' + prev.slug + '/'">
                <div class="flex">
                  <div v-html="require('~/assets/svg/chevron-left.svg?include')" class="svgArrowIcon my-auto mr-2"></div>
                  <div>
                    <p>前の記事</p>
                    <div class="mr-2">{{ prev.title }}</div>
                  </div>
                </div>
              </nuxt-link>
            </div>
            <div
              v-if="next"
              class="w-1/2 ml-auto"
              :class="{ next: !(prev && next) }"
            >
              <nuxt-link :to="'/articles/' + next.slug + '/'">
                <div class="flex">
                  <div class="ml-auto">
                    <p class="text-right">次の記事</p>
                    <div class="ml-2">{{ next.title }}</div>
                  </div>
                  <div v-html="require('~/assets/svg/chevron-right.svg?include')" class="svgArrowIcon my-auto ml-2 justify-right"></div>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div>
          <p class="text-xl">おすすめ記事</p>
          <div v-for="article in relatedPosts" :key="article.slug">
            <nuxt-link :to="'/articles/' + article.slug + '/'">
              <div class="bg-white my-2 p-4 shadow">
                <div class="flex flex-col md:flex-row">
                  <lazy-image
                    :src="'/thumbnails/' + article.slug + '.png'"
                    :width="1200"
                    :height="630"
                    class="md:max-w-xs md:w-2/4 md:mr-2 thumbnail"
                  />
                  <div class="text-sm md:hidden px-1 mr-2 bg-gray-300 absolute">{{ article.category }}</div>
                  <div class="mt-2 md:mt-0">
                    <div class="flex">
                      <div class="hidden md:block px-1 mr-2 bg-gray-300">{{ article.category }}</div>
                      <div class="my-auto">
                        <div v-html="require('~/assets/svg/clock.svg?include')" class="svgIcon"></div>
                      </div>
                      <div class="mr-2">{{ article.createdAt | moment }}</div>
                      <div class="flex" v-if="toBoolean(article.isUpdated)">
                        <div class="my-auto">
                          <div v-html="require('~/assets/svg/history.svg?include')" class="svgIcon"></div>
                        </div>
                        <div>{{ article.updatedAt | moment }}</div>
                      </div>
                    </div>
                    <div class="text-xl md:text-2xl mb-2">{{ article.title }}</div>
                    <div>{{ article.description }}</div>
                  </div>
                </div>
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
    return {
      title: this.post.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.post.description
        },
        { hid: "og:site_name", property: "og:site_name", content: "NineBolt" },
        { hid: "og:type", property: "og:type", content: "article" },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://ninebolt.net/articles/" + this.post.slug + "/"
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.post.title + " - NineBolt"
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.post.description
        },
        {
          hid: "og:image",
          property: "og:image",
          content:
            "https://ninebolt.net" +
            require("~/assets/images/thumbnails/" + this.post.slug + ".png")
        },
        { hid: "og:image:alt", property: "og:image:alt", content: this.post.slug },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image"
        }
      ]
    }
  },

  filters: {
    moment: function(date) {
      return moment(date).format("YYYY年M月D日")
    }
  },

  data() {
    return {
      isShown: true
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
    }
  },

  async asyncData({ $content, params, error }) {
    try {
      const post = await $content("articles", params.slug).fetch()
      const tags = post.tags || []
      let relatedPosts = await $content("articles")
        .only([
          "title",
          "description",
          "category",
          "slug",
          "createdAt",
          "updatedAt",
          "isUpdated"
        ])
        .where({ tags: { $containsAny: tags }, path: { $ne: post.path } })
        .limit(3)
        .fetch()

      if (relatedPosts.length === 0) {
        relatedPosts = await $content("articles")
          .only([
            "title",
            "description",
            "category",
            "slug",
            "createdAt",
            "updatedAt",
            "isUpdated"
          ])
          .where({ path: { $ne: post.path } })
          .sortBy("updatedAt", "desc")
          .limit(3)
          .fetch()
      }

      const [prev, next] = await $content("articles")
        .only(["title", "category", "slug"])
        .sortBy("createdAt")
        .surround(params.slug)
        .fetch()

      return { post, relatedPosts, prev, next }
    } catch(e) {
      error({ statusCode: 404 })
    }
  }
}
</script>

<style>
.nuxt-content h2 {
  font-size: 20px;
  font-weight: bold;
  border-left: 4px solid gainsboro;
  border-bottom: 1px solid gainsboro;
  padding: 8px 0px 8px 8px;
  margin: 16px 0px;
}

.nuxt-content h3 {
  font-size: 20px;
  padding-bottom: 8px;
  margin-top: 1em;
  margin-bottom: 0.5em;
  border-bottom: 1px solid gainsboro;
}

.nuxt-content table th,table td {
  text-align: center;
  border: solid 2px gainsboro;
  padding: 0.5em 0.5em;
}

@screen md {
  .nuxt-content h2 {
    @apply text-2xl;
  }

  .nuxt-content table th,table td {
    padding: 0.75em 1em;
  }
}

.nuxt-content ul {
  list-style: inside disc;
  margin-bottom: 0.5em;
}

.nuxt-content a {
  @apply text-blue-800;
  text-decoration: underline;
}

.nuxt-content-highlight {
  margin: 0.5em 0 0.5em 0;
}

.nuxt-content a:hover {
  @apply text-blue-500;
}

:not(pre) > code {
  @apply bg-gray-300;
  padding-left: 4px;
  padding-right: 4px;
  font-weight: normal;
}

.nuxt-content blockquote {
  border-left: 4px solid #aabbcc;
  padding: 8px 0px 8px 8px;
  margin: 8px 0px;
}

.nuxt-content caption {
  @apply mt-2;
}

.nuxt-content img {
  @apply my-4;
}

.toc3 {
  margin-left: 1.5em;
}

.svgArrowIcon > svg {
  width: 32px;
  height: 32px;
  margin: 0 0;
}

.prev {
  border-right: gainsboro 1px solid;
}

.next {
  border-left: gainsboro 1px solid;
}

hr {
  margin: 0.75em 0px;
}
</style>
