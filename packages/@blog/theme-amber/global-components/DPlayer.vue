<script>
export default {
  props: {
    src: { type: String, required: true },
    screenshot: { type: Boolean, default: false },
    subtitle: { type: String, default: '' },
    danmakuId: { type: String, default: '' },
    danmakuApi: { type: String, default: 'https://api.prprpr.me/dplayer/' },
    autoplay: { type: Boolean, default: false },
    theme: { type: String, default: '#b7daff' },
    loop: { type: Boolean, default: false },
    hotkey: { type: Boolean, default: true },
    preload: { type: String, default: 'auto' },
    logo: { type: String, default: '' },
    mutex: { type: Boolean, default: true },
    crossOrigin: { type: Boolean, default: false },
    proxy: { type: String, default: 'https://cors-anywhere.herokuapp.com' }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize() {
      Promise.all([
        import(/* webpackChunkName: "dplayer" */ 'dplayer/dist/DPlayer.min.js'),
        import(/* webpackChunkName: "dplayer" */ 'dplayer/dist/DPlayer.min.css')
      ]).then(([{ default: DPlayer }]) => {
        new DPlayer({
          container: this.$el,
          autoplay: this.autoplay,
          theme: this.theme,
          loop: this.loop,
          screenshot: this.screenshot,
          hotkey: this.hotkey,
          preload: this.preload,
          logo: this.logo,
          video: {
            url: this.crossOrigin ? `${this.proxy}/${this.src}` : this.src
          },
          subtitle: {
            url: this.crossOrigin ? `${this.proxy}/${this.subtitle}` : this.subtitle,
            color: '#000000',
            fontSize: '25px',
            bottom: '2%'
          },
          danmaku: this.danmakuId
            ? {
                id: this.danmakuId,
                api: this.danmakuApi
              }
            : null,
          mutex: this.mutex
        })
      })
    }
  },
  render(h) {
    return h('div', { class: 'box-shadow mb-3' })
  }
}
</script>
