import { SHOW_CAPSULE, SHOW_USER } from '../constants/action-types';

const initialState = {
  show_capsule: null,
  show_user: null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_CAPSULE:
      return { ...state, show_capsule: action.payload }
    case SHOW_USER:
      return { ...state, show_user: action.payload }
    default:
      return state
  }
}

export default reducer