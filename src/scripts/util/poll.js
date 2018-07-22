export default function poll(delay, cb) {
  done()
  function done() {
    setTimeout(() => cb(done), delay)
  }
}
