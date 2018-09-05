export default function rafScroll(callback) {
  let tick = false
  let lastScrollY = 0

  window.addEventListener('scroll', raf)

  function raf(e) {
    if (tick) return
    requestAnimationFrame(run(e))
    tick = true
  }

  function run(e) {
    return () => {
      let scrollY = window.pageYOffset
      let delta = -(scrollY - lastScrollY)
      lastScrollY = scrollY
      callback(scrollY, delta, e)
      tick = false
    }
  }

  return () => window.removeEventListener('scroll', raf)
}
