<template lang="pug">
  header
    .container
      Titlebar
      Navbar
      Carousel(v-if="$page.frontmatter.home")
</template>

<script>
import Titlebar from './Titlebar.vue'
import Navbar from './Navbar.vue'
import Carousel from './Carousel.vue'

export default {
  components: {
    Titlebar,
    Navbar,
    Carousel
  }
}
</script>
