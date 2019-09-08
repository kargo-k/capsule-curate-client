import { SHOW_CAPSULE, SET_USER, SET_CAPSULES, SET_COLLECTION, LOG_OUT, DELETE_USER, SHOW_ITEM, ACTIVE_CAPSULE } from '../constants/action-types';

const initialState = {
  user: {
    id: localStorage.getItem('user_id'),
    username: localStorage.getItem('username'),
    location: localStorage.getItem('location')
  },
  capsules_list: JSON.parse(localStorage.getItem('capsules_list')),
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
    case SET_COLLECTION:
      return { ...state, collection: action.payload }
    case LOG_OUT:
      return {
        show_capsule: null,
        user: null,
        capsules_list: null,
        show_item: null,
        active_capsule: null
      }
    case DELETE_USER:
      return { ...initialState }
    default:
      return state
  }
}

export default reducer