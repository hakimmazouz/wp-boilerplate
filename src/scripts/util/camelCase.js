import capitalize from './capitalize'

export default function camelCase(str) {
  return str
    .split('-')
    .map((p, i) => (i > 0 ? capitalize(p) : p.toLowerCase()))
    .join('')
}
