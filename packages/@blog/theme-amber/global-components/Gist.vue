<script>
import { axiosJson } from '@theme/util'

export default {
  props: ['user', 'gist'],
  methods: {
    async renderGist(user, gist) {
      const {
        data: { div, stylesheet }
      } = await axiosJson.get(
        `https://cors-anywhere.herokuapp.com/https://gist.github.com/${user}/${gist}.json`
      )
      this.$refs.gistContainer.innerHTML = div
      const gistStylesheet = document.createElement('link')
      gistStylesheet.rel = 'stylesheet'
      gistStylesheet.href = stylesheet
      this.$refs.gistContainer.append(gistStylesheet)
    }
  },
  mounted() {
    this.renderGist(this.user, this.gist)
  },
  render(h) {
    return h('div', { ref: 'gistContainer' })
  }
}
</script>
