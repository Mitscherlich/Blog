import bootstrap from './plugins/bootstrap'
import date from './plugins/date'
import iconfont from './plugins/font-awesome'
// import i18n from './plugins/i18n'
import vssue from './plugins/vssue'

export default ({ Vue, options, router, siteData }) => {
  Vue.use(bootstrap)
  Vue.use(date)
  Vue.use(iconfont)
  // Vue.use(i18n, { options })
  Vue.use(vssue, { siteData })

  Vue.mixin({
    computed: {
      $posts() {
        return this.$pagination._posts || []
      }
    }
  })
}
