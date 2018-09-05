import clamp from './clamp'

export default function getScrollPercentage(el) {
  const bounds = el.getBoundingClientRect()
  const vh = window.innerHeight
  const threshold = 0
  const offsetTop = threshold * vh * 0.25
  const offsetBottom = threshold * vh * 0.25

  return (
    1 -
    clamp(
      (bounds.bottom - offsetTop) /
        (vh + bounds.height - offsetBottom - offsetTop),
      0,
      1,
    )
  )
}
