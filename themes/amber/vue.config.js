const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer
const merge = require('lodash.merge')

const config = {
  productionSourceMap: false,
}

const proxy = {
  '/api': {
    'target': 'http://localhost:4000/api',
    'changeOrigin': true,
    'pathRewrite': { '^/api': '' },
  },
  '/assets': {
    'target': 'http://localhost:4000/assets',
    'changeOrigin': true,
    'pathRewrite': { '^/assets': '' },
  },
}

const build = {
  outputDir: 'source',
  indexPath: path.relative('source', 'layout/index.ejs'),
  devServer: { proxy },
}

const server = {
  configureWebpack: {
    plugins: [
      new PrerenderSpaPlugin({
        staticDir: path.resolve(__dirname, './dist'),
        routes: ['/', '/archives', '/messages', '/donate', '/projects', '/profile'],
        server: { proxy },
        renderer: new Renderer({
          renderAfterElementExists: '#blog-app',
        }),
      })
    ]
  }
}

const ssr = (
  process.env.VUE_ENV === 'server' &&
  process.env.NODE_ENV === 'production'
)

module.exports = merge(config, ssr ? server : build)
