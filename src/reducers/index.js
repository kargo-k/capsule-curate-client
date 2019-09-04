import { SHOW_CAPSULE, SHOW_USER, LOGGED_IN, SET_CAPSULES, SET_COLLECTION, LOG_OUT, DELETE_USER, SHOW_ITEM } from '../constants/action-types';

const initialState = {
  show_capsule: null,
  user: null,
  logged_in: false,
  capsules_list: [],
  collection: null,
  show_item: null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_CAPSULE:
      return { ...state, show_capsule: action.payload }
    case SHOW_USER:
      return { ...state, user: action.payload }
    case LOGGED_IN:
      return { ...state, logged_in: true }
    case SET_CAPSULES:
      return { ...state, capsules_list: action.payload }
    case SHOW_ITEM:
      return { ...state, show_item: action.payload }
    case SET_COLLECTION:
      return { ...state, collection: action.payload }
    case LOG_OUT:
      return { ...initialState }
    case DELETE_USER:
      return { ...initialState }
    default:
      return state
  }
}

export default reducer