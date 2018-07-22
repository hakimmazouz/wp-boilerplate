import Barba from 'barba.js'
import sniffer from 'sniffer'
import FastClick from 'fastclick'
import css from 'dom-css'
import scrollReset from '../util/scrollReset'
import config from '../config'
import views from '../views'
import transitionReducer from '../transitions'

export default class Framework {
  constructor(App) {
    this.setup()
    this.init(App)
  }

  setup() {
    sniffer.addClasses(config.body)
    Object.assign(config, sniffer.getInfos())
    config.isDevice && FastClick.attach(config.body)
    scrollReset()
  }

  init(App) {
    this.app = new App()
    this.initBarba()
    this.addEvents()
    this.onResize()
  }

  addEvents() {
    window.addEventListener('resize', this.onResize)
    Barba.Dispatcher.on('linkClicked', this.onLinkClicked)
    Barba.Dispatcher.on('initStateChange', this.onInitStateChange)
    Barba.Dispatcher.on('newPageReady', this.onNewPageReady)
    Barba.Dispatcher.on('transitionCompleted', this.onTransitionCompleted)
  }

  initBarba() {
    views.map(view => view.init())
    Barba.Prefetch.init()
    Barba.Pjax.Dom.wrapperId = 'content'
    Barba.Pjax.Dom.containerClass = 'page'
    Barba.Pjax.getTransition = transitionReducer
    Barba.Pjax.start()
  }

  onResize = () => {
    config.width = window.innerWidth
    config.height = window.innerHeight
    this.traverse('onResize', config.width, config.height)
  }

  onLinkClicked = () => {
    this.traverseApp('onLinkClicked')
  }

  onNewPageReady = () => {
    this.updateBodyClass()
    this.traverseApp('onNewPageReady')
  }

  onInitStateChange = () => {
    css(config.html, { pointerEvents: 'none' })
    this.traverseApp('onInitStateChange')
  }

  onTransitionCompleted = () => {
    css(config.html, { pointerEvents: 'auto' })
    this.traverseApp('onInitStateChange')
  }

  updateBodyClass() {
    config.body.classList.add(
      `is-${Barba.Pjax.History.currentStatus().namespace}`,
    )
    if (Barba.Pjax.History.prevStatus()) {
      config.body.classList.remove(
        `is-${Barba.Pjax.History.prevStatus().namespace}`,
      )
    }
  }

  traverseApp = (fn, ...args) => {
    typeof this.app[fn] === 'function' && this.app[fn](...args)
  }

  traverseViews = (fn, ...args) => {
    views
      .filter(
        view =>
          view.namespace === Barba.HistoryManager.currentStatus().namespace,
      )
      .map(view => typeof view[fn] === 'function' && view[fn](...args))
  }

  traverse = (fn, ...args) => {
    this.traverseApp(fn, ...args)
    this.traverseViews(fn, ...args)
  }
}
