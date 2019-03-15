<template lang="pug">
  .theme-container
    Header
    main.container: .row
      .col(:class="pageClasses"): component(:is="layout")
      .col-md-4(v-if="shouldShowSidebar"): Sidebar
    Footer
</template>

<script>
import Header from '@theme/components/Header.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import Footer from '@theme/components/Footer.vue'

export default {
  components: { Header, Sidebar, Footer },
  computed: {
    layout() {
      if (this.$page.path) {
        if (this.$frontmatter.layout) {
          return this.$frontmatter.layout
        }
        return 'Layout'
      }
      return 'NotFound'
    },
    shouldShowSidebar() {
      return !(this.$page.frontmatter.sidebar === false)
    },
    pageClasses() {
      return [{ 'col-md-8': this.shouldShowSidebar }]
    }
  }
}
</script>

<style src="github-markdown-css/github-markdown.css"></style>
<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="@theme/styles/theme.styl" lang="stylus"></style>
