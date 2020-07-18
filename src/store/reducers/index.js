import { TOGGLE_LEFT_MENU } from '../constants/action-types'

const initialState = {
  leftMenuOpened: false
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LEFT_MENU: {
      return Object.assign({}, state, {
        leftMenuOpened: !state.leftMenuOpened
      });
    }
  }
  return state
}

export default rootReducer;
