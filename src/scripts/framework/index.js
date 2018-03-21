import Barba from 'barba.js'
import css from 'dom-css'
import sniffer from 'sniffer'
import FastClick from 'fastclick'
import config from '../config'
import views from '../views'
import transitionReducer from '../transitions'
import emitter from '../util/emitter'

class Framework {
  constructor(app) {
    this.app = app

    this.detect()
    this.addEvents()
    this.initBarba()
  }

  detect() {
    config.sniffer = sniffer.getInfos()
    sniffer.addClasses(config.body)
    config.sniffer.isDevice && FastClick.attach(config.body)
  }

  addEvents() {
    window.addEventListener('resize', this.onResize)
    emitter.on('initStateChange', this.onInitStateChange)
    emitter.on('newPageReady', this.onNewPageReady)
    emitter.on('transitionCompleted', this.onTransitionCompleted)
  }

  initBarba() {
    views.map(view => view.init())
    Barba.Prefetch.init()
    Barba.Pjax.getTransition = transitionReducer
    Barba.Pjax.start()
  }

  onResize = () => {
    // Update global config object
    config.windowWidth = window.innerWidth
    config.windowHeight = window.innerHeight

    // Propogate window resize event through app and Barba views
    typeof this.app.onResize === 'function' &&
      this.app.onResize(config.windowWidth, config.windowHeight)

    views.map(
      view =>
        typeof view.onResize === 'function' &&
        view.onResize(config.windowWidth, config.windowHeight),
    )
  }

  onNewPageReady = () => {
    config.body.classList.add(
      `is-${Barba.Pjax.History.currentStatus().namespace}`,
    )

    if (Barba.Pjax.History.prevStatus()) {
      config.body.classList.remove(
        `is-${Barba.Pjax.History.prevStatus().namespace}`,
      )
    }
  }

  onInitStateChange() {
    css(config.html, { pointerEvents: 'none' })
  }

  onTransitionCompleted() {
    css(config.html, { pointerEvents: 'auto' })
  }
}

export default app => () => new Framework(app)
