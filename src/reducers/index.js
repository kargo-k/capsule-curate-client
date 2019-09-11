import { SHOW_CAPSULE, SET_USER, SET_CAPSULES, LOG_OUT, SHOW_ITEM, ACTIVE_CAPSULE } from '../constants/action-types';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  // capsules_list: JSON.parse(localStorage.getItem('capsules_list')),
  capsules_list: [],
  show_capsule: null,
  active_capsule: null,
  collection: null,
  show_item: null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIVE_CAPSULE:
      return { ...state, active_capsule: action.payload }
    case SHOW_CAPSULE:
      return { ...state, show_capsule: action.payload }
    case SET_USER:
      return { ...state, user: action.payload }
    case SET_CAPSULES:
      return { ...state, capsules_list: action.payload }
    case SHOW_ITEM:
      return { ...state, show_item: action.payload }
    case LOG_OUT:
      return {
        show_capsule: null,
        user: null,
        capsules_list: null,
        show_item: null,
        active_capsule: null
      }
    default:
      return state
  }
}

export default reducer