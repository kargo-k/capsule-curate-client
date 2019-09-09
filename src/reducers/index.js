import { SHOW_CAPSULE, SET_USER, SET_CAPSULES, SET_COLLECTION, LOG_OUT, DELETE_USER, SHOW_ITEM, ACTIVE_CAPSULE } from '../constants/action-types';

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
      console.log('active capsule set to', action.payload);
      return { ...state, active_capsule: action.payload }
    case SHOW_CAPSULE:
      console.log('show capsule set');
      return { ...state, show_capsule: action.payload }
    case SET_USER:
      console.log('set user action done. setting user to: ', action.payload);
      return { ...state, user: action.payload }
    case SET_CAPSULES:
      console.log('capsules list set');
      return { ...state, capsules_list: action.payload }
    case SHOW_ITEM:
      return { ...state, show_item: action.payload }
    case SET_COLLECTION:
      return { ...state, collection: action.payload }
    case LOG_OUT:
      console.log('user logged out');
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