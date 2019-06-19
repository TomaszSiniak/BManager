import { TOGGLE_MENU, CLOSE_MENU } from '../actions/appActions';

const INITIAL_STATE = {
  isLoaded: false,
  isMenuVisible: false,
}

const App = (state= INITIAL_STATE, action) => {
  switch(action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        isMenuVisible: !state.isMenuVisible,
      }
    case CLOSE_MENU:
        return {
          ...state,
          isMenuVisible: false,
        }
    default:
      return state;
  }
}

export default App;