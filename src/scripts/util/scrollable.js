import css from 'dom-css'
import config from '../config'

export default class Scrollable {
  constructor(el, opt) {
    this.el = el
    this.y = this._y = this._oy = window.pageYOffset
    this.ease = opt.ease || 0.1

    this.setDom()
  }

  setDom() {
    this.styles = config.body.getAttribute('style')
    css(this.el, {
      position: 'fixed',
      top: 0,
      left: 0,
      willChange: 'transform',
    })
  }

  update = () => {
    let bounds = this.el.getBoundingClientRect()
    this.height = bounds.height
    config.body.style.height = `${this.height}px`

    this._y = window.pageYOffset + config.width / bounds.height
    this.y = this.lerp(this.y, this._y, this.ease)

    let d = this.y - this._y
    if (d < 0) d *= -1
    if (d < 0.01) this.y = this._y

    if (this._oy !== this.y) {
      css(this.el, {
        transform: `translate3d(0, ${-this.y.toFixed(3)}px, 0)`,
      })
    }

    this._oy = this.y

    window.scrollable = this
  }

  destroy() {
    config.body.removeAttribute('style')
    this.styles && config.body.setAttribute('style', this.styles)
  }

  lerp = (v0, v1, t) => v0 + (v1 - v0) * t
}
