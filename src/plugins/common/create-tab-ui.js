import el from '../../common/dom-el.js'

export default function createTabUi () {

  // internals

  var isVisible = false

  // DOM

  var tabContainerEl = el('<div>', {
    class: 'io3d-inspector-plugins io3d-inspector-plugins___tab-container',
  }).appendTo(document.body)

  var tabEl = el('<div>', {
    class: 'io3d-inspector-plugins___tab'
  }).appendTo(tabContainerEl)

  // methods

  function slideIn (callback, animate) {

    if (isVisible) return
    isVisible = true

    animate = animate !== undefined ? animate : true

    if (animate) {

      tabEl.style.opacity = 0
      tabEl.style.display = 'block'

      tabEl.style['-webkit-animation'] = '600ms io3d-inspector-plugins___tab___slide-in cubic-bezier(0.2, 0.80, 0.5, 1)'
      tabEl.style['animation'] = '600ms io3d-inspector-plugins___tab___slide-in cubic-bezier(0.2, 0.80, 0.5, 1)'
      tabEl.style['-webkit-animation-fill-mode'] = 'forwards'
      tabEl.style['animation-fill-mode'] = 'forwards'

      if (typeof callback === 'function') setTimeout(function () { callback(); }, 500)

    } else {

      if (typeof callback === 'function') callback()

    }

  }

  function slideOut (callback, animate) {

    if (!isVisible) return
    isVisible = false

    animate = animate !== undefined ? animate : true

    if (animate) {

      tabEl.style['-webkit-animation'] = '600ms io3d-inspector-plugins___tab___slide-out ease-in'
      tabEl.style['animation'] = '600ms io3d-inspector-plugins___tab___slide-out ease-in'
      tabEl.style['-webkit-animation-fill-mode'] = 'forwards'
      tabEl.style['animation-fill-mode'] = 'forwards'

      // remove element
      setTimeout(function () {
        tabEl.style.display = 'none'
      }, 600)

      if (typeof callback === 'function') setTimeout(function () { callback(); }, 300)

    } else {

      if (typeof callback === 'function') callback()

    }

  }

  // expose API

  return {
    slideIn: slideIn,
    slideOut: slideOut,
    el: tabEl
  }

}

