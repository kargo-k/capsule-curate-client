import { SHOW_CAPSULE, SHOW_USER } from '../constants/action-types';
import { API } from '../constants/api-url'

export const showCapsule = payload => {
  return { type: SHOW_CAPSULE, payload }
}

export const createUser = payload => {
  return (dispatch, getState) => {
    fetch(API + '/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: payload
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          console.log('failed to create user...', json)
        } else {
          console.log('successfully created user', json)
          // update store to the current user and jwt token here
          // this.props.history.push('/main')
          localStorage.setItem('user_token', json.jwt)
        }
      })
  }
}

export const showUser = payload => {
  return { type: SHOW_USER, payload }
}