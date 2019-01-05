// tslint:disable-next-line:no-empty
export function noop() {}

export function debounce(
  fn: (...args: any[]) => void,
  wait: number = 250,
  immediate: boolean = false
) {
  let timeout: number|null = 0

  function debounced(...args: any[]) {
    const later = () => {
      timeout = null
      if (!immediate) {
        fn(...args)
      }
    }

    clearTimeout(timeout as number)
    if (immediate && !timeout) {
      fn(...args)
    }
    timeout = setTimeout(later, wait)
  }

  debounced.cancel = () => {
    clearTimeout(timeout as number)
  }

  return debounced
}
