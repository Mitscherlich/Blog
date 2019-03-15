<template lang="pug">
  header
    slot(name="title")
    small.text-muted
      span.mr-1
        icon.mr-1(icon="calendar")
        | {{ date | date }}
      span.mr-1
        icon.mr-1(icon="user-edit")
        | {{ author }}
      span.mr-1(v-if="category"): b-btn.text-muted.mb-1(size="sm", variant="light", :to="`/category/${category}`")
        icon.mr-1(icon="bookmark")
        | {{ category }}
      span.mr-1: b-btn.text-muted.mb-1.mr-1(size="sm", variant="light", v-for="(tag, i) of tags", :key="i", :to="`/tag/${tag}`")
        icon.mr-1(icon="tag")
        | {{ tag }}
</template>

<script>
export default {
  props: ['date', 'author', 'category', 'tags']
}
</script>
