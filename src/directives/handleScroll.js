export default {
  bind (el, binding) {
    el.__scrollHandler__ = event => binding.value(event)
    document.body.addEventListener('mousewheel', el.__scrollHandler__)
    document.body.addEventListener('touchmove', el.__scrollHandler__)
  },

  unbind (el) {
    document.body.removeEventListener('mousewheel', el.__scrollHandler__)
    document.body.removeEventListener('touchmove', el.__scrollHandler__)
  }
}

// can be used as v-handleScroll or v-handle-scroll
