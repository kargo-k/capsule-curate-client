import {
  SHOW_CAPSULE, SET_CAPSULES, ACTIVE_CAPSULE,
  SHOW_USER, LOG_OUT,
  SET_COLLECTION,
  SHOW_ITEM
} from '../constants/action-types';

import { API } from '../constants/api-url';

export const createUser = payload => {
  localStorage.clear()
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
  localStorage.clear()
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
          console.log('after login res', json)
          localStorage.setItem('token', json.jwt)
          localStorage.setItem('user_id', json.user.id)
          localStorage.setItem('username', json.user.username)
          localStorage.setItem('location', json.user.location)
          localStorage.setItem('active_capsule', JSON.stringify(json.capsule))
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
  console.log('start fetch capsules')
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
        let active = data.filter(capsule => capsule.active === true)[0]
        console.log('inside fetch capsules, active: ', active[0])
        localStorage.setItem('active_capsule', JSON.stringify(active))
        dispatch(activeCapsule(active))
        dispatch(showCapsule(active))
        dispatch(setCapsules(data))
      })
      .catch(e => console.log('error in get request', e))
  }
}

export const activeCapsule = payload => {
  // sets the user's active capsule to state
  return { type: ACTIVE_CAPSULE, payload }
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
          console.log('Failed to create capsule.', json)
        } else {
          dispatch(showCapsule(json.capsule))
          dispatch(activeCapsule(json.capsule))
          dispatch(fetchCapsules())
        }
      })
  }
}

export const setCapsules = payload => {
  // sets the user's list of capsules to state
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
        dispatch(fetchCapsules())
      })
      .catch(e => console.log('Error in delete request.', e))
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
    fetch(API + `/capsules/${payload.capsule_id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        capsule_id: payload.capsule_id,
        item_id: payload.item_id
      })
    })
      .then(res => res.json())
      .then(data => dispatch(fetchCapsules()))
      .catch(e => console.log('error in patch request', e))
  }
}