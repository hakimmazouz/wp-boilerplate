import anime from 'animejs'
import scrollZero from '../util/scrollZero'

export default function fade(oldContainer, newContainer, done) {
  return anime({
    targets: oldContainer,
    duration: 300,
    opacity: 0,
    easing: 'easeOutCubic',
  })
    .finished.then(() => {
      oldContainer.style.display = 'none'
      newContainer.style.opacity = 0
      newContainer.style.visibility = 'visible'
      scrollZero()
    })
    .then(
      () =>
        anime({
          targets: newContainer,
          duration: 300,
          opacity: 1,
          easing: 'easeOutCubic',
        }).finished,
    )
    .then(done)
}
