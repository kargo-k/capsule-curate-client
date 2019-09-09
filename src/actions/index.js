import {
  SHOW_CAPSULE, SET_CAPSULES, ACTIVE_CAPSULE,
  SET_USER, LOG_OUT,
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
          // when user is logged in or created, store token and user information in local storage and set the user information in state
          localStorage.setItem('token', json.jwt)
          localStorage.setItem('user', JSON.stringify(json.user))
          dispatch(setUser(json.user))
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
          localStorage.clear()
        } else {
          // set's the user information in state and localStorage
          // when user is logged in or created, store token and user information in local storage and set the user information in state
          localStorage.setItem('token', json.jwt)
          localStorage.setItem('user', JSON.stringify(json.user))
          dispatch(setUser(json.user))
        }
      })
  }
}

export const setUser = payload => {
  return { type: SET_USER, payload }
}

export const logOutUser = () => {
  // upon log out, local storage is cleared and set all of state to null
  localStorage.clear()
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
      .then(json => {
        localStorage.clear()
      })
      .catch(e => console.log('error in delete request', e))
  }
}

export const fetchCapsules = () => {
  // every time fetchCapsules is called, it fetches all of the capsules for the user and resets the capsules list and active_capsule in state.  if the user does not have any active capsule, the active_capsule in state will be null
  console.log('fetching capsules happening!');
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
        // filters all the user's capsules for their active capsule
        let active = data.filter(capsule => capsule.active === true)
        // debugger
        if (active !== []) {
          dispatch(activeCapsule(active[0]))
        } else {
          dispatch(activeCapsule(null))
        }
        dispatch(setCapsules(data))
      })
      .catch(e => console.log('error in get request', e))
  }
}

export const activeCapsule = payload => {
  // sets the user's active capsule to state
  console.log('!!!setting the active capsule to state!!!: ', payload);
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
          // once the new capsule is made, set the new capsule to the show_capsule in state
          dispatch(showCapsule(json.capsule))
          // execute another fetch to refresh the capsules list
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
  // sets the payload (a specific capsule object) to the show_capsule in state
  return { type: SHOW_CAPSULE, payload }
}

export const toggleCapsule = id => {
  // activates or inactivates a capsule. a user can have only 1 active capsule at a time
  return (dispatch, getState) => {
    fetch(API + `/capsules/activate/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(json => {
        // sets the updated capsule to the show_capsule in state
        dispatch(showCapsule(json.capsule))
        // if (json.capsule.active) {
        //   dispatch(activeCapsule(json.capsule))
        // }
        // does a fetch for the updated capsule list
        dispatch(fetchCapsules())
      })
      .catch(e => console.log('Error in delete request.', e))
  }
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
        // saves the collection items in state
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

export const updateItem = payload => {
  // adds or removes an item from a capsule
  return (dispatch, getState) => {
    debugger
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

export const createItem = payload => {
  return (dispatch, getState) => {
    fetch(API + '/items', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          console.log('Failed to create item.', json)
        } else {
          debugger
          console.log('Creating item!!!', json.item);
          dispatch(showCapsule(json.capsule))
          console.log('dispatching show capsule action to show', json.capsule);
        }
      })
      .then(data => dispatch(fetchCapsules()))
  }
}