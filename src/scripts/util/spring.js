export default function spring(initial, mass, stiffness, damping) {
  let _mass = mass
  let _stiffness = stiffness
  let _damping = damping
  let _time = 0
  let _acceleration = 0
  let _velocity = 0
  let _target = initial
  let _value = initial

  return {
    set target(t) {
      _target = t
    },

    get value() {
      return _value
    },

    update() {
      let now = Date.now()
      let t = now - _time

      _time = now

      let spring = _stiffness * (_value - _target)
      let damper = _damping * _velocity

      _acceleration = (spring + damper) / _mass
      _velocity += _acceleration * (t / 1000)
      _value += _velocity * (t / 1000)
    },
  }
}
