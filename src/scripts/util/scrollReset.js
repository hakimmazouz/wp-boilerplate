import 'scroll-restoration-polyfill'
import scrollZero from './scrollZero'

export default function scrollReset() {
  window.onbeforeunload = function() {
    scrollZero()
  }

  history.scrollRestoration = 'manual'
}
