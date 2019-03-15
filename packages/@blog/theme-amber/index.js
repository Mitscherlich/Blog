const { resolve } = require('path')

const r = path => resolve(__dirname, path)

module.exports = options => ({
  globalLayout: r('layouts/Global.vue'),
  additionalPages: [{ path: '/archives/', frontmatter: { layout: 'Archives' } }],
  plugins: [
    '@vuepress/back-to-top',
    '@vuepress/clean-urls',
    '@vuepress/medium-zoom',
    '@vuepress/nprogress',
    ['@vuepress/blog', { permalink: '/article/:slug' }],
    ['@vuepress/google-analytics', { ga: options.ga }],
    ['@vuepress/pagination', { perPagePosts: options.perPage }],
    [
      '@vuepress/search',
      {
        searchMaxSuggestions: 10,
        test: null
      }
    ]
  ]
})
