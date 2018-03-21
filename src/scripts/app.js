import config from './config'
import emitter from './util/emitter'

class App {
  el = config.app

  onResize(width, height) {
    console.log(width, height)
  }
}

export default () => new App()
