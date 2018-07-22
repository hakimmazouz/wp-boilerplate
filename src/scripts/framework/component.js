import dom from '../util/dom'

export default class Component {
  constructor(container = document.body) {
    this.state = {}
    this.refs = dom(container)
  }

  setState(obj = {}) {
    const oldState = this.state
    this.state = Object.assign({}, this.state, obj)
    this.didUpdate(oldState)
    return this.state
  }

  didUpdate(oldState) {}
}
