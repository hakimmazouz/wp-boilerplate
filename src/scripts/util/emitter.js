import Barba from 'barba.js'

// Handy wrapper around Barba.Dispatcher
class Emitter {
  emit(evt, ...payload) {
    return Barba.Dispatcher.trigger(evt, ...payload)
  }

  on(evt, fn) {
    return Barba.Dispatcher.on(evt, fn)
  }

  off(evt, fn) {
    return Barba.Dispatcher.off(evt, fn)
  }
}

export default new Emitter()
