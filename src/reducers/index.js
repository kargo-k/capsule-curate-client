import { SHOW_CAPSULE } from '../constants/action-types';

const initialState = {
  show_capsule: null,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_CAPSULE:
      return { ...state, show_capsule: action.payload }
    default:
      return state
  }
}

export default reducer