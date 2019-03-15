import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fab, far, fas)

const install = Vue => {
  Vue.component('icon', {
    props: ['icon'],
    computed: {
      propIcon() {
        return Array.isArray(this.icon)
          ? this.icon
          : /\ /.test(this.icon)
          ? this.icon.split(' ')
          : this.icon
      }
    },
    render(h) {
      return h(FontAwesomeIcon, {
        props: {
          icon: this.propIcon
        }
      })
    }
  })
}

export default { install }
