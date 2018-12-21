<template lang="pug">
  .projects
    transition(name="fade", mode="out-in")
      b-card-group.mb-4(columns, v-if="projects.length")
        b-card(:img-src="preview", :key="`project-${i}`", v-for="({ name, description, link, preview }, i) in projects")
          h4 {{ name }}
          p {{ description }}
          footer(slot="footer"): b-link.text-muted(:href="link")
            fa-icon.mr-2.text-success(:icon="['far', 'thumbs-up']")
            small {{ $t('visit') }}
      b-row.justify-content-center(v-else): loading.my-5(style="margin: 0 auto;")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ name: 'Projects' })
export default class Projects extends Vue {
  private get projects() {
    return this.$store.state.data.projects || [];
  }
}
</script>

<style lang="stylus">
.projects
  .card
    .card-img
      border-bottom-right-radius 0!important
      border-bottom-left-radius 0!important
</style>
