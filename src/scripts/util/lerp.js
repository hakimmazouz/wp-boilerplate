export default function lerp(initial, ease) {
  let _target = initial
  let _value = initial
  let _ease = ease

  return {
    set target(t) {
      _target = t
    },

    get value() {
      return _value
    },

    update() {
      _value += (_target - _value) * _ease
    },
  }
}
