<template lang="pug">
  li.cursor-pointer
    b-link(:to="item.path") {{ item.title }}
    span.float-right {{ item.frontmatter.date | date }}
    //- p #[small.text-muted {{ text }}]
</template>

<script>
export default {
  props: ['item']
}
</script>
