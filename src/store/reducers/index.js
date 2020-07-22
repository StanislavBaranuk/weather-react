// import { SET_WEATHER, SET_CURRENT_LOCATION } from '../constants/action-types'
//
// const initialState = {
//   weather: null,
//   location: null
// };
//
// function rootReducer(state = initialState, action) {
//   switch (action.type) {
//     case SET_WEATHER: {
//       return {
//         ...state,
//         weather: action.payload
//       }
//     }
//     case SET_CURRENT_LOCATION: {
//       return {
//         ...state,
//         location: action.payload
//       }
//     }
//     default: {
//       return state
//     }
//   }
// }
//
// export default rootReducer;
import {combineReducers} from 'redux';

import weather from './weather'
import location from './location'

export default combineReducers({
  weather,
  location
})
