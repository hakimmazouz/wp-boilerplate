import Barba from 'barba.js'
import css from 'dom-css'
import config from '../config'
import instant from './instant'
// // import fade from './fade'

const map = {
  default: instant,
  // Define different transitions using previous and current namespaces
  // home: {
  //   single: fade,
  // },
  // single: {
  //   home: instant,
  // },
}

export default function transitionReducer() {
  return Barba.BaseTransition.extend({
    start() {
      css(config.html, { cursor: 'wait' })
      this.newContainerLoading.then(() => {
        css(config.html, { cursor: 'default' })
        const from = Barba.Pjax.History.prevStatus().namespace
        const to = Barba.Pjax.History.currentStatus().namespace
        return ((map[from] && map[from][to]) || map.default)(
          this.oldContainer,
          this.newContainer,
          this.done.bind(this),
        )
      })
    },
  })
}
