<template lang="pug">
  .titlebar: .row.flex-nowrap.justify-content-between.align-items-center
    .col: b-link.text-muted(href="#", target="_blank")
      icon.mr-2(icon="rss")
      | Subscribe
    .col-4.text-center: b-link.title(to="/") {{ $site.title }}
    .col-4
      //- TODO: add search box here
</template>

<style lang="stylus" scoped>
@import "~@theme/styles/variables"

.titlebar
  flex 1
  line-height 1
  border-bottom 1px solid #e5e5e5
  padding .75rem 0
  .title
    font-family "Playfair Display", Georgia, "Times New Roman", serif
    font-size 2.25rem
    color color-dark
    &:hover
      text-decoration none
</style>
