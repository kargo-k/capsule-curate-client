import {
  SHOW_CAPSULE, SET_CAPSULES,
  SHOW_USER, LOG_OUT,
  SET_COLLECTION,
  ADD_ITEM, SHOW_ITEM
} from '../constants/action-types';

import { API } from '../constants/api-url';

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
          localStorage.setItem('token', json.jwt)
          localStorage.setItem('user_id', json.user.id)
          localStorage.setItem('username', json.user.username)
          localStorage.setItem('location', json.user.location)
        }
      })
  }
}

export const logInUser = credentials => {
  return (dispatch, getState) => {
    fetch(API + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: credentials
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          console.log('post request to login - error', json)
        } else {
          localStorage.setItem('token', json.jwt)
          localStorage.setItem('user_id', json.user.id)
          localStorage.setItem('username', json.user.username)
          localStorage.setItem('location', json.user.location)
          dispatch(showUser(json.user))
          dispatch(showCapsule(json.capsule))
          dispatch(fetchCapsules())
        }
      })
  }
}

export const showUser = payload => {
  return { type: SHOW_USER, payload }
}

export const logOutUser = () => {
  return { type: LOG_OUT }
}

export const deleteUser = () => {
  return (dispatch, getState) => {
    fetch(API + '/profile', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(json => console.log('deleted!!', json))
      .catch(e => console.log('error in delete request', e))
  }
}

export const fetchCapsules = () => {
  return (dispatch, getState) => {
    fetch(API + '/capsules', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('capsules_list', JSON.stringify(data))
        dispatch(setCapsules(data))
      })
      .catch(e => console.log('error in get request', e))
  }
}

export const createCapsule = payload => {
  return (dispatch, getState) => {
    fetch(API + '/capsules', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        capsule: payload
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          console.log('failed to create capsule...', json)
        } else {
          console.log('successfully created capsule', json)
          dispatch(showCapsule(json))
          dispatch(fetchCapsules())
        }
      })
  }
}

export const setCapsules = payload => {
  return { type: SET_CAPSULES, payload }
}

export const showCapsule = payload => {
  return { type: SHOW_CAPSULE, payload }
}

export const deleteCapsule = id => {
  return (dispatch, getState) => {
    fetch(API + `/capsules/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log('after delete --', json)
        dispatch(fetchCapsules())
      })
      .catch(e => console.log('error in delete request', e))
  }
}

export const fetchCollection = () => {
  return (dispatch, getState) => {
    fetch(API + '/items', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(items => {
        dispatch(setCollection(items))
      })
  }
}

export const setCollection = payload => {
  return { type: SET_COLLECTION, payload }
}

export const showItem = payload => {
  return { type: SHOW_ITEM, payload }
}

export const addItem = payload => {
  return (dispatch, getState) => {
    fetch(API + `/capsules/${payload.capsule.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log('adding item to capsule', json)
      })
      .catch(e => console.log('error in patch request', e))
  }
}