import { TOGGLE_MENU, CLOSE_MENU, TOGGLE_PROMPT_MODAL } from '../actions/appActions';

const INITIAL_STATE = {
  isMenuVisible: false,
  isPromptModalVisible: false,
}

const App = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
    case TOGGLE_PROMPT_MODAL:
      return {
        ...state,
        isPromptModalVisible: !state.isPromptModalVisible,
      }
    default:
      return state;
  }
}

export default App;