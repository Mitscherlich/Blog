<template lang="pug">
  .card
    img.card-img(:src="item.image", :style="customStyleObject")
    .card-body
      h3 {{ item.title }}
      p {{ item.text }}
      a(:href="item.link") Check it out
</template>

<script>
export default {
  props: ['item'],
  computed: {
    customStyleObject() {
      return {
        'border-bottom-left-radius': '0!important',
        'border-bottom-right-radius': '0!important'
      }
    }
  }
}
</script>
