<template>
  <div class="flex my-2 justify-evenly">
    <span class="my-auto">共有する:</span>
    <a :href="'https://twitter.com/intent/tweet?text='+encode(title+'\n')+'&url='+encode(url)/*+'&via=ninebolt9&related=ninebolt9'*/" target="_blank" rel="nofollow noopener noreferrer" class="py-1 px-6">
      <div v-html="require('~/assets/svg/twitter-square.svg?include')" class="shareIcon my-auto twitter"></div>
    </a>
    <a :href="'https://line.me/R/msg/text/?'+encode(title+'\n')+encode(url)" rel="nofollow noopener noreferrer" target="_blank" class="py-1 px-6">
      <div v-html="require('~/assets/svg/line.svg?include')" class="shareIcon my-auto line-icon"></div>
    </a>
    <a :href="'https://www.facebook.com/share.php?u='+encode(url)" target="_blank" rel="nofollow noopener noreferrer" class="py-1 px-6">
      <div v-html="require('~/assets/svg/facebook.svg?include')" class="shareIcon my-auto facebook"></div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  methods: {
    encode: function(str) {
      return encodeURIComponent(str)
    }
  }
}
</script>

<style>
.shareIcon {
  width: 32px;
  height: 32px;
}

.twitter {
  fill: #00aced;
}

.line-icon {
  fill: #00B900
}

.facebook {
  fill: #4267B2;
}

.get-pocket {
  fill: #ee4056
}
</style>