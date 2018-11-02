import firebase from 'firebase'
import {helpers as vuelidateHelpers} from 'vuelidate/lib/validators'

const uniqueEmail = value => {
  if (!vuelidateHelpers.req(value)) {
    // the value would'nt be required. as we test this in above validator
    // it is not this validator job
    return true
  }
  return new Promise((resolve, reject) => {
    firebase.database().ref('users').orderByChild('email').equalTo(value.toLowerCase())
      .once('value', snapshot => resolve(!snapshot.exists()))
  })
}

const uniqueUsername = value => {
  if (!vuelidateHelpers.req(value)) {
    // the value would'nt be required. as we test this in above validator
    // it is not this validator job
    return true
  }
  return new Promise((resolve, reject) => {
    firebase.database().ref('users').orderByChild('usernameLower').equalTo(value.toLowerCase())
      .once('value', snapshot => resolve(!snapshot.exists()))
  })
}

const avatarSupportedType = value => {
  if (!vuelidateHelpers.req(value)) {
    // the value would'nt be required. as we test this in above validator
    // it is not this validator job
    return true
  }
  const supported = ['jpg', 'png', 'gif', 'svg']
  const fileExtension = value.split('.').pop()
  return supported.includes(fileExtension)
}

const avatarResponseOk = value => {
  if (!vuelidateHelpers.req(value)) {
    // the value would'nt be required. as we test this in above validator
    // it is not this validator job
    return true
  }
  return new Promise((resolve, reject) => {
    fetch(value)
      .then(response => resolve(response.ok))
      .catch(() => resolve(false))
  })
}

export {
  uniqueEmail,
  uniqueUsername,
  avatarSupportedType,
  avatarResponseOk
}
