import camelCase from './camelCase'

export default function dom(container = document.body, prefix = 'js-') {
  let targetEls = [...container.querySelectorAll(`*[class*="${prefix}"]`)]
  return targetEls.reduce((acc, el) => {
    let key = camelCase(el.className.split(prefix)[1].split(' ')[0])
    return {
      ...acc,
      [key]: acc.hasOwnProperty(key)
        ? acc[key].length
          ? [...acc[key], el]
          : [acc[key], el]
        : el,
    }
  }, {})
}
