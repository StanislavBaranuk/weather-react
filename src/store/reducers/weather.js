import { SET_WEATHER } from '../constants/action-types'

const initialState = null;


export default function weather(state = initialState, action) {
  switch (action.type) {
    case SET_WEATHER: {
      return action.payload
    }
    default: {
      return state
    }
  }
};
