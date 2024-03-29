/**
 * Prefixed Fullscreen API
 * @link{https://caniuse.com/#feat=fullscreen}
 * @param {Element} element
 * @param {"auto"|"hide"|"show"} navigationUI
 * @return {Promise<void>}
 */
export function requestFullscreen (element, navigationUI = 'auto') {
  const requestFunction = element.requestFullscreen ||
    element.webkitRequestFullScreen ||
    element.mozRequestFullScreen ||
    element.msRequestFullscreen ||
    null

  if (requestFunction === null) {
    return Promise.reject(new Error('Fullscreen not supported'))
  }

  return promisify(requestFunction.call(element, {
    navigationUI: navigationUI
  }))
}

/**
 *
 * @return {Promise<void>}
 */
export function exitFullscreen () {
  const exitFunction = document.exitFullscreen ||
    document.webkitExitFullScreen ||
    document.mozExitFullScreen ||
    document.msExitFullscreen ||
    null

  if (exitFunction === null) {
    return Promise.reject(new Error('Fullscreen not supported'))
  }

  return promisify(exitFunction.call(document))
}

function promisify (result) {
  if (result instanceof Promise) {
    return result
  }

  return Promise.resolve(result)
}
