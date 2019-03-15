<template lang="pug">
  footer.py-3.bg-light.text-muted
    //- b-dropdown.mb-2(:text="$t(locale)", variant="link")
    //-   b-dropdown-item(@click="locale = 'zh-CN'") {{ $t('zh-CN') }}
    //-   //- b-dropdown-item(@click="locale = 'zh-TW'") {{ $t('zh-TW') }}
    //-   b-dropdown-item(@click="locale = 'en-US'") {{ $t('en-US') }}
    //- p(v-html="$t('power_by', $site.themeConfig.powerby)")
    //- p(v-html="$t('theme_by')")
    p.mt-1
      | Made by &nbsp;
      a(:href="$site.themeConfig.powerby.link") {{ $site.themeConfig.powerby.author }}
      | &nbsp;with ❤️ and Power by&nbsp;
      a(href="https://vuepress.vuejs.org/") Vuepress
    p.mb-1
      | Theme&nbsp;
      a(href="https://github.com/Mitscherlich/vuepress-theme-amber") vuepress-theme-amber
      | &nbsp;[WIP] 🚧 Under construction
</template>

<!--
<script>
import store from 'store'

export default {
  data() {
    return {
      locale: ''
    }
  },
  beforeMount() {
    this.locale = store.get('locale', 'zh-CN')
  },
  watch: {
    locale(l) {
      store.set('locale', l)
      this.$i18n.locale = l
    }
  }
}
</script>
-->

<style lang="stylus" scoped>
footer
  line-height .75
  font-size .75rem
  text-align center
  border-top .05rem solid #e5e5e5
  .dropdown-item
    margin-bottom .25rem
    &:last-child
      margin-bottom 0
</style>
