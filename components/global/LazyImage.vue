<template>
  <img
    loading="lazy"
    :src="require('~/assets/images'+src)"
    :width="width"
    :height="height"
    :alt="src"
  />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    }
  },
}
</script>