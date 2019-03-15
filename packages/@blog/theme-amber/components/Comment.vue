<template lang="pug">
  Vssue(:title="title || $page.title")
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="stylus">
@import "~@theme/styles/variables"

$vssue-theme-color = color-primary
$vssue-text-light-color = color-muted
// $vssue-font-size = 1rem

@import "~vssue/src/styles/index"

.vssue
  .vssue-button:not(:disabled).vssue-button-primary
    border-radius .25rem
    font-weight normal
    transition all .1s ease-in-out
    &:hover
      color color-light
      border-color color-primary-d
      background-color color-primary
</style>
