<template>
  <div>
    <div class="shadow bg-white mb-4 p-2">
      <div align="center">
        <lazy-image src="/profile_icon.png" :height="200" :width="200"/>
        <span class=" bg-blue-200 px-1 mr-1">管理人</span>ボルト
      </div>
      <span class="text-base">情報系大学で勉強中。ゲームが大好き。独学でJavaを勉強し、趣味でBukkitプラグイン開発を行っています。今までに得た知識やノウハウ、最新情報などをお届けします。</span>
    </div>
    <!-- <div class="shadow bg-white mb-4  p-2">
      広告here
    </div> -->
    <div class="shadow bg-white mb-4 p-2">
      <div class="text-center">Category</div>
      <ul>
        <li><nuxt-link to="/category/プラグイン開発/">プラグイン開発</nuxt-link></li>
        <li><nuxt-link to="/category/Nuxt.js/">Nuxt.js</nuxt-link></li>
        <li><nuxt-link to="/category/黒い砂漠/">黒い砂漠</nuxt-link></li>
      </ul>
    </div>
    <div v-if="searchfield" class="shadow bg-white mb-4 ">
      <div class="flex">
        <input type="search" spellcheck="false" v-model="textInput" placeholder="ブログ内検索" aria-label="検索ボックス" class="w-full p-2 outline-none">
        <div v-if="textInput === ''" aria-label="検索ボタン" class="my-auto" to>
          <div v-html="require('~/assets/svg/search.svg?include')" class="search-button cursor-pointer"></div>
        </div>
        <nuxt-link v-else aria-label="検索ボタン" class="my-auto" :to="{ path: '/search/', query: {word: textInput} }">
          <div v-html="require('~/assets/svg/search.svg?include')" class="search-button"></div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      textInput: '',
    }
  },
  props: {
    searchfield: {
      type: Boolean,
      default: true
    },
  },
}
</script>

<style scoped>
.search-button {
  width: 16px;
  height: 16px;
  margin: 0 0.5em;
}
</style>