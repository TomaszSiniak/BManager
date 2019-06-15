import { TOGGLE_MENU } from '../actions/appActions';

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
    default:
      return state;
  }
}

export default App;