import { SET_CURRENT_LOCATION } from '../constants/action-types'

const initialState = null;

export default function location(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_LOCATION: {
      return action.payload

    }
    default: {
      return state
    }
  }
};
