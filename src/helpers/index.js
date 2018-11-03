import Vue from 'vue'

const countObjectProperties = obj => {
  if (typeof obj === 'object') {
    return Object.keys(obj).length
  }
  return 0
}

const currentTimestamp = () => Math.floor(Date.now() / 1000)

const appendChildToParentMutation = ({child}) =>
  (state, {parentId, childId}) => {
    const resource = state.items[parentId]
    if (!resource[child]) {
      Vue.set(resource, child, {})
    }
    Vue.set(resource[child], childId, childId)
  }

const removeEmptyProperties = object => {
  const objectCopy = {...object}
  Object.keys(objectCopy).forEach(key => {
    if ([null, undefined].includes(objectCopy[key])) {
      delete objectCopy[key]
    }
  })

  return objectCopy
}

export {
  countObjectProperties,
  currentTimestamp,
  appendChildToParentMutation,
  removeEmptyProperties
}
