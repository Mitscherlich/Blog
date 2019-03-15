<template lang="pug">
  .card.border-0.p-3.mb-3
    h4.text-dark
      icon.mr-2(icon="clock")
      | {{ filter | date('MMM. YYYY') }}
    ul.timeline: ArchiveItem(
                  v-for="item of entities",
                  :key="item.key",
                  :item="item"
                )
</template>

<script>
import ArchiveItem from './ArchiveItem.vue'

export default {
  props: ['filter', 'entities'],
  components: { ArchiveItem }
}
</script>
