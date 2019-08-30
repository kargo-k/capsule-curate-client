import { SHOW_CAPSULE, SHOW_USER, LOGGED_IN, SET_CAPSULES } from '../constants/action-types';

const initialState = {
  show_capsule: null,
  show_user: null,
  logged_in: false,
  capsules_list: []
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_CAPSULE:
      return { ...state, show_capsule: action.payload }
    case SHOW_USER:
      return { ...state, show_user: action.payload }
    case LOGGED_IN:
      return { ...state, logged_in: true }
    case SET_CAPSULES:
      return { ...state, capsules_list: action.payload }
    default:
      return state
  }
}

export default reducer